// layout.tsx - Updated Root Layout
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import StoreProvider from "./storeProvider";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "MERN Invoice",
  description: "Professional invoicing made easy",
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
        <StoreProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
            <Navbar />
            <main className="relative">{children}</main>
            {/* <Footer /> */}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
