import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import BlogPageSection from "@/components/BlogPageSection";
import { supabaseServer } from "@/lib/supabaseServer";

export default function BlogsPage({ data, blogs, blogSectionData }) {
  return (
    <div className="w-full relative">
      <Head>
        <title>{data?.meta_title || "Blogs | MAH Audit Dubai"}</title>
        <meta name="description" content={data?.meta_description || ""} />
        <meta name="keywords" content={data?.meta_keywords || ""} />
        <meta name="author" content={data?.meta_author || ""} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={data?.meta_url || ""} />

        <meta property="og:title" content={data?.meta_title || ""} />
        <meta
          property="og:description"
          content={data?.meta_description || ""}
        />
        <meta property="og:url" content={data?.meta_url || ""} />
        <meta property="og:image" content={data?.meta_image || ""} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data?.meta_title || ""} />
        <meta
          name="twitter:description"
          content={data?.meta_description || ""}
        />
        <meta name="twitter:image" content={data?.meta_image || ""} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "MAH Audit Dubai Blog",
              url: data?.meta_url,
              description: data?.meta_description,
              keywords: data?.meta_keywords,
              areaServed: "Dubai, UAE",
            }),
          }}
        />
      </Head>

      <HeroSection
        hero={{
          title: data?.hero_title || "Blogs",
          backgroundImage: data?.hero_image || "/blogs/blog-hero.jpg",
        }}
      />

      <BlogPageSection blogs={blogs} sectionData={blogSectionData} />
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await supabaseServer.from("blog_page").select("*").single();

  const { data: blogsData, error: blogsError } = await supabaseServer
    .from("blogs")
    .select("*")
    .order("date", { ascending: false });

  if (blogsError) {
    console.error("Blogs fetch error:", blogsError);
  }

  const firstBlog = blogsData?.[0] || null;

  const blogSectionData = {
    badge: firstBlog?.badge || "Insights & Resources",
    title: firstBlog?.section_title || "Latest Blogs",
    subtitle:
      firstBlog?.section_subtitle ||
      "Stay updated with our latest insights and resources.",
    buttonText: firstBlog?.button_text || "Read More",
  };

  return {
    props: {
      data: data || null,
      blogs: blogsData || [],
      blogSectionData,
    },
  };
}