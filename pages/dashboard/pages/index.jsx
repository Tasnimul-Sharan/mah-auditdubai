// "use client";

// import { useEffect, useState } from "react";
// import { Pencil, Trash2, Plus } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default function PagesDashboard() {
//   const [pages, setPages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [title, setTitle] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [editTitle, setEditTitle] = useState("");

//   useEffect(() => {
//     fetchPages();
//   }, []);

//   const fetchPages = async () => {
//     setLoading(true);

//     const { data } = await supabaseServer
//       .from("pages")
//       .select("*")
//       .order("created_at", { ascending: false });

//     setPages(data || []);
//     setLoading(false);
//   };

//   const generateSlug = (text) =>
//     "/" +
//     text
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-");

//   const handleSave = async () => {
//     const value = editId ? editTitle : title;

//     if (!value.trim()) {
//       alert("Page title required");
//       return;
//     }

//     // UPDATE
//     if (editId) {
//       await supabaseServer
//         .from("pages")
//         .update({
//           title: editTitle,
//           slug: generateSlug(editTitle),
//         })
//         .eq("id", editId);

//       setEditId(null);
//       setEditTitle("");
//     } else {
//       // ADD
//       await supabaseServer.from("pages").insert([
//         {
//           title,
//           slug: generateSlug(title),
//         },
//       ]);

//       setTitle("");
//     }

//     fetchPages();
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this page?")) return;

//     await supabaseServer.from("pages").delete().eq("id", id);
//     fetchPages();
//   };

//   return (
//     <div className="space-y-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold text-primary">All Pages</h1>

//       {/* Add/Edit */}
//       <div className="bg-white p-4 rounded-xl border flex gap-4">
//         <input
//           type="text"
//           placeholder="Enter page title..."
//           className="border w-full px-4 py-2 rounded-lg"
//           value={editId ? editTitle : title}
//           onChange={(e) =>
//             editId ? setEditTitle(e.target.value) : setTitle(e.target.value)
//           }
//         />

//         <button
//           onClick={handleSave}
//           className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
//         >
//           <Plus size={18} />
//           {editId ? "Update" : "Add"}
//         </button>

//         {editId && (
//           <button
//             onClick={() => {
//               setEditId(null);
//               setEditTitle("");
//             }}
//             className="px-4 py-2 bg-gray-300 rounded-lg"
//           >
//             Cancel
//           </button>
//         )}
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl border overflow-hidden">
//         {loading ? (
//           <div className="p-6 text-center text-gray-500">Loading...</div>
//         ) : (
//           <table className="w-full text-sm border-collapse">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="p-3 border">S/L</th>
//                 <th className="p-3 border">Title</th>
//                 <th className="p-3 border">Slug</th>
//                 <th className="p-3 border text-center">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {pages.map((p, i) => (
//                 <tr key={p.id} className="even:bg-gray-50">
//                   <td className="p-3 border">{i + 1}</td>
//                   <td className="p-3 border">{p.title}</td>
//                   <td className="p-3 border text-gray-500">{p.slug}</td>

//                   <td className="p-3 border">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => {
//                           setEditId(p.id);
//                           setEditTitle(p.title);
//                         }}
//                         className="bg-blue-100 p-2 rounded hover:bg-blue-200"
//                       >
//                         <Pencil size={16} className="text-blue-600" />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(p.id)}
//                         className="bg-red-100 p-2 rounded hover:bg-red-200"
//                       >
//                         <Trash2 size={16} className="text-red-600" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {pages.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="p-6 text-center text-gray-400">
//                     No pages found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// PagesDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function PagesDashboard() {
  const [pages, setPages] = useState([]);

  const fetchPages = async () => {
    const { data } = await supabaseServer.from("pages").select("*");
    setPages(data || []);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pages</h1>

      <Link href="/dashboard/pages/create">
        <button className="bg-primary text-white px-4 py-2 mb-4">
          + New Page
        </button>
      </Link>

      {pages.map((p) => (
        <div key={p.id} className="border p-3 mb-2 flex justify-between">
          <div>
            <p className="font-semibold">{p.title}</p>
            <p className="text-sm text-gray-500">{p.slug}</p>
          </div>

          <Link href={`/dashboard/pages/${p.slug}`}>
            <button className="text-blue-500">Edit</button>
          </Link>

          <Link href={`/dashboard/pages/${p.slug}`}>
            <button className="bg-green-100 px-3 py-1 rounded text-green-700">
              Manage
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

PagesDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
