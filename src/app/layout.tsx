import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FontAwesomeCDN from "@/components/FontAwesomeCDN";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Creative Portfolio",
  description: "A visually stunning portfolio showcase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <FontAwesomeCDN />
      </head>
      <body className={inter.className + " antialiased bg-background text-foreground"}>
        {children}
      </body>
    </html>
  );
}