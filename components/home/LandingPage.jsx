"use client";

import Slider from "react-slick";
import { motion } from "framer-motion";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaBalanceScale } from "react-icons/fa";
import Link from "next/link";
import Button from "../Button";
import OptimizedImage from "@/components/OptimizedImage";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const fallbackSlides = [
  {
    subtitle: "Dubai • UAE Financial Compliance Experts",
    title: "Audit & Assurance You Can Trust",
    description:
      "We provide independent audit and assurance services designed to strengthen financial transparency, ensure regulatory compliance, and build investor confidence for businesses operating across the UAE.",
    image: "/slider/audit-1.jpg",
  },
  {
    subtitle: "Corporate Advisory • Risk Management",
    title: "Strategic Financial Advisory",
    description:
      "Our experienced advisory team supports organizations with financial restructuring, risk management, and strategic planning to help businesses navigate complex regulatory and economic environments.",
    image: "/slider/audit-2.jpg",
  },
  {
    subtitle: "40+ Years Experience • Global Standards",
    title: "Driving Financial Clarity for Enterprises",
    description:
      "Combining international accounting standards with deep regional expertise, we deliver precise financial insights that empower leadership teams to make confident, data-driven decisions.",
    image: "/slider/audit-3.jpg",
  },
];

export default function LandingPage({ slides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData =
    Array.isArray(slides) && slides.length > 0 ? slides : fallbackSlides;

  const settings = {
    dots: false,
    infinite: sliderData.length > 1,
    fade: true,
    speed: 900,
    arrows: sliderData.length > 1,
    autoplay: sliderData.length > 1,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden group">
      <Slider {...settings}>
        {sliderData.map((slide, index) => {
          const titleWords = String(slide.title || "").split(" ");
          const firstWord = titleWords[0] || "";
          const restTitle = titleWords.slice(1).join(" ");

          return (
            <div key={slide.id || index} className="relative h-screen w-full">
              <motion.div
                key={`bg-${index}-${currentSlide}`}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <OptimizedImage
                  src={slide.image || fallbackSlides[0].image}
                  alt={slide.title || "Hero slide image"}
                  fill
                  width={1600}
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>

              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />

              <div className="relative z-10 flex h-full items-center custom-container mx-auto px-4">
                <motion.div
                  key={currentSlide === index ? `slide-${index}` : index}
                  className="mx-auto flex max-w-3xl flex-col items-center text-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate={currentSlide === index ? "visible" : "hidden"}
                >
                  <motion.div
                    variants={itemVariants}
                    className="mb-5 flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <FaBalanceScale className="text-sm" />
                    </span>

                    <span className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
                      {slide.subtitle}
                    </span>
                  </motion.div>

                  <motion.h1
                    variants={itemVariants}
                    className="mb-6 text-4xl font-bold leading-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] md:text-6xl lg:text-7xl"
                  >
                    <span className="text-primary">{firstWord}</span>{" "}
                    {restTitle}
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="mb-10 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div variants={itemVariants} className="flex gap-4">
                    <Link href="/contact">
                      <Button variant="primary">Get In Touch</Button>
                    </Link>

                    <Link href="/about">
                      <Button variant="outline">Learn More</Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}

const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute left-6 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-700 ease-out hover:scale-110 hover:border-primary hover:bg-primary hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)] group-hover:opacity-100 md:flex"
  >
    <FaArrowLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-6 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-700 ease-out hover:scale-110 hover:border-primary hover:bg-primary hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)] group-hover:opacity-100 md:flex"
  >
    <FaArrowRight />
  </button>
);
