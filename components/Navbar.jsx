"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

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

export default function Navbar({ navbarData = null, navLinks = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const data = navbarData;
  const links = Array.isArray(navLinks) ? navLinks : [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  if (!data) {
    return (
      <header className="fixed left-0 top-0 z-50 h-20 w-full bg-white md:h-24" />
    );
  }

  const menuLinks = links.filter(
    (item) => item?.name?.toLowerCase() !== "contact",
  );

  return (
    <header className="w-full">
      <div
        className="fixed left-0 top-0 z-40 hidden w-full bg-secondary py-6 text-white lg:block"
      >
        <div className="custom-container mx-auto flex items-center justify-between">
          <div className="flex flex-1 items-center gap-6 text-base text-white/75">
            {data.address && (
              <p className="flex items-center gap-2 border-r border-white/15 pr-4">
                <FaMapMarkerAlt className="text-primary_light" />
                {data.address}
              </p>
            )}

            {data.email && (
              <p className="group flex cursor-pointer items-center gap-2 border-r border-white/15 pr-4">
                <FaEnvelope className="text-primary_light transition duration-300 group-hover:text-primary_light" />
                <a
                  href={`mailto:${data.email}`}
                  className="transition duration-300 group-hover:text-primary_light"
                >
                  {data.email}
                </a>
              </p>
            )}

            {data.phone && (
              <p className="group flex cursor-pointer items-center gap-2">
                <FaPhoneAlt className="text-primary_light transition duration-300 group-hover:text-primary_light" />
                <a
                  href={`tel:${data.phone}`}
                  className="transition duration-300 group-hover:text-primary_light"
                >
                  {data.phone}
                </a>
              </p>
            )}
          </div>

          <div className="flex gap-4">
            {data.facebook && (
              <Link
                href={data.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit MAH Audit Dubai on Facebook"
                className="text-base"
              >
                <FaFacebookF className="transition duration-300 hover:scale-110 hover:text-primary_light" />
              </Link>
            )}

            {data.youtube && (
              <Link
                href={data.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit MAH Audit Dubai on YouTube"
                className="text-base"
              >
                <FaYoutube className="transition duration-300 hover:scale-110 hover:text-primary_light" />
              </Link>
            )}

            {data.linkedin && (
              <Link
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit MAH Audit Dubai on LinkedIn"
                className="text-base"
              >
                <FaLinkedinIn className="transition duration-300 hover:scale-110 hover:text-primary_light" />
              </Link>
            )}

            {data.instagram && (
              <Link
                href={data.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit MAH Audit Dubai on Instagram"
                className="text-base"
              >
                <FaInstagram className="transition duration-300 hover:scale-110 hover:text-primary_light" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <nav
        className={`fixed left-0 top-0 z-50 w-full transform transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:translate-y-0"
            : "bg-white lg:translate-y-[60px]"
        }`}
      >
        <div className="custom-container mx-auto flex h-20 items-center justify-between md:h-24">
          <Link
            href="/"
            prefetch={false}
            className="relative z-[70] flex items-center"
          >
            <OptimizedImage
              src={data.logo || "/logo.png"}
              alt="MAH Audit Dubai"
              width={180}
              height={125}
              sizes="180px"
              priority
              className="h-20 w-auto object-contain md:h-28"
            />
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            <ul className="flex items-center gap-8 font-semibold text-Secound_primary">
              {menuLinks.map((item) => (
                <li key={item.id} className="group relative">
                  <Link
                    href={item.path}
                    prefetch={false}
                    className="transition hover:text-primary"
                  >
                    {item.name}
                  </Link>

                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              prefetch={false}
              className="rounded-md bg-primary px-6 py-3 font-semibold text-white transition-all transform-cpu hover:bg-secondary"
            >
              Contact Us
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`fixed right-5 top-4 z-[9999] flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 lg:hidden ${
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

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-secondary/70 backdrop-blur-md"
        />

        <div
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-[420px] flex-col overflow-hidden rounded-l-[2rem] border-l border-white/10 bg-secondary text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out ${
            isMenuOpen
              ? "translate-x-0 scale-100 opacity-100"
              : "translate-x-full scale-[0.98] opacity-0"
          }`}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 border-b border-white/10 px-6 pb-6 pt-24">
            <p
              data-menu-item
              className="text-xs font-bold uppercase tracking-[0.28em] text-primary_light"
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

          <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-3">
              {menuLinks.map((item, index) => (
                <li key={item.id} data-menu-item>
                  <Link
                    href={item.path}
                    prefetch={false}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-lg font-semibold text-white transition hover:border-primary_light/50 hover:bg-primary hover:text-white"
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-sm font-bold text-primary_light group-hover:text-white">
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
                  prefetch={false}
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 flex items-center justify-center gap-3 rounded-2xl bg-primary px-5 py-4 text-lg font-bold text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition hover:bg-secondary_two"
                >
                  <FaPhoneAlt />
                  Contact Us
                </Link>
              </li>
            </ul>

            <div
              data-menu-item
              className="mt-7 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
            >
              {data.phone && (
                <a
                  href={`tel:${data.phone}`}
                  className="flex min-w-0 items-center gap-3 text-sm text-white/70 transition hover:text-primary_light"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary_light/15 text-primary_light">
                    <FaPhoneAlt />
                  </span>

                  <span className="min-w-0 flex-1 truncate">{data.phone}</span>
                </a>
              )}

              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="mt-4 flex min-w-0 items-center gap-3 text-sm text-white/70 transition hover:text-primary_light"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary_light/15 text-primary_light">
                    <FaEnvelope />
                  </span>

                  <span className="min-w-0 flex-1 break-all leading-relaxed">
                    {data.email}
                  </span>
                </a>
              )}

              {data.address && (
                <p className="mt-4 flex min-w-0 items-start gap-3 text-sm leading-relaxed text-white/70">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary_light/15 text-primary_light">
                    <FaMapMarkerAlt />
                  </span>

                  <span className="min-w-0 flex-1 leading-relaxed">
                    {data.address}
                  </span>
                </p>
              )}
            </div>
          </div>

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
                    rel="noopener noreferrer"
                    aria-label="Visit MAH Audit Dubai on Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:border-primary_light hover:bg-primary"
                  >
                    <FaFacebookF />
                  </Link>
                )}

                {data.linkedin && (
                  <Link
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit MAH Audit Dubai on LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:border-primary_light hover:bg-primary"
                  >
                    <FaLinkedinIn />
                  </Link>
                )}

                {data.instagram && (
                  <Link
                    href={data.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit MAH Audit Dubai on Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:border-primary_light hover:bg-primary"
                  >
                    <FaInstagram />
                  </Link>
                )}

                {data.youtube && (
                  <Link
                    href={data.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit MAH Audit Dubai on YouTube"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:border-primary_light hover:bg-primary"
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
