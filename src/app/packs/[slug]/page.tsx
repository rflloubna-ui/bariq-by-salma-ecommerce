import Image from "next/image";
import { notFound } from "next/navigation";
import OrderForm from "@/components/OrderForm";
import StickyBuyBar from "@/components/StickyBuyBar";
import { packs, getPackBySlug, getProductsByCategory } from "@/data/products";

export function generateStaticParams() {
  return packs.map((p) => ({ slug: p.slug }));
}

export default async function PackPage({ params }: PageProps<"/packs/[slug]">) {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) notFound();

  const options = pack.choose
    ? getProductsByCategory(pack.choose.category).map((p) => ({ slug: p.slug, name: p.name, image: p.image }))
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-28 pt-6 md:grid md:grid-cols-2 md:gap-10">
      <div>
        <Image src={pack.image} alt={pack.name} width={1080} height={1080} priority
          className="aspect-square w-full rounded-2xl object-cover" />
      </div>

      <div className="mt-6 space-y-6 md:mt-0">
        <div>
          <h1 className="text-3xl font-extrabold">{pack.name}</h1>
          <p className="mt-2">
            <span className="text-2xl font-bold text-gold-dark">{pack.price} درهم</span>
            <span className="ms-3 text-gray-400 line-through">{pack.oldPrice} درهم</span>
          </p>
          <p className="mt-3 text-gray-700">{pack.description}</p>
          <ul className="mt-3 space-y-1">
            {pack.highlights.map((h) => <li key={h}>✨ {h}</li>)}
          </ul>
        </div>

        <OrderForm
          kind="pack"
          slug={pack.slug}
          productName={pack.name}
          unitPrice={pack.price}
          choose={pack.choose ? { count: pack.choose.count, options } : undefined}
          fixedItems={pack.fixedItems}
        />
      </div>

      <StickyBuyBar href="#commande" />
    </div>
  );
}
