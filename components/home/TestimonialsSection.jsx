// "use client";

// import { useEffect, useState } from "react";
// import Slider from "react-slick";
// import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { supabaseServer } from "@/lib/supabaseServer";
// import SectionBadge from "../SectionBadge";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export const NextArrow = ({ onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="absolute -right-6 top-1/2 -translate-y-1/2 z-10
//       w-12 h-12 flex items-center justify-center rounded-full bg-white
//       shadow-lg border border-primary text-primary cursor-pointer
//       hover:bg-primary hover:text-white transition-all transform-gpu duration-500"
//     >
//       <FaArrowRight />
//     </div>
//   );
// };

// export const PrevArrow = ({ onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="absolute -left-6 top-1/2 -translate-y-1/2 z-10
//       w-12 h-12 flex items-center justify-center rounded-full bg-white
//       shadow-lg border border-primary text-primary cursor-pointer
//       hover:bg-primary hover:text-white transition-all transform-gpu duration-500"
//     >
//       <FaArrowLeft />
//     </div>
//   );
// };

// export default function TestimonialsSection() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTestimonials = async () => {
//     try {
//       const { data, error } = await supabaseServer
//         .from("testimonials")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (error) throw error;

//       setTestimonials(data || []);
//     } catch (err) {
//       console.error("Testimonials fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: testimonials.length > 3,
//     autoplay: true,
//     speed: 600,
//     autoplaySpeed: 3500,
//     slidesToShow: Math.min(testimonials.length || 1, 3),
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: Math.min(testimonials.length || 1, 2),
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <section className="py-28 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center">
//           <div className="mb-4 flex justify-center">
//             <SectionBadge icon={FaQuoteLeft} className="mb-0">
//               Testimonials
//             </SectionBadge>
//           </div>

//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//             What Our Clients Say
//           </h2>

//           <p className="text-gray-500 mt-4 max-w-xl mx-auto">
//             Trusted by businesses for delivering reliable audit, compliance, and
//             financial advisory services.
//           </p>
//         </div>

//         {loading ? (
//           <p className="text-center mt-12 text-gray-500">Loading...</p>
//         ) : testimonials.length === 0 ? (
//           <p className="text-center mt-12 text-gray-500">
//             No testimonials found.
//           </p>
//         ) : (
//           <div className="mt-16">
//             <Slider {...settings}>
//               {testimonials.map((item) => (
//                 <div key={item.id} className="px-4">
//                   <div
//                     className="group relative h-full bg-white p-8 rounded-3xl
//                     border border-gray-100
//                     shadow-[0_10px_30px_rgba(0,0,0,0.05)]
//                     hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
//                     transition-all duration-500 hover:-translate-y-2"
//                   >
//                     <div className="flex justify-between mb-6">
//                       <div className="flex gap-1 text-[#C8A951]">
//                         {[...Array(item.rating || 5)].map((_, i) => (
//                           <FaStar key={i} />
//                         ))}
//                       </div>

//                       <FaQuoteRight
//                         className="absolute -top-6 right-6
//                         md:text-6xl text-4xl text-primary/80
//                         group-hover:opacity-90 transition-all duration-500"
//                       />
//                     </div>

//                     <p className="text-gray-600 leading-relaxed mb-8">
//                       “{item.text}”
//                     </p>

//                     <div className="flex items-center gap-4">
//                       <div
//                         className="w-12 h-12 rounded-full bg-gradient-to-r
//                         from-primary to-primary flex items-center
//                         justify-center text-white font-semibold"
//                       >
//                         {item.name?.charAt(0)}
//                       </div>

//                       <div>
//                         <h4 className="font-semibold text-secondary">
//                           {item.name}
//                         </h4>
//                         <p className="text-sm text-gray-500">{item.role}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { supabaseServer } from "@/lib/supabaseServer";
import SectionBadge from "../SectionBadge";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const NextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute -right-6 top-1/2 -translate-y-1/2 z-10
      w-12 h-12 flex items-center justify-center
      rounded-full bg-white shadow-lg border border-primary text-primary
      cursor-pointer hover:bg-primary hover:text-white transition-all transform-gpu duration-500"
    >
      <FaArrowRight />
    </div>
  );
};

export const PrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute -left-6 top-1/2 -translate-y-1/2 z-10
      w-12 h-12 flex items-center justify-center
      rounded-full bg-white shadow-lg border border-primary text-primary
      cursor-pointer hover:bg-primary hover:text-white transition-all transform-gpu duration-500"
    >
      <FaArrowLeft />
    </div>
  );
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [sectionData, setSectionData] = useState({
    badge: "",
    title: "",
    subtitle: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabaseServer
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setTestimonials(data || []);

      if (data?.length > 0) {
        setSectionData({
          badge: data[0]?.badge || "Testimonials",
          title: data[0]?.section_title || "What Our Clients Say",
          subtitle:
            data[0]?.section_subtitle ||
            "Trusted by businesses for delivering reliable audit, compliance, and financial advisory services.",
        });
      }
    } catch (err) {
      console.error("Testimonials fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: testimonials.length > 3,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3500,
    slidesToShow: Math.min(testimonials.length || 1, 3),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(testimonials.length || 1, 2),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderStars = (rating) => {
    const total = Math.min(Math.max(Number(rating) || 5, 1), 5);

    return [...Array(total)].map((_, i) => <FaStar key={i} />);
  };

  return (
    <section className="py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <SectionBadge icon={FaQuoteLeft} className="mb-0">
              {sectionData.badge || "Testimonials"}
            </SectionBadge>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {sectionData.title || "What Our Clients Say"}
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            {sectionData.subtitle ||
              "Trusted by businesses for delivering reliable audit, compliance, and financial advisory services."}
          </p>
        </div>

        {loading ? (
          <p className="text-center mt-12 text-gray-500">Loading...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center mt-12 text-gray-500">
            No testimonials found.
          </p>
        ) : (
          <div className="mt-16">
            <Slider {...settings}>
              {testimonials.map((item) => (
                <div key={item.id} className="px-4">
                  <div
                    className="group relative h-full bg-white p-8 rounded-3xl 
                    border border-gray-100
                    shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                    hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
                    transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Top Row */}
                    <div className="flex justify-between mb-6">
                      <div className="flex gap-1 text-[#C8A951]">
                        {renderStars(item.rating)}
                      </div>

                      <FaQuoteRight
                        className="absolute -top-6 right-6
                        md:text-6xl text-4xl
                        text-primary/80
                        group-hover:opacity-90
                        transition-all duration-500"
                      />
                    </div>

                    {/* Text */}
                    <p className="text-gray-600 leading-relaxed mb-8">
                      “{item.text}”
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full bg-gradient-to-r 
                        from-primary to-primary flex items-center 
                        justify-center text-white font-semibold"
                      >
                        {item.name?.charAt(0) || "U"}
                      </div>

                      <div>
                        <h4 className="font-semibold text-secondary">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}
