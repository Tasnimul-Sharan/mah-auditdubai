import { FaShieldAlt, FaChartLine, FaUserTie, FaGlobe } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import SectionBadge from "./SectionBadge";

const iconMap = {
  FaShieldAlt: FaShieldAlt,
  FaChartLine: FaChartLine,
  FaUserTie: FaUserTie,
  FaGlobe: FaGlobe,

  shield: FaShieldAlt,
  chart: FaChartLine,
  user: FaUserTie,
  globe: FaGlobe,
};

const defaultIcons = [FaShieldAlt, FaChartLine, FaUserTie, FaGlobe];

export default function WhyUs({ whyUs }) {
  const data = whyUs;

  if (!data) return null;

  const points = Array.isArray(data.points) ? data.points : [];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="absolute -top-32 left-1/2 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <SectionBadge icon={FaShield}>
              {data.subtitle || "Why Choose Us"}
            </SectionBadge>
          </div>

          {data.title && (
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {data.title}
            </h2>
          )}

          {data.description && (
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((item, i) => {
            const Icon =
              iconMap[item?.icon] || defaultIcons[i % defaultIcons.length];

            return (
              <div
                key={i}
                className="group rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary group-hover:bg-primary group-hover:text-white transition-all transform duration-500">
                  <Icon />
                </div>

                {item.text && (
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {item.text}
                  </h3>
                )}

                {item.desc && (
                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
