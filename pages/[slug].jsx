import HeroSection from "@/components/HeroSection";
import DynamicBlock from "@/components/sections/DynamicBlock";
import { supabaseServer } from "@/lib/supabaseServer";
import Head from "next/head";

export default function DynamicPage({ page, sections }) {
  const pageUrl =
    page.meta_url || `https://mah-auditdubai.ae/${page.slug || ""}`;

  const metaTitle = page.meta_title || `${page.title} | MAH Audit Dubai`;

  const metaDescription =
    page.meta_description ||
    "Professional audit, accounting, tax and advisory services in Dubai, UAE.";

  const metaImage =
    page.meta_image ||
    page.hero_image ||
    "https://mah-auditdubai.ae/services/services-og.jpg";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={page.meta_keywords || ""} />
        <meta name="author" content={page.meta_author || "MAH Audit Dubai"} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:site_name" content="MAH Audit Dubai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Head>
      <main className="overflow-hidden bg-white">
        <HeroSection
          hero={{
            title: page.title,
            backgroundImage: page.hero_image || "/default.jpg",
          }}
        />
        <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-20">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6">
            {sections.length > 0 ? (
              <div className="space-y-20">
                {sections.map((sec) => (
                  <div
                    key={sec.id}
                    className="rounded-[2rem] border border-slate-100 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-sm md:p-10"
                  >
                    <DynamicBlock section={sec} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">
                  No sections added yet
                </h2>
                <p className="mt-3 text-slate-500">
                  Add sections from the page editor to build this page.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const slug = Array.isArray(params?.slug)
    ? params.slug.join("/")
    : params?.slug;

  const { data: page, error: pageError } = await supabaseServer
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (pageError || !page) {
    return {
      notFound: true,
    };
  }

  const { data: sections } = await supabaseServer
    .from("sections")
    .select("*, types(name, slug)")
    .eq("page_slug", slug)
    .eq("is_visible", true)
    .eq("status", "active")
    .order("position", { ascending: true });

  return {
    props: {
      page,
      sections: sections || [],
    },
  };
}