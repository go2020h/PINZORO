import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "../components/ClientLayout";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "PINZORO",
  description: "ONE SEAT, ONE LAUGH - 美味しいお料理と笑顔のあるお店へ。お客様一人ひとりに笑顔をお届けします。",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: "/apple-icon.png",
  },
  // OGP設定
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://pinzoro.jp",
    title: "PINZORO",
    description: "ONE SEAT ONE LAUGH - 美味しいお料理と笑顔のあるお店へ。お客様一人ひとりに笑顔をお届けします。",
    siteName: "PINZORO",
    images: [
      {
        url: "/icon.jpg",
        width: 1200,
        height: 630,
        alt: "PINZORO"
      }
    ]
  },
  // Twitter Card設定
  twitter: {
    card: "summary_large_image",
    title: "PINZORO",
    description: "ONE SEAT ONE LAUGH - 美味しいお料理と笑顔のあるお店へ。お客様一人ひとりに笑顔をお届けします。",
    images: ["/icon.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
