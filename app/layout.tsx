import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bode-gallery.com"
  ),
  title: {
    default: "Bồ Đề Art — Nghệ Thuật Xương Lá Bồ Đề Cao Cấp",
    template: "%s — Bồ Đề Art",
  },
  description:
    "Tác phẩm xương lá bồ đề thủ công cao cấp. Thư pháp, lá con giáp mạ vàng 24K, tranh để bàn, tranh treo tường. Chế tác tại cố đô Hoa Lư.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-stone-50 text-stone-900 min-h-screen flex flex-col antialiased font-sans selection:bg-amber-100 selection:text-amber-900">
        <Navbar />
        <CartDrawer />

        {/* Padding-top bù cho Navbar + Announcement Bar (~104px) */}
        <main className="flex-1 pt-[104px]">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
