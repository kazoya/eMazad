import type { Metadata, Viewport } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getSiteUrl, site } from "@/lib/config";
import "./globals.css";

const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
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
        <div className="bg-grain min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
