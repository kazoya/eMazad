import Link from "next/link";

export function LogoMark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 55.52 66.991" className={className} aria-hidden>
      <defs>
        <linearGradient id="emazadak-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.16" stopColor="#D4A041" />
          <stop offset="0.39" stopColor="#FBE67B" />
          <stop offset="0.54" stopColor="#EEC254" />
          <stop offset="0.71" stopColor="#F7D14E" />
          <stop offset="0.87" stopColor="#D4A041" />
        </linearGradient>
      </defs>
      <path fill="currentColor" d="M 28.209 59.197 L 28.209 66.991 L 55.52 49.387 L 55.52 0 L 27.66 17.279 L 0 0 L 0 49.387 L 5.61 52.804 L 5.61 11.182 L 27.758 24.631 L 49.91 11.182 L 49.91 45.04 L 49.91 45.04 Z" />
      <g transform="translate(11.22, 21.122)">
        <path fill="url(#emazadak-gold)" d="M 5.606 32.072 L 5.606 25.473 L 17.378 31.426 L 32.991 21.647 L 33.081 14.291 L 17.378 24.56 L 5.876 18.026 L 5.61 11.182 L 17.378 18.026 L 32.964 7.33 L 33.077 0 L 17.378 10.551 L 0 0 L 0.137 35.877 L 16.974 45.878 L 16.989 45.87 L 16.989 38.075 L 5.606 32.072 Z" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="nav-logo" aria-label="Emazadak">
      <LogoMark className="logo-mark" />
      <span className="word">
        EMAZADAK
        <small>PropTech Market Leader</small>
      </span>
    </Link>
  );
}
