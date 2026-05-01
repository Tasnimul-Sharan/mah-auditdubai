"use client";

export default function EventMap({ mapUrl }) {
  return (
    <section className="w-full">
      <div className="relative w-full h-[500px] rounded overflow-hidden border border-border_color">
        <iframe
          src={mapUrl || ""}
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>
    </section>
  );
}