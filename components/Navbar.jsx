// "use client";

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import gsap from "gsap";
// import { supabaseServer } from "@/lib/supabaseServer";

// import {
//   FaMapMarkerAlt,
//   FaEnvelope,
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaPhoneAlt,
//   FaYoutube,
// } from "react-icons/fa";

// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const [data, setData] = useState(null);
//   const [links, setLinks] = useState([]);

//   const menuRef = useRef(null);
//   const navRef = useRef(null);
//   const topbarRef = useRef(null);

//   // ================= FETCH =================
//   useEffect(() => {
//     const fetchData = async () => {
//       const { data } = await supabaseServer.from("navbar").select("*").single();

//       const { data: linksData } = await supabaseServer
//         .from("nav_links")
//         .select("*")
//         .order("order_no", { ascending: true });

//       setData(data);
//       setLinks(linksData || []);
//     };

//     fetchData();
//   }, []);

//   // ================= SCROLL =================
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ================= NAV ANIMATION =================
//   useEffect(() => {
//     if (!navRef.current) return;

//     const topbarHeight = 60;

//     const handleAnimation = () => {
//       if (window.innerWidth < 1024) {
//         gsap.set(navRef.current, { y: 0 });
//       } else {
//         // gsap.to(navRef.current, {
//         //   y: isScrolled ? 0 : topbarHeight,
//         //   duration: 0.2,
//         //   ease: "power3.inOut",
//         // });

//         gsap.to(navRef.current, {
//           y: isScrolled ? 0 : topbarHeight,
//           duration: 0.4,
//           ease: "power4.out",
//         });
//       }
//     };

//     handleAnimation();
//     window.addEventListener("resize", handleAnimation);

//     return () => window.removeEventListener("resize", handleAnimation);
//   }, [isScrolled]);

//   // ================= TOPBAR HIDE =================
//   // useEffect(() => {
//   //   if (!topbarRef.current) return;

//   //   gsap.to(topbarRef.current, {
//   //     y: isScrolled ? "-100%" : "0%",
//   //     duration: 0.3,
//   //     ease: "power3.inOut",
//   //   });
//   // }, [isScrolled]);

//   // ================= MOBILE MENU =================
//   useEffect(() => {
//     const menu = menuRef.current;
//     const items = menu?.querySelectorAll("li");

//     if (isMenuOpen) {
//       gsap.to(menu, {
//         width: "100vw",
//         height: "100vh",
//         opacity: 1,
//         duration: 1,
//         ease: "power4.out",
//       });

//       gsap.fromTo(
//         items,
//         { x: "-100%", opacity: 0 },
//         {
//           x: "0%",
//           opacity: 1,
//           stagger: 0.1,
//           duration: 0.6,
//           ease: "power4.out",
//         },
//       );
//     } else {
//       gsap.to(menu, {
//         width: 0,
//         height: 0,
//         opacity: 0,
//         duration: 0.4,
//       });
//     }
//   }, [isMenuOpen]);

//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
//   }, [isMenuOpen]);

//   if (!data) return null;

//   const menuLinks = links.filter(
//     (item) => item.name.toLowerCase() !== "contact",
//   );

//   return (
//     <header className="w-full">
//       {/* ================= TOPBAR ================= */}
//       <div
//         ref={topbarRef}
//         className="hidden lg:block fixed top-0 left-0 w-full z-40 bg-secondary text-white py-6"
//       >
//         <div className="custom-container mx-auto flex items-center justify-between">
//           <div className="flex flex-1 items-center gap-6 text-base text-white/75">
//             <p className="flex items-center gap-2 border-r pr-4">
//               <FaMapMarkerAlt className="text-primary" />
//               {data.address}
//             </p>

//             <p className="flex items-center gap-2 border-r pr-4 group cursor-pointer">
//               <FaEnvelope className="transition duration-300 group-hover:text-primary text-primary" />
//               <a
//                 href={`mailto:${data.email}`}
//                 className="transition duration-300 group-hover:text-primary"
//               >
//                 {data.email}
//               </a>
//             </p>

//             <p className="flex items-center gap-2 group cursor-pointer">
//               <FaPhoneAlt className="transition duration-300 group-hover:text-primary text-primary" />
//               <a
//                 href={`tel:${data.phone}`}
//                 className="transition duration-300 group-hover:text-primary"
//               >
//                 {data.phone}
//               </a>
//             </p>
//           </div>

//           {/* SOCIAL */}
//           <div className="flex gap-4">
//             {data.facebook && (
//               <Link href={data.facebook} target="_blank" className="text-base">
//                 <FaFacebookF className="transition duration-300 hover:text-secondary hover:scale-110" />
//               </Link>
//             )}

//             {data.youtube && (
//               <Link href={data.youtube} target="_blank" className="text-base">
//                 <FaYoutube className="transition duration-300 hover:text-secondary hover:scale-110" />
//               </Link>
//             )}

//             {data.linkedin && (
//               <Link href={data.linkedin} target="_blank" className="text-base">
//                 <FaLinkedinIn className="transition duration-300 hover:text-secondary hover:scale-110" />
//               </Link>
//             )}

//             {data.instagram && (
//               <Link href={data.instagram} target="_blank" className="text-base">
//                 <FaInstagram className="transition duration-300 hover:text-secondary hover:scale-110" />
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ================= MAIN NAV ================= */}
//       <nav
//         ref={navRef}
//         className="fixed top-0 left-0 w-full z-50 bg-white transition-all duration-500"
//       >
//         <div className="custom-container mx-auto md:h-24 h-20 flex items-center justify-between">
//           {/* LEFT - LOGO */}
//           <Link href="/">
//             <Image
//               src={data.logo || "/logo.png"}
//               alt="Logo"
//               width={1200}
//               height={1200}
//               className="md:h-28 h-20 w-auto object-contain"
//             />
//           </Link>

//           {/* RIGHT SIDE */}
//           <div className="hidden lg:flex items-center gap-10">
//             {/* MENU */}
//             <ul className="flex items-center gap-8 font-semibold text-Secound_primary">
//               {menuLinks.map((item) => (
//                 <li key={item.id} className="relative group">
//                   <Link
//                     href={item.path}
//                     className="hover:text-primary transition"
//                   >
//                     {item.name}
//                   </Link>

//                   <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"></span>
//                 </li>
//               ))}
//             </ul>

//             {/* BUTTON */}
//             <Link href="/contact">
//               <button className="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-secondary transition">
//                 Contact Us
//               </button>
//             </Link>
//           </div>

//           {/* MOBILE BTN */}
//           <button
//             className="lg:hidden text-3xl text-primary z-50"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
//           </button>
//         </div>
//       </nav>

//       {/* ================= MOBILE MENU ================= */}
//       <div
//         ref={menuRef}
//         className="fixed top-0 left-0 w-0 h-0 opacity-0 bg-primary text-white z-30 overflow-hidden flex flex-col justify-center items-center lg:hidden"
//       >
//         <ul className="flex flex-col gap-8 text-2xl font-semibold text-center">
//           {menuLinks.map((item) => (
//             <li key={item.id}>
//               <Link href={item.path} onClick={() => setIsMenuOpen(false)}>
//                 {item.name}
//               </Link>
//             </li>
//           ))}

//           <li>
//             <Link
//               href="/contact"
//               onClick={() => setIsMenuOpen(false)}
//               className="bg-white text-primary px-6 py-3 rounded-lg"
//             >
//               Contact Us
//             </Link>
//           </li>
//         </ul>

//         <div className="flex gap-6 mt-12 text-xl">
//           {data.facebook && <FaFacebookF />}
//           {data.linkedin && <FaLinkedinIn />}
//           {data.instagram && <FaInstagram />}
//           {data.youtube && <FaYoutube />}
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { supabaseServer } from "@/lib/supabaseServer";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";

import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [data, setData] = useState(null);
  const [links, setLinks] = useState([]);

  const menuRef = useRef(null);
  const drawerRef = useRef(null);
  const navRef = useRef(null);
  const topbarRef = useRef(null);

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabaseServer.from("navbar").select("*").single();

      const { data: linksData } = await supabaseServer
        .from("nav_links")
        .select("*")
        .order("order_no", { ascending: true });

      setData(data);
      setLinks(linksData || []);
    };

    fetchData();
  }, []);

  // ================= SCROLL =================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ================= NAV ANIMATION =================
  useEffect(() => {
    if (!navRef.current) return;

    const topbarHeight = 60;

    const handleAnimation = () => {
      if (window.innerWidth < 1024) {
        gsap.set(navRef.current, { y: 0 });
      } else {
        gsap.to(navRef.current, {
          y: isScrolled ? 0 : topbarHeight,
          duration: 0.4,
          ease: "power4.out",
        });
      }
    };

    handleAnimation();
    window.addEventListener("resize", handleAnimation);

    return () => window.removeEventListener("resize", handleAnimation);
  }, [isScrolled]);

  // ================= PREMIUM MOBILE MENU =================
  useEffect(() => {
    const menu = menuRef.current;
    const drawer = drawerRef.current;
    const items = drawer?.querySelectorAll("[data-menu-item]");

    if (!menu || !drawer) return;

    if (isMenuOpen) {
      gsap.set(menu, {
        pointerEvents: "auto",
      });

      gsap.to(menu, {
        opacity: 1,
        duration: 0.28,
        ease: "power3.out",
      });

      gsap.fromTo(
        drawer,
        {
          x: "100%",
          opacity: 0,
          scale: 0.98,
        },
        {
          x: "0%",
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "power4.out",
        },
      );

      gsap.fromTo(
        items,
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.055,
          delay: 0.12,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(drawer, {
        x: "100%",
        opacity: 0,
        scale: 0.98,
        duration: 0.38,
        ease: "power3.inOut",
      });

      gsap.to(menu, {
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(menu, {
            pointerEvents: "none",
          });
        },
      });
    }
  }, [isMenuOpen]);

  // ================= BODY LOCK =================
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  if (!data) return null;

  const menuLinks = links.filter(
    (item) => item.name.toLowerCase() !== "contact",
  );

  return (
    <header className="w-full">
      {/* ================= TOPBAR ================= */}
      <div
        ref={topbarRef}
        className="hidden lg:block fixed top-0 left-0 w-full z-40 bg-secondary text-white py-6"
      >
        <div className="custom-container mx-auto flex items-center justify-between">
          <div className="flex flex-1 items-center gap-6 text-base text-white/75">
            <p className="flex items-center gap-2 border-r border-white/15 pr-4">
              <FaMapMarkerAlt className="text-primary" />
              {data.address}
            </p>

            <p className="flex items-center gap-2 border-r border-white/15 pr-4 group cursor-pointer">
              <FaEnvelope className="transition duration-300 group-hover:text-primary text-primary" />
              <a
                href={`mailto:${data.email}`}
                className="transition duration-300 group-hover:text-primary"
              >
                {data.email}
              </a>
            </p>

            <p className="flex items-center gap-2 group cursor-pointer">
              <FaPhoneAlt className="transition duration-300 group-hover:text-primary text-primary" />
              <a
                href={`tel:${data.phone}`}
                className="transition duration-300 group-hover:text-primary"
              >
                {data.phone}
              </a>
            </p>
          </div>

          <div className="flex gap-4">
            {data.facebook && (
              <Link href={data.facebook} target="_blank" className="text-base">
                <FaFacebookF className="transition duration-300 hover:text-primary hover:scale-110" />
              </Link>
            )}

            {data.youtube && (
              <Link href={data.youtube} target="_blank" className="text-base">
                <FaYoutube className="transition duration-300 hover:text-primary hover:scale-110" />
              </Link>
            )}

            {data.linkedin && (
              <Link href={data.linkedin} target="_blank" className="text-base">
                <FaLinkedinIn className="transition duration-300 hover:text-primary hover:scale-110" />
              </Link>
            )}

            {data.instagram && (
              <Link href={data.instagram} target="_blank" className="text-base">
                <FaInstagram className="transition duration-300 hover:text-primary hover:scale-110" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "bg-white"
        }`}
      >
        <div className="custom-container mx-auto h-20 md:h-24 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="relative z-[70] flex items-center">
            <Image
              src={data.logo || "/logo.png"}
              alt="Logo"
              width={1200}
              height={1200}
              priority
              className="h-20 md:h-28 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8 font-semibold text-Secound_primary">
              {menuLinks.map((item) => (
                <li key={item.id} className="relative group">
                  <Link
                    href={item.path}
                    className="hover:text-primary transition"
                  >
                    {item.name}
                  </Link>

                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </li>
              ))}
            </ul>

            <Link href="/contact">
              <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-secondary">
                Contact Us
              </button>
            </Link>
          </div>

          {/* PREMIUM MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`fixed right-5 top-4 z-[9999] lg:hidden flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${
              isMenuOpen
                ? "border-white/20 bg-primary text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                : "border-gray-200 bg-white text-primary shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center text-3xl">
              {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </span>
          </button>
        </div>
      </nav>

      {/* ================= PREMIUM MOBILE MENU ================= */}
      <div
        ref={menuRef}
        className="pointer-events-none fixed inset-0 z-[60] opacity-0 lg:hidden"
      >
        {/* OVERLAY */}
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-secondary/70 backdrop-blur-md"
        />

        {/* DRAWER */}
        <div
          ref={drawerRef}
          className="absolute right-0 top-0 flex h-full w-[88%] max-w-[420px] flex-col overflow-hidden rounded-l-[2rem] border-l border-white/10 bg-secondary text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
        >
          {/* DECOR */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          {/* DRAWER HEADER */}
          <div className="relative z-10 border-b border-white/10 px-6 pb-6 pt-24">
            <p
              data-menu-item
              className="text-xs font-bold uppercase tracking-[0.28em] text-primary"
            >
              Navigation
            </p>

            <h3
              data-menu-item
              className="mt-3 text-2xl font-bold leading-tight text-white"
            >
              MAH Audit Dubai
            </h3>

            <p
              data-menu-item
              className="mt-2 text-sm leading-relaxed text-white/55"
            >
              Audit, advisory, compliance and professional financial guidance.
            </p>
          </div>

          {/* LINKS */}
          <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-3">
              {menuLinks.map((item, index) => (
                <li key={item.id} data-menu-item>
                  <Link
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-lg font-semibold text-white transition hover:border-primary/50 hover:bg-primary hover:text-white"
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-sm font-bold text-primary group-hover:text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.name}
                    </span>

                    <FaArrowRight className="text-sm opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}

              <li data-menu-item>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 flex items-center justify-center gap-3 rounded-2xl bg-primary px-5 py-4 text-lg font-bold text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition hover:bg-primary_light"
                >
                  <FaPhoneAlt />
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* CONTACT CARD */}
            <div
              data-menu-item
              className="mt-7 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
            >
              {data.phone && (
                <a
                  href={`tel:${data.phone}`}
                  className="flex min-w-0 items-center gap-3 text-sm text-white/70 transition hover:text-primary"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <FaPhoneAlt />
                  </span>

                  <span className="min-w-0 flex-1 truncate">{data.phone}</span>
                </a>
              )}

              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="mt-4 flex min-w-0 items-center gap-3 text-sm text-white/70 transition hover:text-primary"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <FaEnvelope />
                  </span>

                  <span className="min-w-0 flex-1 break-all leading-relaxed">
                    {data.email}
                  </span>
                </a>
              )}

              {data.address && (
                <p className="mt-4 flex min-w-0 items-start gap-3 text-sm leading-relaxed text-white/70">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <FaMapMarkerAlt />
                  </span>

                  <span className="min-w-0 flex-1 leading-relaxed">
                    {data.address}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* SOCIAL FOOTER */}
          <div className="relative z-10 border-t border-white/10 px-6 py-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                Follow Us
              </p>

              <div className="flex items-center gap-3">
                {data.facebook && (
                  <Link
                    href={data.facebook}
                    target="_blank"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:border-primary hover:bg-primary"
                  >
                    <FaFacebookF />
                  </Link>
                )}

                {data.linkedin && (
                  <Link
                    href={data.linkedin}
                    target="_blank"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:border-primary hover:bg-primary"
                  >
                    <FaLinkedinIn />
                  </Link>
                )}

                {data.instagram && (
                  <Link
                    href={data.instagram}
                    target="_blank"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:border-primary hover:bg-primary"
                  >
                    <FaInstagram />
                  </Link>
                )}

                {data.youtube && (
                  <Link
                    href={data.youtube}
                    target="_blank"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:border-primary hover:bg-primary"
                  >
                    <FaYoutube />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
