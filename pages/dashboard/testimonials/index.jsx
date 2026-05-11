"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Save, MessageSquare, Star } from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

const cardClass =
  "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

const primaryBtn =
  "flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60";

export default function TestimonialsAdmin() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const [form, setForm] = useState({
    badge: "",
    section_title: "",
    section_subtitle: "",
    name: "",
    role: "",
    text: "",
    rating: 5,
  });

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

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true);

    const { data, error } = await supabaseServer
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      showModal("error", "Testimonials fetch failed.");
      setLoading(false);
      return;
    }

    setData(data || []);

    if (data?.length > 0 && !editingId) {
      setForm((prev) => ({
        ...prev,
        badge: data[0]?.badge || "Testimonials",
        section_title: data[0]?.section_title || "What Our Clients Say",
        section_subtitle:
          data[0]?.section_subtitle ||
          "Trusted by businesses for delivering reliable services.",
      }));
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      ...form,
      name: "",
      role: "",
      text: "",
      rating: 5,
    });
  };

  // ================= SAVE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.role.trim() || !form.text.trim()) {
      showModal(
        "error",
        "Client name, role and testimonial text are required.",
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        badge: form.badge,
        section_title: form.section_title,
        section_subtitle: form.section_subtitle,
        name: form.name,
        role: form.role,
        text: form.text,
        rating: form.rating,
      };

      if (editingId) {
        const { error } = await supabaseServer
          .from("testimonials")
          .update(payload)
          .eq("id", editingId);

        if (error) throw error;

        showModal("success", "Testimonial updated successfully.");
      } else {
        const { error } = await supabaseServer
          .from("testimonials")
          .insert([payload]);

        if (error) throw error;

        showModal("success", "Testimonial added successfully.");
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Save failed. Please check your data and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      badge: item.badge || form.badge || "",
      section_title: item.section_title || form.section_title || "",
      section_subtitle: item.section_subtitle || form.section_subtitle || "",
      name: item.name || "",
      role: item.role || "",
      text: item.text || "",
      rating: item.rating || 5,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= DELETE WITH MODAL =================
  const requestDelete = (id) => {
    setDeleteId(id);

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDelete = async () => {
    if (!deleteId) {
      showModal("error", "No testimonial selected to delete.");
      closeConfirmModal();
      return;
    }

    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      const { error } = await supabaseServer
        .from("testimonials")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      if (editingId === deleteId) {
        resetForm();
      }

      closeConfirmModal();
      showModal("success", "Testimonial deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Delete failed. Please try again.");
    }
  };

  // ⭐ Star UI
  const renderStars = (count = 5) => {
    return [...Array(Number(count) || 5)].map((_, i) => (
      <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
    ));
  };

  const handleSectionSettingsUpdate = async () => {
    try {
      setSaving(true);

      const payload = {
        badge: form.badge || "Testimonials",
        section_title: form.section_title || "What Our Clients Say",
        section_subtitle:
          form.section_subtitle ||
          "Trusted by businesses for delivering reliable services.",
      };

      if (data.length === 0) {
        showModal(
          "error",
          "First add at least one testimonial, then update section settings.",
        );
        return;
      }

      const { error } = await supabaseServer
        .from("testimonials")
        .update(payload)
        .not("id", "is", null);

      if (error) throw error;

      showModal("success", "Section settings updated successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Section settings update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="text-primary" />
          Testimonials
        </h1>

        <div className={cardClass}>
          <h2 className="text-xl font-bold">Section Settings</h2>

          <input
            name="badge"
            value={form.badge}
            onChange={handleChange}
            placeholder="Badge"
            className={inputClass}
          />

          <input
            name="section_title"
            value={form.section_title}
            onChange={handleChange}
            placeholder="Title"
            className={inputClass}
          />

          <textarea
            name="section_subtitle"
            value={form.section_subtitle}
            onChange={handleChange}
            rows={3}
            placeholder="Subtitle"
            className={inputClass}
          />

          <button
            type="button"
            onClick={handleSectionSettingsUpdate}
            disabled={saving}
            className={primaryBtn}
          >
            <Save size={18} />
            {saving ? "Updating..." : "Update Section Settings"}
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className={cardClass}>
          <h2 className="text-xl font-bold">
            {editingId ? "Edit Testimonial" : "Add Testimonial"}
          </h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Client Name"
            className={inputClass}
          />

          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Client Role"
            className={inputClass}
          />

          <textarea
            name="text"
            value={form.text}
            onChange={handleChange}
            rows={4}
            placeholder="Testimonial"
            className={inputClass}
          />

          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className={inputClass}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} Star
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className={primaryBtn}>
              {editingId ? <Save size={18} /> : <Plus size={18} />}
              {saving ? "Saving..." : editingId ? "Update" : "Add"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 rounded-xl bg-gray-200 transition hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* ================= CARDS ================= */}
        {loading ? (
          <div className="rounded-2xl border bg-white p-8 text-center text-gray-400">
            Loading...
          </div>
        ) : data.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-center text-gray-400">
            No testimonials found.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white rounded-2xl border shadow-sm hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">{item.name}</h3>
                  <div className="flex gap-1">{renderStars(item.rating)}</div>
                </div>

                <p className="text-sm text-gray-500 mb-2">{item.role}</p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.text}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition hover:bg-blue-500 hover:text-white"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => requestDelete(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Testimonial?"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete Testimonial"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={closeConfirmModal}
        onConfirm={confirmDelete}
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

TestimonialsAdmin.getLayout = (page) => (
  <AdminLayout title="Testimonials">{page}</AdminLayout>
);
