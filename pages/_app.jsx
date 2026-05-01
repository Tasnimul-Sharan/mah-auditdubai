import "../styles/index.css";
import { useLenis } from "../Hooks/useLenis";
import { Analytics } from "@vercel/analytics/react";
import Layout from "@/components/Layout"; // default layout

function MyApp({ Component, pageProps }) {
  useLenis();

  // 🔑 If page defines getLayout → use it
  // 🔑 Else → wrap with default Layout (Navbar + Footer)
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <Analytics />
    </>
  );
}

export default MyApp;
