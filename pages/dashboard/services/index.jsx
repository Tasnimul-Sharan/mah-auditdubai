"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus, Search, Layers } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";
import OptimizedImage from "@/components/OptimizedImage";

const PAGE_SIZE = 10;

export default function ServicesPage() {
  const [services, setServices] = useState([]);
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

    if (error) {
      console.error(error);
      showModal("error", "Services fetch failed. Please try again.");
      setLoading(false);
      return;
    }

    setServices(data || []);
    setTotal(count || 0);
    setLoading(false);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const requestDeleteService = (id) => {
    setDeleteId(id);

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDeleteService = async () => {
    if (!deleteId) {
      showModal("error", "No service selected to delete.");
      closeConfirmModal();
      return;
    }

    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      const { error } = await supabaseServer
        .from("services")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      closeConfirmModal();
      showModal("success", "Service deleted successfully.");
      fetchServices();
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Service delete failed. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Layers className="text-primary" size={28} />
              All Services
            </h1>
            <p className="text-gray-500 mt-1">
              Manage, edit, preview and delete service content.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard/services/add")}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary"
          >
            <Plus size={18} />
            Add Service
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
              placeholder="Search by service title..."
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
              Loading services...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-4 text-left">S/L</th>
                    <th className="p-4 text-left">Service</th>
                    <th className="p-4 text-left">Slug</th>
                    <th className="p-4 text-center">Image</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {services.map((service, i) => (
                    <tr
                      key={service.id}
                      className="border-b last:border-b-0 even:bg-gray-50/60 hover:bg-primary/5 transition-all duration-500"
                    >
                      <td className="p-4 font-semibold text-gray-500">
                        {(page - 1) * PAGE_SIZE + i + 1}
                      </td>

                      <td className="p-4">
                        <p className="font-bold text-gray-900">
                          {service.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {service.description?.slice(0, 70)}...
                        </p>
                      </td>

                      <td className="p-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                          /{service.slug}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        {service.image ? (
                          <div className="relative mx-auto h-14 w-20 overflow-hidden rounded-xl border">
                            <OptimizedImage
                              src={service.image}
                              alt="Service"
                              fill
                              width={120}
                              sizes="80px"
                              className="object-cover"
                              unoptimized={service.image.startsWith("blob:")}
                            />
                          </div>
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <ActionButton
                            color="emerald"
                            onClick={() =>
                              router.push(
                                `/dashboard/services/view/${service.slug}`,
                              )
                            }
                          >
                            <Eye size={16} />
                          </ActionButton>

                          <ActionButton
                            color="blue"
                            onClick={() =>
                              router.push(
                                `/dashboard/services/edit/${service.id}`,
                              )
                            }
                          >
                            <Pencil size={16} />
                          </ActionButton>

                          <ActionButton
                            color="red"
                            onClick={() => requestDeleteService(service.id)}
                          >
                            <Trash2 size={16} />
                          </ActionButton>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {services.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-10 text-center text-gray-400"
                      >
                        No services found
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
                    ? "bg-primary text-white border-primary"
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
        title="Delete Service?"
        message="Are you sure you want to delete this service permanently? This action cannot be undone."
        confirmText="Delete Service"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={closeConfirmModal}
        onConfirm={confirmDeleteService}
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

ServicesPage.getLayout = (page) => (
  <AdminLayout title="Services">{page}</AdminLayout>
);
