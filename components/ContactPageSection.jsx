"use client";

import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const icons = {
  phone: <FaPhoneAlt />,
  email: <FaEnvelope />,
  location: <FaMapMarkerAlt />,
};

export default function ContactPageSection({ contactInfo }) {
  const info = contactInfo || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const cards = info.cards || [
    {
      icon: "phone",
      title: "Make An Inquiry",
      text: "Speak with our experts directly.",
      value: "0207 100 3610",
    },
    {
      icon: "email",
      title: "Email Us",
      text: "Send us your inquiries.",
      value: "enquiries@mah.uk.com",
    },
    {
      icon: "location",
      title: "Our Office",
      text: "Visit our office location.",
      value: "2nd Floor, 154 Bishopsgate, London, EC2M 4LN",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(
          "Thank you for reaching out. Your message has been received successfully — our team will contact you shortly.",
        );
        e.target.reset();

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Unable to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F5FB] via-white to-[#F7F5FB] py-24">
      <div className="absolute -top-32 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[260px] w-[520px] rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        <div className="space-y-5">
          {cards.map((card, index) => (
            <ContactCard
              key={index}
              icon={icons[card.icon] || <FaMapMarkerAlt />}
              title={card.title}
              text={card.text}
              value={card.value}
            />
          ))}
        </div>

        <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.09)] backdrop-blur-xl md:p-10">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

          <div className="relative">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Contact Form
            </span>

            <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
              {info.form_title || "Send Us a Message"}
            </h2>

            <p className="mb-8 leading-relaxed text-gray-600">
              {info.form_subtitle ||
                "Have a question or need a consultation? Fill out the form below."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="hidden"
                name="access_key"
                value="f9e38912-0052-4a1a-913d-ab7767a062d2"
              />

              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter Your Name"
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter Email Address"
                required
              />

              <Input
                label="Subject"
                name="subject"
                type="text"
                placeholder="Subject"
              />

              <div>
                <label className="text-sm font-semibold text-gray-800">
                  Your Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Your Message"
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-white/80 p-4 outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]"
                />
              </div>

              {successMessage && (
                <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-white to-primary_light/10 px-5 py-4 shadow-[0_18px_45px_rgba(56,182,255,0.18)]">
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />

                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute -bottom-12 left-16 h-24 w-24 rounded-full bg-secondary/5 blur-2xl" />

                  <div className="relative flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_25px_rgba(56,182,255,0.35)] ring-4 ring-primary/10">
                      <FaCheckCircle className="text-lg" />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-secondary">
                        Message Sent Successfully
                      </h4>

                      <p className="mt-1 text-sm leading-relaxed text-secondary_two">
                        {successMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="relative overflow-hidden rounded-2xl border border-red-200/70 bg-gradient-to-r from-red-50 via-white to-red-50 px-5 py-4 shadow-[0_18px_45px_rgba(239,68,68,0.18)]">
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-red-500" />

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-[0_10px_25px_rgba(239,68,68,0.35)]">
                      <FaExclamationCircle className="text-lg" />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Error</h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-7 py-3.5 font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,0,0,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-r from-primary via-primary/80 to-secondary" />
                <span className="relative z-10">
                  {isSubmitting
                    ? "Sending..."
                    : info.button_text || "Submit Form"}
                </span>
                <FaArrowRight className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, text, value }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_16px_45px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(0,0,0,0.11)]">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-primary/8 via-white to-secondary/8" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg text-primary transition-all duration-700 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="mb-2 text-sm text-gray-600">{text}</p>
          <p className="font-semibold text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, type = "text", placeholder, required }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-gray-200 bg-white/80 p-4 outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]"
      />
    </div>
  );
}
