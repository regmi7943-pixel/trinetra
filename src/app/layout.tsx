import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import SecretKeybind from "@/components/SecretKeybind";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trinetraeyecare.com"),
  title: "Trinetra Eye Care Center | Pokhara",
  description: "Clear Vision, World-Class Care — Right Here in Pokhara.",
  openGraph: {
    title: "Trinetra Eye Care Center",
    description: "Clear Vision, World-Class Care — Right Here in Pokhara.",
    url: "https://trinetraeyecare.com",
    siteName: "Trinetra Eye Care",
    images: [
      {
        url: "/ChatGPT Image May 28, 2026, 03_49_06 PM.png",
        width: 800,
        height: 600,
        alt: "Trinetra Eye Care Center",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trinetra Eye Care Center",
    description: "Clear Vision, World-Class Care — Right Here in Pokhara.",
    images: ["/ChatGPT Image May 28, 2026, 03_49_06 PM.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="antialiased bg-[#FDF8F3] text-[#2C1810] selection:bg-[var(--color-primary)] selection:text-white">
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            {children}
            <SecretKeybind />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
