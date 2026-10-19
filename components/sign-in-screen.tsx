"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/components/site";

export function SignInScreen() {
  const { t, lang, signIn } = useSite();
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");
  const en = lang === "en";
  function submit(event: React.FormEvent) {
    event.preventDefault();
    signIn();
    router.push("/profile");
  }
  return (
    <section className="section">
      <div className="wrap narrow">
        <div className="panel" style={{ display: "grid", gap: 12 }}>
          <h1 style={{ margin: 0 }}>{mode === "in" ? t("welcomeBack") : t("createAccount")}</h1>
          <p className="muted">{t("welcomeBody")}</p>
          <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
            <label className="searchbar">{t("email")}<input required placeholder="zaid@emazadak.com" /></label>
            <label className="searchbar">{t("password")}<input required type="password" minLength={4} /></label>
            <button className="btn btn-primary" type="submit">{mode === "in" ? t("signIn") : t("createAccount")}</button>
          </form>
          <button className="btn btn-ghost" type="button" onClick={() => setMode(mode === "in" ? "up" : "in")}>
            {mode === "in" ? t("createAccount") : t("signIn")}
          </button>
          <button className="btn btn-ghost" type="button" onClick={() => router.push("/auctions")}>{t("continueGuest")}</button>
          <p className="muted">{en ? "This is a demo sign-in. Any password of 4+ characters opens the sample account." : "تسجيل تجريبي. أي كلمة مرور من 4 أحرف تفتح الحساب النموذجي."}</p>
        </div>
      </div>
    </section>
  );
}
