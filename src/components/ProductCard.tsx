import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
};

export default function ProductCard({ href, image, name, price, oldPrice }: Props) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gold-light transition hover:shadow-md"
    >
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={1080}
          height={1080}
          sizes="(min-width: 768px) 33vw, 50vw"
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3 text-center">
        <h3 className="font-bold text-ink">{name}</h3>
        <p className="mt-1">
          <span className="font-bold text-gold-dark">{price} درهم</span>
          {oldPrice && <span className="ms-2 text-sm text-gray-400 line-through">{oldPrice} درهم</span>}
        </p>
      </div>
    </Link>
  );
}
