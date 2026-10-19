"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Bell, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "./logo";
import { copy, deadline, notifications, text, type Lang, type Property } from "@/lib/ema";

export type Theme = "light" | "dark";

type BidState = { current: number; count: number; youLead: boolean; autoMax: number | null };

type Site = {
  lang: Lang;
  theme: Theme;
  authed: boolean;
  ready: boolean;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
  L: (value?: { en: string; ar: string }) => string;
  signIn: () => void;
  signOut: () => void;
  watched: string[];
  toggleWatch: (id: string) => void;
  isWatched: (id: string) => boolean;
  deposits: string[];
  hasDeposit: (id: string) => boolean;
  payDeposit: (id: string) => void;
  bids: Record<string, BidState>;
  placeBid: (property: Property, amount: number, you?: boolean) => void;
  setAuto: (id: string, max: number | null) => void;
  read: string[];
  markRead: (id?: string) => void;
  unread: number;
};

const Ctx = createContext<Site | null>(null);

function readSet(key: string, store: Storage) {
  try {
    return JSON.parse(store.getItem(key) || "[]") as string[];
  } catch {
    return [];
  }
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const [theme, setThemeState] = useState<Theme>("light");
  const [authed, setAuthed] = useState(false);
  const [watched, setWatched] = useState<string[]>([]);
  const [deposits, setDeposits] = useState<string[]>([]);
  const [bids, setBids] = useState<Record<string, BidState>>({});
  const [read, setRead] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("ema_lang");
    const savedTheme = localStorage.getItem("ema_theme");
    if (savedLang === "en" || savedLang === "ar") setLangState(savedLang);
    if (savedTheme === "dark" || savedTheme === "light") setThemeState(savedTheme);
    setAuthed(localStorage.getItem("ema_auth") === "1");
    setWatched(readSet("ema_watch", localStorage));
    setDeposits(readSet("ema_deposits", sessionStorage));
    setRead(readSet("ema_read", localStorage));
    try {
      setBids(JSON.parse(sessionStorage.getItem("ema_bids") || "{}"));
    } catch {
      setBids({});
    }
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    if (!ready) return;
    localStorage.setItem("ema_lang", lang);
    localStorage.setItem("ema_theme", theme);
  }, [lang, theme, ready]);

  const api = useMemo<Site>(() => {
    const unread = notifications.filter((item) => item.unread && !read.includes(item.id)).length;
    return {
      lang,
      theme,
      authed,
      ready,
      setLang: setLangState,
      setTheme: setThemeState,
      t: (key) => text(key, lang),
      L: (value) => copy(value, lang),
      signIn: () => {
        localStorage.setItem("ema_auth", "1");
        setAuthed(true);
      },
      signOut: () => {
        localStorage.setItem("ema_auth", "0");
        setAuthed(false);
      },
      watched,
      isWatched: (id) => watched.includes(id),
      toggleWatch: (id) => {
        setWatched((current) => {
          const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
          localStorage.setItem("ema_watch", JSON.stringify(next));
          return next;
        });
      },
      deposits,
      hasDeposit: (id) => deposits.includes(id),
      payDeposit: (id) => {
        setDeposits((current) => {
          const next = current.includes(id) ? current : [...current, id];
          sessionStorage.setItem("ema_deposits", JSON.stringify(next));
          return next;
        });
      },
      bids,
      placeBid: (property, amount, you = true) => {
        setBids((current) => {
          const prev = current[property.id];
          const next = {
            ...current,
            [property.id]: {
              current: amount,
              count: (prev?.count ?? property.bidCount) + 1,
              youLead: you,
              autoMax: prev?.autoMax ?? null,
            },
          };
          sessionStorage.setItem("ema_bids", JSON.stringify(next));
          return next;
        });
      },
      setAuto: (id, max) => {
        setBids((current) => {
          const next = {
            ...current,
            [id]: {
              current: current[id]?.current ?? 0,
              count: current[id]?.count ?? 0,
              youLead: current[id]?.youLead ?? false,
              autoMax: max,
            },
          };
          sessionStorage.setItem("ema_bids", JSON.stringify(next));
          return next;
        });
      },
      read,
      markRead: (id) => {
        setRead((current) => {
          const next = id ? Array.from(new Set([...current, id])) : notifications.map((item) => item.id);
          localStorage.setItem("ema_read", JSON.stringify(next));
          return next;
        });
      },
      unread,
    };
  }, [lang, theme, authed, ready, watched, deposits, bids, read]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useSite() {
  const value = useContext(Ctx);
  if (!value) throw new Error("useSite");
  return value;
}

export function bidOf(property: Property, bids: Record<string, BidState>) {
  const extra = bids[property.id];
  return {
    current: extra?.current || property.currentBid,
    count: extra?.count || property.bidCount,
    youLead: !!extra?.youLead,
    autoMax: extra?.autoMax ?? null,
  };
}

const links = [
  { href: "/", key: "navHome" },
  { href: "/auctions", key: "browse" },
  { href: "/map", key: "navMap" },
  { href: "/how-it-works", key: "howItWorks" },
];

export function Header() {
  const path = usePathname();
  const { t, lang, setLang, theme, setTheme, authed, unread } = useSite();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="nav">
      <div className="nav-inner">
        <Logo />
        <nav className={open ? "nav-links open" : "nav-links"} id="navLinks">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={active(item.href) ? "nav-link active" : "nav-link"}>
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <button className="icon-btn chrome-btn" type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={theme === "light" ? "Dark theme" : "Light theme"}>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="lang-btn" type="button" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
            <Globe size={15} /> {lang === "ar" ? "English" : "العربية"}
          </button>
          {authed ? (
            <>
              <Link href="/notifications" className="icon-btn chrome-btn bell" aria-label={t("notifications")}>
                <Bell size={18} />
                {unread > 0 && <i />}
              </Link>
              <Link href="/profile" className="avatar" aria-label={t("navActivity")}>ز</Link>
            </>
          ) : (
            <Link href="/signin" className="btn btn-primary btn-sm">{t("signIn")}</Link>
          )}
          <button className="lang-btn nav-toggle" type="button" onClick={() => setOpen((v) => !v)} aria-label="menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { t, lang } = useSite();
  const en = lang === "en";
  const cols = [
    {
      h: en ? "Explore" : "تصفح",
      items: [
        [t("navAuctions"), "/auctions"],
        [t("directOffers"), "/auctions?tab=direct"],
        [t("navMap"), "/map"],
        [en ? "Live now" : "مباشر الآن", "/auctions?tab=live"],
      ],
    },
    {
      h: en ? "Company" : "الشركة",
      items: [
        [en ? "About us" : "من نحن", "/about"],
        [en ? "How it works" : "كيف يعمل", "/how-it-works"],
        [en ? "Appraisal" : "التقييم", "/appraise"],
        [en ? "Contact" : "اتصل بنا", "/signin"],
      ],
    },
    {
      h: en ? "Support" : "الدعم",
      items: [
        [en ? "Help center" : "مركز المساعدة", "/how-it-works"],
        [en ? "Terms" : "الشروط", "/about"],
        [en ? "Notifications" : "الإشعارات", "/notifications"],
        [en ? "Trust & safety" : "الثقة والأمان", "/how-it-works"],
      ],
    },
  ];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>{t("welcomeBody")}</p>
          <span className="chip chip-green">{t("accountVerified")}</span>
        </div>
        {cols.map((col) => (
          <div key={col.h}>
            <h4>{col.h}</h4>
            {col.items.map(([label, href]) => (
              <Link key={label} href={href}>{label}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2026 Emazadak · {en ? "Amman, Jordan" : "عمان، الأردن"}</span>
          <span>{en ? "All prices in JOD" : "جميع الأسعار بالدينار الأردني"}</span>
        </div>
      </div>
    </footer>
  );
}

export function useTick() {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function formatLeft(stamp: number, lang: Lang) {
  const diff = Math.max(0, deadline(stamp) - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  if (d > 0) return `${d}${lang === "ar" ? "ي" : "d"} ${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function Guard({ children }: { children: React.ReactNode }) {
  const { authed, ready, t } = useSite();
  const router = useRouter();
  if (!ready) return null;
  if (!authed) {
    return (
      <section className="section">
        <div className="wrap narrow center">
          <h1>{t("gateGuestTitle")}</h1>
          <p className="muted">{t("gateGuestBody")}</p>
          <Link href="/signin" className="btn btn-primary">{t("signIn")}</Link>
        </div>
      </section>
    );
  }
  void router;
  return <>{children}</>;
}
