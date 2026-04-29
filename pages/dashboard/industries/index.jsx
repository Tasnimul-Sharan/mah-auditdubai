"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Save, Factory, ImageIcon } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";

export default function IndustriesAdmin() {
  const { uploadFile } = useUpload();

  const [section, setSection] = useState(null);
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    public_id: "",
    overlay_title: "",
    overlay_description: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("industries")
      .select("*")
      .single();

    if (data) {
      setSection(data);
      setForm({
        title: data.title || "",
        subtitle: data.subtitle || "",
        description: data.description || "",
        image: data.image || "",
        public_id: data.public_id || "",
        overlay_title: data.overlay_title || "",
        overlay_description: data.overlay_description || "",
      });

      const { data: list } = await supabaseServer
        .from("industry_items")
        .select("*")
        .eq("industry_id", data.id);

      setItems(list || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const saveSection = async () => {
    try {
      setSaving(true);

      let imageUrl = form.image;
      let publicId = form.public_id || section?.public_id || null;

      if (file) {
        if (publicId) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: publicId }),
          });
        }

        const res = await uploadFile(file, "industries");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      const payload = {
        title: form.title,
        subtitle: form.subtitle,
        description: form.description,
        image: imageUrl,
        public_id: publicId,
        overlay_title: form.overlay_title,
        overlay_description: form.overlay_description,
      };

      if (section) {
        const { error } = await supabaseServer
          .from("industries")
          .update(payload)
          .eq("id", section.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("industries")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setSection(data);
      }

      setFile(null);
      setPreview("");
      alert("Section saved successfully");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteImage = async () => {
    const publicId = form.public_id || section?.public_id;
    if (!publicId || !section?.id) return;

    try {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      await supabaseServer
        .from("industries")
        .update({ image: null, public_id: null })
        .eq("id", section.id);

      setForm({ ...form, image: "", public_id: "" });
      setPreview("");
      setFile(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const addItem = async () => {
    if (!text.trim()) return alert("Industry item is required");

    if (!section?.id) {
      alert("Please save section first");
      return;
    }

    const { error } = await supabaseServer.from("industry_items").insert([
      {
        industry_id: section.id,
        title: text,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Item add failed");
      return;
    }

    setText("");
    fetchData();
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this industry?")) return;

    const { error } = await supabaseServer
      .from("industry_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Delete failed");
      return;
    }

    fetchData();
  };

  const updateItem = async (id) => {
    if (!text.trim()) return alert("Industry item is required");

    const { error } = await supabaseServer
      .from("industry_items")
      .update({ title: text })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Update failed");
      return;
    }

    setEditing(null);
    setText("");
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Factory className="text-primary" size={28} />
          Industries
        </h1>

        <p className="text-gray-500 mt-1">
          Manage industries section content, image and industry list.
        </p>
      </div>

      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <ImageIcon size={20} className="text-primary" />
          Section Content
        </h2>

        <input
          placeholder="Title"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClass}
        />

        <input
          placeholder="Subtitle"
          value={form.subtitle || ""}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className={inputClass}
        />

        <textarea
          placeholder="Description"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className={inputClass}
        />

        <input
          placeholder="Overlay Title"
          value={form.overlay_title || ""}
          onChange={(e) => setForm({ ...form, overlay_title: e.target.value })}
          className={inputClass}
        />

        <textarea
          placeholder="Overlay Description"
          value={form.overlay_description || ""}
          onChange={(e) =>
            setForm({ ...form, overlay_description: e.target.value })
          }
          rows={3}
          className={inputClass}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={inputClass}
        />

        {(preview || form.image) && (
          <div className="relative w-fit rounded-2xl border bg-gray-50 p-3">
            <img
              src={preview || form.image}
              className="w-72 h-44 object-cover rounded-xl"
              alt=""
            />

            {!preview && form.image && (
              <button
                type="button"
                onClick={deleteImage}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-500"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={saveSection}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Section"}
        </button>
      </div>

      <div className={cardClass}>
        <h2 className="text-xl font-bold text-gray-900">Industry Items</h2>

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={editing ? "Update industry" : "Add industry"}
            className={inputClass}
          />

          {editing ? (
            <button
              type="button"
              onClick={() => updateItem(editing)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-white transition-all duration-500 hover:bg-blue-600"
            >
              <Save size={16} />
              Update
            </button>
          ) : (
            <button
              type="button"
              onClick={addItem}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white transition-all duration-500 hover:bg-secondary"
            >
              <Plus size={16} />
              Add
            </button>
          )}
        </div>

        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="rounded-2xl bg-gray-50 p-6 text-center text-gray-400">
              No industries added yet.
            </p>
          ) : (
            items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-2xl border bg-gray-50 p-4 transition-all duration-500 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {index + 1}
                  </span>

                  <p className="text-gray-700">{item.title}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(item.id);
                      setText(item.title);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-500 hover:bg-blue-500 hover:text-white"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-all duration-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

IndustriesAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
