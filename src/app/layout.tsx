import type { Metadata } from "next";
import { Archivo, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/portfolio/SmoothScroll";
import FrameLines from "@/components/portfolio/FrameLines";
import LoadIntro from "@/components/portfolio/LoadIntro";
import MenuPill from "@/components/portfolio/MenuPill";
import GreetingCursor from "@/components/portfolio/GreetingCursor";

// Display: Archivo (wide/heavy free stand-in for Trobika). Body: Inter Tight
// (free stand-in for Aeonik). Both variable fonts via next/font/google.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Suhair Sayed — Content Strategist",
  description:
    "Portfolio of Suhair Sayed, a content strategist and digital marketer based in Exeter, UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${interTight.variable} antialiased`}>
        <SmoothScroll />
        <FrameLines />
        {children}
        <MenuPill />
        <LoadIntro />
        <GreetingCursor />
      </body>
    </html>
  );
}
