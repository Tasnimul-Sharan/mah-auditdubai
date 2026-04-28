"use client";

import Slider from "react-slick";
import { motion } from "framer-motion";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaBalanceScale } from "react-icons/fa";
import Link from "next/link";
import Button from "../Button";

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

const PremiumButton = ({ children, variant = "primary" }) => {
  const base =
    "relative inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold overflow-hidden transition-all duration-700 ease-out group";

  const variants = {
    primary:
      "text-white bg-primary shadow-[0_12px_35px_rgba(0,0,0,0.25)] hover:shadow-[0_18px_55px_rgba(0,0,0,0.35)]",
    outline:
      "text-white border border-white/30 bg-white/10 backdrop-blur-md hover:border-primary/70 hover:bg-primary/20",
  };

  return (
    <button className={`${base} ${variants[variant]}`}>
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100
        bg-gradient-to-r from-primary via-primary/80 to-white/20
        transition-opacity duration-700"
      />

      <span
        className="absolute -left-full top-0 h-full w-1/2 skew-x-[-20deg]
        bg-white/25 group-hover:left-[130%] transition-all duration-1000"
      />

      <span
        className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40
        bg-primary transition-opacity duration-700"
      />

      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
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

  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 900,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  return (
    <section className="relative w-full h-screen overflow-hidden group">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-screen">
            <motion.div
              key={`bg-${index}-${currentSlide}`}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            <div className="absolute inset-0 bg-black/55" />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />

            <div className="relative z-10 h-full flex items-center custom-container mx-auto px-4">
              <motion.div
                key={currentSlide === index ? `slide-${index}` : index}
                className="max-w-3xl flex flex-col items-center text-center mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate={currentSlide === index ? "visible" : "hidden"}
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3 mb-5 px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
                    <FaBalanceScale className="text-sm" />
                  </span>

                  <span className="uppercase tracking-[0.28em] text-xs font-medium text-primary">
                    {slide.subtitle}
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
                >
                  <span className="text-primary">
                    {slide.title.split(" ")[0]}
                  </span>{" "}
                  {slide.title.split(" ").slice(1).join(" ")}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-200 mb-10 max-w-2xl leading-relaxed text-base md:text-lg"
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
        ))}
      </Slider>
    </section>
  );
}

const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute z-20 top-1/2 left-6 -translate-y-1/2
    w-14 h-14 hidden md:flex items-center justify-center
    rounded-full backdrop-blur-md bg-white/10 border border-white/20
    text-white cursor-pointer
    opacity-0 group-hover:opacity-100
    transition-all duration-700 ease-out
    hover:bg-primary hover:border-primary hover:scale-110
    hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
  >
    <FaArrowLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute z-20 top-1/2 right-6 -translate-y-1/2
    w-14 h-14 hidden md:flex items-center justify-center
    rounded-full backdrop-blur-md bg-white/10 border border-white/20
    text-white cursor-pointer
    opacity-0 group-hover:opacity-100
    transition-all duration-700 ease-out
    hover:bg-primary hover:border-primary hover:scale-110
    hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
  >
    <FaArrowRight />
  </button>
);
