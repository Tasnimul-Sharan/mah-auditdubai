import Counter from "./Counter";
import { FaBriefcase, FaGlobe, FaUsers, FaAward } from "react-icons/fa";

export default function StatsSection() {
  return (
    <section className="py-24 bg-[#0B1C2D] text-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          {/* Experience */}
          <div className="group">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl flex items-center justify-center rounded-xl bg-primary/5 border border-primary/10 text-primary group-hover:scale-110 transition-all duration-300">
                <FaBriefcase />
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <Counter end={40} suffix="+" />
            </h3>
            <p className="mt-3 text-gray-300">Years of Experience</p>
          </div>

          {/* Countries */}
          <div className="group">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl flex items-center justify-center rounded-xl bg-primary/5 border border-primary/10 text-primary group-hover:scale-110 transition-all duration-300">
                <FaGlobe />
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <Counter end={150} suffix="+" />
            </h3>
            <p className="mt-3 text-gray-300">Countries Served</p>
          </div>

          {/* Clients */}
          <div className="group">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl flex items-center justify-center rounded-xl bg-primary/5 border border-primary/10 text-primary group-hover:scale-110 transition-all duration-300">
                <FaUsers />
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <Counter end={30000} suffix="+" />
            </h3>
            <p className="mt-3 text-gray-300">Clients Served</p>
          </div>

          {/* Awards */}
          <div className="group">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl flex items-center justify-center rounded-xl bg-primary/5 border border-primary/10 text-primary group-hover:scale-110 transition-all duration-300">
                <FaAward />
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <Counter end={120} suffix="+" />
            </h3>
            <p className="mt-3 text-gray-300">Industry Awards</p>
          </div>
        </div>
      </div>
    </section>
  );
}
