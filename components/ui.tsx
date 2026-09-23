import Link from "next/link";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto max-w-7xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-gold-2">
      <span className="size-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl space-y-3">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="font-display text-3xl leading-tight text-white md:text-4xl">{title}</h2>
        {description && <p className="text-base leading-8 text-mist">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="text-sm text-gold-2 underline-offset-8 hover:underline">
          {action.label} ←
        </Link>
      )}
    </div>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return (
    <Container className="pb-10 pt-14 md:pt-20">
      <div className="rise max-w-3xl space-y-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display text-4xl leading-[1.25] text-white md:text-5xl">{title}</h1>
        <p className="text-lg leading-8 text-mist">{description}</p>
      </div>
    </Container>
  );
}

export function DemoNote({ className }: { className?: string }) {
  return (
    <p className={cn("rounded-2xl border border-line bg-white/[0.03] px-4 py-3 text-xs leading-6 text-mist", className)}>
      هذه نسخة عرض. الأسعار والمزايدات هنا عينات للتوضيح؛ المزايدة الملزمة والدفع
      وإعلان الفائز تتم على المنصة الرسمية وبعد تحقق بشري.
    </p>
  );
}
