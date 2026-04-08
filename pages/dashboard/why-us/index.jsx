"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Save } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";

export default function WhyUsAdmin() {
  const { uploadFile } = useUpload();

  const [section, setSection] = useState(null);
  const [points, setPoints] = useState([]);
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

  const fetchData = async () => {
    const { data } = await supabaseServer.from("why_us").select("*").single();

    if (data) {
      setSection(data);
      setForm(data);
      setPoints(data.points || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const saveSection = async () => {
    let imageUrl = form.image;
    let publicId = section?.public_id || null;

    if (file) {
      if (section?.public_id) {
        await fetch("/api/delete-image", {
          method: "POST",
          body: JSON.stringify({ public_id: section.public_id }),
        });
      }

      const res = await uploadFile(file, "why");
      imageUrl = res.url;
      publicId = res.public_id;
    }

    await supabaseServer.from("why_us").upsert([
      {
        id: section?.id,
        ...form,
        image: imageUrl,
        public_id: publicId,
        points,
      },
    ]);

    setPreview("");
    setFile(null);
    fetchData();
  };

  const addItem = () => {
    if (!text) return;
    setPoints([...points, text]);
    setText("");
  };

  const deleteItem = (i) => {
    setPoints(points.filter((_, index) => index !== i));
  };

  const updateItem = (i) => {
    const updated = [...points];
    updated[i] = text;
    setPoints(updated);
    setEditing(null);
    setText("");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Why Us</h1>

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

        {/* <input type="file" onChange={handleFileChange} />

        <div className="relative w-fit">
          {(preview || form.image) && (
            <>
              <img
                src={preview || form.image}
                className="w-40 h-28 object-cover rounded border"
              />
              <button className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded">
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div> */}

        <div className="bg-white p-4 rounded-xl border flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 w-full"
          />
          <button onClick={addItem} className="bg-primary text-white px-3">
            <Plus size={16} />
          </button>
        </div>

        {points.map((item, i) => (
          <div key={i} className="flex justify-between border p-3">
            {editing === i ? (
              <>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="border p-2 w-full"
                />
                <button onClick={() => updateItem(i)}>
                  <Save size={16} />
                </button>
              </>
            ) : (
              <>
                <p>{item}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(i);
                      setText(item);
                    }}
                  >
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => deleteItem(i)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        <button
          onClick={saveSection}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          <Save size={16} /> Save
        </button>
      </div>

      {/* ITEMS */}
      {/* <div className="bg-white p-4 rounded-xl border flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full"
        />
        <button onClick={addItem} className="bg-primary text-white px-3">
          <Plus size={16} />
        </button>
      </div>

      {points.map((item, i) => (
        <div key={i} className="flex justify-between border p-3">
          {editing === i ? (
            <>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border p-2 w-full"
              />
              <button onClick={() => updateItem(i)}>
                <Save size={16} />
              </button>
            </>
          ) : (
            <>
              <p>{item}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(i);
                    setText(item);
                  }}
                >
                  <Pencil size={14} />
                </button>
                <button onClick={() => deleteItem(i)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      ))} */}
    </div>
  );
}

WhyUsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
