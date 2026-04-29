import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import SectionBadge from "./SectionBadge";

export default function WhyChooseUs({ data, points = [] }) {
  const whyChooseUs = data;

  if (!whyChooseUs) return null;

  const buttonHref =
    typeof whyChooseUs?.button_link === "string" &&
    whyChooseUs.button_link.trim() !== ""
      ? whyChooseUs.button_link.trim()
      : "/contact";

  const buttonText =
    typeof whyChooseUs?.button_text === "string" &&
    whyChooseUs.button_text.trim() !== ""
      ? whyChooseUs.button_text.trim()
      : "Contact Us Now";

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2 lg:gap-20">
        {whyChooseUs.image && (
          // <div className="relative">
          //   <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full border border-primary/20" />
          //   <div className="absolute -bottom-6 -right-6 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />

          //   <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
          //     <Image
          //       src={whyChooseUs.image}
          //       alt={whyChooseUs.title}
          //       fill
          //       className="object-cover w-full h-full"
          //       priority
          //     />

          //     <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent" />

          //     <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-md">
          //       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          //         <FaShieldAlt className="text-xl" />
          //       </div>

          //       <div>
          //         <p className="font-semibold text-secondary">
          //           Confidential by design
          //         </p>
          //         <p className="mt-1 text-sm leading-5 text-slate-600">
          //           Secure audit handling with clear reporting.
          //         </p>
          //       </div>
          //     </div>
          //   </div>

          //   {/* <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-secondary p-5 text-white shadow-2xl sm:block">
          //     <p className="text-3xl font-bold leading-none">UAE</p>
          //     <p className="mt-2 text-sm text-white/70">Compliance focused</p>
          //   </div> */}
          // </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full border border-primary/20" />
            <div className="absolute -bottom-6 -right-6 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative h-full min-h-[420px] md:min-h-[520px] lg:min-h-[600px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
              <Image
                src={whyChooseUs.image}
                alt={whyChooseUs.title || "Why choose us"}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaShieldAlt className="text-xl" />
                </div>

                <div>
                  <p className="font-semibold text-secondary">
                    {whyChooseUs?.overlay_title || "Confidential by design"}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {whyChooseUs?.overlay_description ||
                      "Secure audit handling with clear reporting."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={!whyChooseUs.image ? "md:col-span-2 max-w-3xl" : ""}>
          {whyChooseUs.subtitle && (
            <SectionBadge icon={FaStar} className="mb-5">
              {whyChooseUs.subtitle}
            </SectionBadge>
          )}

          {whyChooseUs.title && (
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-secondary sm:text-5xl">
              {whyChooseUs.title}
            </h2>
          )}

          {whyChooseUs.description && (
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              {whyChooseUs.description}
            </p>
          )}

          {points.length > 0 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                >
                  <FaCheckCircle className="mt-1 shrink-0 text-primary" />
                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}

          <Link
            href={whyChooseUs.button_link}
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
          >
            {whyChooseUs.button_text}
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// import { supabaseServer } from "@/lib/supabaseServer";
// import WhyChooseUsView from "./home/WhyChooseUsView";

// export default async function WhyChooseUs() {
//   const { data: whyChooseUs, error } = await supabaseServer
//     .from("why_choose_us")
//     .select("id, title, subtitle, description, image")
//     .order("created_at", { ascending: false })
//     .limit(1)
//     .maybeSingle();

//   if (error || !whyChooseUs) return null;

//   const { data: pointRows } = await supabaseServer
//     .from("why_choose_points")
//     .select("point")
//     .eq("why_id", whyChooseUs.id)
//     .order("created_at", { ascending: true });

//   const points = (pointRows || []).map((item) => item.point).filter(Boolean);

//   return <WhyChooseUsView data={whyChooseUs} points={points} />;
// }
