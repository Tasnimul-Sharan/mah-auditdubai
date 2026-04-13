// import HeroSection from "@/components/HeroSection";
// import Head from "next/head";
// import ServicesSection from "@/components/home/ServicesSection";
// export default function ServicesPage() {
//   const meta = {
//     title:
//       "Services | Anondo Baari - Senior Wellness & Assisted Living in Bangladesh",
//     description:
//       "Discover Anondo Baari’s world-class services for senior citizens in Purbachal, Dhaka. We offer assisted living, 24/7 healthcare, therapeutic care, yoga, meditation, nutrition counseling, and vibrant community activities for a dignified life.",
//     keywords:
//       "Anondo Baari services, senior wellness Bangladesh, assisted living Dhaka, elderly care, therapeutic services, wellness programs, yoga meditation, nutrition counseling, retirement home Bangladesh",
//     author: "Anondo Baari",
//     url: "mah-auditdubai.ae/services",
//     image: "mah-auditdubai.ae/services/services-og.jpg",
//   };

//   return (
//     <div className="w-full relative">
//       <Head>
//         <title>{meta.title}</title>
//         <meta name="description" content={meta.description} />
//         <meta name="keywords" content={meta.keywords} />
//         <meta name="author" content={meta.author} />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta property="og:title" content={meta.title} />
//         <meta property="og:description" content={meta.description} />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={meta.url} />
//         <meta property="og:image" content={meta.image} />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={meta.title} />
//         <meta name="twitter:description" content={meta.description} />
//         <meta name="twitter:image" content={meta.image} />
//       </Head>
//       <HeroSection
//         hero={{
//           title: "Services",
//           backgroundImage: "/services/services-bg.jpg",
//         }}
//       />
//       <ServicesSection />
//     </div>
//   );
// }

import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import { supabaseServer } from "@/lib/supabaseServer";

export default function ServicesPage({ data }) {
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
              "@type": "ProfessionalService",
              name: "MAH Audit Dubai",
              url: data?.meta_url,
              logo: "https://mah-auditdubai.ae/logo.png",
              image: data?.meta_image,
              description: data?.meta_description,
              areaServed: "Dubai, UAE",
              serviceType: [
                "Audit Services",
                "Accounting",
                "VAT Consultancy",
                "Business Advisory",
              ],
            }),
          }}
        />
      </Head>

      {/* ================= HERO ================= */}
      <HeroSection
        hero={{
          title: data?.hero_title || "Our Services",
          backgroundImage: data?.hero_image || "/default-hero.jpg",
        }}
      />

      {/* ================= SERVICES ================= */}
      <ServicesSection />
    </div>
  );
}

// ================= SSR =================
export async function getServerSideProps() {
  const { data } = await supabaseServer
    .from("services_page")
    .select("*")
    .single();

  return {
    props: {
      data: data || null,
    },
  };
}
