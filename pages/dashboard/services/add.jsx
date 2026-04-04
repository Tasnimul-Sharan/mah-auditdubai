// // "use client";

// // import { useState } from "react";
// // import { supabaseServer } from "@/lib/supabaseServer";
// // import AdminLayout from "@/components/AdminLayout";

// // export default function AddServicePage() {
// //   const [form, setForm] = useState({
// //     title: "",
// //     slug: "",
// //     description: "",
// //     image: "",
// //     heroTitle: "",
// //     heroDesc1: "",
// //     heroDesc2: "",
// //     sections: "",
// //     footerNote: "",
// //   });

// //   const generateSlug = (text) => {
// //     return text.toLowerCase().replace(/\s+/g, "-");
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

// //   const formatSections = (text) => {
// //     /**
// //      * Format example:
// //      * Title|Description|item1,item2,item3
// //      */
// //     return text.split("\n").map((row) => {
// //       const [title, description, items] = row.split("|");

// //       return {
// //         title,
// //         description,
// //         items: items?.split(",") || [],
// //       };
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const payload = {
// //       slug: form.slug,
// //       title: form.title,
// //       description: form.description,
// //       image: form.image,

// //       hero: {
// //         title: form.heroTitle,
// //         description1: form.heroDesc1,
// //         description2: form.heroDesc2,
// //       },

// //       sections: formatSections(form.sections),

// //       footer_note: form.footerNote,
// //     };

// //     const { error } = await supabaseServer.from("services").insert([payload]);

// //     if (error) {
// //       alert("Error adding service");
// //     } else {
// //       alert("Service added successfully");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-4">
// //       <input name="title" placeholder="Title" onChange={handleChange} />
// //       <input name="slug" value={form.slug} readOnly />
// //       <input
// //         name="description"
// //         placeholder="Short Description"
// //               onChange={handleChange}
// //          className="w-full h-20 border p-2"
// //       />
// //       <input name="image" placeholder="Image URL" onChange={handleChange} />

// //       <h2>Hero Section</h2>
// //       <input
// //         name="heroTitle"
// //         placeholder="Hero Title"
// //         onChange={handleChange}
// //       />
// //       <textarea
// //         name="heroDesc1"
// //         placeholder="Hero Desc 1"
// //         onChange={handleChange}
// //       />
// //       <textarea
// //         name="heroDesc2"
// //         placeholder="Hero Desc 2"
// //         onChange={handleChange}
// //       />

// //       <h2>Sections</h2>
// //       <textarea
// //         name="sections"
// //         placeholder="Title|Description|item1,item2"
// //         onChange={handleChange}
// //         className="w-full h-40 border p-2"
// //       />

// //       <textarea
// //         name="footerNote"
// //         placeholder="Footer Note"
// //         onChange={handleChange}
// //       />

// //       <button>Add Service</button>
// //     </form>
// //   );
// // }

// // AddServicePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// "use client";

// import { useState } from "react";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";

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
//   });

//   const generateSlug = (text) => text.toLowerCase().replace(/\s+/g, "-");

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

//   // 🔥 Sections logic
//   const addSection = () => {
//     setForm({
//       ...form,
//       sections: [...form.sections, { title: "", description: "", items: [""] }],
//     });
//   };

//   const updateSection = (index, field, value) => {
//     const updated = [...form.sections];
//     updated[index][field] = value;
//     setForm({ ...form, sections: updated });
//   };

//   const addItem = (sectionIndex) => {
//     const updated = [...form.sections];
//     updated[sectionIndex].items.push("");
//     setForm({ ...form, sections: updated });
//   };

//   const updateItem = (sectionIndex, itemIndex, value) => {
//     const updated = [...form.sections];
//     updated[sectionIndex].items[itemIndex] = value;
//     setForm({ ...form, sections: updated });
//   };

//   const removeSection = (index) => {
//     const updated = form.sections.filter((_, i) => i !== index);
//     setForm({ ...form, sections: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       slug: form.slug,
//       title: form.title,
//       description: form.description,
//       image: form.image,
//       hero: form.hero,
//       sections: form.sections,
//       footer_note: form.footerNote,
//     };

//     const { error } = await supabaseServer.from("services").insert([payload]);

//     if (error) {
//       alert("❌ Error adding service");
//     } else {
//       alert("✅ Service added successfully");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Add Service</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* BASIC INFO */}
//         <div className="bg-white p-6 rounded-xl border space-y-4">
//           <h2 className="font-semibold">Basic Info</h2>

//           <input
//             name="title"
//             placeholder="Title"
//             onChange={handleChange}
//             className="input"
//           />

//           <input
//             name="slug"
//             value={form.slug}
//             readOnly
//             className="input bg-gray-100"
//           />

//           <textarea
//             name="description"
//             placeholder="Short Description"
//             onChange={handleChange}
//             className="input h-20"
//           />

//           <input
//             name="image"
//             placeholder="Image URL"
//             onChange={handleChange}
//             className="input"
//           />
//         </div>

//         {/* HERO */}
//         <div className="bg-white p-6 rounded-xl border space-y-4">
//           <h2 className="font-semibold">Hero Section</h2>

//           <input
//             name="title"
//             placeholder="Hero Title"
//             onChange={handleHeroChange}
//             className="input"
//           />

//           <textarea
//             name="description1"
//             placeholder="Hero Description 1"
//             onChange={handleHeroChange}
//             className="input"
//           />

//           <textarea
//             name="description2"
//             placeholder="Hero Description 2"
//             onChange={handleHeroChange}
//             className="input"
//           />
//         </div>

//         {/* SECTIONS */}
//         <div className="bg-white p-6 rounded-xl border space-y-4">
//           <h2 className="font-semibold">Sections</h2>

//           {form.sections.map((section, i) => (
//             <div key={i} className="border p-4 rounded-lg space-y-3">
//               <input
//                 placeholder="Section Title"
//                 value={section.title}
//                 onChange={(e) => updateSection(i, "title", e.target.value)}
//                 className="input"
//               />

//               <textarea
//                 placeholder="Section Description"
//                 value={section.description}
//                 onChange={(e) =>
//                   updateSection(i, "description", e.target.value)
//                 }
//                 className="input"
//               />

//               {/* ITEMS */}
//               {section.items.map((item, idx) => (
//                 <input
//                   key={idx}
//                   placeholder="Item"
//                   value={item}
//                   onChange={(e) => updateItem(i, idx, e.target.value)}
//                   className="input"
//                 />
//               ))}

//               <button
//                 type="button"
//                 onClick={() => addItem(i)}
//                 className="text-sm text-blue-500"
//               >
//                 + Add Item
//               </button>

//               <button
//                 type="button"
//                 onClick={() => removeSection(i)}
//                 className="text-sm text-red-500"
//               >
//                 Remove Section
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addSection}
//             className="px-4 py-2 bg-primary text-white rounded"
//           >
//             + Add Section
//           </button>
//         </div>

//         {/* FOOTER */}
//         <div className="bg-white p-6 rounded-xl border">
//           <textarea
//             name="footerNote"
//             placeholder="Footer Note"
//             onChange={handleChange}
//             className="input"
//           />
//         </div>

//         {/* SUBMIT */}
//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
//         >
//           Save Service
//         </button>
//       </form>
//     </div>
//   );
// }

// AddServicePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function AddServicePage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
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

  const generateSlug = (text) => text.toLowerCase().replace(/\s+/g, "-");

  const uploadToCloudinary = async (file) => {
    const reader = new FileReader();

    const base64 = await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const res = await fetch("/api/upload-services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: base64 }),
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return data.url;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);

    const preview = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      image: preview, // preview only
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
      setForm({ ...form, [name]: value });
    }
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      hero: { ...form.hero, [name]: value },
    });
  };

  // Sections
  const addSection = () => {
    setForm({
      ...form,
      sections: [...form.sections, { title: "", description: "", items: [""] }],
    });
  };

  const updateSection = (i, field, value) => {
    const updated = [...form.sections];
    updated[i][field] = value;
    setForm({ ...form, sections: updated });
  };

  const addItem = (i) => {
    const updated = [...form.sections];
    updated[i].items.push("");
    setForm({ ...form, sections: updated });
  };

  const updateItem = (i, idx, value) => {
    const updated = [...form.sections];
    updated[i].items[idx] = value;
    setForm({ ...form, sections: updated });
  };

  const removeItem = (i, idx) => {
    const updated = [...form.sections];
    updated[i].items.splice(idx, 1);
    setForm({ ...form, sections: updated });
  };

  const removeSection = (i) => {
    const updated = form.sections.filter((_, index) => index !== i);
    setForm({ ...form, sections: updated });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     slug: form.slug,
  //     title: form.title,
  //     description: form.description,
  //     image: form.image,
  //     hero: form.hero,
  //     sections: form.sections,
  //     footer_note: form.footerNote,
  //     cta: form.cta,
  //   };

  //   const { error } = await supabaseServer.from("services").insert([payload]);

  //   if (error) alert("❌ Error");
  //   else alert("✅ Added successfully");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // 🔥 Upload image
      if (selectedImage) {
        imageUrl = await uploadToCloudinary(selectedImage);
      }

      const payload = {
        slug: form.slug,
        title: form.title,
        description: form.description,
        image: imageUrl, // ✅ real URL (not preview)
        hero: form.hero,
        sections: form.sections,
        footer_note: form.footerNote,
        cta: form.cta,
      };

      const { error } = await supabaseServer.from("services").insert([payload]);

      if (error) throw error;

      alert("✅ Service added successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding service");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add Service</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC */}
        <div className="bg-white p-6 border rounded-xl space-y-4">
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="input"
          />
          <input value={form.slug} readOnly className="input bg-gray-100" />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="input"
          />
          <input type="file" onChange={handleImage} className="input" />

          {/* Preview */}
          {form.image && (
            <img
              src={form.image}
              className="w-40 h-40 object-cover rounded-lg"
            />
          )}
        </div>

        {/* HERO */}
        <div className="bg-white p-6 border rounded-xl space-y-4">
          <input
            name="title"
            placeholder="Hero Title"
            onChange={handleHeroChange}
            className="input"
          />
          <textarea
            name="description1"
            placeholder="Desc 1"
            onChange={handleHeroChange}
            className="input"
          />
          <textarea
            name="description2"
            placeholder="Desc 2"
            onChange={handleHeroChange}
            className="input"
          />
        </div>

        {/* SECTIONS */}
        <div className="bg-white p-6 border rounded-xl space-y-4">
          {form.sections.map((sec, i) => (
            <div key={i} className="border p-4 rounded space-y-3">
              <input
                placeholder="Title"
                value={sec.title}
                onChange={(e) => updateSection(i, "title", e.target.value)}
                className="input"
              />
              <textarea
                placeholder="Desc"
                value={sec.description}
                onChange={(e) =>
                  updateSection(i, "description", e.target.value)
                }
                className="input"
              />

              {sec.items.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    value={item}
                    onChange={(e) => updateItem(i, idx, e.target.value)}
                    className="input"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i, idx)}
                    className="text-red-500"
                  >
                    X
                  </button>
                </div>
              ))}

              <button type="button" onClick={() => addItem(i)}>
                + Item
              </button>
              <button
                type="button"
                onClick={() => removeSection(i)}
                className="text-red-500"
              >
                Remove Section
              </button>
            </div>
          ))}

          <button type="button" onClick={addSection} className="btn">
            + Section
          </button>
        </div>

        {/* CTA */}
        <div className="bg-white p-6 border rounded-xl space-y-4">
          <input
            placeholder="CTA Title"
            onChange={(e) =>
              setForm({ ...form, cta: { ...form.cta, title: e.target.value } })
            }
            className="input"
          />
          <textarea
            placeholder="CTA Desc"
            onChange={(e) =>
              setForm({
                ...form,
                cta: { ...form.cta, description: e.target.value },
              })
            }
            className="input"
          />
          <input
            placeholder="Button Text"
            onChange={(e) =>
              setForm({
                ...form,
                cta: { ...form.cta, buttonText: e.target.value },
              })
            }
            className="input"
          />
        </div>

        {/* FOOTER */}
        <textarea
          name="footerNote"
          placeholder="Footer Note"
          onChange={handleChange}
          className="input"
        />

        <button className="w-full bg-primary text-white py-3 rounded">
          Save
        </button>
      </form>
    </div>
  );
}

AddServicePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
