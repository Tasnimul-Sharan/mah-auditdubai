"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";

const PAGE_SIZE = 10;

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchServices();
  }, [page, search]);

  const fetchServices = async () => {
    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabaseServer
      .from("services")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error, count } = await query;

    if (!error) {
      setServices(data);
      setTotal(count);
    }

    setLoading(false);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const deleteService = async (id) => {
    if (!confirm("Delete this service permanently?")) return;

    const { error } = await supabaseServer
      .from("services")
      .delete()
      .eq("id", id);

    if (!error) fetchServices();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Services</h1>

        <button
          onClick={() => router.push("/dashboard/services/add")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border flex gap-4">
        <input
          type="text"
          placeholder="Search by service title..."
          className="border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading services...
          </div>
        ) : (
          <table className="w-full text-sm border border-gray-200 border-collapse">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 border text-left">S/L</th>
                <th className="p-3 border text-left">Title</th>
                <th className="p-3 border text-left">Slug</th>
                <th className="p-3 border text-left">Image</th>
                <th className="p-3 border text-center w-32">Action</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service, i) => (
                <tr
                  key={service.id}
                  className="even:bg-gray-50 hover:bg-blue-50 transition"
                >
                  <td className="p-3 border">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>

                  <td className="p-3 border font-medium">{service.title}</td>

                  <td className="p-3 border">{service.slug}</td>

                  <td className="p-3 border">
                    {service.image && (
                      <img
                        src={service.image}
                        className="w-16 h-10 object-cover rounded"
                      />
                    )}
                  </td>

                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <button
                        onClick={() =>
                          router.push(
                            `/dashboard/services/view/${service.slug}`,
                          )
                        }
                        className="bg-emerald-100 p-2 rounded hover:bg-emerald-200"
                      >
                        <Eye size={16} className="text-emerald-600" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          router.push(`/dashboard/services/edit/${service.id}`)
                        }
                        className="bg-blue-100 p-2 rounded hover:bg-blue-200"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteService(service.id)}
                        className="bg-red-100 p-2 rounded hover:bg-red-200"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {services.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded border transition ${
                page === i + 1
                  ? "bg-primary text-white border-primary"
                  : "hover:bg-primary hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ServicesPage.getLayout = (page) => (
  <AdminLayout title="Services">{page}</AdminLayout>
);

// "use client";

// import { useEffect, useState } from "react";
// import { Eye, Pencil, Trash2, Plus, Save } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { useRouter } from "next/router";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useUpload } from "@/Hooks/useUpload";

// const PAGE_SIZE = 10;

// export default function ServicesDashboard() {
//   const router = useRouter();
//   const { uploadFile } = useUpload();

//   // ================= SERVICES STATE =================
//   const [services, setServices] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // ================= SETTINGS STATE =================
//   const [meta, setMeta] = useState({
//     meta_title: "",
//     meta_description: "",
//     meta_keywords: "",
//     meta_author: "",
//     meta_url: "",
//     meta_image: "",
//     hero_title: "",
//     hero_image: "",
//     public_id: null,
//   });

//   const [rowId, setRowId] = useState(null);
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   // ================= FETCH SERVICES =================
//   const fetchServices = async () => {
//     setLoading(true);

//     const from = (page - 1) * PAGE_SIZE;
//     const to = from + PAGE_SIZE - 1;

//     let query = supabaseServer
//       .from("services")
//       .select("*", { count: "exact" })
//       .order("created_at", { ascending: false })
//       .range(from, to);

//     if (search) {
//       query = query.ilike("title", `%${search}%`);
//     }

//     const { data, count } = await query;

//     setServices(data || []);
//     setTotal(count || 0);
//     setLoading(false);
//   };

//   // ================= FETCH SETTINGS =================
//   const fetchSettings = async () => {
//     const { data } = await supabaseServer
//       .from("services_page")
//       .select("*")
//       .single();

//     if (data) {
//       setMeta(data);
//       setRowId(data.id);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, [page, search]);

//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   // ================= DELETE SERVICE =================
//   const deleteService = async (id) => {
//     if (!confirm("Delete this service permanently?")) return;

//     const { error } = await supabaseServer
//       .from("services")
//       .delete()
//       .eq("id", id);

//     if (!error) fetchServices();
//   };

//   // ================= IMAGE =================
//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//   };

//   const deleteImage = async () => {
//     if (!meta?.public_id) return;

//     await fetch("/api/delete-image", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ public_id: meta.public_id }),
//     });

//     await supabaseServer
//       .from("services_page")
//       .update({ hero_image: null, public_id: null })
//       .eq("id", rowId);

//     setPreview("");
//     fetchSettings();
//   };

//   // ================= SAVE SETTINGS =================
//   const saveSettings = async () => {
//     try {
//       let imageUrl = meta.hero_image;
//       let publicId = meta.public_id;

//       if (file) {
//         if (meta.public_id) {
//           await fetch("/api/delete-image", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ public_id: meta.public_id }),
//           });
//         }

//         const res = await uploadFile(file, "services");
//         imageUrl = res.url;
//         publicId = res.public_id;
//       }

//       if (rowId) {
//         await supabaseServer
//           .from("services_page")
//           .update({
//             ...meta,
//             hero_image: imageUrl,
//             public_id: publicId,
//           })
//           .eq("id", rowId);
//       } else {
//         const { data } = await supabaseServer
//           .from("services_page")
//           .insert([
//             {
//               ...meta,
//               hero_image: imageUrl,
//               public_id: publicId,
//             },
//           ])
//           .select()
//           .single();

//         setRowId(data.id);
//       }

//       setFile(null);
//       setPreview("");
//       alert("Settings saved successfully");
//       fetchSettings();
//     } catch (err) {
//       console.error(err);
//       alert("Save failed");
//     }
//   };

//   const totalPages = Math.ceil(total / PAGE_SIZE);

//   return (
//     <div className="space-y-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold">Services Management</h1>

//       {/* ================= SETTINGS (NEW - TOP) ================= */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <h2 className="text-xl font-semibold">Page Settings</h2>

//         <input
//           placeholder="Hero Title"
//           value={meta.hero_title || ""}
//           onChange={(e) => setMeta({ ...meta, hero_title: e.target.value })}
//           className="border p-3 w-full rounded"
//         />

//         <input type="file" onChange={handleFileChange} />

//         {preview ? (
//           <img src={preview} className="w-48 h-32 object-cover rounded" />
//         ) : meta.hero_image ? (
//           <div className="relative w-fit">
//             <img
//               src={meta.hero_image}
//               className="w-48 h-32 object-cover rounded"
//             />
//             <button
//               onClick={deleteImage}
//               className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
//             >
//               <Trash2 size={14} />
//             </button>
//           </div>
//         ) : null}

//         {/* <input
//           placeholder="Meta Title"
//           value={meta.meta_title}
//           onChange={(e) => setMeta({ ...meta, meta_title: e.target.value })}
//           className="border p-3 w-full rounded"
//         />

//         <textarea
//           placeholder="Meta Description"
//           value={meta.meta_description}
//           onChange={(e) =>
//             setMeta({ ...meta, meta_description: e.target.value })
//           }
//           className="border p-3 w-full rounded"
//         /> */}

//       </div>
//         <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-4">
//           <h2 className="text-2xl font-bold">SEO Meta Tags</h2>

//           <input
//             placeholder="Meta Title"
//             value={meta.meta_title}
//             onChange={(e) => setMeta({ ...meta, meta_title: e.target.value })}
//             className="border p-3 w-full rounded"
//           />

//           <textarea
//             placeholder="Meta Description"
//             value={meta.meta_description}
//             onChange={(e) =>
//               setMeta({ ...meta, meta_description: e.target.value })
//             }
//             className="border p-3 w-full rounded"
//           />

//           <textarea
//             placeholder="Meta Keywords"
//             value={meta.meta_keywords}
//             onChange={(e) =>
//               setMeta({ ...meta, meta_keywords: e.target.value })
//             }
//             className="border p-3 w-full rounded"
//           />

//           <input
//             placeholder="Meta Author"
//             value={meta.meta_author}
//             onChange={(e) => setMeta({ ...meta, meta_author: e.target.value })}
//             className="border p-3 w-full rounded"
//           />

//           <input
//             placeholder="Meta URL"
//             value={meta.meta_url}
//             onChange={(e) => setMeta({ ...meta, meta_url: e.target.value })}
//             className="border p-3 w-full rounded"
//           />

//           <input
//             placeholder="Meta Image"
//             value={meta.meta_image}
//             onChange={(e) => setMeta({ ...meta, meta_image: e.target.value })}
//             className="border p-3 w-full rounded"
//           />

//           {/* <button
//             onClick={saveData}
//             className="bg-primary text-white px-6 py-3 rounded-lg flex gap-2"
//           >
//             <Save size={18} /> Save Changes
//           </button> */}
//           <button
//             onClick={saveSettings}
//             className="bg-primary text-white px-6 py-3 rounded-lg flex gap-2"
//           >
//             <Save size={18} /> Save Settings
//           </button>
//         </div>

//       {/* ================= ORIGINAL UI (UNCHANGED) ================= */}

//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">All Services</h1>

//         <button
//           onClick={() => router.push("/dashboard/services/add")}
//           className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
//         >
//           <Plus size={18} /> Add Service
//         </button>
//       </div>

//       {/* Search */}
//       <div className="bg-white p-4 rounded-xl border flex gap-4">
//         <input
//           type="text"
//           placeholder="Search by service title..."
//           className="border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl border overflow-hidden">
//         {loading ? (
//           <div className="p-6 text-center text-gray-500">
//             Loading services...
//           </div>
//         ) : (
//           <table className="w-full text-sm border border-gray-200 border-collapse">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="p-3 border text-left">S/L</th>
//                 <th className="p-3 border text-left">Title</th>
//                 <th className="p-3 border text-left">Slug</th>
//                 <th className="p-3 border text-left">Image</th>
//                 <th className="p-3 border text-center w-32">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {services.map((service, i) => (
//                 <tr
//                   key={service.id}
//                   className="even:bg-gray-50 hover:bg-blue-50 transition"
//                 >
//                   <td className="p-3 border">
//                     {(page - 1) * PAGE_SIZE + i + 1}
//                   </td>

//                   <td className="p-3 border font-medium">{service.title}</td>

//                   <td className="p-3 border">{service.slug}</td>

//                   <td className="p-3 border">
//                     {service.image && (
//                       <img
//                         src={service.image}
//                         className="w-16 h-10 object-cover rounded"
//                       />
//                     )}
//                   </td>

//                   <td className="p-3 border">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() =>
//                           router.push(
//                             `/dashboard/services/view/${service.slug}`,
//                           )
//                         }
//                         className="bg-emerald-100 p-2 rounded hover:bg-emerald-200"
//                       >
//                         <Eye size={16} className="text-emerald-600" />
//                       </button>

//                       <button
//                         onClick={() =>
//                           router.push(`/dashboard/services/edit/${service.id}`)
//                         }
//                         className="bg-blue-100 p-2 rounded hover:bg-blue-200"
//                       >
//                         <Pencil size={16} className="text-blue-600" />
//                       </button>

//                       <button
//                         onClick={() => deleteService(service.id)}
//                         className="bg-red-100 p-2 rounded hover:bg-red-200"
//                       >
//                         <Trash2 size={16} className="text-red-600" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {services.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="p-6 text-center text-gray-400">
//                     No services found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2">
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`px-4 py-2 rounded border transition ${
//                 page === i + 1
//                   ? "bg-primary text-white border-primary"
//                   : "hover:bg-primary hover:text-white"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// ServicesDashboard.getLayout = (page) => (
//   <AdminLayout title="Services">{page}</AdminLayout>
// );
