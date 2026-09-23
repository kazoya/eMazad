import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] place-items-center text-center">
      <div className="space-y-5">
        <div className="gold-text font-display text-8xl">404</div>
        <p className="text-mist">هذا المزاد غير موجود أو انتهى.</p>
        <Link href="/auctions" className="inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink">
          تصفّح المزادات المفتوحة
        </Link>
      </div>
    </Container>
  );
}
