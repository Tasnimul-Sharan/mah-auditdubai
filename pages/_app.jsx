// import "../styles/index.css";
// import { useLenis } from "../Hooks/useLenis";
// import { Analytics } from "@vercel/analytics/react";
// import Layout from "@/components/Layout"; // default layout

// function MyApp({ Component, pageProps }) {
//   useLenis();

//   const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

//   return (
//     <>
//       {getLayout(<Component {...pageProps} />)}
//       <Analytics />
//     </>
//   );
// }

// export default MyApp;

import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import "../styles/index.css";
import { useLenis } from "../Hooks/useLenis";
import Layout from "@/components/Layout";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  { ssr: false },
);

// Self-hosted Poppins (no network request to Google Fonts at build/dev time)
const poppins = localFont({
  src: [
    { path: "../styles/fonts/poppins/poppins-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../styles/fonts/poppins/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../styles/fonts/poppins/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../styles/fonts/poppins/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../styles/fonts/poppins/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "optional",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

function DeferredAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setReady(true), 15000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return ready ? <Analytics /> : null;
}

function MyApp({ Component, pageProps }) {
  useLenis();

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Layout
        navbarData={pageProps.navbarData}
        navLinks={pageProps.navLinks}
        footerData={pageProps.footerData}
      >
        {page}
      </Layout>
    ));

  return (
    <div className={poppins.className}>
      {getLayout(<Component {...pageProps} />)}
      <DeferredAnalytics />
    </div>
  );
}

export default MyApp;
