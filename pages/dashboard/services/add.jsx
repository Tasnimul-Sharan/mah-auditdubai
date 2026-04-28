// // "use client"

// // import { useState } from "react";
// // // import { supabase } from "@/lib/supabaseClient";
// // import { supabaseServer } from "@/lib/supabaseServer";
// // import AdminLayout from "@/components/AdminLayout";

// // export default function AddServicePage() {
// //   const [form, setForm] = useState({
// //     title: "",
// //     slug: "",
// //     description: "",
// //     image: "",
// //     hero: {
// //       title: "",
// //       description1: "",
// //       description2: "",
// //     },
// //     sections: [],
// //     footerNote: "",
// //     cta: {
// //       title: "",
// //       description: "",
// //       buttonText: "",
// //     },
// //   });

// //   const [selectedImage, setSelectedImage] = useState(null);

// //   const generateSlug = (text) => text.toLowerCase().replace(/\s+/g, "-");

// //   const uploadToCloudinary = async (file) => {
// //     const reader = new FileReader();

// //     const base64 = await new Promise((resolve, reject) => {
// //       reader.onloadend = () => resolve(reader.result);
// //       reader.onerror = reject;
// //       reader.readAsDataURL(file);
// //     });

// //     const res = await fetch("/api/upload-services", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ file: base64 }),
// //     });

// //     if (!res.ok) throw new Error("Upload failed");

// //     const data = await res.json();
// //     return data.url;
// //   };

// //   const handleImage = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     setSelectedImage(file);

// //     const preview = URL.createObjectURL(file);

// //     setForm((prev) => ({
// //       ...prev,
// //       image: preview, // preview only
// //     }));
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     if (name === "title") {
// //       setForm({
// //         ...form,
// //         title: value,
// //         slug: generateSlug(value),
// //       });
// //     } else {
// //       setForm({ ...form, [name]: value });
// //     }
// //   };

// //   const handleHeroChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm({
// //       ...form,
// //       hero: { ...form.hero, [name]: value },
// //     });
// //   };

// //   // Sections
// //   const addSection = () => {
// //     setForm({
// //       ...form,
// //       sections: [...form.sections, { title: "", description: "", items: [""] }],
// //     });
// //   };

// //   const updateSection = (i, field, value) => {
// //     const updated = [...form.sections];
// //     updated[i][field] = value;
// //     setForm({ ...form, sections: updated });
// //   };

// //   const addItem = (i) => {
// //     const updated = [...form.sections];
// //     updated[i].items.push("");
// //     setForm({ ...form, sections: updated });
// //   };

// //   const updateItem = (i, idx, value) => {
// //     const updated = [...form.sections];
// //     updated[i].items[idx] = value;
// //     setForm({ ...form, sections: updated });
// //   };

// //   const removeItem = (i, idx) => {
// //     const updated = [...form.sections];
// //     updated[i].items.splice(idx, 1);
// //     setForm({ ...form, sections: updated });
// //   };

// //   const removeSection = (i) => {
// //     const updated = form.sections.filter((_, index) => index !== i);
// //     setForm({ ...form, sections: updated });
// //   };

// //   // const handleSubmit = async (e) => {
// //   //   e.preventDefault();

// //   //   const payload = {
// //   //     slug: form.slug,
// //   //     title: form.title,
// //   //     description: form.description,
// //   //     image: form.image,
// //   //     hero: form.hero,
// //   //     sections: form.sections,
// //   //     footer_note: form.footerNote,
// //   //     cta: form.cta,
// //   //   };

// //   //   const { error } = await supabaseServer.from("services").insert([payload]);

// //   //   if (error) alert("❌ Error");
// //   //   else alert("✅ Added successfully");
// //   // };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       let imageUrl = "";

// //       // 🔥 Upload image
// //       if (selectedImage) {
// //         imageUrl = await uploadToCloudinary(selectedImage);
// //       }

// //       const payload = {
// //         slug: form.slug,
// //         title: form.title,
// //         description: form.description,
// //         image: imageUrl, // ✅ real URL (not preview)
// //         hero: form.hero,
// //         sections: form.sections,
// //         footer_note: form.footerNote,
// //         cta: form.cta,
// //       };

// //       const { error } = await supabaseServer.from("services").insert([payload]);

// //       if (error) throw error;

// //       alert("✅ Service added successfully");
// //     } catch (err) {
// //       console.error(err);
// //       alert("❌ Error adding service");
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 space-y-6">
// //       <h1 className="text-2xl font-bold">Add Service</h1>

// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         {/* BASIC */}
// //         <div className="bg-white p-6 border rounded-xl space-y-4">
// //           <input
// //             name="title"
// //             placeholder="Title"
// //             onChange={handleChange}
// //             className="input"
// //           />
// //           <input value={form.slug} readOnly className="input bg-gray-100" />
// //           <textarea
// //             name="description"
// //             placeholder="Description"
// //             onChange={handleChange}
// //             className="input"
// //           />
// //           <input type="file" onChange={handleImage} className="input" />

// //           {/* Preview */}
// //           {form.image && (
// //             <img
// //               src={form.image}
// //               className="w-40 h-40 object-cover rounded-lg"
// //             />
// //           )}
// //         </div>

// //         {/* HERO */}
// //         <div className="bg-white p-6 border rounded-xl space-y-4">
// //           <input
// //             name="title"
// //             placeholder="Hero Title"
// //             onChange={handleHeroChange}
// //             className="input"
// //           />
// //           <textarea
// //             name="description1"
// //             placeholder="Desc 1"
// //             onChange={handleHeroChange}
// //             className="input"
// //           />
// //           <textarea
// //             name="description2"
// //             placeholder="Desc 2"
// //             onChange={handleHeroChange}
// //             className="input"
// //           />
// //         </div>

// //         {/* SECTIONS */}
// //         <div className="bg-white p-6 border rounded-xl space-y-4">
// //           {form.sections.map((sec, i) => (
// //             <div key={i} className="border p-4 rounded space-y-3">
// //               <input
// //                 placeholder="Title"
// //                 value={sec.title}
// //                 onChange={(e) => updateSection(i, "title", e.target.value)}
// //                 className="input"
// //               />
// //               <textarea
// //                 placeholder="Desc"
// //                 value={sec.description}
// //                 onChange={(e) =>
// //                   updateSection(i, "description", e.target.value)
// //                 }
// //                 className="input"
// //               />

// //               {sec.items.map((item, idx) => (
// //                 <div key={idx} className="flex gap-2">
// //                   <input
// //                     value={item}
// //                     onChange={(e) => updateItem(i, idx, e.target.value)}
// //                     className="input"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => removeItem(i, idx)}
// //                     className="text-red-500"
// //                   >
// //                     X
// //                   </button>
// //                 </div>
// //               ))}

// //               <button type="button" onClick={() => addItem(i)}>
// //                 + Item
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => removeSection(i)}
// //                 className="text-red-500"
// //               >
// //                 Remove Section
// //               </button>
// //             </div>
// //           ))}

// //           <button type="button" onClick={addSection} className="btn">
// //             + Section
// //           </button>
// //         </div>

// //         {/* CTA */}
// //         <div className="bg-white p-6 border rounded-xl space-y-4">
// //           <input
// //             placeholder="CTA Title"
// //             onChange={(e) =>
// //               setForm({ ...form, cta: { ...form.cta, title: e.target.value } })
// //             }
// //             className="input"
// //           />
// //           <textarea
// //             placeholder="CTA Desc"
// //             onChange={(e) =>
// //               setForm({
// //                 ...form,
// //                 cta: { ...form.cta, description: e.target.value },
// //               })
// //             }
// //             className="input"
// //           />
// //           <input
// //             placeholder="Button Text"
// //             onChange={(e) =>
// //               setForm({
// //                 ...form,
// //                 cta: { ...form.cta, buttonText: e.target.value },
// //               })
// //             }
// //             className="input"
// //           />
// //         </div>

// //         {/* FOOTER */}
// //         <textarea
// //           name="footerNote"
// //           placeholder="Footer Note"
// //           onChange={handleChange}
// //           className="input"
// //         />

// //         <button className="w-full bg-primary text-white py-3 rounded">
// //           Save
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // AddServicePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// "use client";

// import { useState } from "react";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";
// import { FaPlus, FaSave, FaTrash } from "react-icons/fa";

// export default function AddServicePage() {
//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     image: "",
//     hero: {
//       title: "",
//       description1: "",
//       description2: "",
//     },
//     sections: [],
//     footerNote: "",
//     cta: {
//       title: "",
//       description: "",
//       buttonText: "",
//     },
//   });

//   const [selectedImage, setSelectedImage] = useState(null);

//   const generateSlug = (text) => text.toLowerCase().replace(/\s+/g, "-");

//   const uploadToCloudinary = async (file) => {
//     const reader = new FileReader();

//     const base64 = await new Promise((resolve, reject) => {
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });

//     const res = await fetch("/api/upload-services", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ file: base64 }),
//     });

//     if (!res.ok) throw new Error("Upload failed");

//     const data = await res.json();
//     return data.url;
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setSelectedImage(file);

//     const preview = URL.createObjectURL(file);

//     setForm((prev) => ({
//       ...prev,
//       image: preview, // preview only
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "title") {
//       setForm({
//         ...form,
//         title: value,
//         slug: generateSlug(value),
//       });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleHeroChange = (e) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       hero: { ...form.hero, [name]: value },
//     });
//   };

//   // Sections
//   const addSection = () => {
//     setForm({
//       ...form,
//       sections: [...form.sections, { title: "", description: "", items: [""] }],
//     });
//   };

//   const updateSection = (i, field, value) => {
//     const updated = [...form.sections];
//     updated[i][field] = value;
//     setForm({ ...form, sections: updated });
//   };

//   const addItem = (i) => {
//     const updated = [...form.sections];
//     updated[i].items.push("");
//     setForm({ ...form, sections: updated });
//   };

//   const updateItem = (i, idx, value) => {
//     const updated = [...form.sections];
//     updated[i].items[idx] = value;
//     setForm({ ...form, sections: updated });
//   };

//   const removeItem = (i, idx) => {
//     const updated = [...form.sections];
//     updated[i].items.splice(idx, 1);
//     setForm({ ...form, sections: updated });
//   };

//   const removeSection = (i) => {
//     const updated = form.sections.filter((_, index) => index !== i);
//     setForm({ ...form, sections: updated });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const payload = {
//   //     slug: form.slug,
//   //     title: form.title,
//   //     description: form.description,
//   //     image: form.image,
//   //     hero: form.hero,
//   //     sections: form.sections,
//   //     footer_note: form.footerNote,
//   //     cta: form.cta,
//   //   };

//   //   const { error } = await supabaseServer.from("services").insert([payload]);

//   //   if (error) alert("❌ Error");
//   //   else alert("✅ Added successfully");
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let imageUrl = "";

//       // 🔥 Upload image
//       if (selectedImage) {
//         imageUrl = await uploadToCloudinary(selectedImage);
//       }

//       const payload = {
//         slug: form.slug,
//         title: form.title,
//         description: form.description,
//         image: imageUrl, // ✅ real URL (not preview)
//         hero: form.hero,
//         sections: form.sections,
//         footer_note: form.footerNote,
//         cta: form.cta,
//       };

//       const { error } = await supabaseServer.from("services").insert([payload]);

//       if (error) throw error;

//       alert("✅ Service added successfully");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error adding service");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Add Service</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* BASIC */}
//         <div className="bg-white p-6 border rounded-xl space-y-4">
//           <input
//             name="title"
//             placeholder="Title"
//             onChange={handleChange}
//             className="border p-3 w-full rounded"
//           />
//           <input
//             value={form.slug}
//             readOnly
//             className="border p-3 w-full rounded bg-gray-100"
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             onChange={handleChange}
//             className="border p-3 w-full rounded"
//           />
//           <input
//             type="file"
//             onChange={handleImage}
//             className="border p-3 w-full rounded"
//           />

//           {/* Preview */}
//           {form.image && (
//             <img
//               src={form.image}
//               className="w-40 h-40 object-cover rounded-lg"
//             />
//           )}
//         </div>

//         {/* HERO */}
//         <div className="bg-white p-6 border rounded-xl space-y-4">
//           <input
//             name="title"
//             placeholder="Hero Title"
//             onChange={handleHeroChange}
//             className="border p-3 w-full rounded"
//           />
//           <textarea
//             name="description1"
//             placeholder="Desc 1"
//             onChange={handleHeroChange}
//             className="border p-3 w-full rounded"
//           />
//           <textarea
//             name="description2"
//             placeholder="Desc 2"
//             onChange={handleHeroChange}
//             className="border p-3 w-full rounded"
//           />
//         </div>

//         {/* SECTIONS */}
//         <div className="bg-white p-6 border rounded-xl space-y-4">
//           {form.sections.map((sec, i) => (
//             <div key={i} className="border p-4 rounded space-y-3">
//               <input
//                 placeholder="Title"
//                 value={sec.title}
//                 onChange={(e) => updateSection(i, "title", e.target.value)}
//                 className="border p-3 w-full rounded"
//               />
//               <textarea
//                 placeholder="Desc"
//                 value={sec.description}
//                 onChange={(e) =>
//                   updateSection(i, "description", e.target.value)
//                 }
//                 className="border p-3 w-full rounded"
//               />

//               {sec.items.map((item, idx) => (
//                 <div key={idx} className="flex gap-2">
//                   <input
//                     value={item}
//                     onChange={(e) => updateItem(i, idx, e.target.value)}
//                     className="border p-3 w-full rounded"
//                   />
//                   {/* <button
//                     type="button"
//                     onClick={() => removeItem(i, idx)}
//                     className="text-red-500"
//                   >
//                     X
//                   </button> */}
//                   <button
//                     type="button"
//                     onClick={() => removeItem(i, idx)}
//                     className="flex items-center justify-center w-10 h-10 rounded-lg
//   bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
//                   >
//                     <FaTrash size={12} />
//                   </button>
//                 </div>
//               ))}

//               {/* <button type="button" onClick={() => addItem(i)}>
//                 + Item
//               </button> */}

//               <button
//                 type="button"
//                 onClick={() => addItem(i)}
//                 className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg
//   bg-primary/10 text-primary hover:bg-primary hover:text-white transition"
//               >
//                 <FaPlus size={12} /> Add Item
//               </button>

//               <button
//                 type="button"
//                 onClick={() => removeSection(i)}
//                 className="text-red-500"
//               >
//                 Remove Section
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addSection}
//             className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl
//   bg-primary text-white hover:opacity-90 transition"
//           >
//             <FaPlus size={12} /> Add Section
//           </button>
//         </div>

//         {/* CTA */}
//         <div className="bg-white p-6 border rounded-xl space-y-4">
//           <input
//             placeholder="CTA Title"
//             onChange={(e) =>
//               setForm({ ...form, cta: { ...form.cta, title: e.target.value } })
//             }
//             className="border p-3 w-full rounded"
//           />
//           <textarea
//             placeholder="CTA Desc"
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 cta: { ...form.cta, description: e.target.value },
//               })
//             }
//             className="border p-3 w-full rounded"
//           />
//           <input
//             placeholder="Button Text"
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 cta: { ...form.cta, buttonText: e.target.value },
//               })
//             }
//             className="border p-3 w-full rounded"
//           />
//         </div>

//         {/* FOOTER */}
//         <textarea
//           name="footerNote"
//           placeholder="Footer Note"
//           onChange={handleChange}
//           className="border p-3 w-full rounded"
//         />

//         <button
//           className="w-full flex items-center justify-center gap-2
//   bg-primary text-white py-3 rounded-xl text-sm font-medium
//   hover:opacity-90 transition"
//         >
//           <FaSave size={14} /> Save Service
//         </button>
//       </form>
//     </div>
//   );
// }

// AddServicePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
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

export default function AddServicePage() {
  const { uploadFile } = useUpload();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    public_id: "",
    hero: {
      title: "",
      description1: "",
      description2: "",
    },
    sections: [],
    footerNote: "",
    cta: {
      title: "",
      description: "",
      buttonText: "",
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);

    setForm((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setForm({
        ...form,
        title: value,
        slug: generateSlug(value),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleHeroChange = (field, value) => {
    setForm({
      ...form,
      hero: {
        ...form.hero,
        [field]: value,
      },
    });
  };

  const handleCtaChange = (field, value) => {
    setForm({
      ...form,
      cta: {
        ...form.cta,
        [field]: value,
      },
    });
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        {
          title: "",
          description: "",
          items: [""],
        },
      ],
    });
  };

  const updateSection = (sectionIndex, field, value) => {
    const updated = [...form.sections];

    updated[sectionIndex] = {
      ...updated[sectionIndex],
      [field]: value,
    };

    setForm({
      ...form,
      sections: updated,
    });
  };

  const removeSection = (sectionIndex) => {
    setForm({
      ...form,
      sections: form.sections.filter((_, i) => i !== sectionIndex),
    });
  };

  const addItem = (sectionIndex) => {
    const updated = [...form.sections];

    updated[sectionIndex].items = [...(updated[sectionIndex].items || []), ""];

    setForm({
      ...form,
      sections: updated,
    });
  };

  const updateItem = (sectionIndex, itemIndex, value) => {
    const updated = [...form.sections];

    updated[sectionIndex].items[itemIndex] = value;

    setForm({
      ...form,
      sections: updated,
    });
  };

  const removeItem = (sectionIndex, itemIndex) => {
    const updated = [...form.sections];

    updated[sectionIndex].items = updated[sectionIndex].items.filter(
      (_, i) => i !== itemIndex,
    );

    setForm({
      ...form,
      sections: updated,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Service title is required");
      return;
    }

    try {
      setSaving(true);

      let imageUrl = "";
      let publicId = null;

      if (selectedImage) {
        const res = await uploadFile(selectedImage, "services");

        imageUrl = res.url;
        publicId = res.public_id || null;
      }

      const payload = {
        slug: form.slug,
        title: form.title,
        description: form.description,
        image: imageUrl,
        public_id: publicId,
        hero: form.hero,
        sections: form.sections,
        footer_note: form.footerNote,
        cta: form.cta,
      };

      const { error } = await supabaseServer.from("services").insert([payload]);

      if (error) throw error;

      alert("Service added successfully");

      setForm({
        title: "",
        slug: "",
        description: "",
        image: "",
        public_id: "",
        hero: {
          title: "",
          description1: "",
          description2: "",
        },
        sections: [],
        footerNote: "",
        cta: {
          title: "",
          description: "",
          buttonText: "",
        },
      });

      setSelectedImage(null);
    } catch (err) {
      console.error(err);
      alert("Error adding service");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="text-primary" size={28} />
          Add Service
        </h1>

        <p className="text-gray-500 mt-1">
          Create service content, hero copy, sections, CTA and footer note.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <ImageIcon size={20} className="text-primary" />
            Basic Information
          </h2>

          <input
            name="title"
            placeholder="Service Title"
            value={form.title}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            value={form.slug}
            readOnly
            placeholder="Auto generated slug"
            className={`${inputClass} bg-gray-50 text-gray-500`}
          />

          <textarea
            name="description"
            placeholder="Service Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className={inputClass}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className={inputClass}
          />

          {form.image && (
            <div className="relative w-fit rounded-2xl border bg-gray-50 p-3">
              <img
                src={form.image}
                alt=""
                className="w-72 h-44 object-cover rounded-xl"
              />

              <button
                type="button"
                onClick={() => {
                  setForm({ ...form, image: "" });
                  setSelectedImage(null);
                }}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Layers size={20} className="text-primary" />
            Hero Content
          </h2>

          <input
            placeholder="Hero Title"
            value={form.hero.title}
            onChange={(e) => handleHeroChange("title", e.target.value)}
            className={inputClass}
          />

          <textarea
            placeholder="Hero Description 1"
            value={form.hero.description1}
            onChange={(e) => handleHeroChange("description1", e.target.value)}
            rows={3}
            className={inputClass}
          />

          <textarea
            placeholder="Hero Description 2"
            value={form.hero.description2}
            onChange={(e) => handleHeroChange("description2", e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Layers size={20} className="text-primary" />
              Service Sections
            </h2>

            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
            >
              <Plus size={14} />
              Add Section
            </button>
          </div>

          {form.sections.length === 0 ? (
            <p className="rounded-2xl bg-gray-50 p-6 text-center text-gray-400">
              No sections added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {form.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="rounded-2xl border bg-gray-50 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700">
                      Section {sectionIndex + 1}
                    </h3>

                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <input
                    placeholder="Section Title"
                    value={section.title}
                    onChange={(e) =>
                      updateSection(sectionIndex, "title", e.target.value)
                    }
                    className={inputClass}
                  />

                  <textarea
                    placeholder="Section Description"
                    value={section.description}
                    onChange={(e) =>
                      updateSection(sectionIndex, "description", e.target.value)
                    }
                    rows={3}
                    className={inputClass}
                  />

                  {(section.items || []).map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="grid gap-3 md:grid-cols-[1fr_auto]"
                    >
                      <input
                        placeholder="Section Item"
                        value={item}
                        onChange={(e) =>
                          updateItem(sectionIndex, itemIndex, e.target.value)
                        }
                        className={inputClass}
                      />

                      <button
                        type="button"
                        onClick={() => removeItem(sectionIndex, itemIndex)}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addItem(sectionIndex)}
                    className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
                  >
                    <Plus size={14} />
                    Add Item
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Megaphone size={20} className="text-primary" />
            CTA Content
          </h2>

          <input
            placeholder="CTA Title"
            value={form.cta.title}
            onChange={(e) => handleCtaChange("title", e.target.value)}
            className={inputClass}
          />

          <textarea
            placeholder="CTA Description"
            value={form.cta.description}
            onChange={(e) => handleCtaChange("description", e.target.value)}
            rows={3}
            className={inputClass}
          />

          <input
            placeholder="CTA Button Text"
            value={form.cta.buttonText}
            onChange={(e) => handleCtaChange("buttonText", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className={cardClass}>
          <h2 className="text-xl font-bold text-gray-900">Footer Note</h2>

          <textarea
            name="footerNote"
            placeholder="Footer Note"
            value={form.footerNote}
            onChange={handleChange}
            rows={3}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Service"}
        </button>
      </form>
    </div>
  );
}

AddServicePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;