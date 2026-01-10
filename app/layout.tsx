import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito, Amarna, Saira, Comfortaa, Kanit, Quicksand, Raleway, Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const amarna = Amarna({
  variable: "--font-amarna",
  subsets: ["latin"],
  adjustFontFallback: false, 
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800",],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800",],
});


export const metadata: Metadata = {
  title: "WayStone",
  description: "An Application for crossing roads with new people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${nunito.variable}
          ${amarna.variable}
          ${kanit.variable}
          ${comfortaa.variable}
          ${quicksand.variable}
          ${raleway.variable}
          ${saira.variable}
          ${orbitron.variable}
          antialiased`}
      >
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
