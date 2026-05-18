import React from "react";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

const HeroSection = ({ hero }) => {
  return (
    <section className="relative w-full h-[30rem] pt-40 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 transition transform duration-1000 ease-out">
        <OptimizedImage
          src={hero.backgroundImage}
          alt={hero.title || "Page hero image"}
          fill
          width={1600}
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 text-center custom-container mx-auto">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
          {hero.title}
        </h1>
        <div className="text-sm text-white flex items-center justify-center gap-1">
          <Link
            href="/"
            className="text-  hover:text-primary text-lg transition transform duration-500"
          >
            Home
          </Link>
          |<span className="text- text-lg">{hero.title}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
