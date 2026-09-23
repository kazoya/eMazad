export const site = {
  name: "إي مزاد",
  nameEn: "eMazad",
  tagline: "مزادات موثوقة للعقارات والمركبات والنمر المميزة والمقتنيات في الأردن",
  source: "مقاصة جو",
  sourceUrl: "https://www.muqasa-jo.com",
  email: "info@emazad.com",
  whatsapp: "962791706000",
  whatsappLabel: "+962 7 9170 6000",
  whatsappName: "د. محمد صلاح",
  currency: "JOD",
};

export function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function getSiteUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
