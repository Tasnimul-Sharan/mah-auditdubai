"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";

const PAGE_SIZE = 10;

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchServices();
  }, [page, search]);

  const fetchServices = async () => {
    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabaseServer
      .from("services")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error, count } = await query;

    if (!error) {
      setServices(data);
      setTotal(count);
    }

    setLoading(false);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const deleteService = async (id) => {
    if (!confirm("Delete this service permanently?")) return;

    const { error } = await supabaseServer
      .from("services")
      .delete()
      .eq("id", id);

    if (!error) fetchServices();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Services</h1>

        <button
          onClick={() => router.push("/dashboard/services/add")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border flex gap-4">
        <input
          type="text"
          placeholder="Search by service title..."
          className="border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading services...
          </div>
        ) : (
          <table className="w-full text-sm border border-gray-200 border-collapse">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 border text-left">S/L</th>
                <th className="p-3 border text-left">Title</th>
                <th className="p-3 border text-left">Slug</th>
                <th className="p-3 border text-left">Image</th>
                <th className="p-3 border text-center w-32">Action</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service, i) => (
                <tr
                  key={service.id}
                  className="even:bg-gray-50 hover:bg-blue-50 transition"
                >
                  <td className="p-3 border">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>

                  <td className="p-3 border font-medium">{service.title}</td>

                  <td className="p-3 border">{service.slug}</td>

                  <td className="p-3 border">
                    {service.image && (
                      <img
                        src={service.image}
                        className="w-16 h-10 object-cover rounded"
                      />
                    )}
                  </td>

                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => router.push(`/services/${service.slug}`)}
                        className="bg-emerald-100 p-2 rounded hover:bg-emerald-200"
                      >
                        <Eye size={16} className="text-emerald-600" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          router.push(`/dashboard/services/edit/${service.id}`)
                        }
                        className="bg-blue-100 p-2 rounded hover:bg-blue-200"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteService(service.id)}
                        className="bg-red-100 p-2 rounded hover:bg-red-200"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {services.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No services found
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
              className={`px-4 py-2 rounded border transition ${
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

ServicesPage.getLayout = (page) => (
  <AdminLayout title="Services">{page}</AdminLayout>
);
