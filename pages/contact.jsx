import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import ContactHero from "@/components/ContactHero";
import ContactPageSection from "@/components/ContactPageSection";
import EventMap from "@/components/EventMap";
import JsonLd from "@/components/JsonLd";
import { supabaseServer } from "@/lib/supabaseServer";
import {
  SITE_NAME,
  SITE_URL,
  createBreadcrumbSchema,
  createBusinessSchema,
  createWebPageSchema,
} from "@/lib/structuredData";

export default function ContactPage({ data }) {
  const pageUrl = data?.meta_url || `${SITE_URL}/contact`;
  const pageTitle = data?.meta_title || "Contact | MAH Audit Dubai";
  const pageDescription =
    data?.meta_description ||
    "Contact MAH Audit Dubai for audit, accounting, VAT and advisory support in Dubai, UAE.";
  const pageImage = data?.meta_image || `${SITE_URL}/og-contact.jpg`;

  const businessSchema = createBusinessSchema({
    url: pageUrl,
    image: pageImage,
    description: pageDescription,
    contactPage: data,
  });

  const contactPageSchema = createWebPageSchema({
    type: "ContactPage",
    title: pageTitle,
    url: pageUrl,
    description: pageDescription,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Contact", url: pageUrl },
  ]);

  return (
    <div className="w-full relative">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={data?.meta_keywords || ""} />
        <meta name="author" content={data?.meta_author || SITE_NAME} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content={pageDescription}
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content={pageDescription}
        />
        <meta name="twitter:image" content={pageImage} />
        <meta name="robots" content="index, follow" />
      </Head>
      <JsonLd data={[businessSchema, contactPageSchema, breadcrumbSchema]} />
      <HeroSection
        hero={{
          title: data?.hero_title || "Contact",
          backgroundImage: data?.hero_image || "/contact-bg.jpg",
        }}
      />
      <ContactHero hero={data?.hero} stats={data?.stats} />
      <ContactPageSection
        contactInfo={data?.contact_info}
        formContent={data?.form_content}
      />
      <EventMap mapUrl={data?.map_url} />
    </div>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabaseServer
    .from("contact_page")
    .select("*")
    .single();

  if (error) {
    console.error("Contact page fetch error:", error);
  }

  return {
    props: {
      data: data || null,
    },
  };
}
