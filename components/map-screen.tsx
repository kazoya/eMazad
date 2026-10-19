"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSite } from "@/components/site";
import { mapPins, properties, typeOptions } from "@/lib/ema";

export function MapScreen({ initialArea }: { initialArea: string }) {
  const { t, L } = useSite();
  const [tab, setTab] = useState<"all" | "live" | "direct">("all");
  const [type, setType] = useState("");
  const [area, setArea] = useState(initialArea);
  const [active, setActive] = useState<string | null>(null);
  const list = useMemo(() => properties.filter((p) => {
    if (p.status === "finished") return false;
    if (tab === "live" && p.status === "direct") return false;
    if (tab === "direct" && p.status !== "direct") return false;
    if (type && p.type !== type) return false;
    if (area && L(p.sub) !== area && L(p.loc) !== area) return false;
    return true;
  }), [tab, type, area, L]);
  const picked = list.find((p) => p.id === active) || list[0];

  return (
    <section className="section" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <h1 className="page-title">{t("propertiesMap")}</h1>
        <p className="muted">{list.length} {t("nearby")}</p>
        <div className="tabs">
          {[["all", t("all")], ["live", t("navAuctions")], ["direct", t("directOffers")]].map(([id, label]) => (
            <button key={id} className={tab === id ? "on" : ""} type="button" onClick={() => setTab(id as typeof tab)}>{label}</button>
          ))}
        </div>
        <div className="layout">
          <aside className="side" style={{ display: "grid", gap: 10, alignContent: "start" }}>
            <b>{t("propertyType")}</b>
            <div className="filters" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button type="button" className={!type ? "on" : ""} onClick={() => setType("")}>{t("all")}</button>
              {typeOptions.map((item) => <button key={item.id} type="button" className={type === item.id ? "on" : ""} onClick={() => setType(item.id)}>{L(item)}</button>)}
            </div>
            <b>{t("location")}</b>
            <div className="filters" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button type="button" className={!area ? "on" : ""} onClick={() => setArea("")}>{t("anyLocation")}</button>
              {[...new Set(properties.map((p) => L(p.sub)))].map((name) => (
                <button key={name} type="button" className={area === name ? "on" : ""} onClick={() => setArea(name)}>{name}</button>
              ))}
            </div>
          </aside>
          <div className="mini-map" style={{ height: 560 }}>
            <div className="roads" />
            {list.map((p, i) => {
              const pos = mapPins[i % mapPins.length];
              return (
                <button key={p.id} className="pin" type="button" style={{ left: `${pos.x}%`, top: `${pos.y}%`, background: "none", border: 0, padding: 0 }} onClick={() => setActive(p.id)}>
                  <span style={{ background: p.status === "direct" ? "var(--gold)" : "var(--green)" }} />
                </button>
              );
            })}
            {picked && (
              <Link href={`/auctions/${picked.id}`} className="panel" style={{ position: "absolute", bottom: 16, insetInlineStart: 16, maxWidth: 280 }}>
                <b>{L(picked.title)}</b>
                <div className="muted">{L(picked.loc)}</div>
                <div className="card-price" style={{ fontSize: 20 }}>{picked.currentBid.toLocaleString("en-US")} {t("jod")}</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
