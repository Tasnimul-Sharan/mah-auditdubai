// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default function EditBlogPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [form, setForm] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     supabaseServer
//       .from("blogs")
//       .select("*")
//       .eq("id", id)
//       .single()
//       .then(({ data }) => setForm(data));
//   }, [id]);

//   const formatArray = (value) => {
//     return value.split("\n").filter(Boolean);
//   };

//   const updateBlog = async () => {
//     const payload = {
//       ...form,
//       checklist: Array.isArray(form.checklist)
//         ? form.checklist
//         : formatArray(form.checklist || ""),

//       highlights: Array.isArray(form.highlights)
//         ? form.highlights
//         : formatArray(form.highlights || ""),

//       posttags: Array.isArray(form.posttags)
//         ? form.posttags
//         : formatArray(form.posttags || ""),
//     };

//     const { error } = await supabaseServer
//       .from("blogs")
//       .update(payload)
//       .eq("id", id);

//     if (!error) {
//       alert("Blog updated!");
//       router.push("/dashboard/blogs");
//     }
//   };

//   if (!form) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl border space-y-6">
//       <h1 className="text-2xl font-bold">Edit Blog</h1>

//       <input
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//         className="border p-2 w-full"
//         placeholder="Title"
//       />

//       <input
//         value={form.author}
//         onChange={(e) => setForm({ ...form, author: e.target.value })}
//         className="border p-2 w-full"
//         placeholder="Author"
//       />

//       <input
//         type="date"
//         value={form.date}
//         onChange={(e) => setForm({ ...form, date: e.target.value })}
//         className="border p-2 w-full"
//       />

//       <textarea
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//         className="border p-2 w-full"
//       />

//       <textarea
//         value={form.quote}
//         onChange={(e) => setForm({ ...form, quote: e.target.value })}
//         className="border p-2 w-full"
//       />

//       <textarea
//         value={form.checklist}
//         onChange={(e) => setForm({ ...form, checklist: e.target.value })}
//         placeholder="Checklist (one per line)"
//         className="border p-2 w-full"
//       />

//       <textarea
//         value={form.highlights}
//         onChange={(e) => setForm({ ...form, highlights: e.target.value })}
//         placeholder="Highlights"
//         className="border p-2 w-full"
//       />

//       <textarea
//         value={form.posttags}
//         onChange={(e) => setForm({ ...form, posttags: e.target.value })}
//         placeholder="Tags"
//         className="border p-2 w-full"
//       />

//   {form.image && (
//     <img
//       src={form.image}
//       className="w-32 h-32 object-cover rounded border"
//     />
//   )}

//       {/* Images Preview */}
//       <div className="grid grid-cols-4 gap-4">
//         {form.subimages?.map((img, i) => (
//           <img
//             key={i}
//             src={img}
//             className="w-full h-32 object-cover rounded border"
//           />
//         ))}
//       </div>

//       <button
//         onClick={updateBlog}
//         className="bg-primary text-white px-4 py-2 rounded"
//       >
//         Update Blog
//       </button>
//     </div>
//   );
// }

// EditBlogPage.getLayout = (page) => (
//   <AdminLayout title="Edit Blog">{page}</AdminLayout>
// );

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";

// const Input = ({ label, value, onChange, type = "text" }) => (
//   <div className="space-y-1">
//     <label className="text-xs text-gray-500 uppercase">{label}</label>
//     <input
//       type={type}
//       className="border p-2 w-full rounded"
//       value={value || ""}
//       onChange={onChange}
//     />
//   </div>
// );

// const Textarea = ({ label, value, onChange }) => (
//   <div className="space-y-1">
//     <label className="text-xs text-gray-500 uppercase">{label}</label>
//     <textarea
//       rows={4}
//       className="border p-2 w-full rounded"
//       value={value || ""}
//       onChange={onChange}
//     />
//   </div>
// );

// function EditBlogPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     supabaseServer
//       .from("blogs")
//       .select("*")
//       .eq("id", id)
//       .single()
//       .then(({ data }) => {
//         setForm(data);
//         setLoading(false);
//       });
//   }, [id]);

//   // ✅ array formatter
//   const formatArray = (value) => {
//     return value.split("\n").filter(Boolean);
//   };

// const uploadImage = async (e, type = "sub") => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();

//   reader.onloadend = async () => {
//     try {
//       const res = await fetch("/api/upload-blogs", {
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

//       // 🔥 MAIN IMAGE
//       if (type === "main") {
//         setForm({ ...form, image: data.url });

//         await supabaseServer
//           .from("blogs")
//           .update({ image: data.url })
//           .eq("id", id);
//       }

//       // 🔥 SUB IMAGES
//       else {
//         const updatedImages = [...(form.subimages || []), data.url];

//         setForm({ ...form, subimages: updatedImages });

//         await supabaseServer
//           .from("blogs")
//           .update({ subimages: updatedImages })
//           .eq("id", id);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Upload error");
//     }
//   };

//   reader.readAsDataURL(file);
// };

//   // ✅ UPDATE BLOG
//   const updateBlog = async () => {
//     const payload = {
//       ...form,
//       checklist: Array.isArray(form.checklist)
//         ? form.checklist
//         : formatArray(form.checklist || ""),

//       highlights: Array.isArray(form.highlights)
//         ? form.highlights
//         : formatArray(form.highlights || ""),

//       posttags: Array.isArray(form.posttags)
//         ? form.posttags
//         : formatArray(form.posttags || ""),
//     };

//     const { error } = await supabaseServer
//       .from("blogs")
//       .update(payload)
//       .eq("id", id);

//     if (!error) {
//       alert("Blog updated successfully");
//       router.push("/dashboard/blogs");
//     }
//   };

//   if (loading) return <div className="p-6">Loading...</div>;
//   if (!form) return <div className="p-6">Blog not found</div>;

//   return (
//     <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl border space-y-6">
//       <h1 className="text-2xl font-bold">Edit Blog</h1>

//       {/* Basic Info */}
//       <div className="grid grid-cols-2 gap-6">
//         <Input
//           label="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />

//         <Input
//           label="Author"
//           value={form.author}
//           onChange={(e) => setForm({ ...form, author: e.target.value })}
//         />

//         <Input
//           label="Date"
//           type="date"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//         />
//       </div>

//       <Textarea
//         label="Description"
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//       />

//       <Textarea
//         label="Quote"
//         value={form.quote}
//         onChange={(e) => setForm({ ...form, quote: e.target.value })}
//       />

//       <Textarea
//         label="Checklist (one per line)"
//         value={
//           Array.isArray(form.checklist)
//             ? form.checklist.join("\n")
//             : form.checklist
//         }
//         onChange={(e) => setForm({ ...form, checklist: e.target.value })}
//       />

//       <Textarea
//         label="Highlights (one per line)"
//         value={
//           Array.isArray(form.highlights)
//             ? form.highlights.join("\n")
//             : form.highlights
//         }
//         onChange={(e) => setForm({ ...form, highlights: e.target.value })}
//       />

//       <Textarea
//         label="Tags (one per line)"
//         value={
//           Array.isArray(form.posttags)
//             ? form.posttags.join("\n")
//             : form.posttags
//         }
//         onChange={(e) => setForm({ ...form, posttags: e.target.value })}
//       />

//       <div className="space-y-4">
//         <label className="text-xs text-gray-500 uppercase">
//           Main Image Upload
//         </label>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => uploadImage(e, "main")}
//           className="border p-2 rounded"
//         />

//         {/* Preview */}
//         {form.image && (
//           <div className="relative w-32">
//             <img
//               src={form.image}
//               className="w-32 h-32 object-cover rounded border"
//             />

//             {/* REMOVE BUTTON */}
//             <button
//               onClick={async () => {
//                 const imageUrl = form.image;

//                 const public_id = imageUrl
//                   .split("/upload/")[1]
//                   .split(".")[0]
//                   .replace(/^v\d+\//, "");

//                 await fetch("/api/delete-image", {
//                   method: "POST",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({ public_id }),
//                 });

//                 setForm({ ...form, image: "" });

//                 await supabaseServer
//                   .from("blogs")
//                   .update({ image: "" })
//                   .eq("id", id);
//               }}
//               className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
//             >
//               Remove
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ✅ IMAGE UPLOAD */}
//       <div className="space-y-4">
//         <label className="text-xs text-gray-500 uppercase">
//           Sub Images Upload
//         </label>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => uploadImage(e, "sub")}
//           className="border p-2 rounded"
//         />

//         {/* Preview */}
//         <div className="grid grid-cols-4 gap-4">
//           {form.subimages?.map((img, i) => (
//             <div key={i} className="relative">
//               <img
//                 src={img}
//                 className="w-full h-32 object-cover rounded border"
//               />

//               {/* REMOVE */}
//               <button
//                 onClick={async () => {
//                   const imageUrl = form.subimages[i];

//                   const public_id = imageUrl
//                     .split("/upload/")[1]
//                     .split(".")[0]
//                     .replace(/^v\d+\//, "");

//                   await fetch("/api/delete-image", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ public_id }),
//                   });

//                   const updated = form.subimages.filter(
//                     (_, index) => index !== i,
//                   );

//                   setForm({ ...form, subimages: updated });

//                   await supabaseServer
//                     .from("blogs")
//                     .update({ subimages: updated })
//                     .eq("id", id);
//                 }}
//                 className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ACTIONS */}
//       <div className="flex gap-3 pt-6 border-t">
//         <button
//           onClick={updateBlog}
//           className="bg-primary text-white px-4 py-2 rounded"
//         >
//           Update Blog
//         </button>

//         <button
//           onClick={() => router.back()}
//           className="border px-4 py-2 rounded"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// EditBlogPage.getLayout = (page) => (
//   <AdminLayout title="Edit Blog">{page}</AdminLayout>
// );

// export default EditBlogPage;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import {
  ArrowLeft,
  ImageIcon,
  ListChecks,
  Newspaper,
  Quote,
  Save,
  Tags,
  Trash2,
  User,
} from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

const cardClass =
  "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

const Input = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
      {label}
    </label>
    <input
      type={type}
      className={inputClass}
      value={value || ""}
      onChange={onChange}
    />
  </div>
);

const Textarea = ({ label, value, onChange, rows = 4 }) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
      {label}
    </label>
    <textarea
      rows={rows}
      className={inputClass}
      value={value || ""}
      onChange={onChange}
    />
  </div>
);

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    supabaseServer
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setForm(data);
        setLoading(false);
      });
  }, [id]);

  const formatArray = (value) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const uploadImage = async (e, type = "sub") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload-blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file: reader.result }),
        });

        const data = await res.json();

        if (!data.url) {
          alert("Upload failed");
          return;
        }

        if (type === "main") {
          setForm({ ...form, image: data.url });

          await supabaseServer
            .from("blogs")
            .update({ image: data.url })
            .eq("id", id);
        } else {
          const updatedImages = [...(form.subimages || []), data.url];

          setForm({ ...form, subimages: updatedImages });

          await supabaseServer
            .from("blogs")
            .update({ subimages: updatedImages })
            .eq("id", id);
        }
      } catch (err) {
        console.error(err);
        alert("Upload error");
      }
    };

    reader.readAsDataURL(file);
  };

  const deleteImageFromCloudinary = async (imageUrl) => {
    if (!imageUrl) return;

    const public_id = imageUrl
      .split("/upload/")[1]
      ?.split(".")[0]
      ?.replace(/^v\d+\//, "");

    if (!public_id) return;

    await fetch("/api/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id }),
    });
  };

  const removeMainImage = async () => {
    await deleteImageFromCloudinary(form.image);

    setForm({ ...form, image: "" });

    await supabaseServer.from("blogs").update({ image: "" }).eq("id", id);
  };

  const removeSubImage = async (index) => {
    const imageUrl = form.subimages[index];

    await deleteImageFromCloudinary(imageUrl);

    const updated = form.subimages.filter((_, i) => i !== index);

    setForm({ ...form, subimages: updated });

    await supabaseServer
      .from("blogs")
      .update({ subimages: updated })
      .eq("id", id);
  };

  const updateBlog = async () => {
    try {
      setSaving(true);

      const payload = {
        ...form,
        checklist: Array.isArray(form.checklist)
          ? form.checklist
          : formatArray(form.checklist || ""),

        highlights: Array.isArray(form.highlights)
          ? form.highlights
          : formatArray(form.highlights || ""),

        posttags: Array.isArray(form.posttags)
          ? form.posttags
          : formatArray(form.posttags || ""),
      };

      const { error } = await supabaseServer
        .from("blogs")
        .update(payload)
        .eq("id", id);

      if (error) throw error;

      alert("✅ Blog updated successfully");
      router.push("/dashboard/blogs");
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="p-10 text-center text-gray-500">Loading...</div>;

  if (!form)
    return <div className="p-10 text-center text-gray-500">Blog not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Newspaper className="text-primary" />
          Edit Blog
        </h1>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-semibold hover:bg-gray-50 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* BASIC */}
      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <User className="text-primary" /> Basic Info
        </h2>

        <Input
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <Input
          label="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <Input
          label="Date"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <Textarea
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* QUOTE */}
      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Quote className="text-primary" /> Quote
        </h2>

        <Textarea
          label="Quote"
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
        />
      </div>

      {/* CHECKLIST */}
      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <ListChecks className="text-primary" /> Checklist & Highlights
        </h2>

        <Textarea
          label="Checklist (one per line)"
          value={
            Array.isArray(form.checklist)
              ? form.checklist.join("\n")
              : form.checklist
          }
          onChange={(e) => setForm({ ...form, checklist: e.target.value })}
        />

        <Textarea
          label="Highlights (one per line)"
          value={
            Array.isArray(form.highlights)
              ? form.highlights.join("\n")
              : form.highlights
          }
          onChange={(e) => setForm({ ...form, highlights: e.target.value })}
        />
      </div>

      {/* TAGS */}
      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Tags className="text-primary" /> Tags
        </h2>

        <Textarea
          label="Tags (one per line)"
          value={
            Array.isArray(form.posttags)
              ? form.posttags.join("\n")
              : form.posttags
          }
          onChange={(e) => setForm({ ...form, posttags: e.target.value })}
        />
      </div>

      {/* MAIN IMAGE */}
      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <ImageIcon className="text-primary" /> Main Image
        </h2>

        <input type="file" onChange={(e) => uploadImage(e, "main")} />

        {form.image && (
          <div className="relative w-48">
            <img
              src={form.image}
              className="w-full h-40 object-cover rounded-xl border"
            />

            <button
              onClick={removeMainImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* SUB IMAGES */}
      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <ImageIcon className="text-primary" /> Sub Images
        </h2>

        <input type="file" onChange={(e) => uploadImage(e, "sub")} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {form.subimages?.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img}
                className="w-full h-32 object-cover rounded-xl border"
              />

              <button
                onClick={() => removeSubImage(i)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={updateBlog}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-secondary transition"
      >
        <Save size={18} />
        {saving ? "Updating..." : "Update Blog"}
      </button>
    </div>
  );
}

EditBlogPage.getLayout = (page) => (
  <AdminLayout title="Edit Blog">{page}</AdminLayout>
);
