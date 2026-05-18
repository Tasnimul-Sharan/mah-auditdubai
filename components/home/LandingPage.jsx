"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBalanceScale } from "react-icons/fa";
import Link from "next/link";
import Button from "../Button";
import OptimizedImage from "@/components/OptimizedImage";

function normalizeHref(value, fallback = "") {
  const href = typeof value === "string" ? value.trim() : "";

  if (!href) return fallback;

  if (
    href.startsWith("/") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  return `/${href}`;
}

export default function LandingPage({ slides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData = useMemo(
    () =>
      Array.isArray(slides)
        ? slides.filter((slide) => slide?.title || slide?.image)
        : [],
    [slides],
  );

  const hasMultipleSlides = sliderData.length > 1;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  }, [sliderData.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderData.length) % sliderData.length,
    );
  }, [sliderData.length]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [sliderData.length]);

  useEffect(() => {
    if (!hasMultipleSlides) return undefined;

    const intervalId = window.setInterval(nextSlide, 5000);

    return () => window.clearInterval(intervalId);
  }, [hasMultipleSlides, nextSlide]);

  const activeSlide = sliderData[currentSlide];

  if (!activeSlide) return null;

  const titleWords = String(activeSlide.title || "").split(" ");
  const firstWord = titleWords[0] || "";
  const restTitle = titleWords.slice(1).join(" ");

  const primaryButtonText = activeSlide.primary_button_text?.trim();
  const primaryButtonLink = normalizeHref(activeSlide.primary_button_link);
  const secondaryButtonText =
    activeSlide.secondary_button_text?.trim() || activeSlide.button_text?.trim();
  const secondaryButtonLink = normalizeHref(activeSlide.secondary_button_link);

  const hasPrimaryButton = primaryButtonText && primaryButtonLink;
  const hasSecondaryButton = secondaryButtonText && secondaryButtonLink;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-secondary group">
      <div
        key={`bg-${activeSlide.id || currentSlide}`}
        className="absolute inset-0"
      >
        {activeSlide.image && (
          <OptimizedImage
            src={activeSlide.image}
            alt={activeSlide.title || "Hero slide image"}
            fill
            width={1440}
            priority={currentSlide === 0}
            loading={currentSlide === 0 ? undefined : "lazy"}
            sizes="100vw"
            quality={55}
            aspectRatio="3:2"
            className="object-cover object-center"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />

      <div className="relative z-10 flex h-full items-center custom-container mx-auto px-4">
        <div
          key={`content-${activeSlide.id || currentSlide}`}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          {activeSlide.subtitle && (
            <div className="mb-5 flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary_light/20 text-primary_light">
                <FaBalanceScale className="text-sm" />
              </span>

              <span className="text-xs font-medium uppercase tracking-[0.28em] text-primary_light">
                {activeSlide.subtitle}
              </span>
            </div>
          )}

          {activeSlide.title && (
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] md:text-6xl lg:text-7xl">
              <span className="text-primary_light">{firstWord}</span>{" "}
              {restTitle}
            </h1>
          )}

          {activeSlide.description && (
            <p className="mb-10 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
              {activeSlide.description}
            </p>
          )}

          {(hasPrimaryButton || hasSecondaryButton) && (
            <div className="flex flex-wrap justify-center gap-4">
              {hasPrimaryButton && (
                <Link
                  href={primaryButtonLink}
                  aria-label={`${primaryButtonText} - MAH Audit Dubai`}
                >
                  <Button as="span" variant="primary">
                    {primaryButtonText}
                  </Button>
                </Link>
              )}

              {hasSecondaryButton && (
                <Link
                  href={secondaryButtonLink}
                  aria-label={`${secondaryButtonText} - MAH Audit Dubai`}
                >
                  <Button
                    as="span"
                    variant="outline"
                    className="border-primary_light text-primary_light hover:border-primary hover:text-white"
                  >
                    {secondaryButtonText}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {hasMultipleSlides && (
        <>
          <PrevArrow onClick={prevSlide} />
          <NextArrow onClick={nextSlide} />
        </>
      )}
    </section>
  );
}

const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    aria-label="Previous hero slide"
    onClick={onClick}
    className="absolute left-6 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-700 ease-out hover:scale-110 hover:border-primary hover:bg-primary hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)] group-hover:opacity-100 md:flex"
  >
    <FaArrowLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    aria-label="Next hero slide"
    onClick={onClick}
    className="absolute right-6 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-700 ease-out hover:scale-110 hover:border-primary hover:bg-primary hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)] group-hover:opacity-100 md:flex"
  >
    <FaArrowRight />
  </button>
);
