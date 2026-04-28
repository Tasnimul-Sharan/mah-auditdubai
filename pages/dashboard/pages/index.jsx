"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import { Pencil, Trash2, Eye, Plus, Layers, Settings } from "lucide-react";

export default function PagesDashboard() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    setLoading(true);

    const { data, error } = await supabaseServer
      .from("pages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setPages([]);
    } else {
      setPages(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this page?")) return;

    const { error } = await supabaseServer.from("pages").delete().eq("id", id);

    if (error) {
      alert("Delete failed");
      console.error(error);
      return;
    }

    fetchPages();
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Layers className="text-primary" size={28} />
            Pages
          </h1>
          <p className="mt-1 text-gray-500">
            Manage custom pages, hero content, slugs and page sections.
          </p>
        </div>

        <Link href="/dashboard/pages/create">
          <button className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <Plus size={18} />
            New Page
          </button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading pages...</div>
        ) : pages.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No pages found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="p-4 text-center font-semibold">#</th>
                  <th className="p-4 text-left font-semibold">Page</th>
                  <th className="p-4 text-left font-semibold">Slug</th>
                  <th className="p-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pages.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-b last:border-b-0 even:bg-gray-50/70 hover:bg-primary/5 transition-all duration-500"
                  >
                    <td className="p-4 text-center font-semibold text-gray-500">
                      {i + 1}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        {p.hero_image ? (
                          <img
                            src={p.hero_image}
                            className="h-14 w-14 rounded-2xl border object-cover"
                            alt=""
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Layers size={20} />
                          </div>
                        )}

                        <div>
                          <p className="font-bold text-gray-900">
                            {p.hero_title || p.title || "Untitled Page"}
                          </p>
                          <p className="text-xs text-gray-400">
                            ID: {p.id?.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                        /{p.slug}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link href={`/${p.slug}`} target="_blank">
                          <ActionButton color="green" title="View">
                            <Eye size={16} />
                          </ActionButton>
                        </Link>

                        <Link href={`/dashboard/pages/edit/${p.slug}`}>
                          <ActionButton color="blue" title="Edit">
                            <Pencil size={16} />
                          </ActionButton>
                        </Link>

                        <Link href={`/dashboard/pages/${p.slug}`}>
                          <ActionButton color="purple" title="Manage">
                            <Settings size={16} />
                          </ActionButton>
                        </Link>

                        <ActionButton
                          color="red"
                          title="Delete"
                          onClick={() => handleDelete(p.id)}
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({ children, color = "blue", onClick, title }) {
  const colors = {
    green: "bg-green-100 text-green-600 hover:bg-green-500 hover:text-white",
    blue: "bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white",
    purple:
      "bg-purple-100 text-purple-600 hover:bg-purple-500 hover:text-white",
    red: "bg-red-100 text-red-600 hover:bg-red-500 hover:text-white",
  };

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500 hover:-translate-y-0.5 ${colors[color]}`}
    >
      {children}
    </button>
  );
}

PagesDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
