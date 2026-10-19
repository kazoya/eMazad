"use client";

import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { bidOf, formatLeft, useSite, useTick } from "./site";
import { cover, priceOf, type Property } from "@/lib/ema";

export function statusKey(property: Property) {
  if (property.status === "direct") return "stDirect";
  if (property.status === "ending") return "stEnding";
  if (property.status === "coming") return "stComing";
  if (property.status === "finished") return "stFinished";
  return "stLive";
}

export function PropertyCard({ property }: { property: Property }) {
  const { t, L, lang, isWatched, toggleWatch, bids } = useSite();
  useTick();
  const bid = bidOf(property, bids);
  const direct = property.status === "direct";
  return (
    <article className="card" style={{ position: "relative" }}>
      <Link href={`/auctions/${property.id}`} className="card-media">
        <img src={cover(property)} alt={L(property.title)} />
        <div className="ovl-top">
          <span className={`pill pill-${property.status}`}>{t(statusKey(property))}</span>
        </div>
      </Link>
      <button className={isWatched(property.id) ? "fav on" : "fav"} type="button" onClick={() => toggleWatch(property.id)} aria-label="watch" style={{ position: "absolute", top: 12, insetInlineEnd: 12 }}>
        <Heart size={18} fill={isWatched(property.id) ? "currentColor" : "none"} />
      </button>
      <div className="card-body">
        <div className="card-toprow">
          <div className="card-loc"><MapPin size={14} /> {L(property.sub)}</div>
          <span className="card-ref">{property.ref}</span>
        </div>
        <h3 className="card-title"><Link href={`/auctions/${property.id}`}>{L(property.title)}</Link></h3>
        <div className="card-stats">
          <div className="card-stat"><span>{t("beds")}</span><b>{property.beds || "—"}</b></div>
          <div className="card-stat"><span>{t("baths")}</span><b>{property.baths || "—"}</b></div>
          <div className="card-stat"><span>{t("areaLabel")}</span><b>{property.area} m²</b></div>
        </div>
        <div className="card-foot" style={{ marginTop: 14 }}>
          <div>
            <div className="muted" style={{ fontSize: 12 }}>{direct ? t("askingPrice") : t("currentBid")}</div>
            <div className="card-price">{(bid.current || priceOf(property)).toLocaleString("en-US")} <span className="cur">{t("jod")}</span></div>
          </div>
          <Link href={direct || property.status === "finished" || property.status === "coming" ? `/auctions/${property.id}` : `/live/${property.id}`} className="btn btn-ghost btn-sm">
            {direct || property.status === "finished" || property.status === "coming" ? t("viewDetails") : t("placeBid")}
          </Link>
        </div>
        {property.status !== "direct" && property.status !== "finished" && (
          <div className={`card-timer ct-${property.status}`}>
            <span>{property.status === "coming" ? t("startsInShort") : t("endsIn")}</span>
            <b>{formatLeft(property.status === "coming" && property.startsIn ? property.startsIn : property.endsAt, lang)}</b>
          </div>
        )}
      </div>
    </article>
  );
}
