"use client";

import { Orbitron } from "next/font/google";
import { createContext, useContext, useEffect, useState } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["500", "700", "900"] });

type Lang = "ar" | "en";

const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "ar",
  setLang: () => undefined,
});

export function useLang() {
  return useContext(LanguageContext);
}

export function T({ ar, en }: { ar: string; en: string }) {
  const { lang } = useLang();
  return <>{lang === "ar" ? ar : en}</>;
}

export function LanguageRoot({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("site-lang");
    if (saved === "en" || saved === "ar") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("site-lang", lang);
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {(["ar", "en"] as const).map((code) => (
        <button key={code} type="button" className={lang === code ? "is-active" : ""} onClick={() => setLang(code)}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function DigitalClock() {
  const { lang } = useLang();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className={`clock-card ${orbitron.className}`}>
        <div className="date">…</div>
        <div className="time" dir="ltr">
          <span>--:--</span>
        </div>
      </div>
    );
  }

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Amman",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? "00";
  const date = now.toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB", {
    timeZone: "Asia/Amman",
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className={`clock-card tilt ${orbitron.className}`} aria-label={lang === "ar" ? "توقيت عمّان" : "Amman time"}>
      <div className="date">{now ? date : "…"}</div>
      <div className="time" dir="ltr">
        <span>{pick("hour")}</span>:<span>{pick("minute")}</span>
        <span className="seconds">{pick("second")}</span>
      </div>
      <div className="label">{lang === "ar" ? "عمّان" : "AMMAN"}</div>
    </div>
  );
}

export function SmoothLoader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setGone(true), 900);
    return () => window.clearTimeout(id);
  }, []);
  if (gone) return null;
  return (
    <div className="smooth-loader" role="status" aria-live="polite">
      <span className="loader-ring" />
    </div>
  );
}

export function StageMotion() {
  useStageMotion();
  return null;
}

export function useStageMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));

    const onScroll = () => {
      document.querySelectorAll<HTMLElement>(".parallax").forEach((node) => {
        const shift = Math.max(-24, Math.min(24, window.scrollY * 0.04));
        node.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    };
    const onMove = (event: PointerEvent) => {
      document.querySelectorAll<HTMLElement>(".tilt").forEach((node) => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.transform = `perspective(600px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
}
