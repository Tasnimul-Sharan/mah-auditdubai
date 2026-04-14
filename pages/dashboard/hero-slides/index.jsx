// "use client";

// import { useState } from "react";
// import { Plus, Trash2 } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { useUpload } from "@/Hooks/useUpload";
// import { useCrud } from "@/Hooks/useCrud";

// export default function HeroSlidesAdmin() {
//   const { data, loading, createItem, deleteItem } = useCrud("hero_slides");
//   const { uploadFile } = useUpload();

//   const [form, setForm] = useState({
//     subtitle: "",
//     title: "",
//     description: "",
//   });

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const handleAdd = async () => {
//     if (!file) return;

//     setUploading(true);

//     const { url, public_id } = await uploadFile(file, "hero");

//     await createItem({
//       ...form,
//       image: url,
//       public_id,
//     });

//     setForm({ subtitle: "", title: "", description: "" });
//     setFile(null);
//     setPreview("");
//     setUploading(false);
//   };

//   return (
//     <div className="space-y-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold">Hero Slides</h1>

//       {/* FORM */}
//       <div className="bg-white p-6 rounded-xl border space-y-3">
//         <input
//           placeholder="Subtitle"
//           value={form.subtitle}
//           onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           type="file"
//           onChange={(e) => {
//             const f = e.target.files[0];
//             setFile(f);
//             setPreview(URL.createObjectURL(f));
//           }}
//         />

//         {preview && (
//           <img src={preview} className="w-40 h-24 object-cover rounded" />
//         )}

//         <button
//           onClick={handleAdd}
//           className="bg-primary text-white px-4 py-2 rounded flex gap-2"
//         >
//           <Plus size={16} /> {uploading ? "Uploading..." : "Add Slide"}
//         </button>
//       </div>

//       {/* LIST */}
//       <div className="grid md:grid-cols-2 gap-4">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           data.map((item) => (
//             <div key={item.id} className="border p-4 rounded-xl">
//               <img
//                 src={item.image}
//                 className="h-32 w-full object-cover rounded"
//               />
//               <h3 className="font-bold mt-2">{item.title}</h3>
//               <p className="text-sm text-gray-500">{item.subtitle}</p>

//               <button
//                 onClick={() => deleteItem(item.id)}
//                 className="mt-3 bg-red-100 p-2 rounded"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// HeroSlidesAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";
import { useCrud } from "@/Hooks/useCrud";

export default function HeroSlidesAdmin() {
  const { data, loading, createItem, deleteItem, updateItem } =
    useCrud("hero_slides");
  const { uploadFile } = useUpload();

  const [form, setForm] = useState({
    subtitle: "",
    title: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  // ================= ADD / UPDATE =================
  const handleSubmit = async () => {
    try {
      setUploading(true);

      let imageUrl = null;
      let publicId = null;

      if (file) {
        const res = await uploadFile(file, "hero");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      if (editingId) {
        // UPDATE
        await updateItem(editingId, {
          ...form,
          ...(imageUrl && { image: imageUrl }),
          ...(publicId && { public_id: publicId }),
        });

        setEditingId(null);
      } else {
        // CREATE
        await createItem({
          ...form,
          image: imageUrl,
          public_id: publicId,
        });
      }

      // RESET
      setForm({ subtitle: "", title: "", description: "" });
      setFile(null);
      setPreview("");
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      subtitle: item.subtitle || "",
      title: item.title || "",
      description: item.description || "",
    });

    setPreview(item.image);
    setEditingId(item.id);
  };

  // ================= DELETE =================
  const handleDelete = async (item) => {
    if (!confirm("Delete this slide?")) return;

    try {
      await fetch("/api/delete-image", {
        method: "POST",
        body: JSON.stringify({ public_id: item.public_id }),
        headers: { "Content-Type": "application/json" },
      });

      await deleteItem(item.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Hero Slides</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl border space-y-3">
        <input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          type="file"
          onChange={(e) => {
            const f = e.target.files[0];
            setFile(f);
            setPreview(URL.createObjectURL(f));
          }}
        />

        {preview && (
          <img src={preview} className="w-40 h-24 object-cover rounded" />
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded flex gap-2"
          >
            <Plus size={16} />
            {uploading ? "Saving..." : editingId ? "Update Slide" : "Add Slide"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({
                  subtitle: "",
                  title: "",
                  description: "",
                });
                setPreview("");
                setFile(null);
              }}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.map((item) => (
            <div key={item.id} className="border p-4 rounded-xl">
              <img
                src={item.image}
                className="h-32 w-full object-cover rounded"
              />

              <h3 className="font-bold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.subtitle}</p>

              <div className="flex gap-2 mt-3">
                {/* EDIT */}
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-100 p-2 rounded"
                >
                  <Pencil size={16} className="text-blue-600" />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(item)}
                  className="bg-red-100 p-2 rounded"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

HeroSlidesAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
