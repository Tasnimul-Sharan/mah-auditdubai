"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";

const PAGE_SIZE = 10;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  const fetchBlogs = async () => {
    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabaseServer
      .from("blogs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error, count } = await query;

    if (!error) {
      setBlogs(data);
      setTotal(count);
    }

    setLoading(false);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog permanently?")) return;

    const { error } = await supabaseServer.from("blogs").delete().eq("id", id);

    if (!error) fetchBlogs();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Blogs</h1>

        <button
          onClick={() => router.push("/dashboard/blogs/add")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
        >
          <Plus size={18} /> Add Blog
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-border_color flex gap-4">
        <input
          type="text"
          placeholder="Search by blog title..."
          className="border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border_color overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading blogs...</div>
        ) : (
          <table className="w-full text-sm border border-gray-200 border-collapse">
            <thead className="bg-primary text-white sticky top-0">
              <tr>
                <th className="p-3 text-left border">S/L</th>
                <th className="p-3 text-left border">Title</th>
                <th className="p-3 text-left border">Author</th>
                <th className="p-3 text-left border">Date</th>
                <th className="p-3 text-center border w-32">Action</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog, i) => (
                <tr
                  key={blog.id}
                  className="even:bg-gray-50 hover:bg-blue-50 transition"
                >
                  <td className="p-3 border">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>

                  <td className="p-3 border font-medium">{blog.title}</td>

                  <td className="p-3 border">{blog.author}</td>

                  <td className="p-3 border">{formatDate(blog.date)}</td>

                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <button
                        onClick={() =>
                          router.push(`/dashboard/blogs/view/${blog.id}`)
                        }
                        className="bg-emerald-100 p-2 rounded hover:bg-emerald-200"
                      >
                        <Eye size={16} className="text-emerald-600" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          router.push(`/dashboard/blogs/edit/${blog.id}`)
                        }
                        className="bg-blue-100 p-2 rounded hover:bg-blue-200"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="bg-red-100 p-2 rounded hover:bg-red-200"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {blogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded border transition
                ${
                  page === i + 1
                    ? "bg-primary text-white border-primary"
                    : "hover:bg-primary hover:text-white"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

BlogsPage.getLayout = function getLayout(page) {
  return <AdminLayout title="Blogs">{page}</AdminLayout>;
};
