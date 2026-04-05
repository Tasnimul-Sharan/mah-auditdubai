// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";

// export default function EditService() {
//   const router = useRouter();
//   const { id } = router.query;

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
//           footerNote: data.footer_note,
//         });
//         setLoading(false);
//       });
//   }, [id]);

//   // ================= IMAGE UPLOAD =================
//   const uploadImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onloadend = async () => {
//       const res = await fetch("/api/upload-services", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ file: reader.result }),
//       });

//       const data = await res.json();

//       if (!data.url) {
//         alert("Upload failed");
//         return;
//       }

//       setForm({ ...form, image: data.url });

//       await supabaseServer
//         .from("services")
//         .update({ image: data.url })
//         .eq("id", id);
//     };

//     reader.readAsDataURL(file);
//   };

//   // ================= SECTION LOGIC =================
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
//     const updated = [...form.sections];
//     updated[i][field] = value;
//     setForm({ ...form, sections: updated });
//   };

//   const removeSection = (i) => {
//     const updated = form.sections.filter((_, idx) => idx !== i);
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

//   // ================= UPDATE =================
//   const handleUpdate = async () => {
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

//     if (!error) {
//       alert("✅ Updated successfully");
//       router.push("/dashboard/services");
//     } else {
//       alert("❌ Update failed");
//     }
//   };

//   if (loading) return <div className="p-6">Loading...</div>;
//   if (!form) return <div className="p-6">Service not found</div>;

//   return (
//     <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl border space-y-6">
//       <h1 className="text-2xl font-bold">Edit Service</h1>

//       {/* BASIC */}
//       <input
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//         className="input"
//         placeholder="Title"
//       />

//       <input value={form.slug} readOnly className="input bg-gray-100" />

//       <textarea
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//         className="input"
//         placeholder="Description"
//       />

//       {/* IMAGE */}
//       <div className="space-y-2">
//         <input type="file" onChange={uploadImage} />

//         {form.image && (
//           <img src={form.image} className="w-40 h-40 object-cover rounded" />
//         )}
//       </div>

//       {/* HERO */}
//       <div className="space-y-3">
//         <h2 className="font-semibold">Hero</h2>

//         <input
//           value={form.hero?.title || ""}
//           onChange={(e) =>
//             setForm({ ...form, hero: { ...form.hero, title: e.target.value } })
//           }
//           className="input"
//           placeholder="Hero Title"
//         />

//         <textarea
//           value={form.hero?.description1 || ""}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               hero: { ...form.hero, description1: e.target.value },
//             })
//           }
//           className="input"
//         />

//         <textarea
//           value={form.hero?.description2 || ""}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               hero: { ...form.hero, description2: e.target.value },
//             })
//           }
//           className="input"
//         />
//       </div>

//       {/* SECTIONS */}
//       <div className="space-y-4">
//         <h2 className="font-semibold">Sections</h2>

//         {form.sections?.map((sec, i) => (
//           <div key={i} className="border p-4 rounded space-y-3">
//             <input
//               value={sec.title}
//               onChange={(e) => updateSection(i, "title", e.target.value)}
//               className="input"
//               placeholder="Section Title"
//             />

//             <textarea
//               value={sec.description}
//               onChange={(e) => updateSection(i, "description", e.target.value)}
//               className="input"
//             />

//             {sec.items.map((item, idx) => (
//               <div key={idx} className="flex gap-2">
//                 <input
//                   value={item}
//                   onChange={(e) => updateItem(i, idx, e.target.value)}
//                   className="input"
//                 />
//                 <button
//                   onClick={() => removeItem(i, idx)}
//                   className="text-red-500"
//                 >
//                   X
//                 </button>
//               </div>
//             ))}

//             <button onClick={() => addItem(i)}>+ Item</button>
//             <button onClick={() => removeSection(i)} className="text-red-500">
//               Remove Section
//             </button>
//           </div>
//         ))}

//         <button onClick={addSection} className="btn">
//           + Add Section
//         </button>
//       </div>

//       {/* CTA */}
//       <div className="space-y-3">
//         <h2 className="font-semibold">CTA</h2>

//         <input
//           value={form.cta?.title || ""}
//           onChange={(e) =>
//             setForm({ ...form, cta: { ...form.cta, title: e.target.value } })
//           }
//           className="input"
//         />

//         <textarea
//           value={form.cta?.description || ""}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               cta: { ...form.cta, description: e.target.value },
//             })
//           }
//           className="input"
//         />

//         <input
//           value={form.cta?.buttonText || ""}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               cta: { ...form.cta, buttonText: e.target.value },
//             })
//           }
//           className="input"
//         />
//       </div>

//       {/* FOOTER */}
//       <textarea
//         value={form.footerNote || ""}
//         onChange={(e) => setForm({ ...form, footerNote: e.target.value })}
//         className="input"
//         placeholder="Footer Note"
//       />

//       {/* ACTION */}
//       <button
//         onClick={handleUpdate}
//         className="bg-primary text-white px-6 py-3 rounded"
//       >
//         Update Service
//       </button>
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

export default function EditService() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

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
          footerNote: data.footer_note,
        });
        setLoading(false);
      });
  }, [id]);

  // ================= IMAGE UPLOAD =================
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload-services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: reader.result }),
        });

        const data = await res.json();

        if (!data.url) {
          alert("Upload failed");
          return;
        }

        // update UI instantly
        setForm({ ...form, image: data.url });

        // update DB instantly (same as blog)
        await supabaseServer
          .from("services")
          .update({ image: data.url })
          .eq("id", id);
      } catch (err) {
        console.error(err);
        alert("Upload error");
      }
    };

    reader.readAsDataURL(file);
  };

  // ================= REMOVE IMAGE =================
  const removeImage = async () => {
    try {
      const imageUrl = form.image;

      if (!imageUrl) return;

      const public_id = imageUrl
        .split("/upload/")[1]
        .split(".")[0]
        .replace(/^v\d+\//, "");

      await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id }),
      });

      // update UI
      setForm({ ...form, image: "" });

      // update DB
      await supabaseServer.from("services").update({ image: "" }).eq("id", id);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ================= SECTION LOGIC =================
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
    const updated = [...form.sections];
    updated[i][field] = value;
    setForm({ ...form, sections: updated });
  };

  const removeSection = (i) => {
    const updated = form.sections.filter((_, idx) => idx !== i);
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

  // ================= UPDATE =================
  const handleUpdate = async () => {
    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      image: form.image,
      hero: form.hero,
      sections: form.sections,
      footer_note: form.footerNote,
      cta: form.cta,
    };

    const { error } = await supabaseServer
      .from("services")
      .update(payload)
      .eq("id", id);

    if (!error) {
      alert("✅ Updated successfully");
      router.push("/dashboard/services");
    } else {
      alert("❌ Update failed");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!form) return <div className="p-6">Service not found</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl border space-y-6">
      <h1 className="text-2xl font-bold">Edit Service</h1>

      {/* BASIC */}
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="input"
        placeholder="Title"
      />

      <input value={form.slug} readOnly className="input bg-gray-100" />

      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="input"
        placeholder="Description"
      />

      {/* IMAGE SECTION */}
      <div className="space-y-4">
        <label className="text-xs text-gray-500 uppercase">Service Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="border p-2 rounded"
        />

        {/* Preview */}
        {form.image && (
          <div className="relative w-40">
            <img
              src={form.image}
              className="w-40 h-40 object-cover rounded border"
            />

            {/* REMOVE BUTTON */}
            <button
              onClick={removeImage}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* HERO */}
      <div className="space-y-3">
        <h2 className="font-semibold">Hero</h2>

        <input
          value={form.hero?.title || ""}
          onChange={(e) =>
            setForm({ ...form, hero: { ...form.hero, title: e.target.value } })
          }
          className="input"
        />

        <textarea
          value={form.hero?.description1 || ""}
          onChange={(e) =>
            setForm({
              ...form,
              hero: { ...form.hero, description1: e.target.value },
            })
          }
          className="input"
        />

        <textarea
          value={form.hero?.description2 || ""}
          onChange={(e) =>
            setForm({
              ...form,
              hero: { ...form.hero, description2: e.target.value },
            })
          }
          className="input"
        />
      </div>

      {/* SECTIONS */}
      <div className="space-y-4">
        <h2 className="font-semibold">Sections</h2>

        {form.sections?.map((sec, i) => (
          <div key={i} className="border p-4 rounded space-y-3">
            <input
              value={sec.title}
              onChange={(e) => updateSection(i, "title", e.target.value)}
              className="input"
            />

            <textarea
              value={sec.description}
              onChange={(e) => updateSection(i, "description", e.target.value)}
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
                  onClick={() => removeItem(i, idx)}
                  className="text-red-500"
                >
                  X
                </button>
              </div>
            ))}

            <button onClick={() => addItem(i)}>+ Item</button>
            <button onClick={() => removeSection(i)} className="text-red-500">
              Remove Section
            </button>
          </div>
        ))}

        <button onClick={addSection} className="btn">
          + Add Section
        </button>
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <h2 className="font-semibold">CTA</h2>

        <input
          value={form.cta?.title || ""}
          onChange={(e) =>
            setForm({ ...form, cta: { ...form.cta, title: e.target.value } })
          }
          className="input"
        />

        <textarea
          value={form.cta?.description || ""}
          onChange={(e) =>
            setForm({
              ...form,
              cta: { ...form.cta, description: e.target.value },
            })
          }
          className="input"
        />

        <input
          value={form.cta?.buttonText || ""}
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
        value={form.footerNote || ""}
        onChange={(e) => setForm({ ...form, footerNote: e.target.value })}
        className="input"
      />

      {/* ACTION */}
      <button
        onClick={handleUpdate}
        className="bg-primary text-white px-6 py-3 rounded"
      >
        Update Service
      </button>
    </div>
  );
}

EditService.getLayout = (page) => (
  <AdminLayout title="Edit Service">{page}</AdminLayout>
);