import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import SectionBadge from "./SectionBadge";
import { FaXTwitter } from "react-icons/fa6";

export default function TeamSection({ section, members = [] }) {
  const getSocialIcon = (type = "") => {
    const t = type.toLowerCase();

    if (t === "facebook") return <FaFacebookF />;
    if (t === "linkedin") return <FaLinkedinIn />;
    if (t === "instagram") return <FaInstagram />;
    if (t === "twitter" || t === "x") return <FaXTwitter />;

    return null;
  };

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
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

        {/* MEMBERS */}
        <div className="grid gap-8 md:grid-cols-3">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(15,23,42,0.14)]"
            >
              <div className="relative overflow-hidden rounded-[1.6rem] bg-slate-100">
                <div className="relative h-[500px]">
                  <Image
                    src={member.image || "/team/default.jpg"}
                    alt={member.name}
                    fill
                    className={`object-cover ${
                      member.position || "object-center"
                    } transition duration-700 group-hover:scale-105`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/75 via-secondary/5 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    {member.role || "Team Member"}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="absolute inset-x-5 bottom-5">
                  <div className="rounded-3xl border border-white/40 bg-white/95 p-5 shadow-xl backdrop-blur-xl">
                    <h3 className="text-xl font-bold text-secondary">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-primary">
                      {member.role}
                    </p>

                    {/* SOCIALS */}
                    <div className="mt-5 flex gap-3">
                      {member.socials?.map((s, i) => (
                        <SocialIcon key={i} href={s.url}>
                          {getSocialIcon(s.type)}
                        </SocialIcon>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 hover:-translate-y-1 hover:bg-primary hover:text-white"
    >
      {children}
    </a>
  );
}
