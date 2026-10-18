import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LanguageRoot, SmoothLoader, StageMotion } from "@/components/stage";
import { getSiteUrl, site } from "@/lib/config";
import "./globals.css";

const kufi = localFont({
  src: [
    { path: "./fonts/DroidArabicKufi-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/DroidArabicKufi-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-kufi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name} | مزادات إلكترونية موثوقة في الأردن`,
    template: `%s | ${site.name}`,
  },
  description:
    "إي مزاد: مزادات إلكترونية للعقارات والسيارات والنمر وأرقام الهواتف المميزة والمقتنيات في الأردن، مع تقييم مدعوم بالذكاء الاصطناعي.",
  openGraph: {
    title: `${site.name} — مزادات موثوقة`,
    description: site.tagline,
    locale: "ar_JO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={kufi.variable}>
      <body className="min-h-screen font-sans antialiased">
        <LanguageRoot>
          <SmoothLoader />
          <StageMotion />
          <div className="bg-grain min-h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </LanguageRoot>
      </body>
    </html>
  );
}
