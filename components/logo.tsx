import Link from "next/link";

export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7e2a6" />
          <stop offset=".5" stopColor="#d4a94a" />
          <stop offset="1" stopColor="#a8802b" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0b1220" />
      <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" fill="none" stroke="url(#lg)" strokeOpacity=".5" />
      <g transform="rotate(-40 32 30)">
        <rect x="20" y="16" width="24" height="11" rx="3" fill="url(#lg)" />
        <rect x="29.5" y="26" width="5" height="22" rx="2.5" fill="url(#lg)" />
      </g>
      <rect x="14" y="48" width="26" height="5" rx="2.5" fill="url(#lg)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="إي مزاد — الرئيسية">
      <LogoMark />
      <span className="leading-none">
        <span className="block font-display text-xl text-white">إي مزاد</span>
        <span className="block text-[10px] tracking-[0.3em] text-gold/80">eMAZAD</span>
      </span>
    </Link>
  );
}
