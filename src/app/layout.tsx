import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CursorDot from "@/components/ui/cursor-dot";
import ScrollProgress from "@/components/ui/scroll-progress";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mohamed Gous Sayed",
  description: "Personal portfolio of Mohamed Gous Sayed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ScrollProgress />
        <CursorDot />
      </body>
    </html>
  );
}
