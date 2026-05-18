"use client";

import { useEffect, useRef, useState } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTimes,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import SectionBadge from "./SectionBadge";

export default function TeamSection({ section, members = [] }) {
  const [selectedMember, setSelectedMember] = useState(null);

  const getSocialIcon = (type = "") => {
    const t = String(type).toLowerCase();

    if (t === "facebook") return <FaFacebookF />;
    if (t === "linkedin") return <FaLinkedinIn />;
    if (t === "instagram") return <FaInstagram />;
    if (t === "twitter" || t === "x") return <FaXTwitter />;

    return null;
  };

  const getSocials = (socials) => {
    if (Array.isArray(socials)) return socials;

    if (typeof socials === "string") {
      try {
        const parsed = JSON.parse(socials);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    return [];
  };

  return (
    <>
      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <SectionBadge>
                {section?.badge || "Meet Our Leadership"}
              </SectionBadge>
            </div>

            <h2 className="text-4xl font-bold leading-tight text-secondary md:text-5xl">
              {section?.title || "Our Expert Team"}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
              {section?.subtitle ||
                "Professional audit & advisory specialists guiding your business growth."}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {members.map((member) => {
              const socials = getSocials(member.socials);

              return (
                <div
                  key={member.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(15,23,42,0.14)]"
                >
                  <div className="relative overflow-hidden rounded-[1.6rem] bg-slate-100">
                    <div className="relative h-[500px]">
                      <OptimizedImage
                        src={member.image || "/team/default.jpg"}
                        alt={member.name || "Team member"}
                        fill
                        width={700}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/75 via-secondary/5 to-transparent" />

                      <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        {member.role || "Team Member"}
                      </div>
                    </div>

                    <div className="absolute inset-x-5 bottom-5">
                      <div className="rounded-3xl border border-white/40 bg-white/95 p-5 shadow-xl backdrop-blur-xl">
                        <h3 className="text-xl font-bold text-secondary">
                          {member.name}
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-primary">
                          {member.role}
                        </p>

                        <div className="mt-5 flex items-center justify-between gap-4">
                          <div className="flex gap-3">
                            {socials.map((s, i) => (
                              <SocialIcon key={i} href={s.url} type={s.type}>
                                {getSocialIcon(s.type)}
                              </SocialIcon>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedMember(member)}
                            className="rounded-xl bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-secondary"
                          >
                            {section?.read_more_text || "Read More"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedMember && (
        <TeamModal
          member={selectedMember}
          socials={getSocials(selectedMember.socials)}
          getSocialIcon={getSocialIcon}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
}

function TeamModal({ member, socials, getSocialIcon, onClose }) {
  const contentRef = useRef(null);

  const bioText =
    member.bio ||
    member.details ||
    member.description ||
    "Detailed profile information for this team member will be updated soon.";

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  const handleModalWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!contentRef.current) return;

    contentRef.current.scrollBy({
      top: e.deltaY,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
      onWheel={handleModalWheel}
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_120px_rgba(0,0,0,0.35)] md:grid-cols-[0.95fr_1.15fr]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-secondary shadow-lg transition-all duration-500 hover:bg-primary hover:text-white"
        >
          <FaTimes />
        </button>

        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#EEF6FB] md:min-h-[620px]">
          <div className="absolute left-0 top-0 h-40 w-full bg-gradient-to-b from-primary/10 via-white/40 to-transparent" />
          <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-secondary/20 via-transparent to-transparent" />

          <div className="relative h-full w-full">
            <OptimizedImage
              src={member.image || "/team/default.jpg"}
              alt={member.name || "Team member"}
              fill
              width={900}
              sizes="(max-width: 768px) 100vw, 45vw"
              className="h-full w-full object-cover object-top"
              priority
            />
          </div>
        </div>

        <div
          ref={contentRef}
          className="max-h-[92vh] overflow-y-auto overscroll-contain p-7 pr-5 md:p-10 md:pr-7"
          onWheel={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!contentRef.current) return;

            contentRef.current.scrollBy({
              top: e.deltaY,
              behavior: "smooth",
            });
          }}
        >
          <div className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Leadership Profile
          </div>

          <h3 className="text-3xl font-bold leading-tight text-secondary md:text-4xl">
            {member.name}
          </h3>

          <p className="mt-2 text-base font-semibold text-primary">
            {member.role}
          </p>

          <div className="my-7 h-px w-full bg-slate-200" />

          <div className="space-y-5">
            {formatBio(bioText).map((paragraph, index) => (
              <p
                key={index}
                className="text-[15px] leading-8 text-slate-600 md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {socials.length > 0 && (
            <div className="mt-9 border-t border-slate-200 pt-7">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                Connect
              </p>

              <div className="flex flex-wrap gap-3">
                {socials.map((s, i) => (
                  <SocialIcon key={i} href={s.url} type={s.type}>
                    {getSocialIcon(s.type)}
                  </SocialIcon>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatBio(text = "") {
  return String(text)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function SocialIcon({ href, type, children }) {
  if (!href || !children) return null;

  const platform = String(type || "social profile").trim();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit team member ${platform} profile`}
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 hover:-translate-y-1 hover:bg-primary hover:text-white"
    >
      {children}
    </a>
  );
}
