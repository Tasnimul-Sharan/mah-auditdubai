"use client";

import Slider from "react-slick";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SectionBadge from "../SectionBadge";

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
  const testimonials = [
    {
      name: "David Thompson",
      role: "Financial Director",
      text: "The level of expertise and professionalism is unmatched. Highly recommended for compliance and audit services.",
    },
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Solutions",
      text: "Accurate, efficient, and extremely transparent throughout the audit process.",
    },
    {
      name: "John Vincent",
      role: "Business Owner",
      text: "Outstanding guidance and financial insights that improved our reporting standards.",
    },
    {
      name: "Michael Carter",
      role: "Managing Partner",
      text: "Exceptional advisory service with deep industry understanding.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center">
          {/* Badge */}
          <div className="mb-4 flex justify-center">
            <SectionBadge icon={FaQuoteLeft} className="mb-0">
              Testimonials
            </SectionBadge>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Clients Say
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Trusted by businesses for delivering reliable audit, compliance, and
            financial advisory services.
          </p>
        </div>

        <Slider {...settings}>
          {testimonials.map((item, i) => (
            <div key={i} className="px-4">
              <div
                className="group h-full bg-white p-8 rounded-3xl 
                border border-gray-100
                shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
                transition-all duration-500 hover:-translate-y-2"
              >
                {/* Top Row */}
                <div className="flex justify-between mb-6">
                  <div className="flex gap-1 text-[#C8A951]">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>

                  <FaQuoteRight className="md:text-5xl text-3xl text-primary opacity-20 group-hover:opacity-40 transition-all transform-gpu duration-500" />
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
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#0B1C2D]">
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
    </section>
  );
}
