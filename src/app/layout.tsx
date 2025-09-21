import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova Batista",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"/>
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {children}
      </body>
    </html>
  );
}
