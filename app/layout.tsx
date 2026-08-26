import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PUR Alpha",
  description: "Garde et accompagnement à domicile d'enfants en situation de handicap",
  icons: {
    icon: "/images/logo_pur_alpha.png",
    apple: "/images/logo_pur_alpha.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const isGtm = gaId?.startsWith("GTM-");

  return (
    <html lang="fr" className={`${poppins.variable}`}>
      <head>
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
          `}
        </Script>
      </head>
      <body className="font-poppins bg-background text-foreground antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
      {gaId && (
        isGtm ? (
          <GoogleTagManager gtmId={gaId || "G-S60574HD6J"} />
        ) : (
          <GoogleAnalytics gaId={gaId || "G-S60574HD6J"} />
        )
      )}
    </html>
  );
}
