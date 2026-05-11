"use client";

import { motion } from "framer-motion";
import { FaEye, FaBullseye, FaCheckCircle } from "react-icons/fa";
import { fadeUp } from "@/Hooks/animations";

export default function VisionMission({ sections = [] }) {
  if (!Array.isArray(sections) || sections.length === 0) return null;

  const icons = {
    vision: FaEye,
    mission: FaBullseye,
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-[48%] bg-[#f6f8fb]" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {sections.map((section, index) => {
            const Icon = icons[section.type] || FaEye;

            const points = Array.isArray(section.vision_mission_points)
              ? section.vision_mission_points
              : [];

            return (
              <motion.article
                key={section.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_26px_80px_rgba(15,23,42,0.12)] md:p-8"
              >
                <div className="absolute right-0 top-0 h-32 w-32 bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary transition group-hover:bg-primary group-hover:text-white">
                        <Icon />
                      </span>

                      <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-secondary md:text-3xl">
                          {section.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {section.description && (
                    <p className="mt-6 leading-relaxed text-gray-600">
                      {section.description}
                    </p>
                  )}

                  {points.length > 0 && (
                    <>
                      <div className="mt-7 h-px w-full bg-gray-100" />

                      <ul className="mt-7 space-y-3">
                        {points.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-start gap-3 rounded-lg bg-[#f8fafc] p-4 text-gray-700"
                          >
                            <FaCheckCircle className="mt-1 shrink-0 text-primary" />
                            <span>{item.point}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
