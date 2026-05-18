"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaQuoteLeft,
  FaQuoteRight,
  FaStar,
} from "react-icons/fa";
import SectionBadge from "../SectionBadge";

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
      className="absolute -right-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-primary bg-white text-primary shadow-lg transition-all duration-500 hover:bg-primary hover:text-white md:flex"
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
      className="absolute -left-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-primary bg-white text-primary shadow-lg transition-all duration-500 hover:bg-primary hover:text-white md:flex"
    >
      <FaArrowLeft />
    </button>
  );
};

function getSlidesPerView() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function TestimonialsSection({
  testimonials = [],
  sectionData = null,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const section = {
    ...defaultSectionData,
    ...(sectionData || {}),
  };

  const maxIndex = Math.max(testimonials.length - slidesPerView, 0);
  const canSlide = testimonials.length > slidesPerView;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(getSlidesPerView());
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!canSlide) return undefined;

    const intervalId = window.setInterval(goNext, 3500);

    return () => window.clearInterval(intervalId);
  }, [canSlide, goNext]);

  const dots = useMemo(
    () => Array.from({ length: maxIndex + 1 }, (_, index) => index),
    [maxIndex],
  );

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
          <div className="relative mt-16">
            {canSlide && <PrevArrow onClick={goPrev} />}
            {canSlide && <NextArrow onClick={goNext} />}

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${
                    (currentIndex * 100) / slidesPerView
                  }%)`,
                }}
              >
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="shrink-0 px-4"
                    style={{ flexBasis: `${100 / slidesPerView}%` }}
                  >
                    <div className="group relative h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                      <div className="mb-6 flex justify-between">
                        <div className="flex gap-1 text-[#C8A951]">
                          {renderStars(item.rating)}
                        </div>

                        <FaQuoteRight className="absolute -top-6 right-6 text-4xl text-primary/80 transition-all duration-500 group-hover:opacity-90 md:text-6xl" />
                      </div>

                      <p className="mb-8 leading-relaxed text-gray-600">
                        "{item.text}"
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary font-semibold text-white">
                          {item.name?.charAt(0) || "U"}
                        </div>

                        <div>
                          <p className="font-semibold text-secondary">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {canSlide && (
              <div className="custom-dots">
                {dots.map((index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => setCurrentIndex(index)}
                    className="custom-dot-container"
                  >
                    <span
                      className={`custom-dot ${
                        currentIndex === index
                          ? "bg-primary outline outline-2 outline-primary outline-offset-[5px]"
                          : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
