"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Save } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";

export default function WhyChooseAdmin() {
  const { uploadFile } = useUpload();

  const [section, setSection] = useState(null);
  const [points, setPoints] = useState([]);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    public_id: "",
    button_text: "",
    button_link: "",
  });

  const [file, setFile] = useState(null);
  const [editingPoint, setEditingPoint] = useState(null);
  const [pointText, setPointText] = useState("");
  const [preview, setPreview] = useState("");

  // ================= FETCH =================
  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("why_choose_us")
      .select("*")
      .single();

    if (data) {
      setSection(data);
      setForm(data);

      const { data: pts } = await supabaseServer
        .from("why_choose_points")
        .select("*")
        .eq("why_id", data.id);

      setPoints(pts || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= SAVE SECTION =================
  // const handleSave = async () => {
  //   let imageUrl = form.image;

  //   if (file) {
  //     imageUrl = await uploadFile(file, "why");
  //   }

  //   if (section) {
  //     await supabaseServer
  //       .from("why_choose_us")
  //       .update({ ...form, image: imageUrl })
  //       .eq("id", section.id);
  //   } else {
  //     await supabaseServer
  //       .from("why_choose_us")
  //       .insert([{ ...form, image: imageUrl }]);
  //   }

  //   fetchData();
  // };

  const handleSave = async () => {
    try {
      let imageUrl = form.image;
      let publicId = section?.public_id || null;

      // ✅ যদি নতুন image upload হয়
      if (file) {
        // 🔥 old image delete first
        if (section?.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: section.public_id }),
          });
        }

        // 🔥 upload new
        const res = await uploadFile(file, "why");

        imageUrl = res.url;
        publicId = res.public_id;
      }

      // ✅ UPDATE
      if (section) {
        await supabaseServer
          .from("why_choose_us")
          .update({
            title: form.title,
            subtitle: form.subtitle,
            description: form.description,
            image: imageUrl,
            public_id: publicId,
            button_text: form.button_text,
            button_link: form.button_link,
          })
          .eq("id", section.id);
      }
      // ✅ INSERT (ONLY ONCE)
      else {
        await supabaseServer.from("why_choose_us").insert([
          {
            title: form.title,
            subtitle: form.subtitle,
            description: form.description,
            image: imageUrl,
            public_id: publicId,
            button_text: form.button_text,
            button_link: form.button_link,
          },
        ]);
      }

      setFile(null);
      setPreview(""); // 🔥 MUST
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ================= ADD POINT =================
  const addPoint = async () => {
    if (!pointText || !section) return;

    await supabaseServer.from("why_choose_points").insert([
      {
        why_id: section.id,
        point: pointText,
      },
    ]);

    setPointText("");
    fetchData();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);

    // ✅ instant preview
    const previewUrl = URL.createObjectURL(selected);
    setPreview(previewUrl);
  };

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
        .from("why_choose_us")
        .update({ image: null, public_id: null })
        .eq("id", section.id);

      fetchData();
    } catch (err) {
      console.error(err);
      alert("Image delete failed");
    }
  };

  // ================= DELETE POINT =================
  const deletePoint = async (id) => {
    await supabaseServer.from("why_choose_points").delete().eq("id", id);
    fetchData();
  };

  // ================= EDIT POINT =================
  const updatePoint = async (id) => {
    await supabaseServer
      .from("why_choose_points")
      .update({ point: pointText })
      .eq("id", id);

    setEditingPoint(null);
    setPointText("");
    fetchData();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Why Choose Us</h1>

      {/* SECTION FORM */}
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

        <input
          placeholder="Button Text"
          value={form.button_text}
          onChange={(e) => setForm({ ...form, button_text: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Button Link"
          value={form.button_link}
          onChange={(e) => setForm({ ...form, button_link: e.target.value })}
          className="border p-2 w-full"
        />

        <input type="file" onChange={handleFileChange} />

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
          onClick={handleSave}
          className="bg-primary text-white px-4 py-2 rounded flex gap-2"
        >
          <Save size={16} /> Save Section
        </button>
      </div>

      {/* ADD POINT */}
      <div className="bg-white p-4 rounded-xl border flex gap-3">
        <input
          value={pointText}
          onChange={(e) => setPointText(e.target.value)}
          placeholder="Add point"
          className="border p-2 w-full"
        />

        <button onClick={addPoint} className="bg-primary text-white px-3">
          <Plus size={16} />
        </button>
      </div>

      {/* POINT LIST */}
      {points.map((item) => (
        <div
          key={item.id}
          className="border p-3 bg-white rounded flex justify-between items-center"
        >
          {editingPoint === item.id ? (
            <>
              <input
                value={pointText}
                onChange={(e) => setPointText(e.target.value)}
                className="border p-2 w-full"
              />
              <button onClick={() => updatePoint(item.id)}>
                <Save size={16} />
              </button>
            </>
          ) : (
            <>
              <p>{item.point}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingPoint(item.id);
                    setPointText(item.point);
                  }}
                  className="bg-blue-100 p-2 rounded"
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() => deletePoint(item.id)}
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

WhyChooseAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
