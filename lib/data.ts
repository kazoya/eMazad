export type SectionId =
  | "real_estate"
  | "vehicles"
  | "vehicle_plates"
  | "phone_numbers"
  | "jewelry_valuables"
  | "antiques"
  | "rare_coins"
  | "birds"
  | "animals"
  | "others";

export type Section = {
  id: SectionId;
  name: string;
  description: string;
  icon: string;
  tone: string;
};

// نفس أقسام المزادات في مقاصة (src/data/auction-taxonomy.ts + src/lib/i18n.ts)
export const sections: Section[] = [
  { id: "real_estate", name: "عقارات", description: "المباني والشقق والفلل والأراضي", icon: "Building2", tone: "from-emerald-500/25 to-teal-400/5" },
  { id: "vehicles", name: "سيارات", description: "مزادات السيارات والمركبات", icon: "Car", tone: "from-sky-500/25 to-cyan-400/5" },
  { id: "vehicle_plates", name: "نمر سيارات مميزة", description: "نمر مميزة قابلة للتحقق والنقل النظامي", icon: "RectangleHorizontal", tone: "from-indigo-500/25 to-blue-400/5" },
  { id: "phone_numbers", name: "أرقام هواتف مميزة", description: "أرقام مميزة وسهلة التذكر", icon: "Smartphone", tone: "from-violet-500/25 to-purple-400/5" },
  { id: "jewelry_valuables", name: "مجوهرات وأشياء ثمينة", description: "المجوهرات والساعات والأشياء الثمينة", icon: "Gem", tone: "from-rose-500/25 to-fuchsia-400/5" },
  { id: "antiques", name: "أثريات وتحف", description: "الأثريات والتحف والمقتنيات التراثية", icon: "Landmark", tone: "from-amber-500/25 to-yellow-400/5" },
  { id: "rare_coins", name: "عملات نادرة", description: "العملات النقدية النادرة والأوراق النقدية", icon: "Coins", tone: "from-stone-400/25 to-zinc-300/5" },
  { id: "birds", name: "طيور", description: "مزادات الطيور", icon: "Bird", tone: "from-lime-500/25 to-green-400/5" },
  { id: "animals", name: "حيوانات", description: "مزادات الحيوانات والمواشي", icon: "PawPrint", tone: "from-orange-500/25 to-red-400/5" },
  { id: "others", name: "مزادات أخرى", description: "معدات وأصول تجارية ومزادات غير مصنفة", icon: "Package", tone: "from-slate-400/25 to-slate-300/5" },
];

export type Condition = "New" | "Excellent" | "Good" | "Fair";

export const conditionAr: Record<Condition, string> = {
  New: "جديد",
  Excellent: "ممتاز",
  Good: "جيد",
  Fair: "مقبول",
};

export type Visual =
  | { kind: "images"; images: string[] }
  | { kind: "plate"; code: string; number: string }
  | { kind: "phone"; number: string; operator: string }
  | { kind: "icon"; icon: string };

export type Auction = {
  id: string;
  title: string;
  subtitle: string;
  section: SectionId;
  subcategory?: string;
  year?: number;
  mileage?: number;
  mileageLabel?: string;
  condition: Condition;
  location: string;
  description: string;
  visual: Visual;
  startingBid: number;
  currentBid?: number;
  bids: number;
  endInDays: number;
  featured?: boolean;
  appraisal: [number, number];
  specs: Record<string, string>;
  seller?: string;
};

const img = (dir: string, order: number[]) => order.map((n) => `/images/${dir}/${n}.webp`);

export const auctions: Auction[] = [
  {
    id: "1",
    title: "تويوتا كامري 2022",
    subtitle: "سيدان عائلية بحالة ممتازة",
    section: "vehicles",
    subcategory: "سيارات",
    year: 2022,
    mileage: 15000,
    condition: "Excellent",
    location: "صويلح، عمّان",
    description:
      "سيارة تويوتا كامري 2022 بحالة ممتازة وعداد كيلومترات منخفض. تحتوي على فتحة سقف ومقاعد جلدية وباقة أمان متقدمة. سيارة سيدان عائلية مثالية.",
    visual: { kind: "images", images: img("camry", [1, 3, 4, 5, 2]) },
    startingBid: 20000,
    currentBid: 21500,
    bids: 12,
    endInDays: 7,
    featured: true,
    appraisal: [19000, 22000],
    specs: { المحرك: "2.5 لتر 4 أسطوانات", "ناقل الحركة": "أوتوماتيكي", اللون: "فضي" },
  },
  {
    id: "2",
    title: "فورد موستانج GT 2021",
    subtitle: "محرك V8 أيقوني",
    section: "vehicles",
    subcategory: "سيارات",
    year: 2021,
    mileage: 8000,
    condition: "Excellent",
    location: "الجبيهة، عمّان",
    description:
      "سيارة فورد موستانج جي تي 2021 الأيقونية بمحرك V8 قوي. نظام صوتي فاخر، عجلات ألمنيوم مخصصة، ونظام تعليق رياضي.",
    visual: { kind: "images", images: img("mustang", [1, 3, 4, 5, 2]) },
    startingBid: 35000,
    bids: 25,
    endInDays: 5,
    appraisal: [33000, 37000],
    specs: { المحرك: "5.0 لتر V8", "ناقل الحركة": "10 سرعات أوتوماتيكي", اللون: "أحمر سباقي" },
  },
  {
    id: "3",
    title: "بي إم دبليو X5 2020",
    subtitle: "SUV فاخرة بسقف بانورامي",
    section: "vehicles",
    subcategory: "سيارات",
    year: 2020,
    mileage: 35000,
    condition: "Good",
    location: "الزرقاء",
    description:
      "سيارة BMW X5 SUV فاخرة موديل 2020. مقصورة واسعة، سقف بانورامي، ومساعدة قيادة متقدمة. مثالية للراحة والأداء.",
    visual: { kind: "images", images: img("bmw", [5, 3, 2, 1, 4]) },
    startingBid: 40000,
    currentBid: 42500,
    bids: 8,
    endInDays: 10,
    featured: true,
    appraisal: [38000, 43000],
    specs: { الفئة: "SUV فاخرة", السقف: "بانورامي", "مساعدة القيادة": "متقدمة" },
  },
  {
    id: "4",
    title: "مرسيدس بنز C-Class 2019",
    subtitle: "باقة AMG للتصميم",
    section: "vehicles",
    subcategory: "سيارات",
    year: 2019,
    mileage: 55000,
    condition: "Good",
    location: "ياجوز، عمّان",
    description:
      "مرسيدس بنز الفئة C الأنيقة موديل 2019. تأتي مع باقة AMG للتصميم، نظام صوت بورميستر، وإضاءة محيطية.",
    visual: { kind: "images", images: img("mer", [1, 3, 4, 5, 2]) },
    startingBid: 28000,
    bids: 15,
    endInDays: 3,
    appraisal: [26000, 30000],
    specs: { الباقة: "AMG Line", "نظام الصوت": "بورميستر", الإضاءة: "محيطية" },
  },
  {
    id: "5",
    title: "هوندا CR-V هايبرد 2023",
    subtitle: "جديدة — أعلى فئة",
    section: "vehicles",
    subcategory: "سيارات",
    year: 2023,
    mileage: 500,
    condition: "New",
    location: "إربد",
    description:
      "هوندا CR-V هايبرد 2023 جديدة تمامًا. أعلى فئة مع جميع الميزات المتاحة. اقتصاد ممتاز في استهلاك الوقود وتقنيات حديثة.",
    visual: { kind: "images", images: img("hu", [1, 3, 4, 5, 2]) },
    startingBid: 25000,
    bids: 3,
    endInDays: 12,
    appraisal: [24000, 27000],
    specs: { المحرك: "هايبرد", الفئة: "أعلى فئة", "استهلاك الوقود": "اقتصادي" },
  },
  {
    id: "6",
    title: "شيفروليه سيلفرادو 2018",
    subtitle: "بيك أب بباقة سحب",
    section: "vehicles",
    subcategory: "سيارات",
    year: 2018,
    mileage: 95000,
    condition: "Fair",
    location: "العقبة",
    description:
      "شاحنة بيك أب شيفروليه سيلفرادو 2018 القوية. قدرات شاقة، باقة سحب متضمنة. بعض البلى والتلف، السعر وفقًا لذلك.",
    visual: { kind: "images", images: img("p", [1, 3, 4, 5, 2]) },
    startingBid: 18000,
    currentBid: 18500,
    bids: 5,
    endInDays: 6,
    appraisal: [17000, 20000],
    specs: { النوع: "بيك أب", "باقة السحب": "متضمنة", الحالة: "بعض البلى" },
  },
  {
    id: "7",
    title: "شقة حديثة بإطلالة عبدون",
    subtitle: "3 غرف نوم · 220 م²",
    section: "real_estate",
    subcategory: "شقق",
    year: 2021,
    condition: "New",
    location: "عبدون، عمّان",
    description:
      "شقة واسعة من 3 غرف نوم في موقع متميز في عبدون. تتميز بمطبخ حديث وشرفة كبيرة بإطلالات على المدينة وموقفين للسيارات. يحتوي المبنى على صالة رياضية ومسبح.",
    visual: { kind: "images", images: img("appa", [5, 3, 2, 1, 4]) },
    startingBid: 250000,
    bids: 0,
    endInDays: 30,
    featured: true,
    appraisal: [230000, 270000],
    specs: { المساحة: "220 متر مربع", "غرف نوم": "3", حمامات: "4", "مواقف سيارات": "2 مغطاة" },
  },
  {
    id: "11",
    title: "نمرة مميزة 10-7777",
    subtitle: "رباعية مكررة — نقل نظامي",
    section: "vehicle_plates",
    subcategory: "نمر سيارات",
    condition: "New",
    location: "عمّان",
    description:
      "نمرة سيارة خصوصي رباعية مكررة. يتم التحقق من قابلية النقل لدى إدارة الترخيص قبل إتمام البيع، ويُسلَّم الفائز إجراءات النقل الرسمية.",
    visual: { kind: "plate", code: "10", number: "7777" },
    startingBid: 12000,
    currentBid: 13400,
    bids: 19,
    endInDays: 4,
    featured: true,
    appraisal: [11000, 16000],
    specs: { النوع: "خصوصي", الرمز: "10", "عدد الخانات": "4", النقل: "نظامي بعد التحقق" },
  },
  {
    id: "12",
    title: "نمرة مميزة 13-11111",
    subtitle: "خماسية مكررة",
    section: "vehicle_plates",
    subcategory: "نمر سيارات",
    condition: "New",
    location: "إربد",
    description: "نمرة خماسية مكررة سهلة التذكر. التحقق من الملكية وقابلية النقل شرط قبل الإعلان عن الفائز.",
    visual: { kind: "plate", code: "13", number: "11111" },
    startingBid: 6500,
    bids: 7,
    endInDays: 9,
    appraisal: [6000, 9000],
    specs: { النوع: "خصوصي", الرمز: "13", "عدد الخانات": "5", النقل: "نظامي بعد التحقق" },
  },
  {
    id: "13",
    title: "رقم مميز 0797777777",
    subtitle: "زين — سباعي مكرر",
    section: "phone_numbers",
    subcategory: "أرقام هواتف",
    condition: "New",
    location: "الأردن",
    description: "رقم هاتف مميز بسبعة أرقام مكررة. نقل الملكية يتم عبر مشغّل الشبكة بعد إتمام الدفع.",
    visual: { kind: "phone", number: "079 777 7777", operator: "زين" },
    startingBid: 3500,
    currentBid: 4100,
    bids: 11,
    endInDays: 2,
    featured: true,
    appraisal: [3200, 5000],
    specs: { المشغّل: "زين", "نوع الخط": "مسبق/لاحق الدفع", "نقل الملكية": "عبر المشغّل" },
  },
  {
    id: "14",
    title: "رقم مميز 0788888808",
    subtitle: "أمنية — نمط متكرر",
    section: "phone_numbers",
    subcategory: "أرقام هواتف",
    condition: "New",
    location: "الأردن",
    description: "رقم أمنية بنمط ثماني متكرر سهل الحفظ، مناسب للأعمال والشركات.",
    visual: { kind: "phone", number: "078 888 8808", operator: "أمنية" },
    startingBid: 1800,
    bids: 4,
    endInDays: 8,
    appraisal: [1600, 2600],
    specs: { المشغّل: "أمنية", "نوع الخط": "لاحق الدفع", "نقل الملكية": "عبر المشغّل" },
  },
  {
    id: "15",
    title: "أرض سكنية — طريق المطار",
    subtitle: "750 م² · سكن ب",
    section: "real_estate",
    subcategory: "أراضي",
    condition: "Good",
    location: "طريق المطار، عمّان",
    description:
      "قطعة أرض سكنية مستوية على شارعين، خدمات قريبة. مزاد بإشراف جهة مالية، والسعر الابتدائي مبني على تقييم معتمد ومراجعة بشرية.",
    visual: { kind: "icon", icon: "Map" },
    startingBid: 95000,
    currentBid: 101000,
    bids: 6,
    endInDays: 14,
    appraisal: [92000, 115000],
    specs: { المساحة: "750 متر مربع", التنظيم: "سكن ب", الواجهات: "شارعان", الطبيعة: "مستوية" },
    seller: "مزاد جهة مالية",
  },
  {
    id: "16",
    title: "فيلا مستقلة في دابوق",
    subtitle: "5 غرف · حديقة ومسبح",
    section: "real_estate",
    subcategory: "فلل",
    year: 2016,
    condition: "Excellent",
    location: "دابوق، عمّان",
    description: "فيلا مستقلة على أرض مساحتها 900 م² مع حديقة ومسبح خاص، تشطيبات فاخرة وتدفئة مركزية.",
    visual: { kind: "icon", icon: "Home" },
    startingBid: 480000,
    bids: 2,
    endInDays: 21,
    appraisal: [450000, 540000],
    specs: { "مساحة البناء": "620 متر مربع", "مساحة الأرض": "900 متر مربع", "غرف نوم": "5", إضافات: "حديقة ومسبح" },
  },
  {
    id: "17",
    title: "ساعة رولكس صب مارينر",
    subtitle: "مع العلبة والأوراق",
    section: "jewelry_valuables",
    subcategory: "ساعات",
    year: 2020,
    condition: "Excellent",
    location: "عمّان",
    description: "ساعة رولكس صب مارينر أصلية مع العلبة والأوراق. تُفحص لدى وكيل معتمد قبل التسليم.",
    visual: { kind: "icon", icon: "Watch" },
    startingBid: 9000,
    currentBid: 9650,
    bids: 9,
    endInDays: 5,
    appraisal: [8800, 11500],
    specs: { الماركة: "رولكس", الموديل: "Submariner", الملحقات: "العلبة والأوراق", الفحص: "لدى وكيل معتمد" },
  },
  {
    id: "10",
    title: "مجموعة طوابع وعملات أردنية",
    subtitle: "من العشرينات إلى السبعينات",
    section: "rare_coins",
    subcategory: "عملات نادرة",
    year: 1950,
    condition: "Good",
    location: "عمّان",
    description:
      "مجموعة نادرة من الطوابع البريدية والعملات الأردنية تعود للفترة من العشرينات إلى السبعينات من القرن الماضي. تتضمن عدة قطع بحالة ممتازة وأوراق نقدية تاريخية. مقيمة من قبل خبير.",
    visual: { kind: "icon", icon: "Coins" },
    startingBid: 1500,
    bids: 7,
    endInDays: 8,
    appraisal: [1200, 1800],
    specs: { الحقبة: "1920-1970", النوع: "طوابع، عملات، أوراق نقدية", المنشأ: "الأردن" },
  },
  {
    id: "18",
    title: "صقر حر",
    subtitle: "مدرّب — مع شهادة صحية",
    section: "birds",
    subcategory: "طيور",
    condition: "Good",
    location: "المفرق",
    description: "صقر حر مدرّب على الصيد مع شهادة صحية بيطرية. التسليم باليد بعد إتمام الدفع.",
    visual: { kind: "icon", icon: "Bird" },
    startingBid: 2500,
    bids: 3,
    endInDays: 6,
    appraisal: [2200, 3400],
    specs: { النوع: "حر", التدريب: "صيد", "الشهادة الصحية": "متوفرة" },
  },
  {
    id: "8",
    title: "حفارة كاتربيلر 320D",
    subtitle: "7,500 ساعة تشغيل",
    section: "others",
    subcategory: "معدات صناعية",
    year: 2015,
    mileage: 7500,
    mileageLabel: "ساعة تشغيل",
    condition: "Good",
    location: "مدينة سحاب الصناعية، عمّان",
    description: "حفارة كاتربيلر 320D موثوقة. بحالة جيدة مع 7500 ساعة تشغيل. جاهزة للأعمال الشاقة. سجل خدمة كامل متاح.",
    visual: { kind: "icon", icon: "Construction" },
    startingBid: 45000,
    bids: 2,
    endInDays: 15,
    appraisal: [40000, 50000],
    specs: { "وزن التشغيل": "21,000 كجم", "قوة المحرك": "110 كيلوواط", "سعة الجرافة": "1.0 متر مكعب" },
  },
  {
    id: "9",
    title: "كشك تجاري — سيتي مول",
    subtitle: "مزاد إيجار 3 سنوات",
    section: "others",
    subcategory: "تجاري",
    year: 2024,
    condition: "New",
    location: "سيتي مول، عمّان",
    description:
      "مساحة كشك تجزئة متميزة متاحة في سيتي مول. منطقة ذات حركة مرور عالية. مناسبة لمختلف مفاهيم البيع بالتجزئة. مزاد إيجار طويل الأجل.",
    visual: { kind: "icon", icon: "Store" },
    startingBid: 5000,
    bids: 0,
    endInDays: 20,
    appraisal: [4500, 6000],
    specs: { المساحة: "15 متر مربع", "مدة الإيجار": "3 سنوات", الموقع: "الطابق الأرضي، البهو الرئيسي" },
  },
];

export const MIN_INCREMENT = 50;

export function getAuction(id: string) {
  return auctions.find((a) => a.id === id);
}

export function getSection(id: SectionId) {
  return sections.find((s) => s.id === id)!;
}

export function priceOf(a: Auction) {
  return a.currentBid ?? a.startingBid;
}

export function countBySection() {
  const map = new Map<SectionId, number>();
  auctions.forEach((a) => map.set(a.section, (map.get(a.section) ?? 0) + 1));
  return map;
}

export const packages = [
  {
    id: "basic",
    name: "الباقة الأساسية",
    description: "مثالية للبدء في عالم المزادات",
    price: 10,
    credits: 100,
    features: ["مزايدة أساسية", "إشعارات بالبريد الإلكتروني", "دعم العملاء"],
  },
  {
    id: "premium",
    name: "الباقة المميزة",
    description: "ميزات معززة للمزايدين الجادين",
    price: 25,
    credits: 300,
    popular: true,
    features: ["مزايدة متقدمة", "إشعارات ذات أولوية", "دعم هاتفي", "سجل المزايدات"],
  },
  {
    id: "vip",
    name: "باقة كبار المزايدين",
    description: "تجربة المزادات الكاملة",
    price: 50,
    credits: 750,
    features: ["جميع الميزات", "مدير حساب شخصي", "مزادات حصرية", "دعم على مدار الساعة"],
  },
];
