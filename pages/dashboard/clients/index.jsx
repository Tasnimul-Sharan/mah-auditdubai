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

// "use client";

// import { useState } from "react";
// import { Plus, Trash2, Users } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { useUpload } from "@/Hooks/useUpload";
// import { useCrud } from "@/Hooks/useCrud";

// export default function ClientsAdmin() {
//   const { data, loading, createItem, deleteItem } = useCrud("clients");
//   const { uploadFile } = useUpload();

//   // ✅ MULTIPLE STATE
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   // ================= FILE CHANGE =================
//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);

//     setFiles(selectedFiles);

//     const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

//     setPreviews(previewUrls);
//   };

//   // ================= ADD CLIENTS =================
//   const handleAdd = async () => {
//     if (!files.length) return;

//     try {
//       setUploading(true);

//       // 🚀 PARALLEL UPLOAD (FAST)
//       const uploads = files.map(async (file) => {
//         const { url, public_id } = await uploadFile(file, "clients");

//         return createItem({
//           logo_url: url,
//           public_id,
//         });
//       });

//       await Promise.all(uploads);

//       // reset
//       setFiles([]);
//       setPreviews([]);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (item) => {
//     if (!confirm("Delete this client?")) return;

//     try {
//       // 🔥 Cloudinary delete
//       if (item.public_id) {
//         await fetch("/api/delete-image", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ public_id: item.public_id }),
//         });
//       }

//       // 🔥 DB delete
//       await deleteItem(item.id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="space-y-6 max-w-5xl mx-auto">
//       {/* <h1 className="text-2xl font-bold">Clients</h1> */}

//       <h1 className="text-2xl font-bold flex items-center gap-2">
//         <Users className="w-6 h-6 text-primary" />
//         Clients
//       </h1>

//       {/* ================= UPLOAD CARD ================= */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <input type="file" multiple onChange={handleFileChange} />

//         {/* PREVIEW */}
//         {previews.length > 0 && (
//           <div className="flex flex-wrap gap-3">
//             {previews.map((src, i) => (
//               <img
//                 key={i}
//                 src={src}
//                 className="w-20 h-20 object-contain border rounded"
//               />
//             ))}
//           </div>
//         )}

//         <button
//           onClick={handleAdd}
//           disabled={!files.length || uploading}
//           className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
//         >
//           <Plus size={16} />
//           {uploading ? "Uploading..." : "Add Clients"}
//         </button>
//       </div>

//       {/* ================= CLIENT GRID ================= */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {loading ? (
//           <p>Loading...</p>
//         ) : data.length === 0 ? (
//           <p className="text-gray-400">No clients found</p>
//         ) : (
//           data.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white p-4 border rounded-xl flex flex-col items-center group hover:shadow-lg transition"
//             >
//               <img src={item.logo_url} className="h-16 object-contain mb-3" />

//               <button
//                 onClick={() => handleDelete(item)}
//                 className="bg-red-100 p-2 rounded hover:bg-red-200 transition"
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

import { useEffect, useState } from "react";
import { Plus, Trash2, Users, Save } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";
import { useCrud } from "@/Hooks/useCrud";
import { supabaseServer } from "@/lib/supabaseServer";

export default function ClientsAdmin() {
  const { data, loading, createItem, deleteItem } = useCrud("clients");
  const { uploadFile } = useUpload();

  const [sectionData, setSectionData] = useState({
    badge: "Our Clients",
    title: "Trusted by Leading Organizations",
    subtitle:
      "We collaborate with companies across the UAE and international markets, delivering reliable audit, compliance, and advisory services.",
  });

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [savingSection, setSavingSection] = useState(false);

  // ================= LOAD SECTION DATA =================
  useEffect(() => {
    if (data?.length > 0) {
      setSectionData({
        badge: data[0]?.badge || "Our Clients",
        title: data[0]?.title || "Trusted by Leading Organizations",
        subtitle:
          data[0]?.subtitle ||
          "We collaborate with companies across the UAE and international markets, delivering reliable audit, compliance, and advisory services.",
      });
    }
  }, [data]);

  // ================= SECTION CHANGE =================
  const handleSectionChange = (e) => {
    const { name, value } = e.target;

    setSectionData({
      ...sectionData,
      [name]: value,
    });
  };

  // ================= SAVE SECTION DATA =================
  const saveSectionData = async () => {
    try {
      setSavingSection(true);

      if (data?.length > 0) {
        const { error } = await supabaseServer
          .from("clients")
          .update({
            badge: sectionData.badge,
            title: sectionData.title,
            subtitle: sectionData.subtitle,
          })
          .neq("id", "00000000-0000-0000-0000-000000000000");

        if (error) throw error;
      } else {
        const { error } = await supabaseServer.from("clients").insert([
          {
            badge: sectionData.badge,
            title: sectionData.title,
            subtitle: sectionData.subtitle,
          },
        ]);

        if (error) throw error;
      }

      alert("Section content saved successfully");
    } catch (err) {
      console.error(err);
      alert("Section save failed");
    } finally {
      setSavingSection(false);
    }
  };

  // ================= FILE CHANGE =================
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  // ================= ADD CLIENTS =================
  const handleAdd = async () => {
    if (!files.length) return;

    try {
      setUploading(true);

      const uploads = files.map(async (file) => {
        const { url, public_id } = await uploadFile(file, "clients");

        return createItem({
          logo_url: url,
          public_id,
          badge: sectionData.badge,
          title: sectionData.title,
          subtitle: sectionData.subtitle,
        });
      });

      await Promise.all(uploads);

      setFiles([]);
      setPreviews([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (item) => {
    if (!confirm("Delete this client?")) return;

    try {
      if (item.public_id) {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_id: item.public_id }),
        });
      }

      await deleteItem(item.id);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Users className="w-6 h-6 text-primary" />
        Clients
      </h1>

      {/* ================= SECTION CONTENT ================= */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <h2 className="font-semibold text-lg">Client Section Content</h2>

        <input
          name="badge"
          value={sectionData.badge}
          onChange={handleSectionChange}
          placeholder="Badge Text"
          className="border p-3 w-full rounded-lg"
        />

        <input
          name="title"
          value={sectionData.title}
          onChange={handleSectionChange}
          placeholder="Section Title"
          className="border p-3 w-full rounded-lg"
        />

        <textarea
          name="subtitle"
          value={sectionData.subtitle}
          onChange={handleSectionChange}
          placeholder="Section Subtitle"
          rows={3}
          className="border p-3 w-full rounded-lg"
        />

        <button
          type="button"
          onClick={saveSectionData}
          disabled={savingSection}
          className="bg-primary text-white px-5 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-50 hover:bg-secondary transition-all duration-500"
        >
          <Save size={16} />
          {savingSection ? "Saving..." : "Save Section Content"}
        </button>
      </div>

      {/* ================= UPLOAD CARD ================= */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <h2 className="font-semibold text-lg">Upload Client Logos</h2>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="border p-3 w-full rounded-lg"
        />

        {previews.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-24 h-20 object-contain border rounded-lg bg-gray-50 p-2"
              />
            ))}
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={!files.length || uploading}
          className="bg-primary text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-secondary transition-all duration-500"
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
          data
            .filter((item) => item.logo_url)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 border rounded-xl flex flex-col items-center group hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={item.logo_url}
                  alt="Client Logo"
                  className="h-20 max-w-[150px] object-contain mb-4 grayscale group-hover:grayscale-0 transition-all duration-500"
                />

                <button
                  onClick={() => handleDelete(item)}
                  className="bg-red-100 p-2 rounded-lg hover:bg-red-500 transition-all duration-500"
                >
                  <Trash2
                    size={16}
                    className="text-red-600 group-hover:text-white"
                  />
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

ClientsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;