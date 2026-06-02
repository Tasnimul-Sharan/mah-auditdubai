import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import ServicesDetails from "@/components/ServicesDetails";
import JsonLd from "@/components/JsonLd";
import { supabaseServer } from "@/lib/supabaseServer";
import {
  SITE_NAME,
  SITE_URL,
  createBreadcrumbSchema,
  createBusinessSchema,
  createServiceSchema,
} from "@/lib/structuredData";

export default function ServicesDetailsPage({ service, slug, pageData }) {
  const siteUrl = SITE_URL;
  const pageUrl = `${siteUrl}/services/${slug}`;

  const heroBackgroundImage =
    pageData?.hero_image || "/services/services-bg.jpg";

  const ogImage =
    service.image ||
    pageData?.hero_image ||
    `${siteUrl}/services/services-og.jpg`;

  const meta = {
    title: `${service.hero?.title || service.title} | MAH Audit Dubai`,
    description:
      service.hero?.description1 ||
      service.description ||
      "Professional audit, accounting, tax and business advisory services in Dubai, UAE.",
    keywords: `${
      service.hero?.title || service.title
    }, audit services Dubai, audit firm UAE, accounting services Dubai, tax consultant Dubai, MAH Audit Dubai`,
    author: "MAH Audit Dubai",
    url: pageUrl,
    image: ogImage,
  };

  const businessSchema = createBusinessSchema({
    url: siteUrl,
    image: ogImage,
    description: meta.description,
    services: [service],
  });

  const serviceSchema = createServiceSchema({
    service,
    url: pageUrl,
    image: ogImage,
    description: meta.description,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: service.hero?.title || service.title, url: pageUrl },
  ]);

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="author" content={meta.author} />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={meta.url} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:alt" content={meta.title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />

      </Head>
      <JsonLd data={[businessSchema, serviceSchema, breadcrumbSchema]} />

      <HeroSection
        hero={{
          title: service.hero?.title || service.title,
          backgroundImage: heroBackgroundImage,
        }}
      />

      <ServicesDetails service={service} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const slug = params?.slug;

  const { data, error } = await supabaseServer
    .from("services")
    .select("slug, title, description, image, hero, sections, footer_note, cta")
    .eq("slug", slug)
    .single();

  const { data: pageData } = await supabaseServer
    .from("services_page")
    .select("*")
    .single();

  if (error || !data) {
    return {
      notFound: true,
    };
  }

  const service = {
    ...data,
    hero: data.hero || {
      title: data.title || "",
      description1: data.description || "",
      description2: "",
    },
    sections: data.sections || [],
    footerNote: data.footer_note || "",
    cta: data.cta || {},
  };

  return {
    props: {
      slug,
      service,
      pageData: pageData || null,
    },
  };
}
