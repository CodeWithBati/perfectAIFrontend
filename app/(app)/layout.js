"use client";

import "./globals.css";
import HeaderNew from "@/app/src/layout/Header/HeaderNew";
import Footer from "@/app/src/layout/FooterNew";
import AuthFooter from "../src/components/form/AuthFooter";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeProvider from "../src/layout/provider";
import Script from 'next/script';
import '@pathscale/fonts-sansation'
import { usePathname } from "next/navigation";



const isAuthRoute = (pathname) => {
  return ["/login", "/register", "/forget-password", "/registerCreate", "/registerCreatePartner", "/reset-password", "/reset-password-success", "/verify-email", "/forget-password-success", ].includes(pathname);
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  console.log(pathname)
  const isAuthPage = isAuthRoute(pathname);

  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JTKN6WC9QS"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive">
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
            <Toaster toastOptions={{
                className: 'dark:bg-gray-800 bg-white dark:border-gray-600 border-gray-200 dark:text-white text-black',
                style: {
                  padding: '16px',
                },
              }}  position="top-right" />
            <div className="flex flex-col min-h-screen overflow-x-hidden max-w-full">
              {!isAuthPage && <HeaderNew />}
                {children}
                <SpeedInsights />
                {!isAuthPage && <Footer />}
            </div>
          </StoreProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
