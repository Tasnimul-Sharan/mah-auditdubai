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
        <title>{data?.meta_title}</title>

        <meta name="description" content={data?.meta_description} />
        <meta name="keywords" content={data?.meta_keywords} />
        <meta name="author" content={data?.meta_author} />

        <link rel="canonical" href={data?.meta_url} />

        {/* Open Graph */}
        <meta property="og:title" content={data?.meta_title} />
        <meta property="og:description" content={data?.meta_description} />
        <meta property="og:url" content={data?.meta_url} />
        <meta property="og:image" content={data?.meta_image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data?.meta_title} />
        <meta name="twitter:description" content={data?.meta_description} />
        <meta name="twitter:image" content={data?.meta_image} />

        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: data?.meta_title || "Contact | MAH Audit Dubai",
              url: data?.meta_url,
              description: data?.meta_description,
              keywords: data?.meta_keywords,
              mainEntity: {
                "@type": "Organization",
                name: "MAH Audit Dubai",
                url: data?.meta_url,
                logo: "https://mah-auditdubai.ae/logo.png",
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  areaServed: "Dubai, UAE",
                  availableLanguage: ["English"],
                },
              },
            }),
          }}
        />
      </Head>

      <HeroSection
        hero={{
          title: data?.hero_title || "Contact",
          backgroundImage: data?.hero_image || "/contact-bg.jpg",
        }}
      />

      <ContactHero />
      <ContactPageSection />
      <EventMap />
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await supabaseServer
    .from("contact_page")
    .select("*")
    .single();

  return {
    props: {
      data: data || null,
    },
  };
}
