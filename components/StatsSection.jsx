import Counter from "./Counter";

export default function StatsSection() {
  return (
    <section className="py-24 bg-[#0B1C2D] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#C8A951]">
              <Counter end={40} suffix="+" />
            </h3>
            <p className="mt-3 text-gray-300">Years of Experience</p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#C8A951]">
              <Counter end={150} suffix="+" />
            </h3>
            <p className="mt-3 text-gray-300">Countries Served</p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#C8A951]">
              <Counter end={30000} suffix="+" />
            </h3>
            <p className="mt-3 text-gray-300">Clients Served</p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#C8A951]">
              <Counter end={120} suffix="+" />
            </h3>
            <p className="mt-3 text-gray-300">Industry Awards</p>
          </div>
        </div>
      </div>
    </section>
  );
}