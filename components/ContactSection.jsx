"use client";

import {
  FaPhoneAlt,
  FaEnvelopeOpen,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import SectionBadge from "./SectionBadge";

export default function ContactSection({ data }) {
  const hero = data?.hero || {};
  const cards = data?.contact_info || [];

  return (
    <main className="bg-gradient-to-b from-white via-sky-50/40 to-white">
      <section>
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <div className="mb-4">
            <SectionBadge>{hero.badge || "Trusted Experts"}</SectionBadge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            {hero.title || "Let’s Start a Strategic Conversation"}
          </h1>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto text-lg">
            {hero.description || "We help businesses grow with clarity."}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.length > 0 ? (
            cards.map((card, i) => (
              <ContactCard
                key={i}
                type={card.icon}
                title={card.title}
                text={card.text}
                value={card.value}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-3">
              No contact info found
            </p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="rounded-[2rem] overflow-hidden border border-sky-100 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <iframe
              src={
                data?.map_url ||
                "https://maps.google.com/maps?q=dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
              }
              className="w-full h-full min-h-[460px]"
              loading="lazy"
            />
          </div>

          <div className="bg-white p-10 rounded-[2rem] border border-sky-100 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-semibold mb-8 text-slate-900">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <Input label="Full Name" placeholder="Enter Your Name" />
              <Input label="Email" placeholder="Enter Email" required />
              <Input label="Subject" placeholder="Subject" />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full p-4 border border-gray-200 rounded-2xl outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(14,165,233,0.10)]"
              />

              <button className="group flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-secondary">
                Submit
                <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({ type, title, text, value }) {
  const { Icon, box, label } = getCardIcon(type, title, value);

  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-sky-100/70" />

      <div className="relative flex items-start gap-5">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl shadow-sm transition-all duration-700 group-hover:scale-110 ${box}`}
        >
          <Icon />
        </div>

        <div>
          <span className="mb-1 inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            {label}
          </span>

          <h3 className="text-xl font-bold text-slate-900">{title}</h3>

          <p className="mt-1 text-sm text-slate-500">{text}</p>

          <p className="mt-1 font-semibold text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
}

function getCardIcon(type = "", title = "", value = "") {
  const t = `${type} ${title} ${value}`.toLowerCase().trim();

  if (
    t.includes("phone") ||
    t.includes("call") ||
    t.includes("mobile") ||
    t.includes("inquiry") ||
    t.includes("0207")
  ) {
    return {
      Icon: FaPhoneAlt,
      label: "Phone",
      box: "bg-primary text-white group-hover:bg-secondary group-hover:text-white",
    };
  }

  if (
    t.includes("email") ||
    t.includes("mail") ||
    t.includes("enquiries") ||
    t.includes("@")
  ) {
    return {
      Icon: FaEnvelopeOpen,
      label: "Email",
      box: "bg-primary text-white group-hover:bg-secondary group-hover:text-white",
    };
  }

  if (
    t.includes("location") ||
    t.includes("address") ||
    t.includes("office") ||
    t.includes("map") ||
    t.includes("bishopsgate") ||
    t.includes("london")
  ) {
    return {
      Icon: FaMapMarkerAlt,
      label: "Office",
      box: "bg-primary/50 text-white group-hover:bg-secondary group-hover:text-white",
    };
  }

  return {
    Icon: FaPhoneAlt,
    label: "Contact",
    box: "bg-primary text-white group-hover:bg-secondary group-hover:text-white",
  };
}

function Input({ label, placeholder, required }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full mt-1 p-4 border border-gray-200 rounded-2xl outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(14,165,233,0.10)]"
      />
    </div>
  );
}
