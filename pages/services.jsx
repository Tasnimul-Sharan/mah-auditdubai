import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import { supabaseServer } from "@/lib/supabaseServer";

export default function ServicesPage({ data, services }) {
  return (
    <div className="w-full relative">
      <Head>
        <title>{data?.meta_title || "Services | MAH Audit Dubai"}</title>

        <meta
          name="description"
          content={
            data?.meta_description ||
            "Professional audit, accounting, tax and business advisory services in Dubai, UAE."
          }
        />
        <meta
          name="keywords"
          content={data?.meta_keywords || "audit services Dubai"}
        />
        <meta name="author" content={data?.meta_author || "MAH Audit Dubai"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="canonical"
          href={data?.meta_url || "https://mah-auditdubai.ae/services"}
        />

        <meta
          property="og:title"
          content={data?.meta_title || "Services | MAH Audit Dubai"}
        />
        <meta
          property="og:description"
          content={data?.meta_description || ""}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={data?.meta_url || "https://mah-auditdubai.ae/services"}
        />
        <meta
          property="og:image"
          content={
            data?.meta_image ||
            "https://mah-auditdubai.ae/services/services-og.jpg"
          }
        />
        <meta property="og:site_name" content="MAH Audit Dubai" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={data?.meta_title || "Services | MAH Audit Dubai"}
        />
        <meta
          name="twitter:description"
          content={data?.meta_description || ""}
        />
        <meta
          name="twitter:image"
          content={
            data?.meta_image ||
            "https://mah-auditdubai.ae/services/services-og.jpg"
          }
        />

        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="en_US" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "MAH Audit Dubai",
              url: data?.meta_url || "https://mah-auditdubai.ae/services",
              logo: "https://mah-auditdubai.ae/logo.png",
              image:
                data?.meta_image ||
                "https://mah-auditdubai.ae/services/services-og.jpg",
              description: data?.meta_description,
              areaServed: "Dubai, UAE",
              serviceType: services?.map((service) => service.title) || [],
            }),
          }}
        />
      </Head>

      <HeroSection
        hero={{
          title: data?.hero_title || "Our Services",
          backgroundImage: data?.hero_image || "/services/services-bg.jpg",
        }}
      />

      <ServicesSection services={services} />
    </div>
  );
}

export async function getServerSideProps() {
  const { data: pageData } = await supabaseServer
    .from("services_page")
    .select("*")
    .single();

  const { data: servicesData } = await supabaseServer
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  return {
    props: {
      data: pageData || null,
      services: servicesData || [],
    },
  };
}
