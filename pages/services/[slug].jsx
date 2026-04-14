

"use client";
import { useRouter } from "next/router";
import Head from "next/head";
import { RiLoader2Fill } from "react-icons/ri";
import HeroSection from "@/components/HeroSection";
import { servicesDetailsData } from "@/data/serviceDetailsData";
import ServicesDetails from "@/components/ServicesDetails";
import Navbar from "@/components/Navbar";

export default function ServicesDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center min-h-screen text-secondary">
        <RiLoader2Fill className="animate-spin w-6 h-6" />
        <p className="font-medium text-xl">Loading...</p>
      </div>
    );
  }

  // ✅ FIX: direct access instead of find()
  const service = servicesDetailsData[slug];

  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-secondary font-medium text-xl">
          Service detail not found.
        </p>
      </div>
    );
  }

  const meta = {
    title: `${service.hero.title} | MAH Audit Dubai`,
    description: service.hero.description1,
    keywords: `${service.hero.title}, audit services Dubai, UAE audit firm`,
    author: "MAH Audit Dubai",
    url: `https://mah-auditdubai.ae/services/${slug}`,
    image: "/services/services-og.jpg",
  };

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="author" content={meta.author} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={meta.image} />
      </Head>

      <Navbar hasBackground={true} />

      <HeroSection
        hero={{
          title: service.hero.title,
          backgroundImage: "/services/services-bg.jpg",
        }}
      />

      {/* ✅ FIX: correct prop passing */}
      <ServicesDetails service={service} />
    </div>
  );
}