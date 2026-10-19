import catalog from "./ema-catalog.json";
import photoMap from "./photo-map.json";

export type Lang = "ar" | "en";
export type Status = "live" | "ending" | "coming" | "finished" | "direct";
export type Copy = { en: string; ar: string };

export type Property = {
  id: string;
  ref: string;
  type: string;
  ptype: string;
  title: Copy;
  sub: Copy;
  loc: Copy;
  status: Status;
  endsAt: number;
  startsIn?: number;
  img: number;
  startingPrice: number;
  marketPrice: number;
  askingPrice?: number;
  currentBid: number;
  minIncrement: number;
  bidCount: number;
  deposit: "required" | "paid";
  verified: boolean;
  featured: boolean;
  beds: number;
  baths: number;
  area: number;
  parking: number;
  desc: Copy;
  docs: Copy[];
  sold?: boolean;
  won?: boolean;
};

const data = catalog as {
  props: Property[];
  str: Record<string, Copy>;
  photos: string[];
  avatar: string;
  notifs: {
    id: string;
    type: string;
    pid: string;
    unread: boolean;
    group: "today" | "earlier";
    time: Copy;
    title: Copy;
    body: Copy;
  }[];
  exportedAt: number;
};

const photos = photoMap as Record<string, string>;

const GALLERIES: Record<string, string[]> = {
  A1021: ["1613490493576-7fde63acd811", "1600596542815-ffad4c1539a9", "1600585154340-be6161a56a0c", "1600210492493-0946911123ea", "1600607687939-ce8a6c25118c", "1600566753086-00f18fb6b3ea"],
  A1044: ["1502672260266-1c1ef2d93688", "1522708323590-d24dbb6b0267", "1493809842364-78817add7ffb", "1560448204-e02f11c3d0e2", "1600210491369-e753d80a41f3", "1556912173-3bb406ef7e77"],
  A1067: ["1500382017468-9049fed747ef", "1416879595882-3373a0480b5b", "1542601906990-b4d3fb778b09", "1466692476868-aef1dfb1e735", "1501785888041-af3ef285b470", "1472214103451-9374bd1c798e"],
  A1090: ["1486406146926-c627a92ad1ab", "1497366811353-6870744d04b2", "1497366216548-37526070297c", "1604328698692-f76ea9498e76", "1542744173-8e7e53415bb0", "1556761175-5973dc0f32e7"],
  D2003: ["1568605114967-8130f3a36994", "1600585154526-990dced4db0d", "1600566753190-17f0baa2a6c3", "1600121848594-d8644e57abab", "1600573472550-8090b5e0745e", "1600047509807-ba8f99d2cdde"],
  D2018: ["1613977257363-707ba9348227", "1600607687939-ce8a6c25118c", "1600596542815-ffad4c1539a9", "1600585154340-be6161a56a0c", "1600210492493-0946911123ea", "1571055107559-3e67626fa8be"],
  A1102: ["1502005229762-cf1b2da7c5d6", "1493809842364-78817add7ffb", "1522708323590-d24dbb6b0267", "1560448204-e02f11c3d0e2", "1505691938895-1758d7feb511", "1556912173-3bb406ef7e77"],
};

export const properties = data.props;
export const strings = data.str;
export const notifications = data.notifs;
export const exportedAt = data.exportedAt;

export function copy(value: Copy | undefined, lang: Lang) {
  if (!value) return "";
  return value[lang] || value.en;
}

export function text(key: string, lang: Lang) {
  return copy(strings[key], lang) || key;
}

export function money(n: number) {
  return (n || 0).toLocaleString("en-US");
}

export function deadline(stamp?: number) {
  if (!stamp) return 0;
  return stamp + (Date.now() - exportedAt);
}

export function photoSrc(url: string) {
  return photos[url] || url;
}

export function cover(property: Property) {
  return photoSrc(data.photos[property.img % data.photos.length]);
}

export function gallery(property: Property) {
  const ids = GALLERIES[property.id] || GALLERIES.A1021;
  return ids.map((id) => {
    const hit = Object.entries(photos).find(([url]) => url.includes(id));
    return hit ? hit[1] : cover(property);
  });
}

export function getProperty(id: string) {
  return properties.find((property) => property.id === id);
}

export function depositAmount(property: Property) {
  const base = priceOf(property);
  return Math.max(1000, Math.round((base * 0.05) / 100) * 100);
}

export function priceOf(property: Property) {
  if (property.status === "direct") return property.askingPrice || property.marketPrice || property.currentBid || 0;
  return property.currentBid || property.startingPrice || 0;
}

export const typeOptions = [
  { id: "residential", en: "Residential", ar: "سكني" },
  { id: "apartment", en: "Apartment", ar: "شقة" },
  { id: "land", en: "Land", ar: "أرض" },
  { id: "commercial", en: "Commercial", ar: "تجاري" },
];

export const mapPins = [
  { x: 24, y: 26 }, { x: 46, y: 20 }, { x: 64, y: 30 }, { x: 80, y: 22 },
  { x: 34, y: 48 }, { x: 56, y: 54 }, { x: 72, y: 50 }, { x: 28, y: 70 }, { x: 52, y: 74 },
];
