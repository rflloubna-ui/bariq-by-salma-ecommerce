import { site, whatsappLink } from "@/config/site";

export default function Footer() {
  return (
    <footer id="about" className="mt-16 bg-ink pb-28 pt-10 text-white/85">
      <div className="mx-auto max-w-5xl space-y-5 px-4">
        <p className="font-serif text-2xl font-bold text-white">
          Bariq <span className="italic text-gold">by Salma</span>
        </p>
        <p className="leading-loose">{site.description}</p>
        <p className="font-semibold text-gold-light">« {site.sloganAr} »</p>

        <div>
          <p className="mb-2 font-bold text-white">تابعونا</p>
          <div className="flex gap-4">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              Instagram
            </a>
            <a href={whatsappLink("السلام عليكم")} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              WhatsApp
            </a>
          </div>
        </div>

        <p className="border-t border-white/10 pt-4 text-xs text-white/50">
          © 2026 {site.name}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
