import Image from "next/image";
import { notFound } from "next/navigation";
import OrderForm from "@/components/OrderForm";
import StickyBuyBar from "@/components/StickyBuyBar";
import { products, getProductBySlug } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: PageProps<"/produits/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 pb-28 pt-6 md:grid md:grid-cols-2 md:gap-10">
      <div>
        <Image src={product.image} alt={product.name} width={1080} height={1080} priority
          className="aspect-square w-full rounded-2xl object-cover" />
      </div>

      <div className="mt-6 space-y-6 md:mt-0">
        <div>
          <p className="text-sm text-gold-dark">{product.category === "huile" ? "مسك · زيت عطري" : "مخمرية · عطر صلب"}</p>
          <h1 className="text-3xl font-extrabold">{product.name}</h1>
          <p className="mt-2 text-2xl font-bold text-gold-dark">{product.price} درهم</p>
          <p className="mt-3 leading-loose text-gray-700">{product.description}</p>
          <ul className="mt-3 space-y-1">
            <li>🚚 التوصيل بالمجان</li>
            <li>💵 الدفع عند الاستلام</li>
          </ul>
        </div>

        <OrderForm kind="product" slug={product.slug} productName={product.name} unitPrice={product.price} />
      </div>

      <StickyBuyBar href="#commande" />
    </div>
  );
}
