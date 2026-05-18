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
import TeamSection from "@/components/TeamSection";

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
  const siteName = "MAH Audit Dubai";
  const siteUrl = "https://mah-auditdubai.ae";

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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: pageImage,
    description: pageDescription,
    areaServed: {
      "@type": "Place",
      name: "Dubai, UAE",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: pageTitle,
    url: pageUrl,
    description: pageDescription,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: pageUrl,
      },
    ],
  };

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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>

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

export async function getServerSideProps() {
  const { data: pageData } = await supabaseServer
    .from("about_page")
    .select("*")
    .single();

  const { data: aboutData } = await supabaseServer
    .from("about_section")
    .select("*")
    .single();

  const { data: visionMissionData } = await supabaseServer
    .from("vision_mission")
    .select(
      `
    *,
    vision_mission_points(*)
  `,
    )
    .order("id", { ascending: true });

  const { data: teamSection } = await supabaseServer
    .from("team_section")
    .select("*")
    .single();

  const { data: faqData } = await supabaseServer
    .from("faq")
    .select("*")
    .single();

  const { data: teamMembers } = await supabaseServer
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: whyUs } = await supabaseServer
    .from("why_us")
    .select("*")
    .single();
  const { data: premiumCTA } = await supabaseServer
    .from("premium_cta")
    .select("*")
    .single();

  const { data: testimonialsData } = await supabaseServer
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  const firstTestimonial = testimonialsData?.[0] || null;

  const testimonialsSectionData = {
    badge: firstTestimonial?.badge || "Testimonials",
    title: firstTestimonial?.section_title || "What Our Clients Say",
    subtitle:
      firstTestimonial?.section_subtitle ||
      "Trusted by businesses for delivering reliable audit, compliance, and financial advisory services.",
  };

  const { data: statsData } = await supabaseServer
    .from("stats")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: clientsData } = await supabaseServer
    .from("clients")
    .select("*")
    .order("created_at", { ascending: true });

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
