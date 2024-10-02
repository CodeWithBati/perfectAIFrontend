import "./globals.css";
import HeaderNew from "@/app/src/layout/Header/HeaderNew";
import Footer from "@/app/src/layout/Footer";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeProvider from "../src/layout/provider";
import Script from 'next/script';
import '@pathscale/fonts-sansation'


export const metadata = {
  title: {
    default: "MyPerfectAI - Instant, Personalized AI Tool Recommendations",
    template: "%s - MyPerfectAI"
  },
  description: "Our AI chatbot provides accurate, task-specific AI tool & app recommendations. Also, explore the best AI tools in the MyPerfectAI Directory.",
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
              }}  position="top-right" />
            <div className="flex flex-col min-h-screen overflow-x-hidden max-w-full">
              {/* <HeaderNew /> */}
              {/* <main className="flex flex-grow mt-14 bg-slate-200 justify-center dark:bg-slate-900 "> */}
                {children}
                <SpeedInsights />
              {/* </main> */}
              {/* <Footer /> */}
            </div>
          </StoreProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
