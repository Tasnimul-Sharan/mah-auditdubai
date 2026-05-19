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

function formatStatValue(value, suffix = "") {
  const numericValue = Number(value) || 0;
  return `${numericValue.toLocaleString()}${suffix || ""}`;
}

export default function StatsSection({ stats = [] }) {
  if (!Array.isArray(stats) || stats.length === 0) return null;

  return (
    <section className="bg-secondary py-24 text-primary_light">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 text-center md:grid-cols-4">
          {stats.map((item) => {
            const Icon = iconMap[item.icon] || FaChartLine;

            return (
              <div key={item.id} className="group">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary_light/20 bg-primary_light/10 text-2xl text-primary_light transition-all duration-300 group-hover:scale-110 md:h-20 md:w-20 md:text-3xl">
                    <Icon />
                  </div>
                </div>

                <p className="text-4xl font-bold text-primary_light md:text-5xl">
                  {formatStatValue(item.value, item.suffix)}
                </p>

                <p className="mt-3 text-gray-300">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
