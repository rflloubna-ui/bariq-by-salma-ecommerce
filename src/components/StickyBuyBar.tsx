import Link from "next/link";

export default function StickyBuyBar({ href, label = "اطلب الآن" }: { href: string; label?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 bg-gold-dark/95 p-3 backdrop-blur">
      <Link
        href={href}
        className="mx-auto block max-w-md rounded-lg bg-white py-3 text-center text-lg font-bold text-ink shadow"
      >
        {label}
      </Link>
    </div>
  );
}
