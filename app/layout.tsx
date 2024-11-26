import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carrot Market",
  description: "A modern web clone of Carrot Market",
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
