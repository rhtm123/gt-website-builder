import "@/styles/globals.css";

// pages/_app.js

import { DomProvider } from "@/context/DomContext";
import { ElementStyleProvider } from "@/context/ElementStyleContext";
import { SessionProvider } from "next-auth/react"

import { ThemeProvider } from 'next-themes'
import NextNProgress from 'nextjs-progressbar';


// import Footer from "@/components/Footer";

import { useEffect } from 'react';
import Script from 'next/script';


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YSWYGRTZ73');
  }, []);


  return (
    <>
    <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-YSWYGRTZ73"
      />
      
    <ThemeProvider
    enableSystem = {false}
    
    >
    <NextNProgress />
    <SessionProvider>
    <DomProvider>
      <ElementStyleProvider>
        <Component {...pageProps} />

      </ElementStyleProvider>
    </DomProvider>
    </SessionProvider>
    </ThemeProvider>
    </>

  );
}

export default MyApp;
