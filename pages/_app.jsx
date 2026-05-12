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

import App from "next/app";
import "../styles/index.css";
import { useLenis } from "../Hooks/useLenis";
import { Analytics } from "@vercel/analytics/react";
import Layout from "@/components/Layout";
import { getLayoutData } from "@/lib/getLayoutData";

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
    <>
      {getLayout(<Component {...pageProps} />)}
      <Analytics />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  let layoutData = {
    navbarData: null,
    navLinks: [],
    footerData: null,
  };

  try {
    layoutData = await getLayoutData();
  } catch (error) {
    console.error("Layout data fetch failed:", error);
  }

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      ...layoutData,
    },
  };
};

export default MyApp;
