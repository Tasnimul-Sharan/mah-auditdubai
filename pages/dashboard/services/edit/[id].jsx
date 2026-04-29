// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";
// import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
// import { useUpload } from "@/Hooks/useUpload";

// export default function EditService() {
//   const router = useRouter();
//   const { id } = router.query;
//   const { uploadFile } = useUpload();
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     supabaseServer
//       .from("services")
//       .select("*")
//       .eq("id", id)
//       .single()
//       .then(({ data }) => {
//         setForm({
//           ...data,
//           footerNote: data?.footer_note || "",
//         });
//         setLoading(false);
//       });
//   }, [id]);

//   const inputClass = "border p-3 w-full rounded";
//   const cardClass = "bg-white p-6 border rounded-xl space-y-4";

//   // const uploadImage = async (e) => {
//   //   const file = e.target.files[0];
//   //   if (!file) return;

//   //   const reader = new FileReader();

//   //   reader.onloadend = async () => {
//   //     try {
//   //       const res = await fetch("/api/upload-services", {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify({ file: reader.result }),
//   //       });

//   //       const data = await res.json();

//   //       if (!data.url) return alert("Upload failed");

//   //       setForm({ ...form, image: data.url });

//   //       await supabaseServer
//   //         .from("services")
//   //         .update({ image: data.url })
//   //         .eq("id", id);
//   //     } catch (err) {
//   //       console.error(err);
//   //       alert("Upload error");
//   //     }
//   //   };

//   //   reader.readAsDataURL(file);
//   // };

//   // const removeImage = async () => {
//   //   try {
//   //     if (!form.image) return;

//   //     const public_id = form.image
//   //       .split("/upload/")[1]
//   //       ?.split(".")[0]
//   //       ?.replace(/^v\d+\//, "");

//   //     if (public_id) {
//   //       await fetch("/api/delete-image", {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify({ public_id }),
//   //       });
//   //     }

//   //     setForm({ ...form, image: "" });

//   //     await supabaseServer.from("services").update({ image: "" }).eq("id", id);
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Delete failed");
//   //   }
//   // };

//   const handleFileChange = async (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));

//     try {
//       let oldPublicId = form.public_id || null;

//       if (!oldPublicId && form.image) {
//         oldPublicId = form.image
//           .split("/upload/")[1]
//           ?.split(".")[0]
//           ?.replace(/^v\d+\//, "");
//       }

//       if (oldPublicId) {
//         await fetch("/api/delete-image", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ public_id: oldPublicId }),
//         });
//       }

//       const res = await uploadFile(selected, "services");

//       if (!res?.url) {
//         alert("Upload failed");
//         return;
//       }

//       setForm({
//         ...form,
//         image: res.url,
//         public_id: res.public_id || null,
//       });

//       await supabaseServer
//         .from("services")
//         .update({
//           image: res.url,
//           public_id: res.public_id || null,
//         })
//         .eq("id", id);
//     } catch (err) {
//       console.error(err);
//       alert("Upload error");
//     }
//   };

//   const removeImage = async () => {
//     try {
//       if (!form.image && !form.public_id) return;

//       let public_id = form.public_id;

//       if (!public_id && form.image) {
//         public_id = form.image
//           .split("/upload/")[1]
//           ?.split(".")[0]
//           ?.replace(/^v\d+\//, "");
//       }

//       if (public_id) {
//         await fetch("/api/delete-image", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ public_id }),
//         });
//       }

//       setForm({
//         ...form,
//         image: "",
//         public_id: null,
//       });

//       setFile(null);
//       setPreview("");

//       await supabaseServer
//         .from("services")
//         .update({
//           image: "",
//           public_id: null,
//         })
//         .eq("id", id);
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   const addSection = () => {
//     setForm({
//       ...form,
//       sections: [
//         ...(form.sections || []),
//         { title: "", description: "", items: [""] },
//       ],
//     });
//   };

//   const updateSection = (i, field, value) => {
//     const updated = [...(form.sections || [])];
//     updated[i][field] = value;
//     setForm({ ...form, sections: updated });
//   };

//   const removeSection = (i) => {
//     const updated = (form.sections || []).filter((_, idx) => idx !== i);
//     setForm({ ...form, sections: updated });
//   };

//   const addItem = (i) => {
//     const updated = [...(form.sections || [])];
//     updated[i].items = [...(updated[i].items || []), ""];
//     setForm({ ...form, sections: updated });
//   };

//   const updateItem = (i, idx, value) => {
//     const updated = [...(form.sections || [])];
//     updated[i].items[idx] = value;
//     setForm({ ...form, sections: updated });
//   };

//   const removeItem = (i, idx) => {
//     const updated = [...(form.sections || [])];
//     updated[i].items.splice(idx, 1);
//     setForm({ ...form, sections: updated });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const payload = {
//       title: form.title,
//       slug: form.slug,
//       description: form.description,
//       image: form.image,
//       hero: form.hero,
//       sections: form.sections,
//       footer_note: form.footerNote,
//       cta: form.cta,
//     };

//     const { error } = await supabaseServer
//       .from("services")
//       .update(payload)
//       .eq("id", id);

//     if (error) {
//       alert("❌ Update failed");
//       return;
//     }

//     alert("✅ Updated successfully");
//     router.push("/dashboard/services");
//   };

//   if (loading) return <div className="p-6">Loading...</div>;
//   if (!form) return <div className="p-6">Service not found</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Edit Service</h1>

//       <form onSubmit={handleUpdate} className="space-y-6">
//         {/* BASIC */}
//         <div className={cardClass}>
//           <h2 className="font-semibold">Basic Information</h2>

//           <input
//             value={form.title || ""}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className={inputClass}
//             placeholder="Title"
//           />

//           <input
//             value={form.slug || ""}
//             readOnly
//             className={`${inputClass} bg-gray-100`}
//             placeholder="Slug"
//           />

//           <textarea
//             value={form.description || ""}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             className={inputClass}
//             placeholder="Description"
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className={inputClass}
//           />

//           {/* {form.image && (
//             <div className="relative w-40">
//               <img
//                 src={form.image}
//                 className="w-40 h-40 object-cover rounded-lg border"
//               />

//               <button
//                 type="button"
//                 onClick={removeImage}
//                 className="absolute top-1 right-1 flex items-center justify-center w-8 h-8 rounded-lg bg-red-500 text-white"
//               >
//                 <FaTrash size={12} />
//               </button>
//             </div>
//           )} */}

//           {(preview || form.image) && (
//             <div className="relative w-40">
//               <img
//                 src={preview || form.image}
//                 className="w-40 h-40 object-cover rounded-lg border"
//                 alt=""
//               />

//               <button
//                 type="button"
//                 onClick={removeImage}
//                 className="absolute top-1 right-1 flex items-center justify-center w-8 h-8 rounded-lg bg-red-500 text-white"
//               >
//                 <FaTrash size={12} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* HERO */}
//         <div className={cardClass}>
//           <h2 className="font-semibold">Hero</h2>

//           <input
//             value={form.hero?.title || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 hero: { ...form.hero, title: e.target.value },
//               })
//             }
//             className={inputClass}
//             placeholder="Hero Title"
//           />

//           <textarea
//             value={form.hero?.description1 || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 hero: { ...form.hero, description1: e.target.value },
//               })
//             }
//             className={inputClass}
//             placeholder="Desc 1"
//           />

//           <textarea
//             value={form.hero?.description2 || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 hero: { ...form.hero, description2: e.target.value },
//               })
//             }
//             className={inputClass}
//             placeholder="Desc 2"
//           />
//         </div>

//         {/* SECTIONS */}
//         <div className={cardClass}>
//           <h2 className="font-semibold">Sections</h2>

//           {(form.sections || []).map((sec, i) => (
//             <div key={i} className="border p-4 rounded space-y-3">
//               <input
//                 value={sec.title || ""}
//                 onChange={(e) => updateSection(i, "title", e.target.value)}
//                 className={inputClass}
//                 placeholder="Title"
//               />

//               <textarea
//                 value={sec.description || ""}
//                 onChange={(e) =>
//                   updateSection(i, "description", e.target.value)
//                 }
//                 className={inputClass}
//                 placeholder="Desc"
//               />

//               {(sec.items || []).map((item, idx) => (
//                 <div key={idx} className="flex gap-2">
//                   <input
//                     value={item || ""}
//                     onChange={(e) => updateItem(i, idx, e.target.value)}
//                     className={inputClass}
//                     placeholder="Item"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => removeItem(i, idx)}
//                     className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
//                   >
//                     <FaTrash size={12} />
//                   </button>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={() => addItem(i)}
//                 className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition"
//               >
//                 <FaPlus size={12} /> Add Item
//               </button>

//               <button
//                 type="button"
//                 onClick={() => removeSection(i)}
//                 className="text-red-500 text-sm"
//               >
//                 Remove Section
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addSection}
//             className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-primary text-white hover:opacity-90 transition"
//           >
//             <FaPlus size={12} /> Add Section
//           </button>
//         </div>

//         {/* CTA */}
//         <div className={cardClass}>
//           <h2 className="font-semibold">CTA</h2>

//           <input
//             value={form.cta?.title || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 cta: { ...form.cta, title: e.target.value },
//               })
//             }
//             className={inputClass}
//             placeholder="CTA Title"
//           />

//           <textarea
//             value={form.cta?.description || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 cta: { ...form.cta, description: e.target.value },
//               })
//             }
//             className={inputClass}
//             placeholder="CTA Desc"
//           />

//           <input
//             value={form.cta?.buttonText || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 cta: { ...form.cta, buttonText: e.target.value },
//               })
//             }
//             className={inputClass}
//             placeholder="Button Text"
//           />
//         </div>

//         {/* FOOTER */}
//         <textarea
//           value={form.footerNote || ""}
//           onChange={(e) => setForm({ ...form, footerNote: e.target.value })}
//           className={inputClass}
//           placeholder="Footer Note"
//         />

//         <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-sm font-medium hover:opacity-90 transition">
//           <FaSave size={14} /> Update Service
//         </button>
//       </form>
//     </div>
//   );
// }

// EditService.getLayout = (page) => (
//   <AdminLayout title="Edit Service">{page}</AdminLayout>
// );

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";
import {
  Plus,
  Save,
  Trash2,
  FileText,
  Layers,
  Megaphone,
  ImageIcon,
} from "lucide-react";

export default function EditService() {
  const router = useRouter();
  const { id } = router.query;
  const { uploadFile } = useUpload();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  useEffect(() => {
    if (!id) return;

    supabaseServer
      .from("services")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setForm({
          ...data,
          footerNote: data?.footer_note || "",
        });
        setLoading(false);
      });
  }, [id]);

  const handleFileChange = async (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));

    try {
      let oldPublicId = form.public_id || null;

      if (!oldPublicId && form.image) {
        oldPublicId = form.image
          .split("/upload/")[1]
          ?.split(".")[0]
          ?.replace(/^v\d+\//, "");
      }

      if (oldPublicId) {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: oldPublicId }),
        });
      }

      const res = await uploadFile(selected, "services");

      setForm({
        ...form,
        image: res.url,
        public_id: res.public_id || null,
      });

      await supabaseServer
        .from("services")
        .update({
          image: res.url,
          public_id: res.public_id || null,
        })
        .eq("id", id);
    } catch (err) {
      console.error(err);
      alert("Upload error");
    }
  };

  const removeImage = async () => {
    try {
      if (!form.image && !form.public_id) return;

      let public_id = form.public_id;

      if (!public_id && form.image) {
        public_id = form.image
          .split("/upload/")[1]
          ?.split(".")[0]
          ?.replace(/^v\d+\//, "");
      }

      if (public_id) {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id }),
        });
      }

      setForm({
        ...form,
        image: "",
        public_id: null,
      });

      setFile(null);
      setPreview("");

      await supabaseServer
        .from("services")
        .update({
          image: "",
          public_id: null,
        })
        .eq("id", id);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...(form.sections || []),
        { title: "", description: "", items: [""] },
      ],
    });
  };

  const updateSection = (i, field, value) => {
    const updated = [...(form.sections || [])];
    updated[i][field] = value;
    setForm({ ...form, sections: updated });
  };

  const removeSection = (i) => {
    setForm({
      ...form,
      sections: (form.sections || []).filter((_, idx) => idx !== i),
    });
  };

  const addItem = (i) => {
    const updated = [...(form.sections || [])];
    updated[i].items = [...(updated[i].items || []), ""];
    setForm({ ...form, sections: updated });
  };

  const updateItem = (i, idx, value) => {
    const updated = [...(form.sections || [])];
    updated[i].items[idx] = value;
    setForm({ ...form, sections: updated });
  };

  const removeItem = (i, idx) => {
    const updated = [...(form.sections || [])];
    updated[i].items = updated[i].items.filter((_, index) => index !== idx);
    setForm({ ...form, sections: updated });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        image: form.image,
        public_id: form.public_id || null,
        hero: form.hero,
        sections: form.sections,
        footer_note: form.footerNote,
        cta: form.cta,
      };

      const { error } = await supabaseServer
        .from("services")
        .update(payload)
        .eq("id", id);

      if (error) throw error;

      alert("Updated successfully");
      router.push("/dashboard/services");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!form) return <div className="p-6 text-center">Service not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="text-primary" size={28} />
          Edit Service
        </h1>

        <p className="text-gray-500 mt-1">
          Update service content, hero copy, sections, CTA and footer note.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8">
        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <ImageIcon size={20} className="text-primary" />
            Basic Information
          </h2>

          <input
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
            placeholder="Title"
          />

          <input
            value={form.slug || ""}
            readOnly
            className={`${inputClass} bg-gray-50 text-gray-500`}
            placeholder="Slug"
          />

          <textarea
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className={inputClass}
            placeholder="Description"
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

              <button
                type="button"
                onClick={removeImage}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Layers size={20} className="text-primary" />
            Hero Content
          </h2>

          <input
            value={form.hero?.title || ""}
            onChange={(e) =>
              setForm({
                ...form,
                hero: { ...form.hero, title: e.target.value },
              })
            }
            className={inputClass}
            placeholder="Hero Title"
          />

          <textarea
            value={form.hero?.description1 || ""}
            onChange={(e) =>
              setForm({
                ...form,
                hero: { ...form.hero, description1: e.target.value },
              })
            }
            rows={3}
            className={inputClass}
            placeholder="Description 1"
          />

          <textarea
            value={form.hero?.description2 || ""}
            onChange={(e) =>
              setForm({
                ...form,
                hero: { ...form.hero, description2: e.target.value },
              })
            }
            rows={3}
            className={inputClass}
            placeholder="Description 2"
          />
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Layers size={20} className="text-primary" />
              Service Sections
            </h2>

            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
            >
              <Plus size={14} />
              Add Section
            </button>
          </div>

          {(form.sections || []).map((sec, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-gray-50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">Section {i + 1}</h3>

                <button
                  type="button"
                  onClick={() => removeSection(i)}
                  className="rounded-lg bg-red-100 p-2 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <input
                value={sec.title || ""}
                onChange={(e) => updateSection(i, "title", e.target.value)}
                className={inputClass}
                placeholder="Title"
              />

              <textarea
                value={sec.description || ""}
                onChange={(e) =>
                  updateSection(i, "description", e.target.value)
                }
                rows={3}
                className={inputClass}
                placeholder="Description"
              />

              {(sec.items || []).map((item, idx) => (
                <div key={idx} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input
                    value={item || ""}
                    onChange={(e) => updateItem(i, idx, e.target.value)}
                    className={inputClass}
                    placeholder="Item"
                  />

                  <button
                    type="button"
                    onClick={() => removeItem(i, idx)}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addItem(i)}
                className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
              >
                <Plus size={14} />
                Add Item
              </button>
            </div>
          ))}
        </div>

        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Megaphone size={20} className="text-primary" />
            CTA Content
          </h2>

          <input
            value={form.cta?.title || ""}
            onChange={(e) =>
              setForm({
                ...form,
                cta: { ...form.cta, title: e.target.value },
              })
            }
            className={inputClass}
            placeholder="CTA Title"
          />

          <textarea
            value={form.cta?.description || ""}
            onChange={(e) =>
              setForm({
                ...form,
                cta: { ...form.cta, description: e.target.value },
              })
            }
            rows={3}
            className={inputClass}
            placeholder="CTA Description"
          />

          <input
            value={form.cta?.buttonText || ""}
            onChange={(e) =>
              setForm({
                ...form,
                cta: { ...form.cta, buttonText: e.target.value },
              })
            }
            className={inputClass}
            placeholder="Button Text"
          />
        </div>

        <div className={cardClass}>
          <h2 className="text-xl font-bold">Footer Note</h2>

          <textarea
            value={form.footerNote || ""}
            onChange={(e) => setForm({ ...form, footerNote: e.target.value })}
            rows={3}
            className={inputClass}
            placeholder="Footer Note"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:-translate-y-1 hover:bg-secondary transition disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Updating..." : "Update Service"}
        </button>
      </form>
    </div>
  );
}

EditService.getLayout = (page) => (
  <AdminLayout title="Edit Service">{page}</AdminLayout>
);
