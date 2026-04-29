import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import ContactHero from "@/components/ContactHero";
import ContactPageSection from "@/components/ContactPageSection";
import EventMap from "@/components/EventMap";
import { supabaseServer } from "@/lib/supabaseServer";

export default function ContactPage({ data }) {
  return (
    <div className="w-full relative">
      <Head>
        <title>{data?.meta_title || "Contact | MAH Audit Dubai"}</title>
        <meta name="description" content={data?.meta_description || ""} />
        <meta name="keywords" content={data?.meta_keywords || ""} />
        <meta name="author" content={data?.meta_author || ""} />
        <link rel="canonical" href={data?.meta_url || ""} />

        <meta property="og:title" content={data?.meta_title || ""} />
        <meta
          property="og:description"
          content={data?.meta_description || ""}
        />
        <meta property="og:url" content={data?.meta_url || ""} />
        <meta property="og:image" content={data?.meta_image || ""} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data?.meta_title || ""} />
        <meta
          name="twitter:description"
          content={data?.meta_description || ""}
        />
        <meta name="twitter:image" content={data?.meta_image || ""} />
        <meta name="robots" content="index, follow" />
      </Head>

      <HeroSection
        hero={{
          title: data?.hero_title || "Contact",
          backgroundImage: data?.hero_image || "/contact-bg.jpg",
        }}
      />

      <ContactHero hero={data?.hero} stats={data?.stats} />
      <ContactPageSection contactInfo={data?.contact_info} />
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