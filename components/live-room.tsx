"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { depositAmount, getProperty, money } from "@/lib/ema";
import { bidOf, formatLeft, useSite, useTick } from "@/components/site";

const names = ["Bidder 7", "Zaid A.", "Bidder 4", "Bidder 9", "Bidder 2"];

export function LiveRoom({ id }: { id: string }) {
  const property = getProperty(id);
  const { t, L, lang, authed, hasDeposit, bids, placeBid, setAuto } = useSite();
  const [amount, setAmount] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);
  const [max, setMax] = useState(0);
  const [note, setNote] = useState("");
  const [feed, setFeed] = useState<{ user: string; amount: number; you?: boolean }[]>([]);
  useTick();

  const paid = property ? hasDeposit(property.id) || property.deposit === "paid" : false;
  const state = property ? bidOf(property, bids) : null;

  useEffect(() => {
    if (!property) return;
    const base = property.currentBid;
    setAmount(base + property.minIncrement);
    setMax(base + property.minIncrement * 4);
    setFeed(names.map((user, i) => ({ user, amount: base - i * property.minIncrement, you: user === "Zaid A." })));
  }, [property]);

  useEffect(() => {
    if (!property || !state) return;
    const id = window.setInterval(() => {
      const live = bidOf(property, JSON.parse(sessionStorage.getItem("ema_bids") || "{}"));
      const current = live.current || property.currentBid;
      const auto = live.autoMax;
      if (auto && auto >= current + property.minIncrement) {
        const next = current + property.minIncrement;
        placeBid(property, next);
        setFeed((rows) => [{ user: "You", amount: next, you: true }, ...rows].slice(0, 8));
        setNote(t("youLead"));
        return;
      }
      if (live.youLead) {
        const next = current + property.minIncrement;
        setFeed((rows) => [{ user: "Bidder 4", amount: next }, ...rows].slice(0, 8));
        placeBid(property, next, false);
        setNote(t("outbid"));
      }
    }, 9000);
    return () => window.clearInterval(id);
  }, [property, state?.youLead, state?.autoMax, placeBid, t]);

  if (!property || !state) return null;
  const lot = property;
  const locked = !authed || !paid;
  const gate = !authed
    ? { title: t("gateGuestTitle"), body: t("gateGuestBody"), href: "/signin", cta: t("createAccountToBid") }
    : !paid
      ? { title: t("gateDepositTitle"), body: t("gateDepositBody"), href: `/auctions/${lot.id}`, cta: t("goToDeposit") }
      : null;

  function submit() {
    placeBid(lot, amount);
    setFeed((rows) => [{ user: t("you"), amount, you: true }, ...rows].slice(0, 8));
    setConfirm(false);
    setNote(t("bidPlaced"));
    setAmount(amount + lot.minIncrement);
  }

  return (
    <section className="section" style={{ paddingTop: 28 }}>
      <div className="wrap layout">
        <div className="panel" style={{ display: "grid", gap: 12 }}>
          <span className="pill pill-live">{t("bannerLive")}</span>
          <h1 style={{ margin: 0 }}>{L(property.title)}</h1>
          <div className="card-price">{money(state.current || property.currentBid)} <span className="cur">{t("jod")}</span></div>
          <div className="card-timer ct-live"><span>{t("auctionEnds")}</span><b>{formatLeft(property.endsAt, lang)}</b></div>
          <div className="muted">{state.count} {t("bids")} {state.youLead ? `· ${t("youLead")}` : ""}</div>
          {note && <div className="chip chip-gold">{note}</div>}
          <h3>{t("liveBids")}</h3>
          <div className="feed">
            {feed.map((row, i) => (
              <div key={`${row.amount}-${i}`} className={row.you ? "you" : ""}>
                <span>{row.you ? t("you") : row.user}</span>
                <b>{money(row.amount)} {t("jod")}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="panel" style={{ display: "grid", gap: 12, alignContent: "start", position: "relative" }}>
          <h2 style={{ margin: 0 }}>{t("placeYourBid")}</h2>
          <div className="quick">
            {[1, 2, 3].map((n) => (
              <button key={n} type="button" onClick={() => setAmount((state.current || property.currentBid) + property.minIncrement * n)}>
                +{money(property.minIncrement * n)}
              </button>
            ))}
          </div>
          <label className="searchbar">{t("yourBid")}<input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></label>
          <button className="btn btn-primary" type="button" disabled={locked || amount <= (state.current || property.currentBid)} onClick={() => setConfirm(true)}>{t("confirmBid")}</button>
          <button className="btn btn-ghost" type="button" onClick={() => setAutoOpen(true)}>{state.autoMax ? t("autoBidOn") : t("autoBid")}</button>
          <p className="muted">{t("autoBidDesc")}</p>
          <p className="muted">{t("depositAmount")}: {money(depositAmount(property))} {t("jod")}</p>
          {gate && (
            <div className="sheet" style={{ position: "absolute", inset: 12, display: "grid", alignContent: "center", gap: 8, padding: 18 }}>
              <b>{t("accessLocked")}</b>
              <h3 style={{ margin: 0 }}>{gate.title}</h3>
              <p className="muted">{gate.body}</p>
              <Link className="btn btn-primary" href={gate.href}>{gate.cta}</Link>
            </div>
          )}
        </div>
      </div>
      {confirm && (
        <div className="modal" onClick={() => setConfirm(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <h2>{t("confirmBidTitle")}</h2>
            <p>{t("confirmBidMsg")}</p>
            <p><b>{money(amount)} {t("jod")}</b></p>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" type="button" onClick={submit}>{t("yesPlaceBid")}</button>
              <button className="btn btn-ghost" type="button" onClick={() => setConfirm(false)}>{t("cancel")}</button>
            </div>
          </div>
        </div>
      )}
      {autoOpen && (
        <div className="modal" onClick={() => setAutoOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <h2>{t("confirmAutoTitle")}</h2>
            <p>{t("confirmAutoMsg")}</p>
            <label className="searchbar">{t("maxAmount")}<input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} /></label>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn btn-primary" type="button" onClick={() => { setAuto(property.id, max); setAutoOpen(false); }}>{t("enableAutoBid")}</button>
              <button className="btn btn-ghost" type="button" onClick={() => { setAuto(property.id, null); setAutoOpen(false); }}>{t("cancel")}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
