"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  Newspaper,
  CalendarDays,
  User,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

const PAGE_SIZE = 10;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState(null);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    loading: false,
  });

  const router = useRouter();

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const showModal = (type, message) => {
    setModal({
      show: true,
      type,
      message,
    });
  };

  const closeModal = () => {
    setModal({
      show: false,
      type: "success",
      message: "",
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      show: false,
      loading: false,
    });

    setDeleteId(null);
  };

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

    if (error) {
      console.error(error);
      showModal("error", "Blogs fetch failed. Please try again.");
      setLoading(false);
      return;
    }

    setBlogs(data || []);
    setTotal(count || 0);
    setLoading(false);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const requestDeleteBlog = (id) => {
    setDeleteId(id);

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDeleteBlog = async () => {
    if (!deleteId) {
      showModal("error", "No blog selected to delete.");
      closeConfirmModal();
      return;
    }

    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      const { error } = await supabaseServer
        .from("blogs")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      closeConfirmModal();
      showModal("success", "Blog deleted successfully.");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Blog delete failed. Please try again.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "No date";

    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
              <Newspaper className="text-primary" size={28} />
              All Blogs
            </h1>

            <p className="mt-1 text-gray-500">
              Manage blog posts, authors, dates, previews and updates.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard/blogs/add")}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary"
          >
            <Plus size={18} />
            Add Blog
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-gray-100 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by blog title..."
              className={`${inputClass} pl-11`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading blogs...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">S/L</th>
                    <th className="p-4 text-left font-semibold">Blog</th>
                    <th className="p-4 text-left font-semibold">Author</th>
                    <th className="p-4 text-left font-semibold">Date</th>
                    <th className="p-4 text-center font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {blogs.map((blog, i) => (
                    <tr
                      key={blog.id}
                      className="border-b last:border-b-0 even:bg-gray-50/60 transition-all duration-500 hover:bg-primary/5"
                    >
                      <td className="p-4 font-semibold text-gray-500">
                        {(page - 1) * PAGE_SIZE + i + 1}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          {blog.image ? (
                            <img
                              src={blog.image}
                              alt=""
                              className="h-14 w-20 rounded-xl border object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-20 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <Newspaper size={20} />
                            </div>
                          )}

                          <div>
                            <p className="font-bold text-gray-900">
                              {blog.title || "Untitled Blog"}
                            </p>
                            <p className="mt-1 max-w-md truncate text-xs text-gray-400">
                              {blog.description || "No description"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                          {/* <User size={14} className="text-primary" /> */}
                          {blog.author || "Unknown"}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                          {/* <CalendarDays size={14} className="text-primary" /> */}
                          {formatDate(blog.date)}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <ActionButton
                            color="emerald"
                            onClick={() =>
                              router.push(`/dashboard/blogs/view/${blog.id}`)
                            }
                          >
                            <Eye size={16} />
                          </ActionButton>

                          <ActionButton
                            color="blue"
                            onClick={() =>
                              router.push(`/dashboard/blogs/edit/${blog.id}`)
                            }
                          >
                            <Pencil size={16} />
                          </ActionButton>

                          <ActionButton
                            color="red"
                            onClick={() => requestDeleteBlog(blog.id)}
                          >
                            <Trash2 size={16} />
                          </ActionButton>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {blogs.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-10 text-center text-gray-400"
                      >
                        No blogs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i + 1)}
                className={`h-10 w-10 rounded-xl border text-sm font-semibold transition-all duration-500 ${
                  page === i + 1
                    ? "border-primary bg-primary text-white"
                    : "bg-white text-gray-600 hover:bg-primary hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Blog?"
        message="Are you sure you want to delete this blog permanently? This action cannot be undone."
        confirmText="Delete Blog"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={closeConfirmModal}
        onConfirm={confirmDeleteBlog}
      />

      <StatusModal
        show={modal.show}
        type={modal.type}
        message={modal.message}
        onClose={closeModal}
      />
    </>
  );
}

function ActionButton({ children, color, onClick }) {
  const colors = {
    emerald:
      "bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white",
    blue: "bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white",
    red: "bg-red-100 text-red-600 hover:bg-red-500 hover:text-white",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500 hover:-translate-y-0.5 ${colors[color]}`}
    >
      {children}
    </button>
  );
}

BlogsPage.getLayout = function getLayout(page) {
  return <AdminLayout title="Blogs">{page}</AdminLayout>;
};
