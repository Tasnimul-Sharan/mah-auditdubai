import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Layout({
  children,
  footerData = null,
  navbarData = null,
  navLinks = [],
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar navbarData={navbarData} navLinks={navLinks} />

      <main className="flex-1">{children}</main>

      <Footer data={footerData} />

      <ScrollToTopButton />
    </div>
  );
}