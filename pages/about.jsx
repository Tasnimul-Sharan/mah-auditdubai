import Head from "next/head";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import JsonLd from "@/components/JsonLd";
import { supabaseServer } from "@/lib/supabaseServer";
import {
  SITE_NAME,
  SITE_URL,
  createBreadcrumbSchema,
  createBusinessSchema,
  createFAQPageSchema,
  createWebPageSchema,
} from "@/lib/structuredData";

const AboutUsSection = dynamic(() => import("@/components/AboutUsSection"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const VisionMission = dynamic(() => import("@/components/VisionMission"));
const PremiumCTA = dynamic(() => import("@/components/PremiumCTA"));
const WhyUs = dynamic(() => import("@/components/WhyUs"));
const StatsSection = dynamic(() => import("@/components/StatsSection"));
const ClientsSection = dynamic(
  () => import("@/components/home/ClientsSection"),
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection"),
);
const TeamSection = dynamic(() => import("@/components/TeamSection"));

export default function AboutPage({
  data,
  about,
  teamSection,
  teamMembers,
  whyUs,
  premiumCTA,
  testimonials,
  clients,
  clientsSectionData,
  testimonialsSectionData,
  stats,
  visionMission,
  faqData,
}) {
  const siteName = SITE_NAME;
  const siteUrl = SITE_URL;

  const pageTitle =
    data?.meta_title || "About MAH Audit Dubai | Leading Audit Firm in UAE";

  const pageDescription =
    data?.meta_description ||
    "Learn more about MAH Audit Dubai, a trusted audit, VAT, and accounting firm helping businesses grow across the UAE.";

  const pageUrl = data?.meta_url?.trim() || `${siteUrl}/about`;
  const pageImage = data?.meta_image?.trim() || `${siteUrl}/og-about.jpg`;

  const pageKeywords =
    data?.meta_keywords ||
    "about audit firm dubai, MAH Audit UAE, accounting firm dubai";

  const organizationSchema = createBusinessSchema({
    url: pageUrl,
    image: pageImage,
    description: pageDescription,
    testimonials,
  });

  const webPageSchema = createWebPageSchema({
    type: "AboutPage",
    title: pageTitle,
    url: pageUrl,
    description: pageDescription,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "About", url: pageUrl },
  ]);

  const faqSchema = createFAQPageSchema(faqData?.faqs);

  return (
    <div className="w-full relative">
      <Head>
        <title>{pageTitle}</title>

        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content={data?.meta_author || siteName} />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

      </Head>
      <JsonLd
        data={[organizationSchema, webPageSchema, breadcrumbSchema, faqSchema]}
      />

      <HeroSection
        hero={{
          title: data?.hero_title || "About Us",
          backgroundImage: data?.hero_image || "/default-hero.jpg",
        }}
      />
      <AboutUsSection data={about} />
      <VisionMission sections={visionMission} />
      <WhyUs whyUs={whyUs} />
      <StatsSection stats={stats} />
      <ClientsSection clients={clients} sectionData={clientsSectionData} />
      <TeamSection section={teamSection} members={teamMembers} />
      <TestimonialsSection
        testimonials={testimonials}
        sectionData={testimonialsSectionData}
      />
      <FAQ faqData={faqData} />
      <PremiumCTA data={premiumCTA} />
    </div>
  );
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=3600",
  );

  const [
    { data: pageData },
    { data: aboutData },
    { data: visionMissionData },
    { data: teamSection },
    { data: faqData },
    { data: teamMembers },
    { data: whyUs },
    { data: premiumCTA },
    { data: testimonialsData },
    { data: statsData },
    { data: clientsData },
  ] = await Promise.all([
    supabaseServer.from("about_page").select("*").single(),
    supabaseServer.from("about_section").select("*").single(),
    supabaseServer
      .from("vision_mission")
      .select(
        `
    *,
    vision_mission_points(*)
  `,
      )
      .order("id", { ascending: true }),
    supabaseServer.from("team_section").select("*").single(),
    supabaseServer.from("faq").select("*").single(),
    supabaseServer
      .from("team_members")
      .select("*")
      .order("created_at", { ascending: true }),
    supabaseServer.from("why_us").select("*").single(),
    supabaseServer.from("premium_cta").select("*").single(),
    supabaseServer
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false }),
    supabaseServer.from("stats").select("*").order("created_at", {
      ascending: true,
    }),
    supabaseServer.from("clients").select("*").order("created_at", {
      ascending: true,
    }),
  ]);

  const firstTestimonial = testimonialsData?.[0] || null;

  const testimonialsSectionData = {
    badge: firstTestimonial?.badge || "Testimonials",
    title: firstTestimonial?.section_title || "What Our Clients Say",
    subtitle:
      firstTestimonial?.section_subtitle ||
      "Trusted by businesses for delivering reliable audit, compliance, and financial advisory services.",
  };

  const firstClient = clientsData?.[0] || null;

  const clientsSectionData = {
    badge: firstClient?.badge || "Our Clients",
    title: firstClient?.title || "Trusted by Leading Organizations",
    subtitle:
      firstClient?.subtitle ||
      "We collaborate with companies across the UAE and international markets, delivering reliable audit, compliance, and advisory services.",
  };

  return {
    props: {
      data: pageData || null,
      about: aboutData || null,
      faqData: faqData || null,
      visionMission: visionMissionData || [],
      premiumCTA: premiumCTA || null,
      teamSection: teamSection || null,
      teamMembers: teamMembers || [],
      whyUs: whyUs || null,
      testimonials: testimonialsData || [],
      testimonialsSectionData,
      stats: statsData || [],
      clients: clientsData || [],
      clientsSectionData,
    },
  };
}
