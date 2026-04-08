"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Save } from "lucide-react";
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
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [text, setText] = useState("");
  const [editing, setEditing] = useState(null);

  // ================= FETCH =================
  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("industries")
      .select("*")
      .single();

    if (data) {
      setSection(data);
      setForm(data);

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

  // ================= FILE CHANGE =================
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // ================= SAVE SECTION =================
  const saveSection = async () => {
    try {
      let imageUrl = form.image;
      let publicId = section?.public_id || null;

      if (file) {
        // 🔥 delete old image
        if (section?.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_id: section.public_id }),
          });
        }

        // 🔥 upload new
        const res = await uploadFile(file, "industries");

        imageUrl = res.url;
        publicId = res.public_id;
      }

      if (section) {
        await supabaseServer
          .from("industries")
          .update({
            ...form,
            image: imageUrl,
            public_id: publicId,
          })
          .eq("id", section.id);
      } else {
        await supabaseServer.from("industries").insert([
          {
            ...form,
            image: imageUrl,
            public_id: publicId,
          },
        ]);
      }

      // ✅ reset state
      setFile(null);
      setPreview("");

      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ================= DELETE IMAGE =================
  const deleteImage = async () => {
    if (!section?.public_id) return;

    try {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: section.public_id }),
      });

      await supabaseServer
        .from("industries")
        .update({ image: null, public_id: null })
        .eq("id", section.id);

      setPreview("");
      setFile(null);

      fetchData();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ================= ITEMS =================
  const addItem = async () => {
    if (!text || !section) return;

    await supabaseServer.from("industry_items").insert([
      {
        industry_id: section.id,
        title: text,
      },
    ]);

    setText("");
    fetchData();
  };

  const deleteItem = async (id) => {
    await supabaseServer.from("industry_items").delete().eq("id", id);
    fetchData();
  };

  const updateItem = async (id) => {
    await supabaseServer
      .from("industry_items")
      .update({ title: text })
      .eq("id", id);

    setEditing(null);
    setText("");
    fetchData();
  };

  // ================= UI =================
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Industries</h1>

      {/* SECTION */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
        />

        <input type="file" onChange={handleFileChange} />

        {/* IMAGE PREVIEW */}
        {/* {(preview || form.image) && (
          <div className="relative w-fit">
            <img
              src={preview || form.image}
              className="w-40 h-28 object-cover rounded border"
            />

            <button
              onClick={deleteImage}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )} */}

        {preview ? (
          <div className="relative w-fit">
            <img
              src={preview}
              className="w-40 h-28 object-cover rounded border"
            />
          </div>
        ) : form.image ? (
          <div className="relative w-fit">
            <img
              src={form.image}
              className="w-40 h-28 object-cover rounded border"
            />

            <button
              onClick={deleteImage}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : null}

        <button
          onClick={saveSection}
          className="bg-primary text-white px-4 py-2 rounded flex gap-2"
        >
          <Save size={16} /> Save Section
        </button>
      </div>

      {/* ADD ITEM */}
      <div className="bg-white p-4 rounded-xl border flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add industry"
          className="border p-2 w-full"
        />

        <button onClick={addItem} className="bg-primary text-white px-3">
          <Plus size={16} />
        </button>
      </div>

      {/* LIST */}
      {items.map((item) => (
        <div
          key={item.id}
          className="border p-3 bg-white rounded flex justify-between items-center"
        >
          {editing === item.id ? (
            <>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border p-2 w-full"
              />
              <button onClick={() => updateItem(item.id)}>
                <Save size={16} />
              </button>
            </>
          ) : (
            <>
              <p>{item.title}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(item.id);
                    setText(item.title);
                  }}
                  className="bg-blue-100 p-2 rounded"
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-100 p-2 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

IndustriesAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
