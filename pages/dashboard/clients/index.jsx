// "use client";

// import { useEffect, useState } from "react";
// import { Trash2, Plus } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default function ClientsAdmin() {
//   const [data, setData] = useState([]);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   const fetchData = async () => {
//     const { data } = await supabaseServer.from("clients").select("*");
//     setData(data || []);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const uploadImage = async (file) => {
//     const reader = new FileReader();

//     const base64 = await new Promise((res) => {
//       reader.onloadend = () => res(reader.result);
//       reader.readAsDataURL(file);
//     });

//     const upload = await fetch("/api/upload", {
//       method: "POST",
//       body: JSON.stringify({ file: base64 }),
//     });

//     const result = await upload.json();
//     return result.url;
//   };

//   const handleAdd = async () => {
//     if (!image) return;

//     const url = await uploadImage(image);

//     await supabaseServer.from("clients").insert([{ logo_url: url }]);

//     setImage(null);
//     setPreview("");
//     fetchData();
//   };

//   const handleDelete = async (id) => {
//     await supabaseServer.from("clients").delete().eq("id", id);
//     fetchData();
//   };

//   return (
//     <div className="space-y-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold">Clients</h1>

//       {/* Upload */}
//       <div className="bg-white p-4 rounded-xl border space-y-3">
//         <input
//           type="file"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             setImage(file);
//             setPreview(URL.createObjectURL(file));
//           }}
//         />

//         {preview && <img src={preview} className="w-24 h-24 object-contain" />}

//         <button
//           onClick={handleAdd}
//           className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <Plus size={16} /> Add Client
//         </button>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-3 gap-4">
//         {data.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white p-4 border rounded-xl flex flex-col items-center"
//           >
//             <img src={item.logo_url} className="h-16 object-contain" />

//             <button
//               onClick={() => handleDelete(item.id)}
//               className="mt-3 bg-red-100 p-2 rounded"
//             >
//               <Trash2 size={16} className="text-red-600" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// ClientsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// "use client";

// import { useState } from "react";
// import { Plus, Trash2 } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { useUpload } from "@/Hooks/useUpload";
// import { useCrud } from "@/Hooks/useCrud";

// export default function ClientsAdmin() {
//   const { data, loading, createItem, deleteItem } = useCrud("clients");
//   const { uploadFile } = useUpload();

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const handleAdd = async () => {
//     if (!file) return;

//     try {
//       setUploading(true);

//       const { url, public_id } = await uploadFile(file, "clients");

//       await createItem({
//         logo_url: url,
//         public_id, // ✅ SAVE THIS
//       });

//       setFile(null);
//       setPreview("");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDelete = async (item) => {
//     if (!confirm("Delete this client?")) return;

//     try {
//       // 🔥 delete from cloudinary
//       await fetch("/api/delete-image", {
//         method: "POST",
//         body: JSON.stringify({ public_id: item.public_id }),
//         headers: { "Content-Type": "application/json" },
//       });

//       // 🔥 delete from DB
//       await deleteItem(item.id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="space-y-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold">Clients</h1>

//       {/* Upload Card */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <input
//           type="file"
//           onChange={(e) => {
//             const f = e.target.files[0];
//             setFile(f);
//             setPreview(URL.createObjectURL(f));
//           }}
//         />

//         {preview && <img src={preview} className="w-24 h-24 object-contain" />}

//         <button
//           onClick={handleAdd}
//           disabled={uploading}
//           className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
//         >
//           <Plus size={16} />
//           {uploading ? "Uploading..." : "Add Client"}
//         </button>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           data.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white p-4 border rounded-xl flex flex-col items-center"
//             >
//               <img src={item.logo_url} className="h-16 object-contain" />

//               <button
//                 // onClick={() => deleteItem(item.id)}
//                 onClick={() => handleDelete(item)}
//                 className="mt-3 bg-red-100 p-2 rounded"
//               >
//                 <Trash2 size={16} className="text-red-600" />
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// ClientsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";
import { useCrud } from "@/Hooks/useCrud";

export default function ClientsAdmin() {
  const { data, loading, createItem, deleteItem } = useCrud("clients");
  const { uploadFile } = useUpload();

  // ✅ MULTIPLE STATE
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  // ================= FILE CHANGE =================
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreviews(previewUrls);
  };

  // ================= ADD CLIENTS =================
  const handleAdd = async () => {
    if (!files.length) return;

    try {
      setUploading(true);

      // 🚀 PARALLEL UPLOAD (FAST)
      const uploads = files.map(async (file) => {
        const { url, public_id } = await uploadFile(file, "clients");

        return createItem({
          logo_url: url,
          public_id,
        });
      });

      await Promise.all(uploads);

      // reset
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (item) => {
    if (!confirm("Delete this client?")) return;

    try {
      // 🔥 Cloudinary delete
      if (item.public_id) {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_id: item.public_id }),
        });
      }

      // 🔥 DB delete
      await deleteItem(item.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* <h1 className="text-2xl font-bold">Clients</h1> */}

      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Users className="w-6 h-6 text-primary" />
        Clients
      </h1>

      {/* ================= UPLOAD CARD ================= */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <input type="file" multiple onChange={handleFileChange} />

        {/* PREVIEW */}
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-20 h-20 object-contain border rounded"
              />
            ))}
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={!files.length || uploading}
          className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
        >
          <Plus size={16} />
          {uploading ? "Uploading..." : "Add Clients"}
        </button>
      </div>

      {/* ================= CLIENT GRID ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-400">No clients found</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 border rounded-xl flex flex-col items-center group hover:shadow-lg transition"
            >
              <img src={item.logo_url} className="h-16 object-contain mb-3" />

              <button
                onClick={() => handleDelete(item)}
                className="bg-red-100 p-2 rounded hover:bg-red-200 transition"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

ClientsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
