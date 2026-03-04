import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor2 from "@/components/CustomCursor2";
import ConditionalInfobar from "@/components/ConditionalInfobar";
import { Analytics } from "@vercel/analytics/next"
import localFont from "next/font/local";
import { Toaster } from "sonner";

const gilton = localFont({ src: "../../public/fonts/GiltonRegular.otf" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://astitva.in";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ASTITVA 2026 | National Level Technical Event",
    template: "%s | ASTITVA 2026",
  },
  description:
    "Official website of ASTITVA 2026, the national level flagship technical event organized by the Department of Electronics & Telecommunication Engineering, DYPIT Pimpri.",
  keywords: [
    "Astitva",
    "Astitva 2026",
    "DYPIT fest",
    "ENTC technical fest",
    "robotics",
    "drones",
    "hackathon",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "ASTITVA 2026 | National Level Technical Event",
    description:
      "Official website of ASTITVA 2026, organized by DYPIT Pimpri.",
    siteName: "ASTITVA 2026",
    images: [
      {
        url: "/astitva_logo_no_bg.png",
        width: 1200,
        height: 630,
        alt: "ASTITVA 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASTITVA 2026 | National Level Technical Event",
    description:
      "Official website of ASTITVA 2026, organized by DYPIT Pimpri.",
    images: ["/astitva_logo_no_bg.png"],
  },
  icons: {
    icon: "/astitva_logo_no_bg.png",
    shortcut: "/astitva_logo_no_bg.png",
    apple: "/astitva_logo_no_bg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor2 />

        <ConditionalInfobar />
        <Analytics />
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster
          toastOptions={{
            className: `${gilton.className} bg-green-500 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-lg uppercase font-bold`,
            style: {
              background: '#22c55e', // green-500
              color: 'black',
              border: '2px solid black',
              borderRadius: '12px',
            }
          }}
        />
      </body>
    </html>
  );
}
