import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import JsonLd from "@/components/JsonLd";
import { supabaseServer } from "@/lib/supabaseServer";
import {
  SITE_NAME,
  SITE_URL,
  createBreadcrumbSchema,
  createBusinessSchema,
  createWebPageSchema,
} from "@/lib/structuredData";

export default function ServicesPage({ data, services }) {
  const pageUrl = data?.meta_url || `${SITE_URL}/services`;
  const pageTitle = data?.meta_title || "Services | MAH Audit Dubai";
  const pageDescription =
    data?.meta_description ||
    "Professional audit, accounting, tax and business advisory services in Dubai, UAE.";
  const pageImage = data?.meta_image || `${SITE_URL}/services/services-og.jpg`;

  const businessSchema = createBusinessSchema({
    url: pageUrl,
    image: pageImage,
    description: pageDescription,
    services,
  });

  const webPageSchema = createWebPageSchema({
    title: pageTitle,
    url: pageUrl,
    description: pageDescription,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Services", url: pageUrl },
  ]);

  return (
    <div className="w-full relative">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={data?.meta_keywords || "audit services Dubai"}
        />
        <meta name="author" content={data?.meta_author || SITE_NAME} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <JsonLd data={[businessSchema, webPageSchema, breadcrumbSchema]} />
      <HeroSection
        hero={{
          title: data?.hero_title || "Our Services",
          backgroundImage: data?.hero_image || "/services/services-bg.jpg",
        }}
      />
      <ServicesSection
        services={services}
        sectionContent={data?.section_content}
      />
    </div>
  );
}

// export async function getServerSideProps() {
//   const { data: pageData, error: pageError } = await supabaseServer
//     .from("services_page")
//     .select("*")
//     .single();

//   if (pageError) {
//     console.error("Services page fetch error:", pageError);
//   }

//   const { data: servicesData, error: servicesError } = await supabaseServer
//     .from("services")
//     .select("*")
//     .order("created_at", { ascending: true });

//   if (servicesError) {
//     console.error("Services fetch error:", servicesError);
//   }

//   return {
//     props: {
//       data: pageData || null,
//       services: servicesData || [],
//     },
//   };
// }

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=3600",
  );

  const [pageRes, servicesRes] = await Promise.all([
    supabaseServer.from("services_page").select("*").single(),

    supabaseServer
      .from("services")
      .select("*")
      .order("created_at", { ascending: true }),
  ]);

  if (pageRes.error) {
    console.error("Services page fetch error:", pageRes.error);
  }

  if (servicesRes.error) {
    console.error("Services fetch error:", servicesRes.error);
  }

  return {
    props: {
      data: pageRes.data || null,
      services: servicesRes.data || [],
    },
  };
}
