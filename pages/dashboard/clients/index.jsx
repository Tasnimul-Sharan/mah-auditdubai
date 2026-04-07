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

"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";
import { useCrud } from "@/Hooks/useCrud";
// import { useUpload } from "@/hooks/useUpload";
// import { useCrud } from "@/hooks/useCrud";

export default function ClientsAdmin() {
  const { data, loading, createItem, deleteItem } = useCrud("clients");
  const { uploadFile } = useUpload();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleAdd = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const url = await uploadFile(file, "clients");

      await createItem({ logo_url: url });

      setFile(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Clients</h1>

      {/* Upload Card */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <input
          type="file"
          onChange={(e) => {
            const f = e.target.files[0];
            setFile(f);
            setPreview(URL.createObjectURL(f));
          }}
        />

        {preview && <img src={preview} className="w-24 h-24 object-contain" />}

        <button
          onClick={handleAdd}
          disabled={uploading}
          className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
        >
          <Plus size={16} />
          {uploading ? "Uploading..." : "Add Client"}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 border rounded-xl flex flex-col items-center"
            >
              <img src={item.logo_url} className="h-16 object-contain" />

              <button
                onClick={() => deleteItem(item.id)}
                className="mt-3 bg-red-100 p-2 rounded"
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
