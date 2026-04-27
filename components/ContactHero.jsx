import React from "react";

function StatCard({ number, label }) {
  return (
    <div
      className="bg-white/10 backdrop-blur-lg border border-secondary/20 text-center 
      rounded-2xl py-5 px-6 hover:bg-white/20 transition-all duration-300"
    >
      <div className="text-2xl font-bold">{number}</div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  );
}

export default function ContactHero() {
  return (
    <section className="relative py-32 text-secondary_two overflow-hidden bg-white/5">
      {/* grid texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-white/10 blur-3xl rounded-full" />

      <div className="relative custom-container text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
          <span className="text-sm font-medium">
            Trusted Audit & Advisory Experts
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Let’s Start a Strategic Conversation
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-12">
          We help organizations maintain financial clarity, compliance, and
          strategic growth with industry-leading audit and advisory solutions.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <StatCard number="40+" label="Years Experience" />
          <StatCard number="150+" label="Countries Served" />
          <StatCard number="30K+" label="Trusted Clients" />
        </div>
      </div>
    </section>
  );
}
