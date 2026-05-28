import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { AppointmentPopup } from "@/components/appointment-popup";
import { CurtainLoader } from "@/components/curtain-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trinetra Eye Care Center | Pokhara",
  description: "Clear Vision, World-Class Care — Right Here in Pokhara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-[#FDF8F3] text-[#2C1810] selection:bg-[var(--color-primary)] selection:text-white">
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <CurtainLoader />
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
            <WhatsAppFloat />
            <AppointmentPopup />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
