import Head from "next/head";
import dynamic from "next/dynamic";
import LandingPage from "@/components/home/LandingPage";
import JsonLd from "@/components/JsonLd";
import { supabaseServer } from "@/lib/supabaseServer";
import { getLayoutData } from "@/lib/getLayoutData";
import {
  SITE_NAME,
  SITE_URL,
  createBreadcrumbSchema,
  createBusinessSchema,
} from "@/lib/structuredData";

const AboutUsSection = dynamic(() => import("@/components/AboutUsSection"));
const BlogSection = dynamic(() => import("@/components/BlogSection"));
const StatsSection = dynamic(() => import("@/components/StatsSection"));
const ClientsSection = dynamic(
  () => import("@/components/home/ClientsSection"),
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection"),
);
const ServicesSection = dynamic(
  () => import("@/components/home/ServicesSection"),
);
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));
const IndustrySection = dynamic(() => import("@/components/IndustrySection"));

export default function Home({
  meta,
  heroSlides,
  about,
  services,
  servicesPage,
  whyChooseUs,
  whyChoosePoints,
  industrySection,
  industryItems,
  contactPage,
  blogs,
  blogSectionData,
  clients,
  clientsSectionData,
  testimonials,
  testimonialsSectionData,
  stats,
}) {
  const pageUrl = meta?.meta_url || SITE_URL;
  const pageDescription =
    meta?.meta_description ||
    "Professional audit, VAT, accounting and financial advisory services in Dubai, UAE.";

  const businessSchema = createBusinessSchema({
    url: pageUrl,
    image: meta?.meta_image,
    description: pageDescription,
    contactPage,
    services,
    testimonials,
  });

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#business`,
    },
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
  ]);

  return (
    <div>
      <Head>
        <title>{meta?.meta_title}</title>
        <meta name="description" content={meta?.meta_description} />
        <meta name="keywords" content={meta?.meta_keywords} />
        <meta name="author" content={meta?.meta_author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={meta?.meta_title} />
        <meta property="og:description" content={meta?.meta_description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={meta?.meta_image} />
        <meta property="og:site_name" content="MAH Audit Dubai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta?.meta_title} />
        <meta name="twitter:description" content={meta?.meta_description} />
        <meta name="twitter:image" content={meta?.meta_image} />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </Head>
      <JsonLd data={[businessSchema, webSiteSchema, breadcrumbSchema]} />
      <LandingPage slides={heroSlides} />
      <AboutUsSection data={about} />
      <ServicesSection
        services={services}
        sectionContent={servicesPage?.section_content}
      />
      <StatsSection stats={stats} />
      <WhyChooseUs data={whyChooseUs} points={whyChoosePoints} />
      <IndustrySection
        industrySection={industrySection}
        industryItems={industryItems}
      />
      <ClientsSection clients={clients} sectionData={clientsSectionData} />
      <TestimonialsSection
        testimonials={testimonials}
        sectionData={testimonialsSectionData}
      />
      <BlogSection blogs={blogs} sectionData={blogSectionData} />
      <ContactSection data={contactPage} />
    </div>
  );
}

// export async function getServerSideProps() {
//   // const layoutDataPromise = getLayoutData();

//   const { data: homeData } = await supabaseServer
//     .from("home_page")
//     .select("*")
//     .single();

//   const { data: heroSlidesData } = await supabaseServer
//     .from("hero_slides")
//     .select(
//       "id, subtitle, title, description, button_text, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link, image, public_id, created_at",
//     )
//     .order("created_at", { ascending: true });

//   const { data: aboutData } = await supabaseServer
//     .from("about_section")
//     .select("*")
//     .single();

//   const { data: servicesData } = await supabaseServer
//     .from("services")
//     .select("*")
//     .order("created_at", { ascending: true });

//   const { data: whyChooseUsData } = await supabaseServer
//     .from("why_choose_us")
//     .select("id, title, subtitle, description, image, button_text, button_link")
//     .order("created_at", { ascending: false })
//     .limit(1)
//     .maybeSingle();

//   let whyChoosePoints = [];

//   if (whyChooseUsData?.id) {
//     const { data: pointRows } = await supabaseServer
//       .from("why_choose_points")
//       .select("point")
//       .eq("why_id", whyChooseUsData.id)
//       .order("created_at", { ascending: true });

//     whyChoosePoints = (pointRows || [])
//       .map((item) => item.point)
//       .filter(Boolean);
//   }

//   const { data: industrySection } = await supabaseServer
//     .from("industries")
//     .select("*")
//     .order("created_at", { ascending: false })
//     .limit(1)
//     .maybeSingle();

//   let industryItems = [];

//   if (industrySection?.id) {
//     const { data: itemRows } = await supabaseServer
//       .from("industry_items")
//       .select("*")
//       .eq("industry_id", industrySection.id)
//       .order("created_at", { ascending: true });

//     industryItems = itemRows || [];
//   }

//   const { data: contactPage } = await supabaseServer
//     .from("contact_page")
//     .select("*")
//     .single();

//   const { data: blogsData } = await supabaseServer
//     .from("blogs")
//     .select("*")
//     .order("created_at", { ascending: false });

//   const firstBlog = blogsData?.[0] || null;

//   const blogSectionData = {
//     badge: firstBlog?.badge || "Insights & Resources",
//     title: firstBlog?.section_title || "Audit & Compliance Insights in Dubai",
//     subtitle:
//       firstBlog?.section_subtitle ||
//       "Expert insights on auditing, VAT, and compliance to help your business stay secure, compliant, and growth-ready in the UAE.",
//     buttonText: firstBlog?.button_text || "View All Insights",
//   };

//   const { data: servicesPageData } = await supabaseServer
//     .from("services_page")
//     .select("*")
//     .single();

//   const { data: clientsData } = await supabaseServer
//     .from("clients")
//     .select("*")
//     .order("created_at", { ascending: true });

//   const firstClient = clientsData?.[0] || null;

//   const clientsSectionData = {
//     badge: firstClient?.badge || "Our Clients",
//     title: firstClient?.title || "Trusted by Leading Organizations",
//     subtitle:
//       firstClient?.subtitle ||
//       "We collaborate with companies across the UAE and international markets, delivering reliable audit, compliance, and advisory services.",
//   };

//   const { data: statsData } = await supabaseServer
//     .from("stats")
//     .select("*")
//     .order("created_at", { ascending: true });

//   const { data: testimonialsData } = await supabaseServer
//     .from("testimonials")
//     .select("*")
//     .order("created_at", { ascending: false });

//   const firstTestimonial = testimonialsData?.[0] || null;

//   const testimonialsSectionData = {
//     badge: firstTestimonial?.badge || "Testimonials",
//     title: firstTestimonial?.section_title || "What Our Clients Say",
//     subtitle:
//       firstTestimonial?.section_subtitle ||
//       "Trusted by businesses for delivering reliable audit, compliance, and financial advisory services.",
//   };

//   // const layoutData = await layoutDataPromise;

//   return {
//     props: {
//       // ...layoutData,
//       meta: homeData || null,
//       heroSlides: heroSlidesData || [],
//       about: aboutData || null,
//       services: servicesData || [],
//       servicesPage: servicesPageData || null,
//       whyChooseUs: whyChooseUsData || null,
//       whyChoosePoints,
//       industrySection: industrySection || null,
//       industryItems,
//       contactPage: contactPage || null,
//       blogs: blogsData || [],
//       blogSectionData,
//       clients: clientsData || [],
//       clientsSectionData,
//       testimonials: testimonialsData || [],
//       stats: statsData || [],
//       testimonialsSectionData,
//     },
//   };
// }

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=3600",
  );

  const [
    homeRes,
    heroSlidesRes,
    aboutRes,
    servicesRes,
    whyChooseUsRes,
    industrySectionRes,
    contactPageRes,
    blogsRes,
    servicesPageRes,
    clientsRes,
    statsRes,
    testimonialsRes,
  ] = await Promise.all([
    supabaseServer.from("home_page").select("*").single(),

    supabaseServer
      .from("hero_slides")
      .select(
        "id, subtitle, title, description, button_text, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link, image, public_id, created_at",
      )
      .order("created_at", { ascending: true }),

    supabaseServer.from("about_section").select("*").single(),

    supabaseServer
      .from("services")
      .select("*")
      .order("created_at", { ascending: true }),

    supabaseServer
      .from("why_choose_us")
      .select(
        "id, title, subtitle, description, image, button_text, button_link",
      )
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),

    supabaseServer
      .from("industries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),

    supabaseServer.from("contact_page").select("*").single(),

    supabaseServer
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false }),

    supabaseServer.from("services_page").select("*").single(),

    supabaseServer
      .from("clients")
      .select("*")
      .order("created_at", { ascending: true }),

    supabaseServer
      .from("stats")
      .select("*")
      .order("created_at", { ascending: true }),

    supabaseServer
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  if (homeRes.error) console.error("Home page fetch error:", homeRes.error);
  if (heroSlidesRes.error)
    console.error("Hero slides fetch error:", heroSlidesRes.error);
  if (aboutRes.error)
    console.error("About section fetch error:", aboutRes.error);
  if (servicesRes.error)
    console.error("Services fetch error:", servicesRes.error);
  if (whyChooseUsRes.error)
    console.error("Why choose us fetch error:", whyChooseUsRes.error);
  if (industrySectionRes.error)
    console.error("Industry section fetch error:", industrySectionRes.error);
  if (contactPageRes.error)
    console.error("Contact page fetch error:", contactPageRes.error);
  if (blogsRes.error) console.error("Blogs fetch error:", blogsRes.error);
  if (servicesPageRes.error)
    console.error("Services page fetch error:", servicesPageRes.error);
  if (clientsRes.error) console.error("Clients fetch error:", clientsRes.error);
  if (statsRes.error) console.error("Stats fetch error:", statsRes.error);
  if (testimonialsRes.error)
    console.error("Testimonials fetch error:", testimonialsRes.error);

  const whyChooseUsData = whyChooseUsRes.data || null;
  const industrySection = industrySectionRes.data || null;

  const [whyChoosePointsRes, industryItemsRes] = await Promise.all([
    whyChooseUsData?.id
      ? supabaseServer
          .from("why_choose_points")
          .select("point")
          .eq("why_id", whyChooseUsData.id)
          .order("created_at", { ascending: true })
      : Promise.resolve({ data: [], error: null }),

    industrySection?.id
      ? supabaseServer
          .from("industry_items")
          .select("*")
          .eq("industry_id", industrySection.id)
          .order("created_at", { ascending: true })
      : Promise.resolve({ data: [], error: null }),
  ]);

  if (whyChoosePointsRes.error) {
    console.error("Why choose points fetch error:", whyChoosePointsRes.error);
  }

  if (industryItemsRes.error) {
    console.error("Industry items fetch error:", industryItemsRes.error);
  }

  const blogsData = blogsRes.data || [];
  const firstBlog = blogsData[0] || null;

  const blogSectionData = {
    badge: firstBlog?.badge || "Insights & Resources",
    title: firstBlog?.section_title || "Audit & Compliance Insights in Dubai",
    subtitle:
      firstBlog?.section_subtitle ||
      "Expert insights on auditing, VAT, and compliance to help your business stay secure, compliant, and growth-ready in the UAE.",
    buttonText: firstBlog?.button_text || "View All Insights",
  };

  const clientsData = clientsRes.data || [];
  const firstClient = clientsData[0] || null;

  const clientsSectionData = {
    badge: firstClient?.badge || "Our Clients",
    title: firstClient?.title || "Trusted by Leading Organizations",
    subtitle:
      firstClient?.subtitle ||
      "We collaborate with companies across the UAE and international markets, delivering reliable audit, compliance, and advisory services.",
  };

  const testimonialsData = testimonialsRes.data || [];
  const firstTestimonial = testimonialsData[0] || null;

  const testimonialsSectionData = {
    badge: firstTestimonial?.badge || "Testimonials",
    title: firstTestimonial?.section_title || "What Our Clients Say",
    subtitle:
      firstTestimonial?.section_subtitle ||
      "Trusted by businesses for delivering reliable audit, compliance, and financial advisory services.",
  };

  const whyChoosePoints = (whyChoosePointsRes.data || [])
    .map((item) => item.point)
    .filter(Boolean);

  return {
    props: {
      meta: homeRes.data || null,
      heroSlides: heroSlidesRes.data || [],
      about: aboutRes.data || null,
      services: servicesRes.data || [],
      servicesPage: servicesPageRes.data || null,
      whyChooseUs: whyChooseUsData,
      whyChoosePoints,
      industrySection,
      industryItems: industryItemsRes.data || [],
      contactPage: contactPageRes.data || null,
      blogs: blogsData,
      blogSectionData,
      clients: clientsData,
      clientsSectionData,
      testimonials: testimonialsData,
      testimonialsSectionData,
      stats: statsRes.data || [],
    },
  };
}
