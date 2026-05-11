"use client";

import Slider from "react-slick";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SectionBadge from "../SectionBadge";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const defaultSectionData = {
  badge: "Testimonials",
  title: "What Our Clients Say",
  subtitle:
    "Trusted by businesses for delivering reliable audit, compliance, and financial advisory services.",
};

export const NextArrow = ({ onClick }) => {
  return (
    <button
      type="button"
      aria-label="Next testimonial"
      onClick={onClick}
      className="absolute -right-6 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-primary bg-white text-primary shadow-lg transition-all duration-500 hover:bg-primary hover:text-white"
    >
      <FaArrowRight />
    </button>
  );
};

export const PrevArrow = ({ onClick }) => {
  return (
    <button
      type="button"
      aria-label="Previous testimonial"
      onClick={onClick}
      className="absolute -left-6 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-primary bg-white text-primary shadow-lg transition-all duration-500 hover:bg-primary hover:text-white"
    >
      <FaArrowLeft />
    </button>
  );
};

export default function TestimonialsSection({
  testimonials = [],
  sectionData = null,
}) {
  const section = {
    ...defaultSectionData,
    ...(sectionData || {}),
  };

  const settings = {
    dots: true,
    infinite: testimonials.length > 3,
    autoplay: testimonials.length > 1,
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
          arrows: false,
        },
      },
    ],
  };

  const renderStars = (rating) => {
    const total = Math.min(Math.max(Number(rating) || 5, 1), 5);

    return [...Array(total)].map((_, i) => <FaStar key={i} />);
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <SectionBadge icon={FaQuoteLeft} className="mb-0">
              {section.badge}
            </SectionBadge>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {section.title}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            {section.subtitle}
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center text-gray-400">
            No testimonials found.
          </div>
        ) : (
          <div className="mt-16">
            <Slider {...settings}>
              {testimonials.map((item) => (
                <div key={item.id} className="px-4">
                  <div className="group relative h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                    <div className="mb-6 flex justify-between">
                      <div className="flex gap-1 text-[#C8A951]">
                        {renderStars(item.rating)}
                      </div>

                      <FaQuoteRight className="absolute -top-6 right-6 text-4xl text-primary/80 transition-all duration-500 group-hover:opacity-90 md:text-6xl" />
                    </div>

                    <p className="mb-8 leading-relaxed text-gray-600">
                      “{item.text}”
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary font-semibold text-white">
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
