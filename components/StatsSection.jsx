"use client";

import Counter from "./Counter";
import {
  FaBriefcase,
  FaGlobe,
  FaUsers,
  FaAward,
  FaChartLine,
} from "react-icons/fa";

const iconMap = {
  briefcase: FaBriefcase,
  globe: FaGlobe,
  users: FaUsers,
  award: FaAward,
  chart: FaChartLine,

  FaBriefcase: FaBriefcase,
  FaGlobe: FaGlobe,
  FaUsers: FaUsers,
  FaAward: FaAward,
  FaChartLine: FaChartLine,
};

export default function StatsSection({ stats = [] }) {
  if (!Array.isArray(stats) || stats.length === 0) return null;

  return (
    <section className="bg-secondary py-24 text-primary">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 text-center md:grid-cols-4">
          {stats.map((item) => {
            const Icon = iconMap[item.icon] || FaChartLine;

            return (
              <div key={item.id} className="group">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-2xl text-primary transition-all duration-300 group-hover:scale-110 md:h-20 md:w-20 md:text-3xl">
                    <Icon />
                  </div>
                </div>

                <h3 className="text-4xl font-bold text-primary md:text-5xl">
                  <Counter
                    end={Number(item.value) || 0}
                    suffix={item.suffix || ""}
                  />
                </h3>

                <p className="mt-3 text-gray-300">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
