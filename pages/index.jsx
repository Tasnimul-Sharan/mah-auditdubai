// import AboutUsSection from "@/components/AboutUsSection";
// import BlogSection from "@/components/BlogSection";
// import Head from "next/head";
// import LandingPage from "@/components/home/LandingPage";
// import StatsSection from "@/components/StatsSection";
// import CTASection from "@/components/CTASection";
// import ClientsSection from "@/components/home/ClientsSection";
// import TestimonialsSection from "@/components/home/TestimonialsSection";
// import ServicesSection from "@/components/home/ServicesSection";
// import WhyChooseUs from "@/components/WhyChooseUs";
// import WhoWeWorkWith from "@/components/WhoWeWorkWith";
// import ContactSection from "@/components/ContactSection";
// export default function Home() {
const meta = {
  title:
    "Bridge Pharmaceuticals Ltd. | Veterinary & Animal Health Company in Bangladesh",
  description:
    "Bridge Pharmaceuticals Ltd. is a science-driven veterinary and animal health company in Bangladesh, delivering high-quality medicines, aquaculture solutions, nutritional products, and biosecurity innovations to ensure healthier livestock and safer food production.",
  keywords:
    "Bridge Pharmaceuticals Ltd, veterinary medicine Bangladesh, animal health company Bangladesh, aquaculture products Bangladesh, livestock medicine manufacturer, veterinary pharmaceutical company, biosecurity solutions Bangladesh",
  author: "Bridge Pharmaceuticals Ltd.",
  url: "https://bridgepharmabd.com/",
  image: "https://bridgepharmabd.com/og-image.jpg",
};

//   return (
//     <div className="w-full relative">
// <Head>
//   <title>{meta.title}</title>
//   <meta name="description" content={meta.description} />
//   <meta name="keywords" content={meta.keywords} />
//   <meta name="author" content={meta.author} />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <meta property="og:title" content={meta.title} />
//   <meta property="og:description" content={meta.description} />
//   <meta property="og:type" content="website" />
//   <meta property="og:url" content={meta.url} />
//   <meta property="og:image" content={meta.image} />
//   <meta property="og:site_name" content="Bridge Pharmaceuticals Ltd." />
//   <meta name="twitter:card" content="summary_large_image" />
//   <meta name="twitter:title" content={meta.title} />
//   <meta name="twitter:description" content={meta.description} />
//   <meta name="twitter:image" content={meta.image} />
//   <link rel="canonical" href={meta.url} />
//   <script
//     type="application/ld+json"
//     dangerouslySetInnerHTML={{
//       __html: JSON.stringify({
//         "@context": "https://schema.org",
//         "@type": "Organization",
//         name: "Bridge Pharmaceuticals Ltd.",
//         url: "https://bridgepharmabd.com/",
//         logo: "https://bridgepharmabd.com/logo.png",
//         sameAs: [
//           "https://www.facebook.com/bridgepharma",
//           "https://www.linkedin.com/company/bridge-pharmaceuticals",
//         ],
//       }),
//     }}
//   />
// </Head>
//       <LandingPage />
//       <AboutUsSection />
//       <ServicesSection />
//       <StatsSection />
//       <WhyChooseUs />
//       <WhoWeWorkWith />
//       <ClientsSection />
//       <TestimonialsSection />
//       <BlogSection />
//       {/* <CTASection /> */}
//       <ContactSection />
//     </div>
//   );
// }

import Head from "next/head";
import AboutUsSection from "@/components/AboutUsSection";
import BlogSection from "@/components/BlogSection";
import LandingPage from "@/components/home/LandingPage";
import StatsSection from "@/components/StatsSection";
import ClientsSection from "@/components/home/ClientsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import ContactSection from "@/components/ContactSection";
import { supabaseServer } from "@/lib/supabaseServer";

export default function Home({ meta }) {
  return (
    <div>
      {/* SEO */}
      <Head>
        {/* BASIC SEO */}
        <title>{meta?.meta_title}</title>
        <meta name="description" content={meta?.meta_description} />
        <meta name="keywords" content={meta?.meta_keywords} />
        <meta name="author" content={meta?.meta_author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={meta?.meta_url} />

        {/* OPEN GRAPH (FACEBOOK, LINKEDIN) */}
        <meta property="og:title" content={meta?.meta_title} />
        <meta property="og:description" content={meta?.meta_description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta?.meta_url} />
        <meta property="og:image" content={meta?.meta_image} />
        <meta property="og:site_name" content="MAH Audit Dubai" />

        {/* TWITTER SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta?.meta_title} />
        <meta name="twitter:description" content={meta?.meta_description} />
        <meta name="twitter:image" content={meta?.meta_image} />

        {/* STRUCTURED DATA (VERY IMPORTANT FOR GOOGLE) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AccountingService",
              name: "MAH Audit Dubai",
              url: meta?.meta_url,
              logo: "https://mah-auditdubai.ae/logo.png",
              image: meta?.meta_image,
              description: meta?.meta_description,
              areaServed: "Dubai, UAE",
              serviceType: [
                "Audit Services",
                "VAT Consultancy",
                "Accounting",
                "Financial Advisory",
              ],
              sameAs: [
                "https://www.facebook.com/",
                "https://www.linkedin.com/",
              ],
            }),
          }}
        />
      </Head>

      {/* Sections */}
      <LandingPage />
      <AboutUsSection />
      <ServicesSection />
      <StatsSection />
      <WhyChooseUs />
      <WhoWeWorkWith />
      <ClientsSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}

// ================= SSR =================
export async function getServerSideProps() {
  const { data } = await supabaseServer.from("home_page").select("*").single();

  return {
    props: {
      meta: data || null,
    },
  };
}
