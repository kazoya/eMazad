"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { useSite } from "@/components/site";
import { properties, typeOptions, type Property, type Status } from "@/lib/ema";

const tabs: { id: "" | Status; key: string }[] = [
  { id: "", key: "all" },
  { id: "live", key: "stLive" },
  { id: "ending", key: "endingSoon" },
  { id: "coming", key: "stComing" },
  { id: "direct", key: "directOffers" },
  { id: "finished", key: "stFinished" },
];

export function AuctionBrowser({ initialQuery, initialTab }: { initialQuery: string; initialTab: string }) {
  const { t, L } = useSite();
  const [q, setQ] = useState(initialQuery);
  const [tab, setTab] = useState(initialTab);
  const [type, setType] = useState("");
  const [loc, setLoc] = useState("");
  const [max, setMax] = useState(1000000);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return properties.filter((p) => {
      if (tab && p.status !== tab && !(tab === "live" && p.status === "ending")) return false;
      if (type && p.type !== type) return false;
      if (loc && L(p.sub) !== loc) return false;
      if (p.currentBid > max) return false;
      if (term) {
        const blob = `${L(p.title)} ${L(p.loc)} ${L(p.sub)} ${p.ref}`.toLowerCase();
        if (!blob.includes(term)) return false;
      }
      return true;
    });
  }, [q, tab, type, loc, max, L]);

  const areas = [...new Set(properties.map((p) => L(p.sub)))];

  return (
    <section className="section" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <h1 className="page-title">{t("navAuctions")}</h1>
        <p className="muted">{t("welcomeBody")}</p>
        <div className="tabs" style={{ marginTop: 18 }}>
          {tabs.map((item) => (
            <button key={item.id || "all"} className={tab === item.id ? "on" : ""} type="button" onClick={() => setTab(item.id)}>{t(item.key)}</button>
          ))}
        </div>
        <div className="layout">
          <aside className="side stack" style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <label className="searchbar"><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPh")} /></label>
            <div>
              <b>{t("propertyType")}</b>
              <div className="filters" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                <button type="button" className={!type ? "on" : ""} onClick={() => setType("")}>{t("all")}</button>
                {typeOptions.map((item) => (
                  <button key={item.id} type="button" className={type === item.id ? "on" : ""} onClick={() => setType(item.id)}>{L(item)}</button>
                ))}
              </div>
            </div>
            <div>
              <b>{t("location")}</b>
              <div className="filters" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                <button type="button" className={!loc ? "on" : ""} onClick={() => setLoc("")}>{t("anyLocation")}</button>
                {areas.map((area) => <button key={area} type="button" className={loc === area ? "on" : ""} onClick={() => setLoc(area)}>{area}</button>)}
              </div>
            </div>
            <label>
              <b>{t("priceRange")}</b>
              <input type="range" min={20000} max={1000000} step={10000} value={max} onChange={(e) => setMax(Number(e.target.value))} style={{ width: "100%" }} />
              <span className="muted">{t("anyLabel")} — {max.toLocaleString("en-US")} {t("jod")}</span>
            </label>
          </aside>
          <div>
            <div className="muted" style={{ marginBottom: 12 }}>{results.length} {t("results")}</div>
            {results.length === 0 ? (
              <div className="panel"><h3>{t("noResults")}</h3><p className="muted">{t("noResultsBody")}</p></div>
            ) : (
              <div className="grid grid-2">{results.map((p: Property) => <PropertyCard key={p.id} property={p} />)}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
