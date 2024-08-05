import "@/styles/globals.css";

// pages/_app.js

import { DomProvider } from "@/context/DomContext";
import { ElementStyleProvider } from "@/context/ElementStyleContext";

function MyApp({ Component, pageProps }) {
  return (
    <DomProvider>
      <ElementStyleProvider>
        <Component {...pageProps} />
      </ElementStyleProvider>
    </DomProvider>
  );
}

export default MyApp;
