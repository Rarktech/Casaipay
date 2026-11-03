import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE = 'https://casaipay.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'CASAIPAY — Send online. Claim offline. Powered by identity.',
  description:
    "Biometric identity and payment infrastructure for Nigeria's informal economy. Send, receive and collect cash using your face — no card, no bank account, no smartphone required.",
  keywords: [
    'CASAIPAY', 'biometric payments Nigeria', 'financial inclusion', 'agent banking',
    'cash pickup', 'face ID payments', 'informal economy', 'fintech Nigeria',
  ],
  authors: [{ name: 'CASAIPAY' }],
  icons: { icon: '/icon.svg' },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'CASAIPAY',
    title: 'CASAIPAY — Powered by identity',
    description:
      "Biometric identity and payment infrastructure for Nigeria's informal economy.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CASAIPAY — Powered by identity',
    description:
      "Biometric identity and payment infrastructure for Nigeria's informal economy.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F7F6F3',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
