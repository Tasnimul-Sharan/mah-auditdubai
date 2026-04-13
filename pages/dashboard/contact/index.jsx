"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";

export default function ContactIndexPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchContactPage();
  }, []);

  const fetchContactPage = async () => {
    setLoading(true);

    const { data: res, error } = await supabaseServer
      .from("contact_page")
      .select("*")
      .single();

    if (!error) setData(res);

    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contact Page</h1>

        <button
          onClick={() => router.push("/dashboard/contact/add")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
        >
          <Plus size={18} /> {data ? "Edit Page" : "Add Page"}
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-border_color p-6">
        {loading ? (
          <div className="text-center text-gray-500">
            Loading contact page...
          </div>
        ) : !data ? (
          <div className="text-center text-gray-400">
            No contact page data found
          </div>
        ) : (
          <div className="space-y-6">
            {/* HERO */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Contact Hero Section</h2>
              <p className="text-sm text-gray-500">{data.hero?.badge}</p>
              <h3 className="text-xl font-bold">{data.hero?.title}</h3>
              <p className="text-gray-600">{data.hero?.description}</p>
            </div>

            {/* STATS */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Stats</h2>
              <div className="flex gap-4 flex-wrap">
                {data.stats?.map((stat, i) => (
                  <div key={i} className="px-4 py-2 bg-gray-100 rounded-lg">
                    <div className="font-bold">{stat.number}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT INFO */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Contact Info</h2>
              <div className="space-y-3">
                {data.contact_info?.map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.text}</p>
                    <p className="text-primary font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MAP */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Map</h2>
              <div className="border rounded overflow-hidden h-[300px]">
                <iframe src={data.map_url} className="w-full h-full" />
              </div>
            </div>

            {/* EDIT BUTTON */}
            <div className="pt-4">
              <button
                onClick={() => router.push("/dashboard/contact/add")}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <Pencil size={16} /> Edit Contact Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ContactIndexPage.getLayout = function getLayout(page) {
  return <AdminLayout title="Contact Page">{page}</AdminLayout>;
};



// "use client";

// import { useEffect, useState } from "react";
// import AdminLayout from "@/components/AdminLayout";
// import { Save, Trash2, Plus } from "lucide-react";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useUpload } from "@/Hooks/useUpload";

// export default function ContactPageDashboard() {
//   const { uploadFile } = useUpload();

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

//     hero: { badge: "", title: "", description: "" },
//     stats: [],
//     contact_info: [],
//     map_url: "",
//   });

//   const [rowId, setRowId] = useState(null);
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   // FETCH
//   const fetchData = async () => {
//     const { data } = await supabaseServer
//       .from("contact_page")
//       .select("*")
//       .single();

//     if (data) {
//       setMeta(data);
//       setRowId(data.id);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // FILE
//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//   };

//   // SAVE
//   const saveData = async () => {
//     try {
//       let imageUrl = meta.hero_image;
//       let publicId = meta.public_id;

//       if (file) {
//         const res = await uploadFile(file, "contact");
//         imageUrl = res.url;
//         publicId = res.public_id;
//       }

//       await supabaseServer
//         .from("contact_page")
//         .update({
//           ...meta,
//           hero_image: imageUrl,
//           public_id: publicId,
//         })
//         .eq("id", rowId);

//       alert("Saved successfully");
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       alert("Save failed");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-8">
//       <h1 className="text-3xl font-bold">Contact Page</h1>

//       {/* HERO IMAGE */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <h2 className="font-semibold">Hero Image</h2>

//         <input type="file" onChange={handleFileChange} />

//         {(preview || meta.hero_image) && (
//           <img
//             src={preview || meta.hero_image}
//             className="w-48 h-32 object-cover rounded"
//           />
//         )}
//       </div>

//       {/* HERO CONTENT */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <h2 className="font-semibold">Hero Content</h2>

//         <input
//           placeholder="Badge"
//           value={meta.hero?.badge || ""}
//           onChange={(e) =>
//             setMeta({
//               ...meta,
//               hero: { ...meta.hero, badge: e.target.value },
//             })
//           }
//           className="border p-3 w-full"
//         />

//         <input
//           placeholder="Title"
//           value={meta.hero?.title || ""}
//           onChange={(e) =>
//             setMeta({
//               ...meta,
//               hero: { ...meta.hero, title: e.target.value },
//             })
//           }
//           className="border p-3 w-full"
//         />

//         <textarea
//           placeholder="Description"
//           value={meta.hero?.description || ""}
//           onChange={(e) =>
//             setMeta({
//               ...meta,
//               hero: { ...meta.hero, description: e.target.value },
//             })
//           }
//           className="border p-3 w-full"
//         />
//       </div>

//       {/* CONTACT INFO */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <h2 className="font-semibold">Contact Info</h2>

//         {meta.contact_info?.map((item, i) => (
//           <div key={i} className="grid grid-cols-3 gap-2">
//             <input
//               value={item.title}
//               onChange={(e) => {
//                 const updated = [...meta.contact_info];
//                 updated[i].title = e.target.value;
//                 setMeta({ ...meta, contact_info: updated });
//               }}
//               placeholder="Title"
//               className="border p-2"
//             />

//             <input
//               value={item.value}
//               onChange={(e) => {
//                 const updated = [...meta.contact_info];
//                 updated[i].value = e.target.value;
//                 setMeta({ ...meta, contact_info: updated });
//               }}
//               placeholder="Value"
//               className="border p-2"
//             />

//             <button
//               onClick={() =>
//                 setMeta({
//                   ...meta,
//                   contact_info: meta.contact_info.filter(
//                     (_, index) => index !== i,
//                   ),
//                 })
//               }
//               className="bg-red-500 text-white"
//             >
//               <Trash2 size={14} />
//             </button>
//           </div>
//         ))}

//         <button
//           onClick={() =>
//             setMeta({
//               ...meta,
//               contact_info: [
//                 ...meta.contact_info,
//                 { title: "", value: "", text: "" },
//               ],
//             })
//           }
//           className="bg-primary text-white px-3 py-1"
//         >
//           <Plus size={14} /> Add
//         </button>
//       </div>

//       {/* MAP */}
//       <div className="bg-white p-6 rounded-xl border">
//         <input
//           placeholder="Map Embed URL"
//           value={meta.map_url || ""}
//           onChange={(e) => setMeta({ ...meta, map_url: e.target.value })}
//           className="border p-3 w-full"
//         />
//       </div>

//       {/* SEO */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <h2 className="font-semibold">SEO</h2>

//         <input
//           placeholder="Meta Title"
//           value={meta.meta_title}
//           onChange={(e) => setMeta({ ...meta, meta_title: e.target.value })}
//           className="border p-3 w-full"
//         />

//         <textarea
//           placeholder="Meta Description"
//           value={meta.meta_description}
//           onChange={(e) =>
//             setMeta({ ...meta, meta_description: e.target.value })
//           }
//           className="border p-3 w-full"
//         />
//       </div>

//       <button
//         onClick={saveData}
//         className="bg-primary text-white px-6 py-3 rounded"
//       >
//         <Save size={18} /> Save All
//       </button>
//     </div>
//   );
// }

// ContactPageDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;