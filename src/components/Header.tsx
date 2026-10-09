import Link from "next/link";
import { site } from "@/config/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/95 shadow-sm backdrop-blur">
      <div className="bg-ink py-1.5 text-center text-xs text-gold-light">
        🚚 التوصيل بالمجان لجميع مدن المغرب · الدفع عند الاستلام
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-3">
        <Link href="/" className="text-center leading-tight">
          <span className="block font-serif text-2xl font-bold text-ink">
            Bariq <span className="italic text-gold">by Salma</span>
          </span>
          <span className="block font-serif text-[11px] italic text-gold-dark">{site.slogan}</span>
        </Link>

        <nav className="flex gap-5 text-sm font-semibold text-ink/80">
          <Link href="/#packs" className="hover:text-gold">العروض</Link>
          <Link href="/#msak" className="hover:text-gold">الأمساك</Link>
          <Link href="/#mkhamriyat" className="hover:text-gold">المخمريات</Link>
          <Link href="/#about" className="hover:text-gold">من نحن</Link>
        </nav>
      </div>
    </header>
  );
}
