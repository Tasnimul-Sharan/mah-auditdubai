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

export default function Home({ meta, about, services }) {
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
      <AboutUsSection data={about} />
      <ServicesSection services={services} />
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

export async function getServerSideProps() {
  const { data: homeData } = await supabaseServer
    .from("home_page")
    .select("*")
    .single();

  const { data: aboutData } = await supabaseServer
    .from("about_section")
    .select("*")
    .single();

  const { data: servicesData } = await supabaseServer
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  return {
    props: {
      meta: homeData || null,
      about: aboutData || null,
      services: servicesData || [],
    },
  };
}
