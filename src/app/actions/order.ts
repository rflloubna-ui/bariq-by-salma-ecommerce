"use server";

import { getPackBySlug, getProductBySlug } from "@/data/products";
import { cities } from "@/lib/cities";

export type OrderInput = {
  kind: "pack" | "product";
  slug: string;
  choices: string[];
  qty: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  phone: string;
};

export type OrderResult = { ok: true } | { ok: false; error: string };

function normalizePhone(raw: string): string {
  let p = raw.replace(/[\s.-]/g, "");
  if (p.startsWith("+212")) p = "0" + p.slice(4);
  else if (p.startsWith("00212")) p = "0" + p.slice(5);
  else if (p.startsWith("212")) p = "0" + p.slice(3);
  if (/^[5-7]\d{8}$/.test(p)) p = "0" + p;
  return p;
}

export async function submitOrder(input: OrderInput): Promise<OrderResult> {
  const phone = normalizePhone(input.phone);
  if (!/^0[5-7]\d{8}$/.test(phone)) return { ok: false, error: "رقم الهاتف غير صحيح" };
  if (input.firstName.trim().length < 2 || input.lastName.trim().length < 2) return { ok: false, error: "الاسم مطلوب" };
  if (input.address.trim().length < 5) return { ok: false, error: "العنوان مطلوب" };
  if (!cities.includes(input.city)) return { ok: false, error: "المدينة غير صحيحة" };
  const qty = Math.min(Math.max(Math.floor(input.qty) || 1, 1), 20);

  let productName: string;
  let unitPrice: number;
  let details = "";

  if (input.kind === "pack") {
    const pack = getPackBySlug(input.slug);
    if (!pack) return { ok: false, error: "المنتج غير موجود" };
    productName = pack.name;
    unitPrice = pack.price;
    if (pack.choose) {
      const names = input.choices.map((s) => getProductBySlug(s)?.name);
      if (names.length !== pack.choose.count || names.some((n) => !n)) return { ok: false, error: "الاختيار غير مكتمل" };
      details = `🧴 *الاختيار:* ${names.join("، ")}`;
    }
    if (pack.fixedItems) details = `🧴 *المحتوى:* ${pack.fixedItems.join("، ")}`;
  } else {
    const product = getProductBySlug(input.slug);
    if (!product) return { ok: false, error: "المنتج غير موجود" };
    productName = product.name;
    unitPrice = product.price;
  }

  const message = [
    "🛍️ *طلب جديد — Bariq by Salma*",
    "",
    `📦 *المنتج:* ${productName}`,
    ...(details ? [details] : []),
    `🔢 *الكمية:* ${qty}`,
    `💰 *المجموع:* ${unitPrice * qty} درهم`,
    "",
    `👤 *الاسم:* ${input.firstName.trim()} ${input.lastName.trim()}`,
    `📞 *الهاتف:* ${phone}`,
    `🏙️ *المدينة:* ${input.city}`,
    `📍 *العنوان:* ${input.address.trim()}`,
  ].join("\n");

  const results = await Promise.all([sendWhatsApp(message), sendTelegram(message)]);

  if (results.every((r) => r === "not-configured")) {
    console.warn("⚠️ Ta notification ma mconfigurya f .env.local\n" + message);
    return { ok: false, error: "notification-not-configured" };
  }
  return results.includes("sent") ? { ok: true } : { ok: false, error: "notification-failed" };
}

type SendStatus = "sent" | "failed" | "not-configured";

async function sendWhatsApp(message: string): Promise<SendStatus> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apiKey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apiKey) return "not-configured";

  const url =
    "https://api.callmebot.com/whatsapp.php" +
    `?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(message)}` +
    `&apikey=${encodeURIComponent(apiKey)}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) return "sent";
    console.error("CallMeBot error", res.status, await res.text());
  } catch (err) {
    console.error("CallMeBot fetch failed", err);
  }
  return "failed";
}

async function sendTelegram(message: string): Promise<SendStatus> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) return "not-configured";

  const results = await Promise.all(
    chatIds.map(async (chatId): Promise<SendStatus> => {
      try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message.replaceAll("*", "") }),
          cache: "no-store",
        });
        if (res.ok) return "sent";
        console.error(`Telegram error (chat ${chatId})`, res.status, await res.text());
      } catch (err) {
        console.error(`Telegram fetch failed (chat ${chatId})`, err);
      }
      return "failed";
    }),
  );

  return results.includes("sent") ? "sent" : "failed";
}
