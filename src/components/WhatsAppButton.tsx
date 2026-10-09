"use client";

import { useState } from "react";
import { whatsappLink, whatsappQuickMessages } from "@/config/site";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState("");

  return (
    <>
      {open && (
        <div className="fixed bottom-36 left-4 z-50 w-72 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
          <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
            <div>
              <p className="font-bold">Bariq by Salma</p>
              <p className="text-xs text-white/80">كنجاوبو بسرعة على واتساب 💬</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="إغلاق" className="text-xl">✕</button>
          </div>

          <div className="space-y-2 bg-[#ECE5DD] p-3">
            <p className="rounded-lg bg-white p-2 text-sm">السلام عليكم 👋 كيفاش نقدرو نعاونوك؟</p>

            {whatsappQuickMessages.map((q) => (
              <a key={q.label} href={whatsappLink(q.message)} target="_blank" rel="noopener noreferrer"
                className="block rounded-full border border-[#25D366] bg-white px-4 py-2 text-sm font-semibold text-[#075E54] transition hover:bg-[#25D366] hover:text-white">
                {q.label}
              </a>
            ))}

            <div className="flex gap-2 pt-1">
              <input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="ولا كتب ليا شنو بغيتي..."
                className="min-w-0 flex-1 rounded-full bg-white px-3 py-2 text-sm outline-none" />
              <a href={whatsappLink(custom.trim() || "السلام عليكم")} target="_blank" rel="noopener noreferrer"
                aria-label="إرسال" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                ➤
              </a>
            </div>
          </div>
        </div>
      )}

      <button type="button" onClick={() => setOpen((o) => !o)} aria-label="WhatsApp"
        className="fixed bottom-20 left-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105">
        {open ? (
          <span className="text-2xl">✕</span>
        ) : (
          <svg viewBox="0 0 32 32" className="h-8 w-8" fill="currentColor" aria-hidden="true">
            <path d="M16.04 3C9.4 3 4 8.38 4 15c0 2.12.56 4.18 1.62 6L4 29l8.2-1.6A12.07 12.07 0 0 0 16.04 27C22.66 27 28 21.62 28 15S22.66 3 16.04 3Zm0 21.82c-1.86 0-3.68-.5-5.27-1.45l-.38-.22-4.87.95.97-4.73-.25-.4A9.77 9.77 0 0 1 6.2 15c0-5.42 4.42-9.82 9.84-9.82 5.42 0 9.8 4.4 9.8 9.82 0 5.41-4.38 9.82-9.8 9.82Zm5.39-7.35c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.15-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.45 0 1.44 1.06 2.84 1.2 3.04.15.2 2.08 3.17 5.04 4.45.7.3 1.25.48 1.68.62.7.22 1.35.19 1.85.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
          </svg>
        )}
      </button>
    </>
  );
}
