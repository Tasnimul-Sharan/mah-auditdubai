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
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import "../styles/index.css";
import { useLenis } from "../Hooks/useLenis";
import Layout from "@/components/Layout";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  { ssr: false },
);

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "optional",
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
