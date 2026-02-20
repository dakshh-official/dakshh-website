import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { images } from "@/constants/images";
// import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://www.dakshh-hitk.com"),
  title: "DAKSHH Tech Fest 2026",
  description: "Annual Techno-Management Fest of HITK",
  icons: {
    icon: images.Dakshh_Logo,
    apple: images.Dakshh_Logo,
  },
  openGraph: {
    title: "DAKSHH Tech Fest 2026",
    description: "Annual Techno-Management Fest of HITK",
    url: "https://www.dakshh-hitk.com",
    siteName: "DAKSHH 2026",
    images: [
      {
        url: "/og.jpeg",
        width: 1200,
        height: 630,
        alt: "DAKSHH Tech Fest 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DAKSHH Tech Fest 2026",
    description: "Annual Techno-Management Fest of HITK",
    images: ["/og.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased`}
        style={{ backgroundColor: '#000' }}
      >
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id="wobbly-border" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence baseFrequency="0.03 0.05" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="wobbly-text" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence baseFrequency="0.02 0.03" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
