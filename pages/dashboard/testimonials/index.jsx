"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Save, MessageSquare, Star } from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

const cardClass =
  "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

const primaryBtn =
  "flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary";

export default function TestimonialsAdmin() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    badge: "",
    section_title: "",
    section_subtitle: "",
    name: "",
    role: "",
    text: "",
    rating: 5,
  });

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true);

    const { data } = await supabaseServer
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

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

    const payload = { ...form };

    if (editingId) {
      await supabaseServer
        .from("testimonials")
        .update(payload)
        .eq("id", editingId);
    } else {
      await supabaseServer.from("testimonials").insert([payload]);
    }

    resetForm();
    fetchData();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm(item);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabaseServer.from("testimonials").delete().eq("id", id);
    fetchData();
  };

  // ⭐ Star UI
  const renderStars = (count = 5) => {
    return [...Array(count)].map((_, i) => (
      <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <MessageSquare className="text-primary" />
        Testimonials
      </h1>

      {/* ================= SECTION SETTINGS ================= */}
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

        <div className="flex gap-3">
          <button type="submit" className={primaryBtn}>
            {editingId ? <Save /> : <Plus />}
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-3 rounded-xl bg-gray-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ================= CARDS ================= */}
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
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
                  onClick={() => handleEdit(item)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white"
                >
                  <Pencil size={15} />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

TestimonialsAdmin.getLayout = (page) => (
  <AdminLayout title="Testimonials">{page}</AdminLayout>
);
