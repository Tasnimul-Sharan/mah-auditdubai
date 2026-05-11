import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Home, Headset, ArrowRight } from "lucide-react";
import Head from "next/head";

export default function Custom404() {
  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const underlineRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    const card = cardRef.current;
    const underline = underlineRef.current;
    const link = linkRef.current;

    if (!page || !card || !underline || !link) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
    );

    gsap.fromTo(
      page.querySelectorAll(".error-float"),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      },
    );

    const handleEnter = () => {
      gsap.to(underline, {
        width: "100%",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(underline, {
        width: "0%",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    link.addEventListener("mouseenter", handleEnter);
    link.addEventListener("mouseleave", handleLeave);

    return () => {
      link.removeEventListener("mouseenter", handleEnter);
      link.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      ref={pageRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0F172A]"
    >
      <Head>
        <title>404 - Page Not Found | MAH Audit Dubai</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="The page you are looking for could not be found. Return to MAH Audit Dubai to explore our audit, accounting, and financial services in Dubai."
        />
        <link rel="canonical" href="https://mah-auditdubai.ae/404" />
      </Head>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,182,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(108,201,255,0.14),transparent_32%)]" />
      <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#38b6ff]/10 blur-3xl" />
      <div className="absolute -bottom-28 -right-28 h-[380px] w-[380px] rounded-full bg-[#6cc9ff]/10 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16 pt-24">
        <div
          ref={cardRef}
          className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-[0_35px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-14"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#38b6ff] via-[#6cc9ff] to-transparent" />

          <div className="error-float mx-auto mb-8 inline-flex items-center rounded-full border border-[#38b6ff]/25 bg-[#38b6ff]/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#6cc9ff]">
            Page Not Found
          </div>

          <h1 className="error-float text-[5.5rem] font-black leading-none tracking-[-0.08em] text-white md:text-[9rem]">
            4<span className="text-[#38b6ff]">0</span>4
          </h1>

          <h2 className="error-float mt-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
            The page you are looking for does not exist.
          </h2>

          <p className="error-float mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
            It may have been moved, deleted, or the URL may be incorrect. Please
            return to the homepage to explore MAH Audit Dubai’s audit,
            accounting, tax, and financial advisory services.
          </p>

          <div className="error-float mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#38b6ff] px-7 py-4 font-bold text-[#0F172A] shadow-[0_18px_50px_rgba(56,182,255,0.25)] transition-all duration-500 hover:-translate-y-1 hover:bg-[#6cc9ff]"
            >
              <Home size={18} />
              Back to Homepage
              <ArrowRight
                size={17}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/contact"
              ref={linkRef}
              className="group relative inline-flex items-center justify-center gap-2 px-2 py-3 text-sm font-semibold text-white/80 transition-colors duration-300 hover:text-[#38b6ff]"
            >
              <Headset
                size={17}
                className="transition-transform duration-500 group-hover:-translate-y-0.5"
              />
              Contact Support
              <span
                ref={underlineRef}
                className="absolute bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#38b6ff]"
              />
            </Link>
          </div>
          <div className="error-float mt-10 border-t border-white/10 pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
              MAH Audit Dubai · Audit · Accounting · Tax · Advisory
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

Custom404.getLayout = (page) => page;
