// "use client";
// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import gsap from "gsap";
// import {
//   FaMapMarkerAlt,
//   FaEnvelope,
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaClock,
//   FaPhoneAlt,
//   FaYoutube,
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const menuRef = useRef(null);
//   const navRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!navRef.current) return;

//     const topbarHeight = 60;

//     const handleAnimation = () => {
//       const isMobileOrTablet = window.innerWidth < 1024;

//       if (isMobileOrTablet) {
//         gsap.set(navRef.current, { y: 0 });
//       } else {
//         gsap.to(navRef.current, {
//           y: isScrolled ? 0 : topbarHeight,
//           duration: 0.2,
//           ease: "power3.inOut",
//         });
//       }
//     };

//     handleAnimation();
//     window.addEventListener("resize", handleAnimation);

//     return () => {
//       window.removeEventListener("resize", handleAnimation);
//     };
//   }, [isScrolled]);

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
//           duration: 0.6,
//           stagger: 0.1,
//           ease: "power4.out",
//         },
//       );
//     } else {
//       gsap.to(menu, {
//         width: 0,
//         height: 0,
//         opacity: 0,
//         duration: 0.6,
//         ease: "power4.inOut",
//       });
//     }
//   }, [isMenuOpen]);

//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Services", path: "/services" },
//     { name: "Blogs", path: "/blogs" },
//   ];

//   const isTransparent = !isScrolled;

//   const textColor = isTransparent ? "text-white" : "text-secondary";

//   const navbarClasses = isScrolled ? "bg-white border" : "bg-white";

//   const topbarRef = useRef(null);

//   useEffect(() => {
//     if (!topbarRef.current) return;

//     if (isScrolled) {
//       gsap.to(topbarRef.current, {
//         y: "-100%",
//         duration: 0.3,
//         ease: "power3.inOut",
//       });
//     } else {
//       gsap.to(topbarRef.current, {
//         y: "0%",
//         duration: 0.3,
//         ease: "power3.inOut",
//       });
//     }
//   }, [isScrolled]);

//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
//   }, [isMenuOpen]);

//   return (
//     <header className="w-full">
//       <div className="hidden lg:block fixed top-0 left-0 w-full z-40 bg-primary text-white py-6">
//         <div className="custom-container mx-auto flex items-center justify-between">
//           {/* Left Info */}
//           <div className="flex flex-1 items-center gap-6 text-base text-white">
//             <p className="flex items-center gap-2 border-r border-white/20 pr-4">
//               <FaMapMarkerAlt className="shrink-0 text-gray-100" />
//               <span>2nd Floor, 154 Bishopsgate, London, EC2M 4LN</span>
//             </p>

//             <p className="flex items-center gap-2 border-r border-white/20 pr-4">
//               <FaEnvelope className="shrink-0 text-gray-100" />
//               <a
//                 href="mailto:enquiries@mah.uk.com"
//                 className="hover:text-secondary transition"
//               >
//                 enquiries@mah.uk.com
//               </a>
//             </p>

//             <p className="flex items-center gap-2 pr-4">
//               <FaPhoneAlt className="shrink-0 text-gray-100" />
//               <a
//                 href="tel:02071003610"
//                 className="hover:text-secondary transition"
//               >
//                 0207 100 3610
//               </a>
//             </p>
//           </div>

//           {/* Social */}
//           <div className="flex items-center gap-4 ml-6 text-white">
//             <Link href="https://facebook.com" target="_blank">
//               <FaFacebookF className="hover:text-secondary w-5 h-5 transition duration-300" />
//             </Link>
//             <Link href="https://youtube.com" target="_blank">
//               <FaYoutube className="hover:text-secondary w-5 h-5 transition duration-300" />
//             </Link>
//             <Link href="https://linkedin.com" target="_blank">
//               <FaLinkedinIn className="hover:text-secondary w-5 h-5 transition duration-300" />
//             </Link>
//             <Link href="https://instagram.com" target="_blank">
//               <FaInstagram className="hover:text-secondary w-5 h-5 transition duration-300" />
//             </Link>
//           </div>
//         </div>
//       </div>

//       <nav
//         ref={navRef}
//         className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 transform-gpu ${navbarClasses}`}
//       >
//         <div className="custom-container mx-auto md:h-24 h-20 flex items-center justify-between z-40 overflow-hidden">
//           <Link href="/" className="flex items-center">
//             <Image
//               src="/logo/MAH Audit Dubai Logo-1.png"
//               alt="Company Logo"
//               width={1200}
//               height={1200}
//               priority
//               className="md:h-32 h-28 w-auto object-contain"
//             />
//           </Link>
//           <ul className="hidden lg:flex gap-8 font-semibold text-Secound_primary">
//             {menuItems.map((item, index) => (
//               <li key={index} className="relative group">
//                 <Link
//                   href={item.path}
//                   className="transition-colors duration-300 hover:text-primary"
//                 >
//                   {item.name}
//                 </Link>
//                 <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"></span>
//               </li>
//             ))}
//           </ul>

//           <div className="hidden lg:block">
//             <Link href="/contact">
//               <button className="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-secondary transition-all transform duration-500">
//                 Contact Us
//               </button>
//             </Link>
//           </div>

//           <button
//             className="lg:hidden text-3xl text-primary z-50"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
//           </button>
//         </div>
//       </nav>
//       <div
//         ref={menuRef}
//         className="fixed top-0 left-0 w-0 h-0 opacity-0 bg-primary text-white z-30 overflow-hidden flex flex-col justify-center items-center lg:hidden"
//       >
//         <ul className="flex flex-col gap-8 text-2xl font-semibold text-center">
//           {menuItems.map((item, index) => (
//             <li key={index}>
//               <Link
//                 href={item.path}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="hover:text-secondary transition-colors"
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}

//           <li>
//             <Link
//               href="/contact"
//               onClick={() => setIsMenuOpen(false)}
//               className="inline-block mt-4 bg-white text-primary px-6 py-3 rounded-lg font-semibold"
//             >
//               Contact Us
//             </Link>
//           </li>
//         </ul>

//         {/* Social Icons */}
//         <div className="flex gap-6 mt-12 text-xl">
//           <FaFacebookF />
//           <FaLinkedinIn />
//           <FaInstagram />
//           <FaYoutube />
//         </div>
//       </div>
//     </header>
//   );
// }

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

// // ✅ ICON MAP
// const iconMap = {
//   facebook: FaFacebookF,
//   youtube: FaYoutube,
//   linkedin: FaLinkedinIn,
//   instagram: FaInstagram,
// };

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const [data, setData] = useState(null);
//   const [links, setLinks] = useState([]);

//   const menuRef = useRef(null);
//   const navRef = useRef(null);

//   // ================= FETCH DATA =================
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const { data } = await supabaseServer.from("navbar").select("*").single();

//     const { data: linksData } = await supabaseServer
//       .from("nav_links")
//       .select("*")
//       .order("order_no", { ascending: true });

//     setData(data);
//     setLinks(linksData || []);
//   };

//   // ================= SCROLL =================
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ================= GSAP NAV =================
//   useEffect(() => {
//     if (!navRef.current) return;

//     const topbarHeight = 60;

//     const handleAnimation = () => {
//       if (window.innerWidth < 1024) {
//         gsap.set(navRef.current, { y: 0 });
//       } else {
//         gsap.to(navRef.current, {
//           y: isScrolled ? 0 : topbarHeight,
//           duration: 0.2,
//           ease: "power3.inOut",
//         });
//       }
//     };

//     handleAnimation();
//     window.addEventListener("resize", handleAnimation);

//     return () => window.removeEventListener("resize", handleAnimation);
//   }, [isScrolled]);

//   // ================= MOBILE MENU =================
//   useEffect(() => {
//     const menu = menuRef.current;
//     const items = menu?.querySelectorAll("li");

//     if (isMenuOpen) {
//       gsap.to(menu, {
//         width: "100vw",
//         height: "100vh",
//         opacity: 1,
//         duration: 0.6,
//       });

//       gsap.fromTo(
//         items,
//         { x: "-100%", opacity: 0 },
//         {
//           x: "0%",
//           opacity: 1,
//           stagger: 0.1,
//           duration: 0.5,
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

//   // ❗ prevent crash
//   if (!data) return null;

//   // ================= SOCIAL DATA =================
//   const socials = Object.entries(iconMap).map(([key, Icon]) => ({
//     icon: Icon,
//     url: data[key],
//   }));

//   return (
//     <header className="w-full">
//       {/* ================= TOPBAR ================= */}
//       <div className="hidden lg:block fixed top-0 left-0 w-full z-40 bg-primary text-white py-6">
//         <div className="custom-container mx-auto flex items-center justify-between">
//           {/* LEFT INFO */}
//           <div className="flex flex-1 items-center gap-6 text-base">
//             <p className="flex items-center gap-2 border-r border-white/20 pr-4">
//               <FaMapMarkerAlt />
//               <span>{data.address}</span>
//             </p>

//             <p className="flex items-center gap-2 border-r border-white/20 pr-4">
//               <FaEnvelope />
//               <a
//                 href={`mailto:${data.email}`}
//                 className="hover:text-secondary transition"
//               >
//                 {data.email}
//               </a>
//             </p>

//             <p className="flex items-center gap-2 pr-4">
//               <FaPhoneAlt />
//               <a
//                 href={`tel:${data.phone}`}
//                 className="hover:text-secondary transition"
//               >
//                 {data.phone}
//               </a>
//             </p>
//           </div>

//           {/* SOCIAL */}
//           <div className="flex items-center gap-4 ml-6">
//             {socials.map((item, i) => {
//               if (!item.url) return null;
//               const Icon = item.icon;

//               return (
//                 <Link key={i} href={item.url} target="_blank">
//                   <Icon className="hover:text-secondary w-5 h-5 transition duration-300" />
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ================= MAIN NAV ================= */}
//       <nav
//         ref={navRef}
//         className="fixed top-0 left-0 w-full z-50 bg-white border transition-all"
//       >
//         <div className="custom-container mx-auto md:h-24 h-20 flex items-center justify-between">
//           {/* LOGO */}
//           <Link href="/" className="flex-shrink-0">
//             {data.logo && (
//               <Image
//                 src={data.logo}
//                 alt="Logo"
//                 width={200}
//                 height={80}
//                 className="md:h-20 h-16 w-auto object-contain"
//               />
//             )}
//           </Link>

//           {/* RIGHT SIDE (MENU + BUTTON) */}
//           <div className="hidden lg:flex items-center gap-10">
//             {/* MENU */}
//             <ul className="flex gap-8 font-semibold text-Secound_primary">
//               {links.map((item) => (
//                 <li key={item.id} className="relative group">
//                   <Link
//                     href={item.path}
//                     className="transition-colors duration-300 hover:text-primary"
//                   >
//                     {item.name}
//                   </Link>

//                   <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"></span>
//                 </li>
//               ))}
//             </ul>

//             {/* BUTTON */}
//             <Link href="/contact">
//               <button className="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-secondary transition-all">
//                 Contact Us
//               </button>
//             </Link>
//           </div>

//           {/* MOBILE BUTTON */}
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
//           {links.map((item) => (
//             <li key={item.id}>
//               <Link
//                 href={item.path}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="hover:text-secondary transition-colors"
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}

//           <li>
//             <Link
//               href="/contact"
//               onClick={() => setIsMenuOpen(false)}
//               className="inline-block mt-4 bg-white text-primary px-6 py-3 rounded-lg font-semibold"
//             >
//               Contact Us
//             </Link>
//           </li>
//         </ul>

//         {/* SOCIAL */}
//         <div className="flex gap-6 mt-12 text-xl">
//           {socials.map((item, i) => {
//             if (!item.url) return null;
//             const Icon = item.icon;
//             return <Icon key={i} />;
//           })}
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
} from "react-icons/fa";

import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

// ✅ SOCIAL ICON MAP
const iconMap = {
  facebook: FaFacebookF,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [data, setData] = useState(null);
  const [links, setLinks] = useState([]);

  const menuRef = useRef(null);
  const navRef = useRef(null);

  // ================= FETCH DATA =================
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
          duration: 0.2,
        });
      }
    };

    handleAnimation();
    window.addEventListener("resize", handleAnimation);

    return () => window.removeEventListener("resize", handleAnimation);
  }, [isScrolled]);

  // ================= MOBILE MENU =================
  useEffect(() => {
    const menu = menuRef.current;
    const items = menu?.querySelectorAll("li");

    if (isMenuOpen) {
      gsap.to(menu, {
        width: "100vw",
        height: "100vh",
        opacity: 1,
        duration: 0.6,
      });

      gsap.fromTo(
        items,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
        },
      );
    } else {
      gsap.to(menu, {
        width: 0,
        height: 0,
        opacity: 0,
        duration: 0.4,
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  if (!data) return null;

  // ================= SOCIAL =================
  const socials = Object.entries(iconMap).map(([key, Icon]) => ({
    icon: Icon,
    url: data[key],
  }));

  return (
    <header className="w-full">
      {/* ================= TOPBAR ================= */}
      <div className="hidden lg:block fixed top-0 left-0 w-full z-40 bg-primary text-white py-6">
        <div className="custom-container mx-auto flex justify-between items-center">
          {/* LEFT INFO */}
          <div className="flex gap-6 text-base">
            <p className="flex items-center gap-2 border-r pr-4">
              <FaMapMarkerAlt />
              {data.address}
            </p>

            <p className="flex items-center gap-2 border-r pr-4">
              <FaEnvelope />
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </p>

            <p className="flex items-center gap-2">
              <FaPhoneAlt />
              <a href={`tel:${data.phone}`}>{data.phone}</a>
            </p>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4">
            {socials.map((item, i) => {
              if (!item.url) return null;
              const Icon = item.icon;

              return (
                <Link key={i} href={item.url} target="_blank">
                  <Icon className="hover:text-secondary transition" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 bg-white border"
      >
        <div className="custom-container mx-auto md:h-24 h-20 flex items-center justify-between">
          {/* ✅ LOGO LEFT */}
          <Link href="/" className="flex-shrink-0">
            {data.logo && (
              <Image
                src={data.logo}
                alt="Logo"
                width={200}
                height={80}
                className="h-16 w-auto object-contain"
              />
            )}
          </Link>

          {/* ✅ RIGHT SIDE (MENU + BUTTON) */}
          <div className="hidden lg:flex items-center gap-10">
            {/* MENU */}
            <ul className="flex gap-8 font-semibold">
              {links.map((item) => (
                <li key={item.id} className="relative group">
                  <Link
                    href={item.path}
                    className="hover:text-primary transition"
                  >
                    {item.name}
                  </Link>

                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"></span>
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <Link href="/contact">
              <button className="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-secondary transition">
                Contact Us
              </button>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-3xl text-primary z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-0 h-0 opacity-0 bg-primary text-white z-30 overflow-hidden flex flex-col justify-center items-center lg:hidden"
      >
        <ul className="flex flex-col gap-8 text-2xl font-semibold text-center">
          {links.map((item) => (
            <li key={item.id}>
              <Link href={item.path} onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="bg-white text-primary px-6 py-3 rounded-lg"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* SOCIAL */}
        <div className="flex gap-6 mt-12 text-xl">
          {socials.map((item, i) => {
            if (!item.url) return null;
            const Icon = item.icon;
            return <Icon key={i} />;
          })}
        </div>
      </div>
    </header>
  );
}