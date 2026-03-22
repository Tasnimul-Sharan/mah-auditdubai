"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";

const Field = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-xs text-gray-500 uppercase">{label}</p>
    <p className="text-sm text-gray-800 whitespace-pre-line">{value || "—"}</p>
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
      .then(({ data }) => {
        setBlog(data);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!blog) return <div className="p-6">Blog not found</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl border space-y-6">
      <h1 className="text-2xl font-bold">Blog Details</h1>

      <div className="grid grid-cols-2 gap-6">
        <Field label="Title" value={blog.title} />
        <Field label="Slug" value={blog.slug} />
        <Field label="Author" value={blog.author} />
        <Field label="Date" value={formatDate(blog.date)} />
      </div>

      <Field label="Description" value={blog.description} />
      <Field label="Quote" value={blog.quote} />

      {/* Main Image */}
      {blog.image && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Main Image</p>
          <img
            src={blog.image}
            className="w-48 h-48 object-cover rounded border"
          />
        </div>
      )}

      {/* Sub Images */}
      {blog.subimages?.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Sub Images</p>
          <div className="grid grid-cols-4 gap-4">
            {blog.subimages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-full h-32 object-cover rounded border"
              />
            ))}
          </div>
        </div>
      )}

      {/* Checklist */}
      {blog.checklist?.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Checklist</p>
          <ul className="list-disc pl-5 text-sm">
            {blog.checklist.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {blog.posttags?.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Tags</p>
          <div className="flex gap-2 flex-wrap">
            {blog.posttags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-gray-200 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => router.push(`/dashboard/blogs/edit/${blog.id}`)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Edit Blog
        </button>

        <button
          onClick={() => router.back()}
          className="border px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}

ViewBlogPage.getLayout = (page) => (
  <AdminLayout title="View Blog">{page}</AdminLayout>
);
