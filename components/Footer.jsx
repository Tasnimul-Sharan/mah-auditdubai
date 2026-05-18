"use client";

import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

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

function parseArray(value) {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function createSlug(text = "") {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function Footer({ data = null }) {
  if (!data) return null;

  const year = new Date().getFullYear();

  const socialLinks = parseArray(data.social_links);
  const quickLinks = parseArray(data.quick_links);
  const services = parseArray(data.services);

  return (
    <footer className="relative overflow-hidden bg-secondary text-white">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="relative custom-container mx-auto px-6 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-sm">
            {data.logo && (
              <Link
                href="/"
                className="inline-flex"
                aria-label="Go to homepage"
              >
                <OptimizedImage
                  src={data.logo}
                  alt="MAH Audit Dubai"
                  width={220}
                  height={100}
                  sizes="220px"
                  className="h-auto w-44 object-contain"
                />
              </Link>
            )}
            <p className="mt-6 text-sm leading-relaxed text-white/65">
              {data.about}
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((item, i) => {
                const Icon = iconMap[item.type];
                if (!Icon) return null;

                const platform =
                  item.type?.charAt(0).toUpperCase() + item.type?.slice(1);

                return (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit MAH Audit Dubai on ${platform}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-primary_light hover:bg-primary hover:text-white"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="relative inline-block text-base font-bold text-white">
                Quick Links
                <span className="absolute left-0 -bottom-2 h-[2px] w-10 bg-primary" />
              </p>
              <ul className="mt-7 space-y-3">
                {quickLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.link}
                      className="relative inline-block text-sm text-white/65 transition hover:text-primary_light
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
              <p className="relative inline-block text-base font-bold text-white">
                Services
                <span className="absolute left-0 -bottom-2 h-[2px] w-10 bg-primary" />
              </p>

              <ul className="mt-7 space-y-3">
                {services.map((service, i) => {
                  const label =
                    typeof service === "string"
                      ? service
                      : service?.label || service?.title;

                  const slug =
                    typeof service === "string"
                      ? service
                          .toLowerCase()
                          .trim()
                          .replace(/[^\w\s-]/g, "")
                          .replace(/\s+/g, "-")
                          .replace(/-+/g, "-")
                      : service?.slug;

                  const href =
                    typeof service === "string"
                      ? `/services/${slug}`
                      : service?.link || `/services/${slug}`;

                  if (!label || !href) return null;

                  return (
                    <li key={i}>
                      <Link
                        href={href}
                        className="group relative inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-primary_light
after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-primary
after:transition-all after:duration-300 hover:after:w-full"
                      >
                        <span>{label}</span>

                        <FaArrowRight
                          size={10}
                          className="translate-x-[-6px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-60"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <p className="relative inline-block text-base font-bold text-white">
                Contact
                <span className="absolute left-0 -bottom-2 h-[2px] w-10 bg-primary" />
              </p>
              <ul className="mt-7 space-y-4 text-sm text-white/65">
                {data.phone && (
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary_light/10 text-primary_light">
                      <FaPhoneAlt size={13} />
                    </span>

                    <a
                      href={`tel:${data.phone}`}
                      className="leading-relaxed transition hover:text-primary_light"
                    >
                      {data.phone}
                    </a>
                  </li>
                )}

                {data.email && (
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary_light/10 text-primary_light">
                      <FaEnvelope size={13} />
                    </span>

                    <a
                      href={`mailto:${data.email}`}
                      className="break-all leading-relaxed transition hover:text-primary_light"
                    >
                      {data.email}
                    </a>
                  </li>
                )}

                {data.address && (
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary_light/10 text-primary_light">
                      <FaMapMarkerAlt size={13} />
                    </span>

                    <p className="leading-relaxed">{data.address}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-white/60">
          <p>
            © {year} {data.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
