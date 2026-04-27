// "use client";

// import { useEffect, useRef, useState } from "react";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default function FAQ() {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [faqData, setFaqData] = useState({
//     title: "",
//     faqs: [],
//   });

//   const answerRefs = useRef([]);

//   // ================= FETCH FAQ FROM DATABASE =================
//   const fetchFAQ = async () => {
//     const { data, error } = await supabaseServer
//       .from("faq")
//       .select("*")
//       .single();

//     if (error) {
//       console.error("FAQ Fetch Error:", error.message);
//       return;
//     }

//     if (data) {
//       setFaqData({
//         title: data.title,
//         faqs: data.faqs || [],
//       });
//     }
//   };

//   useEffect(() => {
//     fetchFAQ();
//   }, []);

//   // ================= TOGGLE FAQ =================
//   const toggleFAQ = (index) => {
//     if (activeIndex === index) {
//       collapse(index);
//       setActiveIndex(null);
//     } else {
//       if (activeIndex !== null) {
//         collapse(activeIndex, () => {
//           expand(index);
//           setActiveIndex(index);
//         });
//       } else {
//         expand(index);
//         setActiveIndex(index);
//       }
//     }
//   };

//   // ================= EXPAND =================
//   const expand = (index) => {
//     const el = answerRefs.current[index];
//     if (!el) return;

//     gsap.killTweensOf(el);
//     el.style.display = "block";

//     gsap.fromTo(
//       el,
//       {
//         height: 0,
//         opacity: 0,
//       },
//       {
//         height: el.scrollHeight,
//         opacity: 1,
//         duration: 0.45,
//         ease: "power2.out",
//         onComplete: () => {
//           el.style.height = "auto";
//         },
//       },
//     );
//   };

//   // ================= COLLAPSE =================
//   const collapse = (index, cb) => {
//     const el = answerRefs.current[index];
//     if (!el) return;

//     gsap.killTweensOf(el);

//     gsap.to(el, {
//       height: 0,
//       opacity: 0,
//       duration: 0.35,
//       ease: "power2.inOut",
//       onComplete: () => {
//         el.style.display = "none";
//         if (cb) cb();
//       },
//     });
//   };

//   return (
//     <section className="relative max-w-4xl mx-auto py-20 px-6">
//       {/* Background blur */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/10 blur-[100px] opacity-30 pointer-events-none" />

//       {/* Heading */}
//       <motion.h2
//         className="text-center text-3xl md:text-4xl font-bold mb-14 text-soft_black"
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//       >
//         {faqData.title}
//       </motion.h2>

//       {/* FAQ LIST */}
//       <div className="space-y-5">
//         {faqData.faqs.map((faq, index) => {
//           const isActive = activeIndex === index;

//           return (
//             <motion.div
//               key={index}
//               onClick={() => toggleFAQ(index)}
//               initial={{ opacity: 0, y: 25 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{
//                 duration: 0.4,
//                 delay: index * 0.05,
//               }}
//               className={`group cursor-pointer rounded-2xl border transition-all duration-300 ${
//                 isActive
//                   ? "border-primary bg-background shadow-sm"
//                   : "border-border_color bg-white hover:border-primary/50"
//               }`}
//             >
//               <div className="p-5 md:p-6">
//                 {/* Top Row */}
//                 <div className="flex items-start gap-4">
//                   {/* Index */}
//                   <span className="text-primary font-semibold text-sm tracking-widest">
//                     {String(index + 1).padStart(2, "0")}
//                   </span>

//                   {/* Question */}
//                   <div className="flex-1">
//                     <h3
//                       className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
//                         isActive
//                           ? "text-primary"
//                           : "text-soft_black group-hover:text-primary"
//                       }`}
//                     >
//                       {faq.question}
//                     </h3>
//                   </div>

//                   {/* Icon */}
//                   <span
//                     className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
//                       isActive
//                         ? "bg-primary text-white rotate-180"
//                         : "bg-background text-soft_black group-hover:bg-primary group-hover:text-white"
//                     }`}
//                   >
//                     <motion.div
//                       animate={{ rotate: isActive ? 180 : 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {isActive ? (
//                         <AiOutlineMinus className="text-lg" />
//                       ) : (
//                         <AiOutlinePlus className="text-lg" />
//                       )}
//                     </motion.div>
//                   </span>
//                 </div>

//                 {/* Divider */}
//                 <div
//                   className={`h-[1px] bg-border_color mt-4 mb-2 transition-all duration-300 ${
//                     isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
//                   }`}
//                 />

//                 {/* Answer */}
//                 <div
//                   ref={(el) => (answerRefs.current[index] = el)}
//                   className="pl-8 pr-2 text-secondary_two text-sm md:text-base leading-relaxed overflow-hidden"
//                   style={{
//                     height: 0,
//                     opacity: 0,
//                     display: "none",
//                   }}
//                 >
//                   {faq.answer}
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import gsap from "gsap";
import { supabaseServer } from "@/lib/supabaseServer";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqData, setFaqData] = useState({
    title: "",
    faqs: [],
  });

  const answerRefs = useRef([]);

  const fetchFAQ = async () => {
    const { data, error } = await supabaseServer
      .from("faq")
      .select("*")
      .single();

    if (error) {
      console.error("FAQ Fetch Error:", error.message);
      return;
    }

    if (data) {
      setFaqData({
        title: data.title,
        faqs: data.faqs || [],
      });
    }
  };

  useEffect(() => {
    fetchFAQ();
  }, []);

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

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24 rounded-2xl bg-secondary p-6 md:p-8 text-white shadow-xl"
          >
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-primary">
              <span className="h-px w-10 bg-primary" />
              FAQ
            </div>

            <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
              {faqData.title || "Frequently Asked Questions"}
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/10 p-5">
                <p className="text-4xl font-bold">{faqData.faqs.length}</p>
                <p className="mt-1 text-sm text-white/60">Questions</p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <p className="text-4xl font-bold">24h</p>
                <p className="mt-1 text-sm text-white/60">Response focus</p>
              </div>
            </div>

            <p className="mt-6 text-white/65 leading-relaxed">
              Find quick answers about our audit, advisory, compliance, and
              reporting process in Dubai.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={index}
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
                    className="flex w-full items-start gap-4 p-5 md:p-6 text-left"
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
                        className={`block text-lg md:text-xl font-bold leading-snug transition ${
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
                    ref={(el) => (answerRefs.current[index] = el)}
                    className="hidden h-0 overflow-hidden px-5 md:px-6"
                    style={{ opacity: 0 }}
                  >
                    <div className="border-t border-gray-100 pb-6 pt-4 md:ml-[60px]">
                      <p className="text-sm md:text-base leading-relaxed text-gray-600">
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
