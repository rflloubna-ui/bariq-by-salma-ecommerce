export type Product = {
  id: number;
  slug: string;
  name: string;
  nameFr: string;
  category: "huile" | "solide";
  price: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1, slug: "musc-rouge", name: "مسك أحمر", nameFr: "Musc Rouge",
    category: "huile", price: 100, image: "/products/musc-rouge.webp",
    description: "عطر دافئ وجذاب بنفحات حلوة وعميقة، يمنحك حضوراً لافتاً طوال اليوم.",
  },
  {
    id: 2, slug: "musc-feminite", name: "مسك الأنوثة", nameFr: "Musc Féminité",
    category: "huile", price: 100, image: "/products/musc-feminite.webp",
    description: "مزيج ناعم وأنثوي بلمسات زهرية رقيقة، مثالي للاستعمال اليومي.",
  },
  {
    id: 3, slug: "musc-vanille-rose", name: "مسك الفانيلا والورد", nameFr: "Musc Vanille & Rose",
    category: "huile", price: 100, image: "/products/musc-vanille-rose.webp",
    description: "حلاوة الفانيلا مع رقة الورد في عطر رومانسي ودافئ.",
  },
  {
    id: 4, slug: "musc-fraise", name: "مسك التوت", nameFr: "Musc Fraise",
    category: "huile", price: 100, image: "/products/musc-fraise.webp",
    description: "نفحات فاكهية منعشة من التوت الأحمر، خفيف وحيوي.",
  },
  {
    id: 5, slug: "musc-grenade", name: "مسك الرمان", nameFr: "Musc Grenade",
    category: "huile", price: 100, image: "/products/musc-grenade.webp",
    description: "عطر فاكهي مميز برائحة الرمان الطازج، منعش وراقٍ.",
  },
  {
    id: 6, slug: "musc-tahara-blanc", name: "مسك الطهارة الأبيض", nameFr: "Musc Tahara Blanc",
    category: "huile", price: 100, image: "/products/musc-tahara-blanc.webp",
    description: "مسك نقي وناعم برائحة النظافة والانتعاش، يناسب كل الأوقات.",
  },
  {
    id: 7, slug: "musc-noir", name: "مسك أسود", nameFr: "Musc Noir",
    category: "huile", price: 100, image: "/products/musc-noir.webp",
    description: "عطر شرقي فاخر بنفحات خشبية عميقة وثابتة.",
  },
  {
    id: 8, slug: "musc-ananas", name: "مسك الأناناس", nameFr: "Musc Ananas",
    category: "huile", price: 100, image: "/products/musc-ananas.webp",
    description: "نفحات استوائية منعشة وحلوة، مثالي لفصل الصيف.",
  },
  {
    id: 9, slug: "musc-peche", name: "مسك الخوخ", nameFr: "Musc Pêche",
    category: "huile", price: 100, image: "/products/musc-peche.webp",
    description: "رائحة الخوخ الناعمة والحلوة، عطر لطيف ومريح.",
  },

  {
    id: 10, slug: "mkhamriya-oud", name: "مخمرية العود", nameFr: "Mkhamriya Al-Oud",
    category: "solide", price: 80, image: "/products/mkhamriya-oud.webp",
    description: "عطر صلب كريمي بنفحات العود الشرقية الفاخرة، يوضع على الجلد والشعر.",
  },
  {
    id: 11, slug: "mkhamriya-feminite", name: "مخمرية الأنوثة", nameFr: "Mkhamriya Féminité",
    category: "solide", price: 80, image: "/products/mkhamriya-feminite.webp",
    description: "مخمرية ناعمة بلمسات زهرية أنثوية، تمنحك إحساساً بالانتعاش والأناقة.",
  },
  {
    id: 12, slug: "mkhamriya-fruits-rouges", name: "مخمرية الفواكه الحمراء", nameFr: "Mkhamriya Fruits Rouges",
    category: "solide", price: 80, image: "/products/mkhamriya-fruits-rouges.webp",
    description: "حلاوة التوت والفواكه الحمراء في مخمرية كريمية تدوم معك.",
  },
];

export type Pack = {
  id: number;
  slug: string;
  name: string;
  nameFr: string;
  price: number;
  oldPrice: number;
  image: string;
  description: string;
  highlights: string[];
  fixedItems?: string[];
  choose?: { category: Product["category"]; count: number };
};

export const packs: Pack[] = [
  {
    id: 1,
    slug: "pack-6-msak",
    name: "علبة الأمساك الفاخرة",
    nameFr: "Coffret 6 Msak",
    price: 299,
    oldPrice: 600,
    image: "/products/pack-6-msak.webp",
    description: "اختاري 6 أمساك من تشكيلتنا في علبة هدية أنيقة.",
    highlights: ["6 أمساك من اختيارك", "علبة هدية فاخرة", "التوصيل بالمجان", "الدفع عند الاستلام"],
    choose: { category: "huile", count: 6 },
  },
  {
    id: 2,
    slug: "pack-mkhamriyat",
    name: "علبة المخمريات",
    nameFr: "Pack Mkhamriyat",
    price: 199,
    oldPrice: 240,
    image: "/products/pack-mkhamriyat.webp",
    description: "ثلاث مخمريات بروائح مختلفة في علبة واحدة.",
    highlights: ["3 مخمريات", "علبة هدية", "التوصيل بالمجان", "الدفع عند الاستلام"],
    fixedItems: ["الفواكه الحمراء", "العود", "الشاي الأخضر"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getPackBySlug(slug: string): Pack | undefined {
  return packs.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}
