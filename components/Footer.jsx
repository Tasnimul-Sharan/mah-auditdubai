"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaXTwitter,
// } from "react-icons/fa6";
export default function Footer() {
  const socialLinks = [
    {
      icon: FaFacebookF,
      link: "https://facebook.com",
    },
    {
      icon: FaInstagram,
      link: "https://instagram.com",
    },
    {
      icon: FaLinkedinIn,
      link: "https://linkedin.com",
    },
    {
      icon: FaXTwitter,
      link: "https://x.com",
    },
  ];

  return (
    <footer className="bg-primary text-gray-400">
      {/* Top Section */}
      <div className="custom-container mx-auto pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          {/* Logo */}
          <div className="mb-5">
            <Image
              src="/logo/mah-auditdubai-logo.png" // 👉 your logo path
              alt="Audit Firms in Dubai"
              width={1536}
              height={1024}
              className="object-cover w-full h-32"
              priority
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Professional auditing and accounting services in Dubai, ensuring
            compliance, accuracy, and financial transparency for businesses
            across the UAE.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-6">
            {socialLinks.map(({ icon: Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full 
                 bg-white/5 border border-white/10 text-gray-300
                 hover:bg-[#D4AF37] hover:text-black hover:scale-110
                 transition-all duration-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide relative inline-block">
            Quick Links
            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-secondary rounded"></span>
          </h4>
          <ul className="space-y-3 text-sm">
            {["Home", "About Us", "Services", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-secondary transition duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide relative inline-block">
            Audit Services
            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-secondary rounded"></span>
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              "Due Diligence Audit",
              "Forensic Audit",
              "ICV Audit",
              "Internal Audit",
            ].map((service) => (
              <li
                key={service}
                className="hover:text-secondary transition duration-300 cursor-pointer"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide relative inline-block">
            Contact
            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-secondary rounded"></span>
          </h4>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-secondary" />
              <div>
                <p>0207 100 3610</p>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <FaEnvelope className="text-secondary" />
              <p>enquiries@mah.uk.com</p>
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-secondary" />
              <p>2nd Floor, 154 Bishopsgate, London, EC2M 4LN</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>© 2026 Audit Firms in Dubai. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <Link href="#" className="hover:text-secondary transition">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-secondary transition">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
