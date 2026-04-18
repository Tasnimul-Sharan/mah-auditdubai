// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaYoutube,
// } from "react-icons/fa";

// export default function Footer() {
//   const socialLinks = [
//     {
//       icon: FaFacebookF,
//       link: "https://www.facebook.com/p/MAH-Chartered-Accountants-100068129359509/",
//     },
//     {
//       icon: FaInstagram,
//       link: "https://www.instagram.com/mahca2011/",
//     },
//     {
//       icon: FaLinkedinIn,
//       link: "https://www.linkedin.com/company/mah-chartered-accountants/",
//     },
//     {
//       icon: FaYoutube,
//       link: "https://www.youtube.com/@MAHCharteredAccountantsLondon",
//     },
//   ];

//   return (
//     <footer className="bg-secondary text-gray-400">
//       {/* Top Section */}
//       <div className="custom-container mx-auto pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
//         {/* About */}
//         <div>
//           {/* Logo */}
//           <div className="mb-5">
//             <Image
//               src="/logo/MAH Audit Dubai Logo-1.png"
//               alt="Audit Firms in Dubai"
//               width={1536}
//               height={1024}
//               className="object-cover w-full h-32"
//               priority
//             />
//           </div>
//           <p className="text-sm leading-relaxed text-gray-400">
//             Professional auditing and accounting services in Dubai, ensuring
//             compliance, accuracy, and financial transparency for businesses
//             across the UAE.
//           </p>
//           {/* Social Icons */}
//           <div className="flex items-center gap-3 mt-6">
//             {socialLinks.map(({ icon: Icon, link }, i) => (
//               <a
//                 key={i}
//                 href={link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-9 h-9 flex items-center justify-center rounded-full
//                  bg-white/5 border border-white/10 text-gray-300
//                  hover:bg-primary hover:text-black hover:scale-110
//                  transition-all duration-300"
//               >
//                 <Icon size={14} />
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h4 className="text-white font-semibold mb-4 tracking-wide relative inline-block">
//             Quick Links
//             <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-primary rounded"></span>
//           </h4>
//           <ul className="space-y-3 text-sm">
//             {["Home", "About Us", "Services", "Contact"].map((item) => (
//               <li key={item}>
//                 <Link
//                   href="#"
//                   className="hover:text-primary_light transition duration-300"
//                 >
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Services */}
//         <div>
//           <h4 className="text-white font-semibold mb-4 tracking-wide relative inline-block">
//             Audit Services
//             <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-primary rounded"></span>
//           </h4>
//           <ul className="space-y-3 text-sm">
//             {[
//               "Due Diligence Audit",
//               "Forensic Audit",
//               "ICV Audit",
//               "Internal Audit",
//             ].map((service) => (
//               <li
//                 key={service}
//                 className="hover:text-primary_light transition duration-300 cursor-pointer"
//               >
//                 {service}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <h4 className="text-white text-lg font-semibold mb-4 tracking-wide relative inline-block">
//             Contact
//             <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-primary rounded"></span>
//           </h4>

//           <ul className="space-y-4 text-base">
//             <li className="flex items-start gap-3">
//               <FaPhoneAlt className="mt-1 text-primary" />
//               <div>
//                 <p>0207 100 3610</p>
//               </div>
//             </li>

//             <li className="flex items-center gap-3">
//               <FaEnvelope className="text-primary" />
//               <p>enquiries@mah.uk.com</p>
//             </li>
//             <li className="flex items-start gap-3">
//               <FaMapMarkerAlt className="mt-1 text-primary" />
//               <p>2nd Floor, 154 Bishopsgate, London, EC2M 4LN</p>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-white/10" />

//       {/* Bottom */}
//       <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center text-base text-gray-500">
//         <p>© 2026 Audit Firms in Dubai. All rights reserved.</p>

//         {/* <div className="flex gap-6 mt-3 md:mt-0">
//           <Link href="#" className="hover:text-primary_light transition">
//             Privacy Policy
//           </Link>
//           <Link href="#" className="hover:text-secondary transition">
//             Terms & Conditions
//           </Link>
//         </div> */}
//       </div>
//     </footer>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

// ✅ icon map (IMPORTANT)
const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

export default function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabaseServer.from("footer").select("*").single();

    setData(data);
  };

  if (!data) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-gray-400">
      {/* Top Section */}
      <div className="custom-container mx-auto pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* ================= ABOUT ================= */}
        <div>
          <div className="mb-5">
            {data.logo && (
              <Image
                src={data.logo}
                alt="Footer Logo"
                width={500}
                height={200}
                className="object-contain w-full h-32"
              />
            )}
          </div>

          <p className="text-sm leading-relaxed">{data.about}</p>

          {/* SOCIAL */}
          <div className="flex items-center gap-3 mt-6">
            {data.social_links?.map((item, i) => {
              const Icon = iconMap[item.type];

              if (!Icon) return null;

              return (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full 
                  bg-white/5 border border-white/10 text-gray-300
                  hover:bg-primary hover:text-black hover:scale-110
                  transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div>
          <h4 className="text-white font-semibold mb-4 relative inline-block">
            Quick Links
            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-primary"></span>
          </h4>

          <ul className="space-y-3 text-sm">
            {data.quick_links?.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.link}
                  className="hover:text-primary_light transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= SERVICES ================= */}
        <div>
          <h4 className="text-white font-semibold mb-4 relative inline-block">
            Services
            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-primary"></span>
          </h4>

          <ul className="space-y-3 text-sm">
            {data.services?.map((service, i) => (
              <li key={i} className="hover:text-primary_light transition">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* ================= CONTACT ================= */}
        <div>
          <h4 className="text-white font-semibold mb-4 relative inline-block">
            Contact
            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-primary"></span>
          </h4>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-primary" />
              <p>{data.phone}</p>
            </li>

            <li className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              <p>{data.email}</p>
            </li>

            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-primary" />
              <p>{data.address}</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* ================= BOTTOM ================= */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center text-gray-500">
        <p>
          © {year} {data.copyright}
        </p>
      </div>
    </footer>
  );
}
