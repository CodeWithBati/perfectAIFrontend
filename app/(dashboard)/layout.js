import StoreProvider from "../(app)/StoreProvider";
import ThemeProvider from "../src/layout/provider";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SidebarNavigation from "./SidebarNavigation";
import Script from 'next/script';
import '@pathscale/fonts-sansation'
import "./globals.css";

export const metadata = {
  title: {
    default: "MyPerfectAI",
    template: "%s - MyPerfectAI"
  },
  description: "A place to get the prefect AI according to your needs",
}

export default function RootLayout({ children }) {

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
              }}  position="top-right" 
            />
            <div className="flex 2xl:ps-64">
              <div className="flex flex-col min-h-screen flex-grow overflow-x-hidden max-w-full">
                <SidebarNavigation />
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
