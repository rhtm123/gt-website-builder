import "@/styles/globals.css";

// pages/_app.js

import { DomProvider } from "@/context/DomContext";
import { ElementStyleProvider } from "@/context/ElementStyleContext";
import { SessionProvider } from "next-auth/react"

import { ThemeProvider } from 'next-themes'

import Footer from "@/components/Footer";



function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
    <SessionProvider>
    <DomProvider>
      <ElementStyleProvider>
        <Component {...pageProps} />

      </ElementStyleProvider>
    </DomProvider>
    </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
