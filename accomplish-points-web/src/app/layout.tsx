import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accomplish Points Consulting",
  description: "Accomplish Points Consulting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
