"use client";

import { useEffect, useState } from "react";
import Counter from "./Counter";
import {
  FaBriefcase,
  FaGlobe,
  FaUsers,
  FaAward,
  FaChartLine,
} from "react-icons/fa";
import { supabaseServer } from "@/lib/supabaseServer";

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

export default function StatsSection() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data, error } = await supabaseServer
      .from("stats")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Stats fetch error:", error);
      return;
    }

    setStats(data || []);
  };

  if (!stats.length) return null;

  return (
    <section className="py-24 bg-secondary text-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          {stats.map((item) => {
            const Icon = iconMap[item.icon] || FaChartLine;

            return (
              <div key={item.id} className="group">
                <div className="flex justify-center mb-4">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl
                    flex items-center justify-center rounded-xl
                    bg-primary/5 border border-primary/10 text-primary
                    group-hover:scale-110 transition-all duration-300"
                  >
                    <Icon />
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-primary">
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