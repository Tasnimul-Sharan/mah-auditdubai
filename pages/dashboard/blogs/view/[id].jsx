"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import OptimizedImage from "@/components/OptimizedImage";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Edit,
  ImageIcon,
  Newspaper,
  Quote,
  Tags,
  User,
} from "lucide-react";

const Field = ({ label, value }) => (
  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
      {label}
    </p>

    <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
      {value || "—"}
    </p>
  </div>
);

export default function ViewBlogPage() {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    supabaseServer
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Blog fetch error:", error);
          setBlog(null);
        } else {
          setBlog(data);
        }

        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "No date";

    const normalizedDate =
      typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
        ? `${dateStr}T00:00:00.000Z`
        : dateStr;

    const parsedDate = new Date(normalizedDate);

    if (Number.isNaN(parsedDate.getTime())) return "No date";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(parsedDate);
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-10 text-center text-gray-500">Blog not found</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Newspaper className="text-primary" size={28} />
            Blog Details
          </h1>

          <p className="mt-1 text-gray-500">
            Preview blog content, images, checklist and tags.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all duration-500 hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            type="button"
            onClick={() => router.push(`/dashboard/blogs/edit/${blog.id}`)}
            className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary"
          >
            <Edit size={16} />
            Edit Blog
          </button>
        </div>
      </div>

      {blog.image && (
        <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
          <div className="relative h-[420px] w-full">
            <OptimizedImage
              src={blog.image}
              alt={blog.title || "Blog image"}
              fill
              width={1200}
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
              Blog Preview
            </span>

            <h2 className="max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
              {blog.title}
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md">
                <User size={15} />
                {blog.author || "Unknown"}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md">
                <CalendarDays size={15} />
                {formatDate(blog.date)}
              </span>
            </div>
          </div>
        </div>
      )}

      {!blog.image && (
        <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          <h2 className="text-3xl font-bold text-gray-900">{blog.title}</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
              <User size={15} className="text-primary" />
              {blog.author || "Unknown"}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
              <CalendarDays size={15} className="text-primary" />
              {formatDate(blog.date)}
            </span>
          </div>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Slug" value={`/${blog.slug || ""}`} />
        <Field label="Date" value={formatDate(blog.date)} />
      </div>

      <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
          <Newspaper size={20} className="text-primary" />
          Description
        </h2>

        <p className="whitespace-pre-line leading-8 text-gray-600">
          {blog.description || "—"}
        </p>
      </div>

      {blog.quote && (
        <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/10 bg-primary/5 p-7">
          <Quote className="absolute -left-3 -top-3 h-16 w-16 text-primary/15" />

          <p className="relative whitespace-pre-line text-lg italic leading-8 text-gray-700">
            {blog.quote}
          </p>
        </div>
      )}

      {blog.subimages?.length > 0 && (
        <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
            <ImageIcon size={20} className="text-primary" />
            Sub Images
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {blog.subimages.map((img, i) => (
              <div
                key={`${img}-${i}`}
                className="relative h-36 w-full overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <OptimizedImage
                  src={img}
                  alt={`Sub image ${i + 1}`}
                  fill
                  width={400}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {blog.checklist?.length > 0 && (
        <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
            <CheckCircle size={20} className="text-primary" />
            Checklist
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            {blog.checklist.map((item, i) => (
              <div
                key={`${item}-${i}`}
                className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700"
              >
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {blog.highlights?.length > 0 && (
        <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
            <CheckCircle size={20} className="text-primary" />
            Highlights
          </h2>

          <div className="space-y-3">
            {blog.highlights.map((item, i) => (
              <div
                key={`${item}-${i}`}
                className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {blog.posttags?.length > 0 && (
        <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Tags size={20} className="text-primary" />
            Tags
          </h2>

          <div className="flex flex-wrap gap-2">
            {blog.posttags.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ViewBlogPage.getLayout = (page) => (
  <AdminLayout title="View Blog">{page}</AdminLayout>
);
