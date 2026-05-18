"use client";

import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelopeOpen,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import SectionBadge from "./SectionBadge";

export default function ContactSection({ data }) {
  const hero = data?.hero || {};
  const formContent = data?.form_content || {};
  const fields = formContent?.fields || {};

  const contactInfo = data?.contact_info || {};

  const cards = Array.isArray(contactInfo)
    ? contactInfo
    : Array.isArray(contactInfo?.cards)
      ? contactInfo.cards
      : [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formDataObject = new FormData(e.target);

    try {
      const response = await fetch(formContent?.endpoint, {
        method: "POST",
        body: formDataObject,
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(formContent?.success_message || "");
        e.target.reset();
      } else {
        setErrorMessage(formContent?.error_message || "");
      }

      clearMessages();
    } catch (error) {
      setErrorMessage(formContent?.network_error_message || "");
      clearMessages();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gradient-to-b from-white via-sky-50/40 to-white">
      <section>
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          {hero?.badge && (
            <div className="mb-4">
              <SectionBadge>{hero.badge}</SectionBadge>
            </div>
          )}

          {hero?.title && (
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              {hero.title}
            </h2>
          )}

          {hero?.description && (
            <p className="mt-5 text-slate-600 max-w-2xl mx-auto text-lg">
              {hero.description}
            </p>
          )}
        </div>
      </section>

      {cards.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <ContactCard
                key={i}
                type={card.icon}
                title={card.title}
                text={card.text}
                value={card.value}
              />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          {data?.map_url && (
            <div className="rounded-[2rem] overflow-hidden border border-sky-100 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <iframe
                src={data.map_url}
                title={hero?.title || "Location map"}
                className="w-full h-full min-h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}

          <div className="bg-white p-10 rounded-[2rem] border border-sky-100 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            {formContent?.badge && (
              <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {formContent.badge}
              </span>
            )}

            {formContent?.title && (
              <h2 className="text-2xl font-semibold mb-3 text-slate-900">
                {formContent.title}
              </h2>
            )}

            {formContent?.description && (
              <p className="mb-8 text-slate-500 leading-relaxed">
                {formContent.description}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {formContent?.access_key && (
                <input
                  type="hidden"
                  name="access_key"
                  value={formContent.access_key}
                />
              )}

              <Input
                label={fields?.name?.label}
                name="name"
                type="text"
                placeholder={fields?.name?.placeholder}
                required={fields?.name?.required}
              />

              <Input
                label={fields?.email?.label}
                name="email"
                type="email"
                placeholder={fields?.email?.placeholder}
                required={fields?.email?.required}
              />

              <Input
                label={fields?.subject?.label}
                name="subject"
                type="text"
                placeholder={fields?.subject?.placeholder}
                required={fields?.subject?.required}
              />

              <div>
                {fields?.message?.label && (
                  <label className="text-sm font-medium text-slate-700">
                    {fields.message.label}{" "}
                    {fields?.message?.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                )}

                <textarea
                  name="message"
                  rows="4"
                  required={!!fields?.message?.required}
                  placeholder={fields?.message?.placeholder || ""}
                  className="w-full mt-1 p-4 border border-gray-200 rounded-2xl outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(14,165,233,0.10)]"
                />
              </div>

              {successMessage && (
                <AlertBox
                  type="success"
                  title={formContent?.success_title}
                  message={successMessage}
                />
              )}

              {errorMessage && (
                <AlertBox
                  type="error"
                  title={formContent?.error_title}
                  message={errorMessage}
                />
              )}

              {formContent?.submit_text && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex min-h-11 items-center gap-3 rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? formContent?.submitting_text
                    : formContent?.submit_text}

                  <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              )}
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
          {label && (
            <span className="mb-1 inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              {label}
            </span>
          )}

          {title && (
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          )}

          {text && <p className="mt-1 text-sm text-slate-500">{text}</p>}

          {value && <p className="mt-1 font-semibold text-primary">{value}</p>}
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

function Input({ label, name, type = "text", placeholder, required }) {
  return (
    <div>
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        name={name}
        type={type}
        required={!!required}
        placeholder={placeholder || ""}
        className="w-full mt-1 p-4 border border-gray-200 rounded-2xl outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(14,165,233,0.10)]"
      />
    </div>
  );
}

function AlertBox({ type, title, message }) {
  const isSuccess = type === "success";
  const Icon = isSuccess ? FaCheckCircle : FaExclamationCircle;

  return (
    <div
      className={
        isSuccess
          ? "relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-white to-primary_light/10 px-5 py-4 shadow-[0_18px_45px_rgba(56,182,255,0.18)]"
          : "relative overflow-hidden rounded-2xl border border-red-200/70 bg-gradient-to-r from-red-50 via-white to-red-50 px-5 py-4 shadow-[0_18px_45px_rgba(239,68,68,0.18)]"
      }
    >
      <div
        className={
          isSuccess
            ? "absolute left-0 top-0 h-full w-1.5 bg-primary"
            : "absolute left-0 top-0 h-full w-1.5 bg-red-500"
        }
      />

      <div className="relative flex items-start gap-3">
        <div
          className={
            isSuccess
              ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_25px_rgba(56,182,255,0.35)] ring-4 ring-primary/10"
              : "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-[0_10px_25px_rgba(239,68,68,0.35)]"
          }
        >
          <Icon className="text-lg" />
        </div>

        <div>
          {title && (
            <p
              className={
                isSuccess
                  ? "text-sm font-bold text-secondary"
                  : "text-sm font-bold text-gray-900"
              }
            >
              {title}
            </p>
          )}

          {message && (
            <p
              className={
                isSuccess
                  ? "mt-1 text-sm leading-relaxed text-secondary_two"
                  : "mt-1 text-sm leading-relaxed text-gray-600"
              }
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
