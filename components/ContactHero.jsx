import React from "react";

function StatCard({ number, label }) {
  return (
    <div className="group rounded-3xl border border-white/15 bg-white/10 px-6 py-6 text-center backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:bg-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
      <div className="text-3xl font-bold transition-transform duration-700 group-hover:scale-110">
        {number}
      </div>
      <div className="mt-1 text-sm opacity-80">{label}</div>
    </div>
  );
}

export default function ContactHero({ hero, stats }) {
  const heroData = {
    badge: hero?.badge || "Trusted Audit & Advisory Experts",
    title: hero?.title || "Let’s Start a Strategic Conversation",
    description:
      hero?.description ||
      "We help organizations maintain financial clarity, compliance, and strategic growth with industry-leading audit and advisory solutions.",
  };

  const statsData =
    stats?.length > 0
      ? stats
      : [
          { number: "40+", label: "Years Experience" },
          { number: "150+", label: "Countries Served" },
          { number: "30K+", label: "Trusted Clients" },
        ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary_two to-primary py-32 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-40 right-0 h-[380px] w-[650px] rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.12)]">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_rgba(255,255,255,0.7)]" />
          <span className="text-sm font-semibold">{heroData.badge}</span>
        </div>

        <h1 className="mx-auto mb-7 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          {heroData.title}
        </h1>

        <p className="mx-auto mb-14 max-w-3xl text-lg leading-8 text-white/85 md:text-xl">
          {heroData.description}
        </p>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
          {statsData.map((item, index) => (
            <StatCard key={index} number={item.number} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
