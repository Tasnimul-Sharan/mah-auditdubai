import Head from "next/head";
import AboutUsSection from "@/components/AboutUsSection";
import HeroSection from "@/components/HeroSection";
import FAQ from "@/components/FAQ";
import VisionMission from "@/components/VisionMission";
import PremiumCTA from "@/components/PremiumCTA";
import WhyUs from "@/components/WhyUs";
import StatsSection from "@/components/StatsSection";
import ClientsSection from "@/components/home/ClientsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { supabaseServer } from "@/lib/supabaseServer";

export default function AboutPage({ data, about }) {
  return (
    <div className="w-full relative">
      {/* ================= SEO ================= */}
      <Head>
        <title>{data?.meta_title}</title>

        <meta name="description" content={data?.meta_description} />
        <meta name="keywords" content={data?.meta_keywords} />
        <meta name="author" content={data?.meta_author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Canonical */}
        <link rel="canonical" href={data?.meta_url} />

        {/* Open Graph */}
        <meta property="og:title" content={data?.meta_title} />
        <meta property="og:description" content={data?.meta_description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={data?.meta_url} />
        <meta property="og:image" content={data?.meta_image} />
        <meta property="og:site_name" content="MAH Audit Dubai" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data?.meta_title} />
        <meta name="twitter:description" content={data?.meta_description} />
        <meta name="twitter:image" content={data?.meta_image} />

        {/* Extra SEO */}
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="en_US" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MAH Audit Dubai",
              url: data?.meta_url,
              logo: "https://mah-auditdubai.ae/logo.png",
              image: data?.meta_image,
              description: data?.meta_description,
              areaServed: "Dubai, UAE",
              sameAs: [
                "https://www.facebook.com/",
                "https://www.linkedin.com/",
              ],
            }),
          }}
        />
      </Head>

      {/* ================= HERO ================= */}
      <HeroSection
        hero={{
          title: data?.hero_title || "About Us",
          backgroundImage: data?.hero_image || "/default-hero.jpg",
        }}
      />

      {/* ================= SECTIONS ================= */}
      <AboutUsSection data={about} />
      <VisionMission />
      <WhyUs />
      <StatsSection />
      <ClientsSection />
      <TestimonialsSection />
      <FAQ />
      <PremiumCTA />
    </div>
  );
}

// ================= SSR =================
export async function getServerSideProps() {
  // SEO + HERO
  const { data: pageData } = await supabaseServer
    .from("about_page")
    .select("*")
    .single();

  // ABOUT SECTION CONTENT
  const { data: aboutData } = await supabaseServer
    .from("about_section")
    .select("*")
    .single();

  return {
    props: {
      data: pageData || null,
      about: aboutData || null,
    },
  };
}
