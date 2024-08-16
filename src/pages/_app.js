import "@/styles/globals.css";

// pages/_app.js

import { DomProvider } from "@/context/DomContext";
import { ElementStyleProvider } from "@/context/ElementStyleContext";
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
    <DomProvider>
      <ElementStyleProvider>
        <Component {...pageProps} />
      </ElementStyleProvider>
    </DomProvider>
    </SessionProvider>
  );
}

export default MyApp;
