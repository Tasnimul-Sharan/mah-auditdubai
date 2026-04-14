"use client";
import { FaCheckCircle } from "react-icons/fa";

export default function ServicesDetails({ service }) {
  const { hero, sections, footerNote } = service;

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* HERO */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {hero.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            {hero.description1}
          </p>

          <p className="text-gray-600 leading-relaxed">{hero.description2}</p>
        </div>

        {/* SECTIONS */}
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4">
              {section.title}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {section.description}
            </p>

            <div>
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 transition hover:bg-white hover:rounded-lg"
                >
                  <FaCheckCircle className="text-primary mt-1" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* FOOTER NOTE */}
        <div className="bg-white p-6 rounded-xl border text-gray-600 text-sm">
          {footerNote}
        </div>

        {/* PREMIUM CTA */}
        <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-primary via-primary_light to-secondary shadow-2xl">
          <div className="absolute inset-0 opacity-30 blur-2xl bg-gradient-to-r from-primary via-primary_light to-secondary"></div>

          <div className="relative bg-gradient-to-br from-secondary to-secondary_two text-white p-8 md:p-12 rounded-3xl flex flex-col gap-8">
            {/* TEXT */}
            <div className="max-w-xl space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                Request a{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Consultation
                </span>{" "}
                in Dubai
              </h2>

              <p className="text-white/80 leading-relaxed">
                Our specialists help uncover financial irregularities, trace
                transactions, and deliver confidential insights that protect
                your business.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <span>✔ Confidential</span>
                <span>✔ Expert Auditors</span>
                <span>✔ Fast Response</span>
              </div>
            </div>

            {/* CTA BOTTOM LEFT */}
            <div className="flex flex-col items-start gap-2">
              <button className="px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-primary to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg">
                Get Free Consultation
              </button>

              <p className="text-xs text-white/50">
                No obligation • 100% confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
