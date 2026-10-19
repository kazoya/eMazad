import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import { Footer, Header, SiteProvider } from "@/components/site";
import { getSiteUrl } from "@/lib/config";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Emazadak | مزادات العقارات الرقمية في الأردن",
    template: "%s | Emazadak",
  },
  description: "منصة الأردن الموثوقة لمزادات العقارات المباشرة والصفقات المباشرة — موثقة وشفافة وآمنة.",
};

export const viewport: Viewport = { themeColor: "#194B3F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable} data-theme="light">
      <body className="min-h-screen antialiased">
        <SiteProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
