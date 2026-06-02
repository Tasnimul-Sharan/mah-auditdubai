import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import BlogDetails from "@/components/BlogDetails";
import JsonLd from "@/components/JsonLd";
import { supabaseServer } from "@/lib/supabaseServer";
import { RiLoader2Fill } from "react-icons/ri";
import {
  SITE_NAME,
  SITE_URL,
  createBlogPostingSchema,
  createBreadcrumbSchema,
} from "@/lib/structuredData";

export default function BlogDetailsPage({ blog, blogPage }) {
  if (blog === undefined) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center min-h-screen text-secondary">
        <RiLoader2Fill className="animate-spin w-6 h-6" />
        <p className="font-medium text-xl">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Blog not found</p>
      </div>
    );
  }

  const meta = {
    title: `${blog.title} | MAH Audit Dubai`,
    description: blog.description,
    keywords: Array.isArray(blog.posttags)
      ? blog.posttags.join(", ")
      : blog.posttags || "",
    author: blog.author,
    url: `https://mah-auditdubai.ae/blogs/${blog.slug}`,
    image: blog.image,
  };

  const blogPostingSchema = createBlogPostingSchema({
    blog,
    url: meta.url,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blogs", url: `${SITE_URL}/blogs` },
    { name: blog.title, url: meta.url },
  ]);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="author" content={meta.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={meta.url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <JsonLd data={[blogPostingSchema, breadcrumbSchema]} />

      <HeroSection
        hero={{
          title: blog.title,
          backgroundImage: blogPage?.hero_image || "/blogs/blog-hero.jpg",
        }}
      />

      <BlogDetails blogsData={blog} />
    </>
  );
}

// export async function getServerSideProps({ params }) {
//   const { slug } = params;
//   const { data: blog } = await supabaseServer
//     .from("blogs")
//     .select("*")
//     .eq("slug", slug)
//     .single();

//   const { data: blogPage } = await supabaseServer
//     .from("blog_page")
//     .select("*")
//     .single();

//   return {
//     props: {
//       blog: blog || null,
//       blogPage: blogPage || null,
//     },
//   };
// }

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=3600",
  );

  const { slug } = params;

  const [blogRes, blogPageRes] = await Promise.all([
    supabaseServer.from("blogs").select("*").eq("slug", slug).single(),

    supabaseServer.from("blog_page").select("hero_image").single(),
  ]);

  if (blogRes.error || !blogRes.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: blogRes.data,
      blogPage: blogPageRes.data || null,
    },
  };
}