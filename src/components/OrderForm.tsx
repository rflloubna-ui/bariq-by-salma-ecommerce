"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cities } from "@/lib/cities";
import { whatsappLink } from "@/config/site";
import { submitOrder } from "@/app/actions/order";

type Option = { slug: string; name: string; image: string };

type Props = {
  kind: "pack" | "product";
  slug: string;
  productName: string;
  unitPrice: number;
  choose?: { count: number; options: Option[] };
  fixedItems?: string[];
};

type Fields = { firstName: string; lastName: string; address: string; city: string; phone: string };
const emptyFields: Fields = { firstName: "", lastName: "", address: "", city: "", phone: "" };

function normalizePhone(raw: string): string {
  let p = raw.replace(/[\s.-]/g, "");
  if (p.startsWith("+212")) p = "0" + p.slice(4);
  else if (p.startsWith("00212")) p = "0" + p.slice(5);
  else if (p.startsWith("212")) p = "0" + p.slice(3);
  if (/^[5-7]\d{8}$/.test(p)) p = "0" + p;
  return p;
}

export default function OrderForm({ kind, slug, productName, unitPrice, choose, fixedItems }: Props) {
  const [slots, setSlots] = useState<(string | null)[]>(() => Array(choose?.count ?? 0).fill(null));
  const [pickerIndex, setPickerIndex] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "slots", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "fallback">("idle");
  const [fallbackLink, setFallbackLink] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "done" || status === "fallback") {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const total = unitPrice * qty;
  const findOption = (slug: string | null) => choose?.options.find((o) => o.slug === slug);

  function updateField(name: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function pick(slug: string) {
    if (pickerIndex === null) return;
    setSlots((prev) => prev.map((s, i) => (i === pickerIndex ? slug : s)));
    setPickerIndex(null);
  }

  function removeSlot(index: number) {
    setSlots((prev) => prev.map((s, i) => (i === index ? null : s)));
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (choose && slots.some((s) => s === null)) e.slots = `المرجو اختيار ${choose.count} منتجات`;
    if (fields.firstName.trim().length < 2) e.firstName = "الاسم الشخصي مطلوب";
    if (fields.lastName.trim().length < 2) e.lastName = "الاسم العائلي مطلوب";
    if (fields.address.trim().length < 5) e.address = "العنوان مطلوب";
    if (!fields.city) e.city = "اختاري المدينة";
    if (!/^0[5-7]\d{8}$/.test(normalizePhone(fields.phone))) e.phone = "رقم الهاتف غير صحيح (مثال: 0612345678)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    const result = await submitOrder({
      kind,
      slug,
      choices: slots.filter((s): s is string => s !== null),
      qty,
      ...fields,
    });

    if (result.ok) {
      setStatus("done");
      return;
    }

    const lines = [
      "🛍️ طلب جديد — Bariq by Salma",
      `المنتج: ${productName}`,
      ...(choose ? [`الاختيار: ${slots.map((s) => findOption(s)?.name).join("، ")}`] : []),
      ...(fixedItems ? [`المحتوى: ${fixedItems.join("، ")}`] : []),
      `الكمية: ${qty}`,
      `المجموع: ${total} درهم`,
      `الاسم: ${fields.firstName} ${fields.lastName}`,
      `الهاتف: ${normalizePhone(fields.phone)}`,
      `المدينة: ${fields.city}`,
      `العنوان: ${fields.address}`,
    ];
    setFallbackLink(whatsappLink(lines.join("\n")));
    setStatus("fallback");
  }

  if (status === "done") {
    return (
      <div ref={resultRef} className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gold-light">
        <p className="text-4xl">✅</p>
        <h3 className="mt-2 text-xl font-bold">شكراً على طلبك!</h3>
        <p className="mt-2 text-gray-600">تم تسجيل طلبك بنجاح، سنتصل بك قريباً لتأكيده.</p>
      </div>
    );
  }

  if (status === "fallback" && fallbackLink) {
    return (
      <div ref={resultRef} className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gold-light">
        <p className="text-4xl">📲</p>
        <h3 className="mt-2 text-xl font-bold">آخر خطوة!</h3>
        <p className="mt-2 text-gray-600">المرجو إرسال الطلب عبر واتساب لتأكيده.</p>
        <a href={fallbackLink} target="_blank" rel="noopener noreferrer"
          className="mt-4 inline-block rounded-lg bg-[#25D366] px-6 py-3 font-bold text-white">
          إرسال عبر واتساب
        </a>
      </div>
    );
  }

  const inputClass = "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-gold focus:bg-white";

  return (
    <form id="commande" onSubmit={handleSubmit} noValidate className="scroll-mt-32 space-y-6">
      {choose && (
        <div>
          <p className="mb-3 font-semibold text-gray-600">اختاري {choose.count} أمساك</p>
          <div className="grid grid-cols-3 gap-3">
            {slots.map((slug, i) => {
              const option = findOption(slug);
              return (
                <div key={i} className="relative">
                  <button type="button" onClick={() => setPickerIndex(i)}
                    className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gold-light bg-white text-4xl text-gold">
                    {option ? (
                      <Image src={option.image} alt={option.name} width={200} height={200} className="h-full w-full object-cover" />
                    ) : (
                      "+"
                    )}
                  </button>
                  {option && (
                    <>
                      <p className="mt-1 truncate text-center text-xs">{option.name}</p>
                      <button type="button" onClick={() => removeSlot(i)} aria-label="حذف"
                        className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-ink text-xs text-white">✕</button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          {errors.slots && <p className="mt-2 text-sm text-red-600">{errors.slots}</p>}
        </div>
      )}

      {fixedItems && (
        <div className="rounded-xl bg-white p-4 ring-1 ring-gold-light">
          <p className="mb-2 font-semibold">محتوى العرض:</p>
          <ul className="list-inside list-disc text-gray-700">
            {fixedItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      )}

      <div>
        <p className="mb-2 font-semibold text-gray-600">الكمية</p>
        <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 text-xl">−</button>
          <span className="w-10 text-center font-bold">{qty}</span>
          <button type="button" onClick={() => setQty((q) => q + 1)} className="px-4 py-2 text-xl">+</button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-semibold text-gray-600">المرجو ملء الاستمارة لتأكيد الطلب</p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <input className={inputClass} placeholder="الاسم الشخصي *" value={fields.firstName}
              onChange={(e) => updateField("firstName", e.target.value)} />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <input className={inputClass} placeholder="الاسم العائلي *" value={fields.lastName}
              onChange={(e) => updateField("lastName", e.target.value)} />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <input className={inputClass} placeholder="العنوان *" value={fields.address}
            onChange={(e) => updateField("address", e.target.value)} />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>

        <div>
          <select className={inputClass} value={fields.city} onChange={(e) => updateField("city", e.target.value)}>
            <option value="">المدينة *</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>

        <div>
          <div className="flex items-center gap-2" dir="ltr">
            <span className="shrink-0 whitespace-nowrap rounded-lg bg-gray-100 px-3 py-3 text-sm">🇲🇦 +212</span>
            <input className={inputClass} type="tel" inputMode="tel" placeholder="06 12 34 56 78" value={fields.phone}
              onChange={(e) => updateField("phone", e.target.value)} />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 ring-1 ring-gold-light">
        <div className="flex justify-between text-lg">
          <span>المجموع</span>
          <span className="font-bold text-gold-dark">{total} درهم</span>
        </div>
        <p className="text-sm text-green-700">🚚 التوصيل بالمجان · 💵 الدفع عند الاستلام</p>
      </div>

      <button type="submit" disabled={status === "sending"}
        className="w-full rounded-lg bg-ink py-4 text-lg font-bold text-white transition hover:bg-gold-dark disabled:opacity-60">
        {status === "sending" ? "جاري الإرسال..." : "اطلب الآن"}
      </button>

      {choose && pickerIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center" onClick={() => setPickerIndex(null)}>
          <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-4 sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-bold">اختاري المسك</p>
              <button type="button" onClick={() => setPickerIndex(null)} className="text-xl">✕</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {choose.options.map((o) => (
                <button type="button" key={o.slug} onClick={() => pick(o.slug)} className="text-center">
                  <Image src={o.image} alt={o.name} width={200} height={200} className="aspect-square w-full rounded-lg object-cover" />
                  <span className="mt-1 block text-xs">{o.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
