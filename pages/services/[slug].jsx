// "use client";

// import { useRouter } from "next/router";
// import Head from "next/head";
// import { RiLoader2Fill } from "react-icons/ri";
// import HeroSection from "@/components/HeroSection";
// import { servicesDetailsData } from "@/data/serviceDetailsData";
// import ServicesDetails from "@/components/ServicesDetails";
// import Navbar from "@/components/Navbar";

// export default function ServicesDetailsPage() {
//   const router = useRouter();
//   const { slug } = router.query;

//   // 🔄 Loading State
//   if (!slug) {
//     return (
//       <div className="flex flex-col gap-2 justify-center items-center min-h-screen text-secondary">
//         <RiLoader2Fill className="animate-spin w-6 h-6" />
//         <p className="font-medium text-xl">Loading...</p>
//       </div>
//     );
//   }

//   // ✅ Get service directly by slug
//   const service = servicesDetailsData[slug];

//   // ❌ Not Found
//   if (!service) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-secondary font-medium text-xl">
//           Service detail not found.
//         </p>
//       </div>
//     );
//   }

//   // 🌐 SEO Meta Setup
//   const siteUrl = "https://mah-auditdubai.ae";
//   const pageUrl = `${siteUrl}/services/${slug}`;
//   const ogImage = `${siteUrl}/services/services-og.jpg`;

//   const meta = {
//     title: `${service.hero.title} | MAH Audit Dubai`,
//     description:
//       service.hero.description1 ||
//       "Professional audit, accounting, tax and business advisory services in Dubai, UAE.",
//     keywords: `${service.hero.title}, audit services Dubai, audit firm UAE, accounting services Dubai, tax consultant Dubai, MAH Audit Dubai`,
//     author: "MAH Audit Dubai",
//     url: pageUrl,
//     image: ogImage,
//   };

//   return (
//     <div>
//       <Head>
//         {/* Basic SEO */}
//         <title>{meta.title}</title>
//         <meta name="description" content={meta.description} />
//         <meta name="keywords" content={meta.keywords} />
//         <meta name="author" content={meta.author} />
//         <meta name="robots" content="index, follow" />

//         <link rel="canonical" href={meta.url} />

//         <meta property="og:type" content="website" />
//         <meta property="og:title" content={meta.title} />
//         <meta property="og:description" content={meta.description} />
//         <meta property="og:url" content={meta.url} />
//         <meta property="og:site_name" content="MAH Audit Dubai" />
//         <meta property="og:image" content={meta.image} />
//         <meta property="og:image:alt" content={meta.title} />

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={meta.title} />
//         <meta name="twitter:description" content={meta.description} />
//         <meta name="twitter:image" content={meta.image} />
//       </Head>

//       <HeroSection
//         hero={{
//           title: service.hero.title,
//           backgroundImage: "/services/services-bg.jpg",
//         }}
//       />

//       <ServicesDetails service={service} />
//     </div>
//   );
// }

import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import ServicesDetails from "@/components/ServicesDetails";
import Navbar from "@/components/Navbar";
import { supabaseServer } from "@/lib/supabaseServer";

export default function ServicesDetailsPage({ service, slug }) {
  const siteUrl = "https://mah-auditdubai.ae";
  const pageUrl = `${siteUrl}/services/${slug}`;
  const ogImage = service.image || `${siteUrl}/services/services-og.jpg`;

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
        <meta property="og:site_name" content="MAH Audit Dubai" />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:alt" content={meta.title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>

      <Navbar hasBackground />

      <HeroSection
        hero={{
          title: service.hero?.title || service.title,
          backgroundImage: service.image || "/services/services-bg.jpg",
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
    },
  };
}
