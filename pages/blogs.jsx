import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import BlogPageSection from "@/components/BlogPageSection";
import JsonLd from "@/components/JsonLd";
import { supabaseServer } from "@/lib/supabaseServer";
import {
  SITE_NAME,
  SITE_URL,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/structuredData";

export default function BlogsPage({ data, blogs, blogSectionData }) {
  const pageUrl = data?.meta_url || `${SITE_URL}/blogs`;
  const pageTitle = data?.meta_title || "Blogs | MAH Audit Dubai";
  const pageDescription =
    data?.meta_description ||
    "Audit, tax, accounting and compliance insights from MAH Audit Dubai.";
  const pageImage = data?.meta_image || `${SITE_URL}/blogs/blog-og.jpg`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "MAH Audit Dubai Blog",
    url: pageUrl,
    description: pageDescription,
    keywords: data?.meta_keywords || undefined,
    publisher: {
      "@id": `${SITE_URL}/#business`,
    },
    blogPost: blogs.slice(0, 10).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: `${SITE_URL}/blogs/${blog.slug}`,
      datePublished: blog.date || blog.created_at,
    })),
  };

  const webPageSchema = createWebPageSchema({
    title: pageTitle,
    url: pageUrl,
    description: pageDescription,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blogs", url: pageUrl },
  ]);

  return (
    <div className="w-full relative">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={data?.meta_keywords || ""} />
        <meta name="author" content={data?.meta_author || SITE_NAME} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content={pageDescription}
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content={pageDescription}
        />
        <meta name="twitter:image" content={pageImage} />
        <meta name="robots" content="index, follow" />
      </Head>
      <JsonLd data={[blogSchema, webPageSchema, breadcrumbSchema]} />
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
