"use client";

export default function EventMap() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[500px] rounded overflow-hidden border border-border_color">
        {/* Google Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.790976670633!2d-0.0831630233793412!3d51.517050671815426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb2f2edc5a7%3A0x3535268d3ce861b6!2s154%20Bishopsgate%2C%20London%20EC2M%204LN%2C%20UK!5e0!3m2!1sen!2sbd!4v1774501962827!5m2!1sen!2sbd"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Optional Overlay (Premium Look) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>
    </section>
  );
}
