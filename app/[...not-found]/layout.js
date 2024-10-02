"use client";
import "./globals.css";
import StoreProvider from "../(app)/StoreProvider";
import ThemeProvider from "../src/layout/provider";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import Navigation from "../(dashboard)/dashboard/navigation/Navigation";
import "@pathscale/fonts-sansation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JTKN6WC9QS"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JTKN6WC9QS');
        `}
      </Script>
      <link rel="icon" type="image/png" href="/images/defaulticon-light.png" />
      <ThemeProvider>
        <body>
          <StoreProvider>
            <Toaster position="top-right" />
            <div className="">
              <div className="flex flex-col min-h-screen flex-grow overflow-x-hidden max-w-full">
                <Navigation />
                <SpeedInsights />
                <main>{children}</main>
              </div>
            </div>
          </StoreProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
