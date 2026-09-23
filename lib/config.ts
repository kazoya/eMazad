export const site = {
  name: "إي مزاد",
  nameEn: "eMazad",
  tagline: "مزادات موثوقة للعقارات والمركبات والنمر المميزة والمقتنيات في الأردن",
  source: "مقاصة جو",
  sourceUrl: "https://www.muqasa-jo.com",
  email: "info@muqasa-jo.com",
  whatsapp: "962787523192",
  whatsappLabel: "+962 78 752 3192",
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
