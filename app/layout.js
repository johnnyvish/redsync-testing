import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RedSync",
  description: "Personalized health tracker assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>RedSync</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
