import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import StickyBuyBar from "@/components/StickyBuyBar";
import { packs, getProductsByCategory } from "@/data/products";
import { site } from "@/config/site";

export default function Home() {
  const msak = getProductsByCategory("huile");
  const mkhamriyat = getProductsByCategory("solide");
  const mainPack = packs[0];

  return (
    <div className="pb-24">
      <section className="mx-auto max-w-5xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-ink">
          <Image src={mainPack.image} alt={mainPack.name} width={1080} height={1080} priority
            className="h-80 w-full object-cover opacity-70 md:h-[28rem]" />
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-center text-white">
            <p className="text-sm text-gold-light">« {site.sloganAr} »</p>
            <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">{mainPack.name}</h1>
            <p className="mt-2 text-lg">
              <span className="text-2xl font-bold text-gold-light">{mainPack.price} درهم</span>
              <span className="ms-2 text-white/60 line-through">{mainPack.oldPrice} درهم</span>
            </p>
            <Link href={`/packs/${mainPack.slug}`} className="mt-4 rounded-full bg-gold px-8 py-3 font-bold text-white hover:bg-gold-dark">
              اكتشفي العرض
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-5xl grid-cols-3 gap-2 px-4 text-center text-xs font-semibold md:text-sm">
        <div className="rounded-xl bg-white p-3 ring-1 ring-gold-light">🚚<br />توصيل مجاني</div>
        <div className="rounded-xl bg-white p-3 ring-1 ring-gold-light">💵<br />الدفع عند الاستلام</div>
        <div className="rounded-xl bg-white p-3 ring-1 ring-gold-light">🎁<br />علب هدايا فاخرة</div>
      </section>

      <section id="packs" className="mx-auto mt-12 max-w-5xl scroll-mt-32 px-4">
        <h2 className="mb-4 text-2xl font-extrabold">عروضنا ✨</h2>
        <div className="grid grid-cols-2 gap-4">
          {packs.map((p) => (
            <ProductCard key={p.id} href={`/packs/${p.slug}`} image={p.image} name={p.name} price={p.price} oldPrice={p.oldPrice} />
          ))}
        </div>
      </section>

      <section id="msak" className="mx-auto mt-12 max-w-5xl scroll-mt-32 px-4">
        <h2 className="mb-1 text-2xl font-extrabold">الأمساك</h2>
        <p className="mb-4 text-gray-600">زيوت عطرية مركزة بروائح شرقية وفاكهية.</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {msak.map((p) => (
            <ProductCard key={p.id} href={`/produits/${p.slug}`} image={p.image} name={p.name} price={p.price} />
          ))}
        </div>
      </section>

      <section id="mkhamriyat" className="mx-auto mt-12 max-w-5xl scroll-mt-32 px-4">
        <h2 className="mb-1 text-2xl font-extrabold">المخمريات</h2>
        <p className="mb-4 text-gray-600">عطور صلبة كريمية تُوضع على الجلد والشعر.</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {mkhamriyat.map((p) => (
            <ProductCard key={p.id} href={`/produits/${p.slug}`} image={p.image} name={p.name} price={p.price} />
          ))}
        </div>
      </section>

      <StickyBuyBar href={`/packs/${mainPack.slug}`} label={`اطلبي ${mainPack.name} — ${mainPack.price} درهم`} />
    </div>
  );
}
