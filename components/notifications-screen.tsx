"use client";

import Link from "next/link";
import { notifications } from "@/lib/ema";
import { Guard, useSite } from "@/components/site";

export function NotificationsScreen() {
  const { t, L, read, markRead } = useSite();
  const unread = (id: string, initial: boolean) => initial && !read.includes(id);
  return (
    <Guard>
      <section className="section">
        <div className="wrap narrow">
          <div className="sh">
            <h1 className="page-title">{t("notifications")}</h1>
            <button className="btn btn-ghost btn-sm" type="button" onClick={() => markRead()}>{t("markAllRead")}</button>
          </div>
          {["today", "earlier"].map((group) => (
            <div key={group} style={{ marginBottom: 18 }}>
              <h3>{t(group)}</h3>
              <div className="steps">
                {notifications.filter((item) => item.group === group).map((item) => (
                  <Link key={item.id} href={`/auctions/${item.pid}`} className="panel" onClick={() => markRead(item.id)} style={{ display: "block", outline: unread(item.id, item.unread) ? "1px solid var(--gold)" : undefined }}>
                    <b>{L(item.title)}</b>
                    <p className="muted" style={{ margin: "6px 0" }}>{L(item.body)}</p>
                    <span className="muted">{L(item.time)}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Guard>
  );
}
