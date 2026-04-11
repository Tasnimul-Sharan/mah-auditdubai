// "use client"

// import { useState } from "react";
// // import { supabase } from "@/lib/supabaseClient";
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
//             className="input"
//           />
//           <input value={form.slug} readOnly className="input bg-gray-100" />
//           <textarea
//             name="description"
//             placeholder="Description"
//             onChange={handleChange}
//             className="input"
//           />
//           <input type="file" onChange={handleImage} className="input" />

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
//             className="input"
//           />
//           <textarea
//             name="description1"
//             placeholder="Desc 1"
//             onChange={handleHeroChange}
//             className="input"
//           />
//           <textarea
//             name="description2"
//             placeholder="Desc 2"
//             onChange={handleHeroChange}
//             className="input"
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
//                 className="input"
//               />
//               <textarea
//                 placeholder="Desc"
//                 value={sec.description}
//                 onChange={(e) =>
//                   updateSection(i, "description", e.target.value)
//                 }
//                 className="input"
//               />

//               {sec.items.map((item, idx) => (
//                 <div key={idx} className="flex gap-2">
//                   <input
//                     value={item}
//                     onChange={(e) => updateItem(i, idx, e.target.value)}
//                     className="input"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeItem(i, idx)}
//                     className="text-red-500"
//                   >
//                     X
//                   </button>
//                 </div>
//               ))}

//               <button type="button" onClick={() => addItem(i)}>
//                 + Item
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

//           <button type="button" onClick={addSection} className="btn">
//             + Section
//           </button>
//         </div>

//         {/* CTA */}
//         <div className="bg-white p-6 border rounded-xl space-y-4">
//           <input
//             placeholder="CTA Title"
//             onChange={(e) =>
//               setForm({ ...form, cta: { ...form.cta, title: e.target.value } })
//             }
//             className="input"
//           />
//           <textarea
//             placeholder="CTA Desc"
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 cta: { ...form.cta, description: e.target.value },
//               })
//             }
//             className="input"
//           />
//           <input
//             placeholder="Button Text"
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 cta: { ...form.cta, buttonText: e.target.value },
//               })
//             }
//             className="input"
//           />
//         </div>

//         {/* FOOTER */}
//         <textarea
//           name="footerNote"
//           placeholder="Footer Note"
//           onChange={handleChange}
//           className="input"
//         />

//         <button className="w-full bg-primary text-white py-3 rounded">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }

// AddServicePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";

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
            className="border p-3 w-full rounded"
          />
          <input
            value={form.slug}
            readOnly
            className="border p-3 w-full rounded bg-gray-100"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />
          <input
            type="file"
            onChange={handleImage}
            className="border p-3 w-full rounded"
          />

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
            className="border p-3 w-full rounded"
          />
          <textarea
            name="description1"
            placeholder="Desc 1"
            onChange={handleHeroChange}
            className="border p-3 w-full rounded"
          />
          <textarea
            name="description2"
            placeholder="Desc 2"
            onChange={handleHeroChange}
            className="border p-3 w-full rounded"
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
                className="border p-3 w-full rounded"
              />
              <textarea
                placeholder="Desc"
                value={sec.description}
                onChange={(e) =>
                  updateSection(i, "description", e.target.value)
                }
                className="border p-3 w-full rounded"
              />

              {sec.items.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    value={item}
                    onChange={(e) => updateItem(i, idx, e.target.value)}
                    className="border p-3 w-full rounded"
                  />
                  {/* <button
                    type="button"
                    onClick={() => removeItem(i, idx)}
                    className="text-red-500"
                  >
                    X
                  </button> */}
                  <button
                    type="button"
                    onClick={() => removeItem(i, idx)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg 
  bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}

              {/* <button type="button" onClick={() => addItem(i)}>
                + Item
              </button> */}

              <button
                type="button"
                onClick={() => addItem(i)}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg 
  bg-primary/10 text-primary hover:bg-primary hover:text-white transition"
              >
                <FaPlus size={12} /> Add Item
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

          <button
            type="button"
            onClick={addSection}
            className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl 
  bg-primary text-white hover:opacity-90 transition"
          >
            <FaPlus size={12} /> Add Section
          </button>
        </div>

        {/* CTA */}
        <div className="bg-white p-6 border rounded-xl space-y-4">
          <input
            placeholder="CTA Title"
            onChange={(e) =>
              setForm({ ...form, cta: { ...form.cta, title: e.target.value } })
            }
            className="border p-3 w-full rounded"
          />
          <textarea
            placeholder="CTA Desc"
            onChange={(e) =>
              setForm({
                ...form,
                cta: { ...form.cta, description: e.target.value },
              })
            }
            className="border p-3 w-full rounded"
          />
          <input
            placeholder="Button Text"
            onChange={(e) =>
              setForm({
                ...form,
                cta: { ...form.cta, buttonText: e.target.value },
              })
            }
            className="border p-3 w-full rounded"
          />
        </div>

        {/* FOOTER */}
        <textarea
          name="footerNote"
          placeholder="Footer Note"
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <button
          className="w-full flex items-center justify-center gap-2 
  bg-primary text-white py-3 rounded-xl text-sm font-medium 
  hover:opacity-90 transition"
        >
          <FaSave size={14} /> Save Service
        </button>
      </form>
    </div>
  );
}

AddServicePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
