import Head from "next/head";
import AboutUsSection from "@/components/AboutUsSection";
import BlogSection from "@/components/BlogSection";
import LandingPage from "@/components/home/LandingPage";
import StatsSection from "@/components/StatsSection";
import ClientsSection from "@/components/home/ClientsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import { supabaseServer } from "@/lib/supabaseServer";
import IndustrySection from "@/components/IndustrySection";

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
}) {
  return (
    <div>
      <Head>
        <title>{meta?.meta_title}</title>
        <meta name="description" content={meta?.meta_description} />
        <meta name="keywords" content={meta?.meta_keywords} />
        <meta name="author" content={meta?.meta_author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={meta?.meta_url} />

        <meta property="og:title" content={meta?.meta_title} />
        <meta property="og:description" content={meta?.meta_description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta?.meta_url} />
        <meta property="og:image" content={meta?.meta_image} />
        <meta property="og:site_name" content="MAH Audit Dubai" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta?.meta_title} />
        <meta name="twitter:description" content={meta?.meta_description} />
        <meta name="twitter:image" content={meta?.meta_image} />

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

      <LandingPage slides={heroSlides} />
      <AboutUsSection data={about} />
      <ServicesSection
        services={services}
        sectionContent={servicesPage?.section_content}
      />
      <StatsSection />
      <WhyChooseUs data={whyChooseUs} points={whyChoosePoints} />

      <IndustrySection
        industrySection={industrySection}
        industryItems={industryItems}
      />

      <ClientsSection />
      <TestimonialsSection />

      <BlogSection blogs={blogs} sectionData={blogSectionData} />

      <ContactSection data={contactPage} />
    </div>
  );
}

export async function getServerSideProps() {
  const { data: homeData } = await supabaseServer
    .from("home_page")
    .select("*")
    .single();

  const { data: heroSlidesData } = await supabaseServer
    .from("hero_slides")
    .select("id, subtitle, title, description, image, public_id, created_at")
    .order("created_at", { ascending: true });

  const { data: aboutData } = await supabaseServer
    .from("about_section")
    .select("*")
    .single();

  const { data: servicesData } = await supabaseServer
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: whyChooseUsData } = await supabaseServer
    .from("why_choose_us")
    .select("id, title, subtitle, description, image, button_text, button_link")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let whyChoosePoints = [];

  if (whyChooseUsData?.id) {
    const { data: pointRows } = await supabaseServer
      .from("why_choose_points")
      .select("point")
      .eq("why_id", whyChooseUsData.id)
      .order("created_at", { ascending: true });

    whyChoosePoints = (pointRows || [])
      .map((item) => item.point)
      .filter(Boolean);
  }

  const { data: industrySection } = await supabaseServer
    .from("industries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let industryItems = [];

  if (industrySection?.id) {
    const { data: itemRows } = await supabaseServer
      .from("industry_items")
      .select("*")
      .eq("industry_id", industrySection.id)
      .order("created_at", { ascending: true });

    industryItems = itemRows || [];
  }

  const { data: contactPage } = await supabaseServer
    .from("contact_page")
    .select("*")
    .single();

  const { data: blogsData } = await supabaseServer
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  const firstBlog = blogsData?.[0] || null;

  const blogSectionData = {
    badge: firstBlog?.badge || "Insights & Resources",
    title: firstBlog?.section_title || "Audit & Compliance Insights in Dubai",
    subtitle:
      firstBlog?.section_subtitle ||
      "Expert insights on auditing, VAT, and compliance to help your business stay secure, compliant, and growth-ready in the UAE.",
    buttonText: firstBlog?.button_text || "View All Insights",
  };

  const { data: servicesPageData } = await supabaseServer
    .from("services_page")
    .select("*")
    .single();

  return {
    props: {
      meta: homeData || null,
      heroSlides: heroSlidesData || [],
      about: aboutData || null,
      services: servicesData || [],
      servicesPage: servicesPageData || null,
      whyChooseUs: whyChooseUsData || null,
      whyChoosePoints,
      industrySection: industrySection || null,
      industryItems,
      contactPage: contactPage || null,
      blogs: blogsData || [],
      blogSectionData,
    },
  };
}
