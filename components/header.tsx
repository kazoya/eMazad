"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/config";

const nav = [
  { href: "/", label: "الرئيسية" },
  { href: "/auctions", label: "المزادات" },
  { href: "/appraise", label: "التقييم الذكي" },
  { href: "/sell", label: "اعرض مزادك" },
  { href: "/packages", label: "الباقات" },
  { href: "/about", label: "من نحن" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || open ? "glass shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)]" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                isActive(item.href) ? "bg-white/10 text-gold-2" : "text-mist hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={waLink("مرحباً، أريد الاستفسار عن المزادات في إي مزاد")}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gold-2 sm:flex"
          >
            <MessageCircle className="size-4" />
            تواصل واتساب
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line text-white lg:hidden"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mx-4 mb-3 grid gap-1 rounded-2xl border border-line bg-ink-2 p-2 lg:hidden" aria-label="قائمة الجوال">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn("rounded-xl px-4 py-3 text-sm", isActive(item.href) ? "bg-white/10 text-gold-2" : "text-mist")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
