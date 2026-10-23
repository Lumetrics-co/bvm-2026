import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins, Urbanist } from "next/font/google";
import Script from "next/script";
import AppProviders from "@/components/providers/AppProviders";
import SkipLink from "@/components/layout/SkipLink";
import CookieConsentBanner from "@/components/layout/CookieConsentBanner";
import RegistrationModal from "@/components/layout/RegistrationModal";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-urbanist",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bharatiyavyaparmahotsav.com";
const DESCRIPTION =
  "World's Largest Indian Business Expo celebrating the Indian Common Market. 12-15 August 2026 at Bharat Mandapam, New Delhi.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bharatiya Vyapar Mahotsav 2026",
  description: DESCRIPTION,
  keywords: [
    "BVM 2026",
    "Bharatiya Vyapar Mahotsav",
    "Indian Trade Fair",
    "Swadeshi Products",
    "Make in India",
    "Atmanirbhar Bharat",
  ],
  other: { google: "notranslate" },
  openGraph: {
    title: "Bharatiya Vyapar Mahotsav 2026",
    description: DESCRIPTION,
    images: ["/images/meta-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharatiya Vyapar Mahotsav 2026",
    description: DESCRIPTION,
    images: ["/images/meta-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const CONSENT_DEFAULTS = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  var stored = 'denied';
  try { if (localStorage.getItem('bvm-cookie-consent') === 'accepted') stored = 'granted'; } catch (e) {}
  gtag('consent', 'default', {
    ad_storage: stored, ad_user_data: stored, ad_personalization: stored, analytics_storage: stored,
    functionality_storage: 'granted', security_storage: 'granted'
  });
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" translate="no" className={`${poppins.variable} ${playfair.variable} ${urbanist.variable}`}>
      <body className="antialiased">
        {GTM_ID && (
          <>
            <Script id="gtm-consent" strategy="beforeInteractive">
              {CONSENT_DEFAULTS}
            </Script>
            <Script id="gtm-init" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
          </>
        )}
        <AppProviders>
          <SkipLink />
          {children}
          <CookieConsentBanner />
          <RegistrationModal />
          <RevealOnScroll />
        </AppProviders>
      </body>
    </html>
  );
}
