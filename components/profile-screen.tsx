"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { properties } from "@/lib/ema";
import { useSite } from "@/components/site";
import { PropertyCard } from "./property-card";

export function ProfileScreen() {
  const { t, lang, watched, signOut, setLang, theme, setTheme } = useSite();
  const router = useRouter();
  const en = lang === "en";
  const [panel, setPanel] = useState<"home" | "watch" | "settings">("home");
  const saved = properties.filter((p) => watched.includes(p.id));
  return (
    <section className="section">
      <div className="wrap" style={{ display: "grid", gap: 22 }}>
        <div className="finance">
          <div>
            <div className="chip chip-gold">{t("accountVerified")}</div>
            <h1 style={{ marginBottom: 0 }}>{en ? "Zaid Alawi" : "زيد العلاوي"}</h1>
            <p>{t("manageAccount")}</p>
          </div>
          <div className="avatar" style={{ width: 64, height: 64, fontSize: 24 }}>ز</div>
        </div>
        <div className="grid grid-3">
          <button className="tcard" style={{ padding: 16, textAlign: "start" }} type="button" onClick={() => setPanel("home")}><b>{t("activeBids")}</b><div className="card-price">2</div></button>
          <button className="tcard" style={{ padding: 16, textAlign: "start" }} type="button" onClick={() => setPanel("watch")}><b>{t("watchlist")}</b><div className="card-price">{saved.length}</div></button>
          <div className="tcard" style={{ padding: 16 }}><b>{t("wonAuctions")}</b><div className="card-price">1</div></div>
        </div>
        <div className="tabs">
          <button className={panel === "home" ? "on" : ""} type="button" onClick={() => setPanel("home")}>{t("recentActivity")}</button>
          <button className={panel === "watch" ? "on" : ""} type="button" onClick={() => setPanel("watch")}>{t("watchlist")}</button>
          <button className={panel === "settings" ? "on" : ""} type="button" onClick={() => setPanel("settings")}>{t("settings")}</button>
        </div>
        {panel === "home" && (
          <div className="steps">
            <div className="panel"><b>{t("bidOn")}</b><p className="muted">{en ? "Luxury Residential Estate" : "عقار سكني فاخر"} · 205,000 {t("jod")}</p><Link href="/live/A1021">{t("viewAuction")}</Link></div>
            <div className="panel"><b>{t("wonLabel")}</b><p className="muted">{en ? "City Studio Loft" : "استوديو لوفت بالمدينة"} · 71,000 {t("jod")}</p><Link href="/auctions/A1102">{t("completePurchase")}</Link></div>
          </div>
        )}
        {panel === "watch" && (
          saved.length ? <div className="grid grid-3">{saved.map((p) => <PropertyCard key={p.id} property={p} />)}</div> : <div className="panel"><h3>{t("noBids")}</h3><p className="muted">{t("noBidsBody")}</p></div>
        )}
        {panel === "settings" && (
          <div className="panel" style={{ display: "grid", gap: 12 }}>
            <div className="sh"><span>{t("language")}</span><button className="btn btn-ghost btn-sm" type="button" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>{lang === "ar" ? "English" : "العربية"}</button></div>
            <div className="sh"><span>{en ? "Theme" : "المظهر"}</span><button className="btn btn-ghost btn-sm" type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? (en ? "Dark" : "داكن") : (en ? "Light" : "فاتح")}</button></div>
            <div className="sh"><span>{t("pushNotifs")}</span><b>{t("on")}</b></div>
            <div className="sh"><span>{t("emailAlerts")}</span><b>{t("on")}</b></div>
            <button className="btn btn-primary" type="button" onClick={() => { signOut(); router.push("/"); }}>{t("logout")}</button>
          </div>
        )}
      </div>
    </section>
  );
}
