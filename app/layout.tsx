import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pionex Growth Lab",
  description:
    "Four AI-powered tools I'd ship in week one as your AI-Powered Growth Manager.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-serif text-stone-100 antialiased">{children}</body>
    </html>
  );
}
