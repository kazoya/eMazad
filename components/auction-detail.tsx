"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { depositAmount, gallery, getProperty, money, priceOf } from "@/lib/ema";
import { formatLeft, useSite, useTick } from "@/components/site";
import { statusKey } from "@/components/property-card";

export function AuctionDetail({ id }: { id: string }) {
  const property = getProperty(id);
  const { t, L, lang, authed, hasDeposit, payDeposit } = useSite();
  const router = useRouter();
  const [shot, setShot] = useState(0);
  const [tab, setTab] = useState<"overview" | "specs" | "documents">("overview");
  const [sheet, setSheet] = useState(false);
  const [done, setDone] = useState(false);
  useTick();
  if (!property) return <section className="section wrap"><h1>{t("noResults")}</h1></section>;
  const photos = gallery(property);
  const paid = hasDeposit(property.id) || property.deposit === "paid";
  const deposit = depositAmount(property);

  function confirmPay() {
    if (!authed) {
      router.push("/signin");
      return;
    }
    payDeposit(property!.id);
    setDone(true);
  }

  return (
    <section className="section" style={{ paddingTop: 28 }}>
      <div className="wrap layout">
        <div>
          <div className="gallery">
            <img className="main" src={photos[shot]} alt={L(property.title)} />
            <div className="thumbs">
              {photos.slice(0, 4).map((src, i) => (
                <button key={src} className={shot === i ? "on" : ""} type="button" onClick={() => setShot(i)}><img src={src} alt="" style={{ height: 96 }} /></button>
              ))}
            </div>
          </div>
          <div className="tabs" style={{ marginTop: 16 }}>
            {(["overview", "specs", "documents"] as const).map((key) => (
              <button key={key} className={tab === key ? "on" : ""} type="button" onClick={() => setTab(key)}>{t(key)}</button>
            ))}
          </div>
          {tab === "overview" && <p style={{ fontSize: 18, lineHeight: 1.8 }}>{L(property.desc)}</p>}
          {tab === "specs" && (
            <div className="facts">
              <div><span className="muted">{t("beds")}</span><b style={{ display: "block" }}>{property.beds}</b></div>
              <div><span className="muted">{t("baths")}</span><b style={{ display: "block" }}>{property.baths}</b></div>
              <div><span className="muted">{t("areaLabel")}</span><b style={{ display: "block" }}>{property.area} m²</b></div>
              <div><span className="muted">{t("parking")}</span><b style={{ display: "block" }}>{property.parking}</b></div>
              <div><span className="muted">{t("location")}</span><b style={{ display: "block" }}>{L(property.loc)}</b></div>
              <div><span className="muted">{t("marketPrice")}</span><b style={{ display: "block" }}>{property.marketPrice.toLocaleString("en-US")} {t("jod")}</b></div>
            </div>
          )}
          {tab === "documents" && (
            <div className="steps">{property.docs.map((doc) => <div key={doc.en} className="doc">{L(doc)}</div>)}</div>
          )}
        </div>
        <aside className="panel" style={{ alignSelf: "start", display: "grid", gap: 12 }}>
          <span className={`pill pill-${property.status}`}>{t(statusKey(property))}</span>
          <h1 style={{ margin: 0 }}>{L(property.title)}</h1>
          <div className="muted">{property.ref} · {L(property.loc)}</div>
          <div className="card-price">{money(priceOf(property))} <span className="cur">{t("jod")}</span></div>
          <div className="muted">{property.status === "direct" ? t("askingPrice") : t("currentBid")}</div>
          {property.status !== "direct" && property.status !== "finished" && (
            <div className={`card-timer ct-${property.status}`}><span>{t("endsIn")}</span><b>{formatLeft(property.endsAt, lang)}</b></div>
          )}
          <div className="facts">
            <div><span className="muted">{t("startingPrice")}</span><b style={{ display: "block" }}>{money(property.startingPrice || property.askingPrice || 0)}</b></div>
            <div><span className="muted">{t("minIncrement")}</span><b style={{ display: "block" }}>{money(property.minIncrement || 0)}</b></div>
          </div>
          <div className="muted">{paid ? t("depositPaid") : t("depositRequired")} · {deposit.toLocaleString("en-US")} {t("jod")}</div>
          {!paid && property.status !== "finished" && <button className="btn btn-gold btn-block" type="button" onClick={() => setSheet(true)}>{t("payDeposit")}</button>}
          {property.status === "live" || property.status === "ending" ? (
            paid ? <Link className="btn btn-primary btn-block" href={`/live/${property.id}`}>{t("enterLive")}</Link> : <button className="btn btn-primary btn-block" type="button" disabled style={{ opacity: 0.55 }}>{t("depositReqToBid")}</button>
          ) : null}
          {property.status === "direct" && <button className="btn btn-primary btn-block" type="button" onClick={() => setSheet(true)}>{t("makeOffer")}</button>}
        </aside>
      </div>
      {sheet && (
        <div className="modal" onClick={() => setSheet(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            {done ? (
              <>
                <h2>{t("depositDone")}</h2>
                <p>{property.status === "direct" ? t("depositDoneDirectBody") : t("depositDoneBody")}</p>
                <Link className="btn btn-primary" href={property.status === "direct" ? "/profile" : `/live/${property.id}`}>{property.status === "direct" ? t("viewDetails") : t("goBid")}</Link>
              </>
            ) : (
              <>
                <h2>{t("confirmPayTitle")}</h2>
                <p>{t("refundable")}</p>
                <p><b>{t("depositAmount")}: {deposit.toLocaleString("en-US")} {t("jod")}</b></p>
                <p className="muted">{t("securePay")}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-primary" type="button" onClick={confirmPay}>{t("payNow")}</button>
                  <button className="btn btn-ghost" type="button" onClick={() => setSheet(false)}>{t("cancel")}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
