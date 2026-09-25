import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "BaggaFarms | Operations",
  description: "Commercial Poultry Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans antialiased dark`}>
      <body className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
        {children}
      </body>
    </html>
  );
}
