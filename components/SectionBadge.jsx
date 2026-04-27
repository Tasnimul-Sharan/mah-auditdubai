"use client";

export default function SectionBadge({ children, className = "" }) {
  return (
    <div
      className={`
      relative inline-flex items-center pl-12 pr-5 py-2.5 rounded-full
      bg-white/70 backdrop-blur-md
      border border-white/30
      shadow-[0_6px_25px_rgba(0,0,0,0.06)]
      ${className}
      `}
    >
      {/* subtle gradient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />

      {/* 👉 left side horizontal premium line */}
      <span
        className="
        absolute left-4 top-1/2 -translate-y-1/2
        w-6 h-[2px]
        bg-gradient-to-r from-primary to-primary/40
        rounded-full
        "
      />

      {/* text */}
      <span
        className="
        relative uppercase tracking-[0.32em]
        text-[11px] font-semibold
        text-gray-800
        "
      >
        {children}
      </span>
    </div>
  );
}
