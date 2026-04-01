"use client";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
  FaIndustry,
  FaUserTie,
  FaMapMarkerAlt,
  FaArrowRight,
  FaEnvelopeOpen,
} from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";
import SectionBadge from "./SectionBadge";

export default function ContactSection() {
  return (
    <main className="bg-gradient-to-b from-white via-sky-50/40 to-white">
      {/* ================= Header ================= */}
      <section>
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          {/* <span
            className="inline-block px-4 py-2 mb-5 text-sm font-medium tracking-wide
                           text-sky-700 bg-sky-100 rounded-full border border-sky-200"
          >
            Trusted Audit & Advisory Experts
          </span> */}
          <div className="mb-4">
            <SectionBadge icon={FaEnvelope} className="mb-0">
              Trusted Audit & Advisory Experts
            </SectionBadge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Let’s Start a Strategic Conversation
          </h1>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto text-lg">
            We help organizations maintain financial clarity, compliance, and
            strategic growth with industry-leading audit and advisory solutions.
          </p>
        </div>
      </section>

      {/* ================= Office Info ================= */}
      {/* ================= CONTACT CARDS (REPLACED OFFICE INFO) ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <ContactCard
            icon={<FaPhoneAlt />}
            title="Make An Inquiry"
            text="Speak with our experts directly."
            value="0207 100 3610"
          />

          <ContactCard
            icon={<FaEnvelopeOpen />}
            title="Email Us"
            text="Send us your inquiries."
            value="enquiries@mah.uk.com"
          />

          <ContactCard
            icon={<FaMapMarkerAlt />}
            title="Our Office"
            text="Visit our office location."
            value="2nd Floor, 154 Bishopsgate, London, EC2M 4LN"
          />
        </div>
      </section>

      {/* ================= Form + Map ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-sky-100">
            {/* Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.790976670633!2d-0.0831630233793412!3d51.517050671815426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb2f2edc5a7%3A0x3535268d3ce861b6!2s154%20Bishopsgate%2C%20London%20EC2M%204LN%2C%20UK!5e0!3m2!1sen!2sbd!4v1774501962827!5m2!1sen!2sbd"
              className="w-full h-full min-h-[460px] border-0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact Form */}
          <div
            className="bg-white/90 backdrop-blur border border-sky-100
                       p-10 rounded-2xl shadow-[0_10px_40px_rgba(2,132,199,0.08)]"
          >
            <h2 className="text-2xl font-semibold mb-8 text-slate-900">
              Send Us a Message
            </h2>

            {/* <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-slate-200 rounded-xl px-6 py-3
                            outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-slate-200 rounded-xl px-6 py-3
                            outline-none"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border border-slate-200 rounded-xl px-6 py-3
                            outline-none"
              />

              <button
                type="submit"
                className="bg-sky-600 text-white px-8 py-3 rounded-lg
                           font-medium hover:bg-sky-700 transition"
              >
                Send Message
              </button>
            </form> */}
            <form className="space-y-5">
              <Input label="Full Name" placeholder="Enter Your Name" />
              <Input label="Email" placeholder="Enter Email Address" required />
              <Input label="Subject" placeholder="Subject" />

              <div>
                <label className="text-sm font-medium">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full mt-1 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 transition-all transform duration-500"
                />
              </div>

              <button className="group flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition">
                Submit Form
                <FaArrowRight className="group-hover:translate-x-1 transition" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Contact Card */
function ContactCard({ icon, title, text, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl
          bg-primary/10 text-primary text-lg
          group-hover:scale-110 transition"
        >
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm mb-1">{text}</p>
          <p className="text-primary font-medium">{value}</p>
        </div>
      </div>
    </div>
  );
}

/* Input Field */
function Input({ label, placeholder, required }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full mt-1 px-6 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 transition-all transform duration-500"
      />
    </div>
  );
}
