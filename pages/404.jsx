import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  const underlineRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const underline = underlineRef.current;
    const link = linkRef.current;

    const handleEnter = () => {
      gsap.to(underline, { width: "100%", duration: 0.4, ease: "power2.out" });
    };
    const handleLeave = () => {
      gsap.to(underline, { width: "0%", duration: 0.4, ease: "power2.out" });
    };

    link.addEventListener("mouseenter", handleEnter);
    link.addEventListener("mouseleave", handleLeave);

    return () => {
      link.removeEventListener("mouseenter", handleEnter);
      link.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section className="w-full relative">
      <Head>
        <title>404 - Page Not Found | MAH Audit Dubai</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="The page you are looking for could not be found. Return to MAH Audit Dubai to explore our audit, accounting, and financial services in Dubai."
        />
        <link rel="canonical" href="https://mah-auditdubai.ae/404" />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center text-center text-black px-4">
        <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>

        <p className="text-lg mb-6 max-w-xl">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted. Please check the URL or return to the homepage to explore our audit, accounting, and financial services in Dubai.
        </p>

        <div className="relative inline-block">
          <Link href="/" legacyBehavior>
            <a ref={linkRef} className="text-xl font-semibold relative z-10">
              ← Back to Homepage
            </a>
          </Link>
          <span ref={underlineRef} className="hover-line"></span>
        </div>
      </div>
    </section>
  );
}
