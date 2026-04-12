// "use client"

// import { useCrud } from "@/Hooks/useCrud";
// import AdminLayout from "@/components/AdminLayout";
// import { useState } from "react";
// import { Plus, Trash2, Save } from "lucide-react";
// import { useUpload } from "@/Hooks/useUpload";

// export default function AboutAdmin() {
//   const { data, createItem, deleteItem, updateItem } = useCrud("about_section");

//   const { uploadFile } = useUpload();

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [form, setForm] = useState({
//     badge: "",
//     title: "",
//     highlighted_title: "",
//     description1: "",
//     description2: "",
//     button_primary_text: "",
//     button_primary_link: "",
//     button_secondary_text: "",
//     button_secondary_link: "",
//     stats_title: "",
//     stats_value: "",
//     stats_subtitle: "",
//     image: "",
//   });

//   // ================= IMAGE HANDLE =================
//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//   };

//   // ================= ADD =================
//   const handleAdd = async () => {
//     let imageUrl = form.image;
//     let publicId = null;

//     if (file) {
//       const res = await uploadFile(file, "about");
//       imageUrl = res.url;
//       publicId = res.public_id;
//     }

//     await createItem({
//       ...form,
//       image: imageUrl,
//       public_id: publicId,
//       features: [
//         { title: "100% Compliance" },
//         { title: "Strategic Insights" },
//         { title: "Trusted Advisory" },
//       ],
//     });

//     setForm({
//       badge: "",
//       title: "",
//       highlighted_title: "",
//       description1: "",
//       description2: "",
//       button_primary_text: "",
//       button_primary_link: "",
//       button_secondary_text: "",
//       button_secondary_link: "",
//       stats_title: "",
//       stats_value: "",
//       stats_subtitle: "",
//       image: "",
//     });

//     setPreview("");
//     setFile(null);
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">About Section</h1>

//       {/* FORM */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <input
//           placeholder="Badge"
//           value={form.badge}
//           onChange={(e) => setForm({ ...form, badge: e.target.value })}
//           className="border p-3 w-full rounded"
//         />

//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="border p-3 w-full rounded"
//         />

//         <input
//           placeholder="Highlighted Title"
//           value={form.highlighted_title}
//           onChange={(e) =>
//             setForm({ ...form, highlighted_title: e.target.value })
//           }
//           className="border p-3 w-full rounded"
//         />

//         <textarea
//           placeholder="Description 1"
//           value={form.description1}
//           onChange={(e) => setForm({ ...form, description1: e.target.value })}
//           className="border p-3 w-full rounded"
//         />

//         <textarea
//           placeholder="Description 2"
//           value={form.description2}
//           onChange={(e) => setForm({ ...form, description2: e.target.value })}
//           className="border p-3 w-full rounded"
//         />

//         {/* BUTTONS */}
//         <input
//           placeholder="Primary Button Text"
//           value={form.button_primary_text}
//           onChange={(e) =>
//             setForm({ ...form, button_primary_text: e.target.value })
//           }
//           className="border p-3 w-full rounded"
//         />

//         <input
//           placeholder="Primary Button Link"
//           value={form.button_primary_link}
//           onChange={(e) =>
//             setForm({ ...form, button_primary_link: e.target.value })
//           }
//           className="border p-3 w-full rounded"
//         />

//         <input
//           placeholder="Secondary Button Text"
//           value={form.button_secondary_text}
//           onChange={(e) =>
//             setForm({ ...form, button_secondary_text: e.target.value })
//           }
//           className="border p-3 w-full rounded"
//         />

//         <input
//           placeholder="Secondary Button Link"
//           value={form.button_secondary_link}
//           onChange={(e) =>
//             setForm({ ...form, button_secondary_link: e.target.value })
//           }
//           className="border p-3 w-full rounded"
//         />

//         {/* STATS */}
//         <input
//           placeholder="Stats Title"
//           value={form.stats_title}
//           onChange={(e) => setForm({ ...form, stats_title: e.target.value })}
//           className="border p-3 w-full rounded"
//         />

//         <input
//           placeholder="Stats Value (500+)"
//           value={form.stats_value}
//           onChange={(e) => setForm({ ...form, stats_value: e.target.value })}
//           className="border p-3 w-full rounded"
//         />

//         <input
//           placeholder="Stats Subtitle"
//           value={form.stats_subtitle}
//           onChange={(e) => setForm({ ...form, stats_subtitle: e.target.value })}
//           className="border p-3 w-full rounded"
//         />

//         {/* IMAGE */}
//         <input type="file" onChange={handleFileChange} />

//         {(preview || form.image) && (
//           <img
//             src={preview || form.image}
//             className="w-40 h-28 object-cover rounded border"
//           />
//         )}

//         <button
//           onClick={handleAdd}
//           className="bg-primary text-white px-5 py-2 rounded flex items-center gap-2"
//         >
//           <Plus size={16} /> Add
//         </button>
//       </div>

//       {/* LIST */}
//       <div className="grid gap-4">
//         {data.map((item) => (
//           <div key={item.id} className="border p-4 rounded-xl">
//             <h2 className="font-bold">
//               {item.title}{" "}
//               <span className="text-primary">{item.highlighted_title}</span>
//             </h2>

//             <p className="text-sm text-gray-500">
//               {item.stats_value} - {item.stats_subtitle}
//             </p>

//             <div className="flex gap-3 mt-3">
//               <button
//                 onClick={() => deleteItem(item.id)}
//                 className="bg-red-100 p-2 rounded"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// AboutAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import { Plus, Trash2, Save, Pencil, Image as ImageIcon } from "lucide-react";

export default function AboutAdmin() {
  const { uploadFile } = useUpload();

  const [section, setSection] = useState(null);
  const [form, setForm] = useState({
    badge: "",
    title: "",
    highlighted_title: "",
    description1: "",
    description2: "",
    image: "",
    public_id: "",
    features: [],
    button_primary_text: "",
    button_primary_link: "",
    button_secondary_text: "",
    button_secondary_link: "",
    stats_title: "",
    stats_value: "",
    stats_subtitle: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // ================= FETCH =================
  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("about_section")
      .select("*")
      .single();

    if (data) {
      setSection(data);
      setForm({
        ...data,
        features: data.features || [],
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= IMAGE =================
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const deleteImage = async () => {
    if (!section?.public_id) return;

    await fetch("/api/delete-image", {
      method: "POST",
      body: JSON.stringify({ public_id: section.public_id }),
    });

    await supabaseServer
      .from("about_section")
      .update({ image: null, public_id: null })
      .eq("id", section.id);

    fetchData();
  };

  // ================= FEATURES =================
  const addFeature = () => {
    if (!newFeature) return;

    setForm({
      ...form,
      features: [...form.features, { title: newFeature }],
    });

    setNewFeature("");
  };

  const deleteFeature = (index) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updated });
  };

  const updateFeature = (index, value) => {
    const updated = [...form.features];
    updated[index].title = value;
    setForm({ ...form, features: updated });
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      let imageUrl = form.image;
      let publicId = form.public_id;

      if (file) {
        if (form.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            body: JSON.stringify({ public_id: form.public_id }),
          });
        }

        const res = await uploadFile(file, "about");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      const payload = {
        badge: form.badge,
        title: form.title,
        highlighted_title: form.highlighted_title,
        description1: form.description1,
        description2: form.description2,
        image: imageUrl,
        public_id: publicId,
        features: form.features,
        button_primary_text: form.button_primary_text,
        button_primary_link: form.button_primary_link,
        button_secondary_text: form.button_secondary_text,
        button_secondary_link: form.button_secondary_link,
        stats_title: form.stats_title,
        stats_value: form.stats_value,
        stats_subtitle: form.stats_subtitle,
      };

      if (section) {
        await supabaseServer
          .from("about_section")
          .update(payload)
          .eq("id", section.id);
      } else {
        await supabaseServer.from("about_section").insert([payload]);
      }

      setFile(null);
      setPreview("");
      fetchData();

      alert("✅ Saved");
    } catch (err) {
      console.error(err);
      alert("❌ Error");
    }
  };

  // ================= UI =================
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">About Section</h1>

      <div className="bg-white p-6 rounded-xl border space-y-4">
        <input
          placeholder="Badge"
          value={form.badge}
          onChange={(e) => setForm({ ...form, badge: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Highlighted Title"
          value={form.highlighted_title}
          onChange={(e) =>
            setForm({ ...form, highlighted_title: e.target.value })
          }
          className="border p-3 w-full rounded"
        />

        <textarea
          placeholder="Description 1"
          value={form.description1}
          onChange={(e) => setForm({ ...form, description1: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <textarea
          placeholder="Description 2"
          value={form.description2}
          onChange={(e) => setForm({ ...form, description2: e.target.value })}
          className="border p-3 w-full rounded"
        />

        {/* IMAGE */}
        <div>
          <input type="file" onChange={handleFileChange} />

          {preview ? (
            <img src={preview} className="w-40 mt-3 rounded" />
          ) : form.image ? (
            <div className="relative w-fit mt-3">
              <img src={form.image} className="w-40 rounded" />
              <button
                onClick={deleteImage}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : null}
        </div>

        {/* FEATURES */}
        <div>
          <h3 className="font-semibold mb-2">Features</h3>

          <div className="flex gap-2 mb-3">
            <input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="border p-3 w-full rounded"
              placeholder="Add feature"
            />
            <button onClick={addFeature} className="btn-primary">
              <Plus size={16} />
            </button>
          </div>

          {form.features.map((f, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={f.title}
                onChange={(e) => updateFeature(i, e.target.value)}
                className="border p-3 w-full rounded"
              />
              <button
                onClick={() => deleteFeature(i)}
                className="bg-red-100 p-2 rounded"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <input
          placeholder="Primary Button Text"
          value={form.button_primary_text}
          onChange={(e) =>
            setForm({ ...form, button_primary_text: e.target.value })
          }
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Primary Button Link"
          value={form.button_primary_link}
          onChange={(e) =>
            setForm({ ...form, button_primary_link: e.target.value })
          }
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Secondary Button Text"
          value={form.button_secondary_text}
          onChange={(e) =>
            setForm({ ...form, button_secondary_text: e.target.value })
          }
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Secondary Button Link"
          value={form.button_secondary_link}
          onChange={(e) =>
            setForm({ ...form, button_secondary_link: e.target.value })
          }
          className="border p-3 w-full rounded"
        />

        {/* STATS */}
        <input
          placeholder="Stats Title"
          value={form.stats_title}
          onChange={(e) => setForm({ ...form, stats_title: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Stats Value"
          value={form.stats_value}
          onChange={(e) => setForm({ ...form, stats_value: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Stats Subtitle"
          value={form.stats_subtitle}
          onChange={(e) => setForm({ ...form, stats_subtitle: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <button
          onClick={handleSave}
          className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Save size={16} /> Save
        </button>
      </div>
    </div>
  );
}

AboutAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;