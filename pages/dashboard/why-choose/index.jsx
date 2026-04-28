// "use client";

// import { useEffect, useState } from "react";
// import { Plus, Trash2, Pencil, Save } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useUpload } from "@/Hooks/useUpload";

// export default function WhyChooseAdmin() {
//   const { uploadFile } = useUpload();

//   const [section, setSection] = useState(null);
//   const [points, setPoints] = useState([]);

//   const [form, setForm] = useState({
//     title: "",
//     subtitle: "",
//     description: "",
//     image: "",
//     public_id: "",
//     button_text: "",
//     button_link: "",
//   });

//   const [file, setFile] = useState(null);
//   const [editingPoint, setEditingPoint] = useState(null);
//   const [pointText, setPointText] = useState("");
//   const [preview, setPreview] = useState("");

//   // ================= FETCH =================
//   const fetchData = async () => {
//     const { data } = await supabaseServer
//       .from("why_choose_us")
//       .select("*")
//       .single();

//     if (data) {
//       setSection(data);
//       setForm(data);

//       const { data: pts } = await supabaseServer
//         .from("why_choose_points")
//         .select("*")
//         .eq("why_id", data.id);

//       setPoints(pts || []);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ================= SAVE SECTION =================
//   // const handleSave = async () => {
//   //   let imageUrl = form.image;

//   //   if (file) {
//   //     imageUrl = await uploadFile(file, "why");
//   //   }

//   //   if (section) {
//   //     await supabaseServer
//   //       .from("why_choose_us")
//   //       .update({ ...form, image: imageUrl })
//   //       .eq("id", section.id);
//   //   } else {
//   //     await supabaseServer
//   //       .from("why_choose_us")
//   //       .insert([{ ...form, image: imageUrl }]);
//   //   }

//   //   fetchData();
//   // };

//   const handleSave = async () => {
//     try {
//       let imageUrl = form.image;
//       let publicId = section?.public_id || null;

//       // ✅ যদি নতুন image upload হয়
//       if (file) {
//         // 🔥 old image delete first
//         if (section?.public_id) {
//           await fetch("/api/delete-image", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ public_id: section.public_id }),
//           });
//         }

//         // 🔥 upload new
//         const res = await uploadFile(file, "why");

//         imageUrl = res.url;
//         publicId = res.public_id;
//       }

//       // ✅ UPDATE
//       if (section) {
//         await supabaseServer
//           .from("why_choose_us")
//           .update({
//             title: form.title,
//             subtitle: form.subtitle,
//             description: form.description,
//             image: imageUrl,
//             public_id: publicId,
//             button_text: form.button_text,
//             button_link: form.button_link,
//           })
//           .eq("id", section.id);
//       }
//       // ✅ INSERT (ONLY ONCE)
//       else {
//         await supabaseServer.from("why_choose_us").insert([
//           {
//             title: form.title,
//             subtitle: form.subtitle,
//             description: form.description,
//             image: imageUrl,
//             public_id: publicId,
//             button_text: form.button_text,
//             button_link: form.button_link,
//           },
//         ]);
//       }

//       setFile(null);
//       setPreview(""); // 🔥 MUST
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       alert("Save failed");
//     }
//   };

//   // ================= ADD POINT =================
//   const addPoint = async () => {
//     if (!pointText || !section) return;

//     await supabaseServer.from("why_choose_points").insert([
//       {
//         why_id: section.id,
//         point: pointText,
//       },
//     ]);

//     setPointText("");
//     fetchData();
//   };

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     setFile(selected);

//     // ✅ instant preview
//     const previewUrl = URL.createObjectURL(selected);
//     setPreview(previewUrl);
//   };

//   const deleteImage = async () => {
//     if (!section?.public_id) return;

//     try {
//       await fetch("/api/delete-image", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ public_id: section.public_id }),
//       });

//       await supabaseServer
//         .from("why_choose_us")
//         .update({ image: null, public_id: null })
//         .eq("id", section.id);

//       fetchData();
//     } catch (err) {
//       console.error(err);
//       alert("Image delete failed");
//     }
//   };

//   // ================= DELETE POINT =================
//   const deletePoint = async (id) => {
//     await supabaseServer.from("why_choose_points").delete().eq("id", id);
//     fetchData();
//   };

//   // ================= EDIT POINT =================
//   const updatePoint = async (id) => {
//     await supabaseServer
//       .from("why_choose_points")
//       .update({ point: pointText })
//       .eq("id", id);

//     setEditingPoint(null);
//     setPointText("");
//     fetchData();
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Why Choose Us</h1>

//       {/* SECTION FORM */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="Subtitle"
//           value={form.subtitle}
//           onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="Button Text"
//           value={form.button_text}
//           onChange={(e) => setForm({ ...form, button_text: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="Button Link"
//           value={form.button_link}
//           onChange={(e) => setForm({ ...form, button_link: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input type="file" onChange={handleFileChange} />

//         {preview ? (
//           <div className="relative w-fit">
//             <img
//               src={preview}
//               className="w-40 h-28 object-cover rounded border"
//             />
//           </div>
//         ) : form.image ? (
//           <div className="relative w-fit">
//             <img
//               src={form.image}
//               className="w-40 h-28 object-cover rounded border"
//             />

//             <button
//               onClick={deleteImage}
//               className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
//             >
//               <Trash2 size={14} />
//             </button>
//           </div>
//         ) : null}

//         <button
//           onClick={handleSave}
//           className="bg-primary text-white px-4 py-2 rounded flex gap-2"
//         >
//           <Save size={16} /> Save Section
//         </button>
//       </div>

//       {/* ADD POINT */}
//       <div className="bg-white p-4 rounded-xl border flex gap-3">
//         <input
//           value={pointText}
//           onChange={(e) => setPointText(e.target.value)}
//           placeholder="Add point"
//           className="border p-2 w-full"
//         />

//         <button onClick={addPoint} className="bg-primary text-white px-3">
//           <Plus size={16} />
//         </button>
//       </div>

//       {/* POINT LIST */}
//       {points.map((item) => (
//         <div
//           key={item.id}
//           className="border p-3 bg-white rounded flex justify-between items-center"
//         >
//           {editingPoint === item.id ? (
//             <>
//               <input
//                 value={pointText}
//                 onChange={(e) => setPointText(e.target.value)}
//                 className="border p-2 w-full"
//               />
//               <button onClick={() => updatePoint(item.id)}>
//                 <Save size={16} />
//               </button>
//             </>
//           ) : (
//             <>
//               <p>{item.point}</p>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => {
//                     setEditingPoint(item.id);
//                     setPointText(item.point);
//                   }}
//                   className="bg-blue-100 p-2 rounded"
//                 >
//                   <Pencil size={14} />
//                 </button>

//                 <button
//                   onClick={() => deletePoint(item.id)}
//                   className="bg-red-100 p-2 rounded"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// WhyChooseAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Save, Star, ImageIcon } from "lucide-react";
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
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("why_choose_us")
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
        button_text: data.button_text || "",
        button_link: data.button_link || "",
      });

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

  const handleSave = async () => {
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

        const res = await uploadFile(file, "why");

        imageUrl = res.url;
        publicId = res.public_id;
      }

      const payload = {
        title: form.title,
        subtitle: form.subtitle,
        description: form.description,
        image: imageUrl,
        public_id: publicId,
        button_text: form.button_text,
        button_link: form.button_link,
      };

      if (section) {
        const { error } = await supabaseServer
          .from("why_choose_us")
          .update(payload)
          .eq("id", section.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("why_choose_us")
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

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const deleteImage = async () => {
    const publicId = form.public_id || section?.public_id;

    if (!publicId || !section?.id) return;

    try {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: publicId }),
      });

      await supabaseServer
        .from("why_choose_us")
        .update({ image: null, public_id: null })
        .eq("id", section.id);

      setForm({
        ...form,
        image: "",
        public_id: "",
      });

      setPreview("");
      setFile(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Image delete failed");
    }
  };

  const addPoint = async () => {
    if (!pointText.trim()) return alert("Point is required");

    if (!section?.id) {
      alert("Please save section first");
      return;
    }

    const { error } = await supabaseServer.from("why_choose_points").insert([
      {
        why_id: section.id,
        point: pointText,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Point add failed");
      return;
    }

    setPointText("");
    fetchData();
  };

  const deletePoint = async (id) => {
    if (!confirm("Delete this point?")) return;

    const { error } = await supabaseServer
      .from("why_choose_points")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Delete failed");
      return;
    }

    fetchData();
  };

  const updatePoint = async (id) => {
    if (!pointText.trim()) return alert("Point is required");

    const { error } = await supabaseServer
      .from("why_choose_points")
      .update({ point: pointText })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Update failed");
      return;
    }

    setEditingPoint(null);
    setPointText("");
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Star className="text-primary" size={28} />
          Why Choose Us
        </h1>

        <p className="text-gray-500 mt-1">
          Manage section content, image, CTA button and feature points.
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

        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Button Text"
            value={form.button_text || ""}
            onChange={(e) => setForm({ ...form, button_text: e.target.value })}
            className={inputClass}
          />

          <input
            placeholder="Button Link"
            value={form.button_link || ""}
            onChange={(e) => setForm({ ...form, button_link: e.target.value })}
            className={inputClass}
          />
        </div>

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
          onClick={handleSave}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Section"}
        </button>
      </div>

      <div className={cardClass}>
        <h2 className="text-xl font-bold text-gray-900">Feature Points</h2>

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            value={pointText}
            onChange={(e) => setPointText(e.target.value)}
            placeholder={editingPoint ? "Update point" : "Add point"}
            className={inputClass}
          />

          {editingPoint ? (
            <button
              type="button"
              onClick={() => updatePoint(editingPoint)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-white transition-all duration-500 hover:bg-blue-600"
            >
              <Save size={16} />
              Update
            </button>
          ) : (
            <button
              type="button"
              onClick={addPoint}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white transition-all duration-500 hover:bg-secondary"
            >
              <Plus size={16} />
              Add
            </button>
          )}
        </div>

        <div className="space-y-3">
          {points.length === 0 ? (
            <p className="rounded-2xl bg-gray-50 p-6 text-center text-gray-400">
              No points added yet.
            </p>
          ) : (
            points.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-2xl border bg-gray-50 p-4 transition-all duration-500 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {index + 1}
                  </span>

                  <p className="text-gray-700">{item.point}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPoint(item.id);
                      setPointText(item.point);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-500 hover:bg-blue-500 hover:text-white"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deletePoint(item.id)}
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

WhyChooseAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
