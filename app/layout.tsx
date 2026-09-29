import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hygron",
  description: "Know a room's mold risk before your guest does.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
