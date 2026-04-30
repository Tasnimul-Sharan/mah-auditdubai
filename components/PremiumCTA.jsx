import Link from "next/link";

export default function PremiumCTA({ data }) {
  if (!data) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-secondary px-8 py-16 text-center text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] md:p-16">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              {data.title || "Ready to Strengthen Your Compliance?"}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-gray-300">
              {data.subtitle ||
                "Partner with our experts and ensure financial clarity and confidence."}
            </p>

            <Link href={data.button_link || "/contact"}>
              <button className="mt-8 rounded-2xl bg-primary px-8 py-4 font-semibold text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:text-secondary">
                {data.button_text || "Book Consultation"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
