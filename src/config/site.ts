export const site = {
  name: "Bariq by Salma",
  slogan: "L'art de la fragrance",
  sloganAr: "رحلة الفخامة تبدأ من قطرة مسك",

  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000",

  instagram: "https://instagram.com/bariq_by_salma",

  description:
    "Bariq by Salma علامة مغربية متخصصة في الأمساك والزيوت العطرية والمخمريات (العطور الصلبة). " +
    "نختار مكوناتنا بعناية لنقدم لكِ عطوراً شرقية أصيلة بلمسة عصرية، مركّزة وثابتة، " +
    "في علب أنيقة تصلح هدية لكل المناسبات.",
};

export const whatsappQuickMessages: { label: string; message: string }[] = [
  { label: "👋 نسول على المنتجات", message: "السلام عليكم، بغيت نسول على المنتجات ديالكم" },
  { label: "🚚 نسول على التوصيل", message: "السلام عليكم، بغيت نعرف شحال كياخد التوصيل لمدينتي؟" },
];

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
