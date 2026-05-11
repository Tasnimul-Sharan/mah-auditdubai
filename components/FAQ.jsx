"use client";

import { useRef, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function FAQ({ faqData = null }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = {
    title: faqData?.title || "Frequently Asked Questions",
    faqs: Array.isArray(faqData?.faqs) ? faqData.faqs : [],
  };

  const answerRefs = useRef([]);

  if (!data.faqs.length) return null;

  const expand = (index) => {
    const el = answerRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    el.style.display = "block";

    gsap.fromTo(
      el,
      { height: 0, opacity: 0, y: -6 },
      {
        height: el.scrollHeight,
        opacity: 1,
        y: 0,
        duration: 0.42,
        ease: "power2.out",
        onComplete: () => {
          el.style.height = "auto";
        },
      },
    );
  };

  const collapse = (index, cb) => {
    const el = answerRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);

    gsap.to(el, {
      height: 0,
      opacity: 0,
      y: -6,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        el.style.display = "none";
        if (cb) cb();
      },
    });
  };

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      collapse(index);
      setActiveIndex(null);
      return;
    }

    if (activeIndex !== null) {
      collapse(activeIndex, () => {
        expand(index);
        setActiveIndex(index);
      });
      return;
    }

    expand(index);
    setActiveIndex(index);
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f8fb] py-16 md:py-24">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-secondary p-6 text-white shadow-xl md:p-8 lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-primary">
              <span className="h-px w-10 bg-primary" />
              FAQ
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
              {data.title}
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/10 p-5">
                <p className="text-4xl font-bold">{data.faqs.length}</p>
                <p className="mt-1 text-sm text-white/60">Questions</p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <p className="text-4xl font-bold">24h</p>
                <p className="mt-1 text-sm text-white/60">Response focus</p>
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-white/65">
              Find quick answers about our audit, advisory, compliance, and
              reporting process in Dubai.
            </p>
          </motion.div>

          <div className="space-y-4">
            {data.faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={`${faq.question}-${index}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ${
                    isActive
                      ? "border-primary/40 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                      : "border-gray-200 hover:border-primary/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isActive}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-start gap-4 p-5 text-left md:p-6"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 pt-1">
                      <span
                        className={`block text-lg font-bold leading-snug transition md:text-xl ${
                          isActive ? "text-primary" : "text-secondary"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                        isActive
                          ? "bg-secondary text-white"
                          : "bg-gray-100 text-secondary hover:bg-primary hover:text-white"
                      }`}
                    >
                      {isActive ? (
                        <AiOutlineMinus className="text-lg" />
                      ) : (
                        <AiOutlinePlus className="text-lg" />
                      )}
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    ref={(el) => (answerRefs.current[index] = el)}
                    className="hidden h-0 overflow-hidden px-5 md:px-6"
                    style={{ opacity: 0 }}
                  >
                    <div className="border-t border-gray-100 pb-6 pt-4 md:ml-[60px]">
                      <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
