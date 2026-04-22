// import { supabaseServer } from "@/lib/supabaseServer";
// import Head from "next/head";

// export default function DynamicPage({ page, sections }) {
//   if (!page) return <p>Page not found</p>;

//   return (
//     <>
//       {/* ================= SEO ================= */}
// <Head>
//   <title>{page.meta_title || page.title}</title>

//   <meta name="description" content={page.meta_description || ""} />

//   <meta name="keywords" content={page.meta_keywords || ""} />

//   <meta name="author" content={page.meta_author || ""} />

//   {/* OPEN GRAPH */}
//   <meta property="og:title" content={page.meta_title || page.title} />
//   <meta property="og:description" content={page.meta_description || ""} />
//   <meta property="og:image" content={page.meta_image || ""} />
//   <meta property="og:url" content={page.meta_url || ""} />

//   {/* TWITTER */}
//   <meta name="twitter:card" content="summary_large_image" />
//   <meta name="twitter:title" content={page.meta_title || page.title} />
//   <meta
//     name="twitter:description"
//     content={page.meta_description || ""}
//   />
//   <meta name="twitter:image" content={page.meta_image || ""} />

//   {/* CANONICAL */}
//   <link rel="canonical" href={page.meta_url || ""} />
// </Head>

//       {/* ================= PAGE CONTENT ================= */}
//       <div>
//         <h1>{page.title}</h1>

//         {sections.map((sec) => {
//           switch (sec.type) {
//             case "hero":
//               return <div key={sec.id}>🔥 Hero: {sec.content?.text}</div>;

//             case "about":
//               return <div key={sec.id}>📘 About: {sec.content?.text}</div>;

//             case "why":
//               return <div key={sec.id}>💡 Why: {sec.content?.text}</div>;

//             case "services":
//               return <div key={sec.id}>🛠 Services: {sec.content?.text}</div>;

//             default:
//               return null;
//           }
//         })}
//       </div>
//     </>
//   );
// }

// export async function getServerSideProps({ params }) {
//   const { slug } = params;

//   const { data: page } = await supabaseServer
//     .from("pages")
//     .select("*")
//     .eq("slug", slug)
//     .single();

//   const { data: sections } = await supabaseServer
//     .from("sections")
//     .select("*")
//     .eq("page_slug", slug)
//     .order("position");

//   return {
//     props: {
//       page: page || null,
//       sections: sections || [],
//     },
//   };
// }

// import { supabaseServer } from "@/lib/supabaseServer";
// import HeroSection from "@/components/HeroSection";
// import Head from "next/head";

// export default function DynamicPage({ page }) {
//   if (!page) return <p>Page not found</p>;

//   return (
//     <>
//       <Head>
//         <title>{page.meta_title || page.title}</title>

//         <meta name="description" content={page.meta_description || ""} />

//         <meta name="keywords" content={page.meta_keywords || ""} />

//         <meta name="author" content={page.meta_author || ""} />

//         {/* OPEN GRAPH */}
//         <meta property="og:title" content={page.meta_title || page.title} />
//         <meta property="og:description" content={page.meta_description || ""} />
//         <meta property="og:image" content={page.meta_image || ""} />
//         <meta property="og:url" content={page.meta_url || ""} />

//         {/* TWITTER */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={page.meta_title || page.title} />
//         <meta
//           name="twitter:description"
//           content={page.meta_description || ""}
//         />
//         <meta name="twitter:image" content={page.meta_image || ""} />

//         {/* CANONICAL */}
//         <link rel="canonical" href={page.meta_url || ""} />
//       </Head>
//       <HeroSection
//         hero={{
//           title: page.title,
//           backgroundImage: page.hero_image || "/default.jpg",
//         }}
//       />

//       <div className="p-10">
//         <h1 className="text-3xl font-bold">{page.title}</h1>
//       </div>
//     </>
//   );
// }

import HeroSection from "@/components/HeroSection";
import DynamicBlock from "@/components/sections/DynamicBlock";
import { supabaseServer } from "@/lib/supabaseServer";
import Head from "next/head";

export default function DynamicPage({ page, sections }) {
  if (!page) return <p>Page not found</p>;

  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>{page.meta_title || page.title}</title>
        <meta name="description" content={page.meta_description || ""} />
      </Head>
      {/* ================= HERO ================= */}
      <HeroSection
        hero={{
          title: page.title,
          backgroundImage: page.hero_image || "/default.jpg",
        }}
      />
        {/* ================= DYNAMIC SECTIONS ================= */}
      <div className="space-y-6 py-12">
        {sections.map((sec) => (
          <DynamicBlock key={sec.id} section={sec} />
        ))}
      </div>

    </>
  );
}

// export async function getServerSideProps({ params }) {
//   const { slug } = params;

//   const { data: page } = await supabaseServer
//     .from("pages")
//     .select("*")
//     .eq("slug", slug)
//     .single();

//   return {
//     props: {
//       page: page || null,
//     },
//   };
// }

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const { data: page } = await supabaseServer
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  const { data: sections } = await supabaseServer
    .from("sections")
    .select("*, types(name, slug)")
    .eq("page_slug", slug)
    .order("position");

  return {
    props: {
      page: page || null,
      sections: sections || [],
    },
  };
}