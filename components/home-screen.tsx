"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Lock, MapPin, Search, Shield } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { formatLeft, useSite, useTick } from "@/components/site";
import { cover, properties } from "@/lib/ema";

const slides = [
  { en: "Finance your winning bid", ar: "مول مزايدتك الرابحة", subEn: "Housing Bank · Sponsored", subAr: "بنك الإسكان · ممول", bodyEn: "Property loans for verified buyers — instant pre-approval.", bodyAr: "قروض عقارية للمشترين الموثقين — موافقة فورية." },
  { en: "Protect your property purchase", ar: "احم عملية شرائك", subEn: "Emazadak Insure · Sponsored", subAr: "تأمين إمزادك · ممول", bodyEn: "Title insurance and escrow on every closed deal.", bodyAr: "تأمين الملكية وحماية الضمان على كل صفقة." },
  { en: "New villas now at auction", ar: "فلل جديدة في المزاد الآن", subEn: "Saraya Developments · Sponsored", subAr: "سرايا للتطوير · ممول", bodyEn: "A limited release in Dabouq. Bidding is open this week.", bodyAr: "طرح محدود في دابوق. المزايدة مفتوحة هذا الأسبوع." },
];

export function HomeScreen() {
  const { t, L, lang } = useSite();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [ad, setAd] = useState(0);
  useTick();
  const en = lang === "en";
  const live = properties.filter((p) => p.status === "live" || p.status === "ending");
  const featured = properties.filter((p) => p.status !== "direct" && p.status !== "finished").slice(0, 3);
  const direct = properties.filter((p) => p.status === "direct").slice(0, 3);
  const hero = properties.find((p) => p.status === "live") || properties[0];
  const areas = [...new Map(properties.map((p) => [L(p.sub), p])).values()].slice(0, 6);

  useEffect(() => {
    const id = window.setInterval(() => setAd((n) => (n + 1) % slides.length), 4500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-bg"><img src={cover(hero)} alt="" /></div>
        <div className="hero-inner">
          <span className="hero-pill"><Shield size={14} /> {en ? "Verified · Escrow-secured · Amman, Jordan" : "موثق · ضمان آمن · عمان، الأردن"}</span>
          <h1>{en ? <>Find, bid and <em>own</em><br />real estate in Jordan</> : <>اكتشف، زايد و<em>تملك</em><br />العقارات في الأردن</>}</h1>
          <p className="lead">{t("welcomeBody")}</p>
          <form className="hero-search" onSubmit={(e) => { e.preventDefault(); router.push(`/auctions?q=${encodeURIComponent(q)}`); }}>
            <Search size={18} color="#7c8884" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPh")} />
            <button className="btn btn-gold btn-lg" type="submit">{en ? "Search" : "بحث"}</button>
          </form>
          <div className="hero-trust">
            <span><Shield size={16} /> {en ? "Verified listings" : "عقارات موثقة"}</span>
            <span><Lock size={16} /> {en ? "Escrow-secured deposits" : "عربون محمي بالضمان"}</span>
            <span>{en ? "Clear title deeds" : "سندات ملكية واضحة"}</span>
          </div>
        </div>
      </section>

      <div className="live-deck"><div className="wrap">
        <div className="live-head"><span className="ring pulse" /><h2>{t("liveNow")}</h2><span>{live.length} {en ? "auctions running" : "مزاد جار"}</span></div>
        <div className="live-rail">
          {live.map((p) => (
            <Link key={p.id} href={`/live/${p.id}`} className="lcard">
              <div className="ph">
                <img src={cover(p)} alt="" />
                <span className={`pill pill-${p.status}`} style={{ position: "absolute", top: 12, insetInlineStart: 12 }}>{t(p.status === "ending" ? "stEnding" : "stLive")}</span>
                <span className="cd"><Clock size={14} /> {formatLeft(p.endsAt, lang)}</span>
              </div>
              <div className="bd">
                <div className="loc"><MapPin size={12} /> {L(p.sub)}</div>
                <div className="ti">{L(p.title)}</div>
                <div className="row"><div><div className="muted" style={{ fontSize: 11 }}>{t("currentBid")}</div><div className="bid">{p.currentBid.toLocaleString("en-US")} <span className="c">{t("jod")}</span></div></div><span className="go">←</span></div>
              </div>
            </Link>
          ))}
        </div>
      </div></div>

      <section className="section" style={{ paddingBottom: 20 }}>
        <div className="wrap">
          <span className="ad-label">{t("advertisement")}</span>
          <div className="ad-carousel">
            {slides.map((s, i) => (
              <div key={s.en} className={i === ad ? "ad-slide on" : "ad-slide"}>
                <span className="glow" />
                <div>
                  <div className="ad-kicker">{en ? s.subEn : s.subAr}</div>
                  <h3 style={{ fontSize: 26, margin: "4px 0" }}>{en ? s.en : s.ar}</h3>
                  <p style={{ margin: 0, color: "rgba(255,255,255,.8)" }}>{en ? s.bodyEn : s.bodyAr}</p>
                </div>
              </div>
            ))}
            <div className="ad-dots">{slides.map((s, i) => <button key={s.en} className={i === ad ? "on" : ""} type="button" onClick={() => setAd(i)} />)}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sh"><div><h2>{t("featured")}</h2><div className="muted">{t("featuredSub")}</div></div><Link className="see-all" href="/auctions?tab=live">{t("seeAll")}</Link></div>
          <div className="grid grid-3">{featured.map((p) => <PropertyCard key={p.id} property={p} />)}</div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="sh"><div><h2>{t("directOffers")}</h2><div className="muted">{t("directOffersSub")}</div></div><Link className="see-all" href="/auctions?tab=direct">{t("seeAll")}</Link></div>
          <div className="grid grid-3">{direct.map((p) => <PropertyCard key={p.id} property={p} />)}</div>
        </div>
      </section>

      <section className="mapsec">
        <div className="wrap mapsec-grid">
          <div>
            <h2 style={{ fontSize: 36, marginTop: 0 }}>{t("mapHomeTitle")}</h2>
            <p>{t("mapHomeSub")}</p>
            <div className="area-chips">
              {areas.map((p) => <Link key={p.id} href={`/map?area=${encodeURIComponent(L(p.sub))}`}>{L(p.sub)}</Link>)}
            </div>
            <Link href="/map" className="btn btn-gold btn-lg">{t("openFullMap")}</Link>
          </div>
          <div className="mini-map">
            <div className="roads" />
            {properties.filter((p) => p.status !== "finished").map((p, i) => (
              <Link key={p.id} href={`/auctions/${p.id}`} className="pin" style={{ left: `${[24, 46, 64, 34, 56, 72, 28][i % 7]}%`, top: `${[26, 20, 30, 48, 54, 50, 70][i % 7]}%` }} title={L(p.title)}>
                <span style={{ background: p.status === "direct" ? "var(--gold)" : "var(--green)" }} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
