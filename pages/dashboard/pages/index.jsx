// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";
// import { Pencil, Trash2, Eye } from "lucide-react";

// export default function PagesDashboard() {
//   const [pages, setPages] = useState([]);

//   const fetchPages = async () => {
//     const { data } = await supabaseServer
//       .from("pages")
//       .select("*")
//       .order("created_at", { ascending: false });

//     setPages(data || []);
//   };

//   useEffect(() => {
//     fetchPages();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this page?")) return;
//     await supabaseServer.from("pages").delete().eq("id", id);
//     fetchPages();
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Pages</h1>

//         <Link href="/dashboard/pages/create">
//           <button className="bg-primary text-white px-4 py-2 rounded-lg">
//             + New Page
//           </button>
//         </Link>
//       </div>

//       <div className="space-y-3">
//         {pages.map((p) => (
//           <div
//             key={p.id}
//             className="border rounded-xl p-4 flex justify-between items-center"
//           >
//             <div>
//               <p className="font-semibold">{p.title}</p>
//               <p className="text-sm text-gray-500">{p.slug}</p>
//             </div>

//             <div className="flex gap-2">
//               <Link href={`/dashboard/pages/view/${p.slug}`} target="_blank">
//                 <button className="bg-green-100 p-2 rounded">
//                   <Eye size={16} />
//                 </button>
//               </Link>

//               <Link href={`/dashboard/pages/edit/${p.slug}`}>
//                 <button className="bg-blue-100 p-2 rounded">
//                   <Pencil size={16} />
//                 </button>
//               </Link>

//               <Link href={`/dashboard/pages/${p.slug}`}>
//                 <button className="bg-purple-100 p-2 rounded text-sm">
//                   Manage
//                 </button>
//               </Link>

//               <button
//                 onClick={() => handleDelete(p.id)}
//                 className="bg-red-100 p-2 rounded"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// PagesDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";
// import { Pencil, Trash2, Eye } from "lucide-react";

// export default function PagesDashboard() {
//   const [pages, setPages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPages = async () => {
//     setLoading(true);

//     const { data, error } = await supabaseServer
//       .from("pages")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) console.error(error);

//     setPages(data || []);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchPages();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this page?")) return;

//     const { error } = await supabaseServer.from("pages").delete().eq("id", id);

//     if (error) console.error(error);

//     fetchPages();
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Pages</h1>

//         <Link href="/dashboard/pages/create">
//           <button className="bg-primary text-white px-4 py-2 rounded-lg">
//             + New Page
//           </button>
//         </Link>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl border overflow-hidden">
//         {loading ? (
//           <div className="p-6 text-center text-gray-500">Loading...</div>
//         ) : (
//           <table className="w-full text-sm border-collapse">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="p-3 border">#</th>
//                 <th className="p-3 border text-left">Title</th>
//                 <th className="p-3 border text-left">Slug</th>
//                 <th className="p-3 border text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {pages.map((p, index) => (
//                 <tr key={p.id} className="even:bg-gray-50">
//                   <td className="p-3 border text-center">{index + 1}</td>

//                   <td className="p-3 border font-medium">{p.title}</td>

//                   <td className="p-3 border text-gray-500">/{p.slug}</td>

                  // <td className="p-3 border">
                  //   <div className="flex justify-center gap-2">
                  //     {/* VIEW */}
                  //     <Link href={`/${p.slug}`} target="_blank">
                  //       <button className="bg-green-100 p-2 rounded hover:bg-green-200">
                  //         <Eye size={16} className="text-green-600" />
                  //       </button>
                  //     </Link>

                  //     {/* EDIT */}
                  //     <Link href={`/dashboard/pages/edit/${p.slug}`}>
                  //       <button className="bg-blue-100 p-2 rounded hover:bg-blue-200">
                  //         <Pencil size={16} className="text-blue-600" />
                  //       </button>
                  //     </Link>

                  //     {/* MANAGE */}
                  //     <Link href={`/dashboard/pages/${p.slug}`}>
                  //       <button className="bg-purple-100 p-2 rounded hover:bg-purple-200 text-sm">
                  //         Manage
                  //       </button>
                  //     </Link>

                  //     {/* DELETE */}
                  //     <button
                  //       onClick={() => handleDelete(p.id)}
                  //       className="bg-red-100 p-2 rounded hover:bg-red-200"
                  //     >
                  //       <Trash2 size={16} className="text-red-600" />
                  //     </button>
                  //   </div>
                  // </td>
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
import { Pencil, Trash2, Eye } from "lucide-react";

export default function PagesDashboard() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    setLoading(true);

    const { data } = await supabaseServer
      .from("pages")
      .select("*")
      .order("created_at", { ascending: false });

    setPages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this page?")) return;

    await supabaseServer.from("pages").delete().eq("id", id);
    fetchPages();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Pages</h1>

        <Link href="/dashboard/pages/create">
          <button className="bg-primary text-white px-4 py-2 rounded-lg">
            + New Page
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3 text-left">Page</th>
                <th className="p-3 text-left">Slug</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pages.map((p, i) => (
                <tr key={p.id} className="even:bg-gray-50">
                  <td className="p-3 text-center">{i + 1}</td>

                  <td className="p-3 flex items-center gap-3">
                    {p.hero_image && (
                      <img
                        src={p.hero_image}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}

                    <span>{p.hero_title || p.title}</span>
                  </td>

                  <td className="p-3 text-gray-500">/{p.slug}</td>

                  {/* <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <Link href={`/${p.slug}`} target="_blank">
                        <button className="bg-green-100 p-2 rounded">
                          <Eye size={16} />
                        </button>
                      </Link>

                      <Link href={`/dashboard/pages/edit/${p.slug}`}>
                        <button className="bg-blue-100 p-2 rounded">
                          <Pencil size={16} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-100 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td> */}
                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      {/* VIEW */}
                      <Link href={`/${p.slug}`} target="_blank">
                        <button className="bg-green-100 p-2 rounded hover:bg-green-200">
                          <Eye size={16} className="text-green-600" />
                        </button>
                      </Link>

                      {/* EDIT */}
                      <Link href={`/dashboard/pages/edit/${p.slug}`}>
                        <button className="bg-blue-100 p-2 rounded hover:bg-blue-200">
                          <Pencil size={16} className="text-blue-600" />
                        </button>
                      </Link>

                      {/* MANAGE */}
                      <Link href={`/dashboard/pages/${p.slug}`}>
                        <button className="bg-purple-100 p-2 rounded hover:bg-purple-200 text-sm">
                          Manage
                        </button>
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-100 p-2 rounded hover:bg-red-200"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

PagesDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;