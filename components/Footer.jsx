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
  FaArrowRight,
} from "react-icons/fa";

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
    const { data, error } = await supabaseServer
      .from("footer")
      .select("*")
      .single();

    if (error) {
      console.error("Footer Fetch Error:", error.message);
      return;
    }

    setData(data);
  };

  if (!data) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-secondary text-white">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative custom-container mx-auto px-6 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-10 lg:gap-14">
          <div className="max-w-sm">
            {data.logo && (
              <Link href="/" className="inline-flex">
                <Image
                  src={data.logo}
                  alt="MAH Audit Dubai"
                  width={240}
                  height={110}
                  className="h-auto w-44 object-contain"
                />
              </Link>
            )}

            <p className="mt-6 text-sm leading-relaxed text-white/65">
              {data.about}
            </p>

            <div className="mt-7 flex items-center gap-3">
              {data.social_links?.map((item, i) => {
                const Icon = iconMap[item.type];
                if (!Icon) return null;

                return (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.type}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-primary hover:bg-primary hover:text-secondary"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="relative inline-block text-base font-bold text-white">
                Quick Links
                <span className="absolute left-0 -bottom-2 h-[2px] w-10 bg-primary" />
              </h4>

              <ul className="mt-7 space-y-3">
                {data.quick_links?.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.link}
                      className="relative inline-block text-sm text-white/65 transition hover:text-primary
          after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-primary
          after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="relative inline-block text-base font-bold text-white">
                Services
                <span className="absolute left-0 -bottom-2 h-[2px] w-10 bg-primary" />
              </h4>

              <ul className="mt-7 space-y-3">
                {data.services?.map((service, i) => (
                  <li key={i}>
                    <span
                      className="relative inline-block text-sm text-white/65 transition hover:text-primary
    after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-primary
    after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="relative inline-block text-base font-bold text-white">
                Contact
                <span className="absolute left-0 -bottom-2 h-[2px] w-10 bg-primary" />
              </h4>

              <ul className="mt-7 space-y-4 text-sm text-white/65">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FaPhoneAlt size={13} />
                  </span>
                  <p className="leading-relaxed">{data.phone}</p>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FaEnvelope size={13} />
                  </span>
                  <p className="leading-relaxed break-all">{data.email}</p>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FaMapMarkerAlt size={13} />
                  </span>
                  <p className="leading-relaxed">{data.address}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/45">
          <p>
            © {year} {data.copyright}
          </p>

          <p className="text-white/35">
            Audit, Tax & Advisory Services in Dubai
          </p>
        </div>
      </div>
    </footer>
  );
}
