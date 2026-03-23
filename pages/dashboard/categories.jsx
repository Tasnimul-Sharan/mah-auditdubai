"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);

    const { data } = await supabaseServer
      .from("categories")
      .select("*")
      .order("id", { ascending: true });

    setCategories(data || []);
    setLoading(false);
  };

  const generateSlug = (text) => text.toLowerCase().trim().replace(/\s+/g, "-");

  const handleAdd = async () => {
    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    const { data, error } = await supabaseServer.from("categories").insert([
      {
        name,
        slug: generateSlug(name),
      },
    ]);

    console.log("Insert result:", { data, error });

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;

    await supabaseServer.from("categories").delete().eq("id", id);
    fetchCategories();
  };

  const handleSave = async () => {
    if (!name.trim() && !editName.trim()) {
      alert("Category name required");
      return;
    }

    // UPDATE MODE
    if (editId) {
      const { error } = await supabaseServer
        .from("categories")
        .update({
          name: editName,
          slug: generateSlug(editName),
        })
        .eq("id", editId);

      if (error) {
        alert(error.message);
        return;
      }

      setEditId(null);
      setEditName("");
      fetchCategories();
      return;
    }

    // ADD MODE
    const { error } = await supabaseServer.from("categories").insert([
      {
        name,
        slug: generateSlug(name),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    fetchCategories();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">All Categories</h1>
      </div>

      {/* Add Category Box */}
      <div className="bg-white p-4 rounded-xl border border-border_color flex gap-4">
        <input
          type="text"
          placeholder="Enter category name..."
          className="border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          value={editId ? editName : name}
          onChange={(e) =>
            editId ? setEditName(e.target.value) : setName(e.target.value)
          }
        />

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
        >
          <Plus size={18} />
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setEditName("");
            }}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border_color overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading categories...
          </div>
        ) : (
          <table className="w-full text-sm border border-gray-200 border-collapse">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 text-left w-16 border border-gray-200">
                  S/L
                </th>
                <th className="p-3 text-left border border-gray-200">
                  Category Name
                </th>
                <th className="p-3 text-left border border-gray-200">Slug</th>
                <th className="p-3 text-center w-32 border border-gray-200">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat, i) => (
                <tr
                  key={cat.id}
                  className="even:bg-gray-50 hover:bg-blue-50 transition"
                >
                  <td className="p-3 border border-gray-200">{i + 1}</td>

                  <td className="p-3 border border-gray-200 font-medium">
                    {cat.name}
                  </td>

                  <td className="p-3 border border-gray-200 text-gray-500">
                    {cat.slug}
                  </td>

                  <td className="p-3 border border-gray-200">
                    <div className="flex justify-center gap-2">
                      {/* <button className="bg-blue-100 p-2 rounded hover:bg-blue-200">
                        <Pencil size={16} className="text-blue-600" />
                      </button> */}
                      <button
                        onClick={() => {
                          setEditId(cat.id);
                          setEditName(cat.name);
                        }}
                        className="bg-blue-100 p-2 rounded hover:bg-blue-200"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="bg-red-100 p-2 rounded hover:bg-red-200"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

CategoriesPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// export default CategoriesPage;

// "use client";

// import { useEffect, useState } from "react";
// import { Pencil, Trash2, Plus } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";

// export default function CategoriesPage() {
//   const [name, setName] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [editId, setEditId] = useState(null);
//   const [editName, setEditName] = useState("");

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     const res = await fetch("/api/categories");
//     const data = await res.json();
//     setCategories(data || []);
//     setLoading(false);
//   };

//   const generateSlug = (text) => text.toLowerCase().trim().replace(/\s+/g, "-");

//   const handleSave = async () => {
//     const value = editId ? editName : name;

//     if (!value.trim()) {
//       alert("Category name required");
//       return;
//     }

//     const res = await fetch("/api/categories/save", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: editId,
//         name: value,
//         slug: generateSlug(value),
//       }),
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       alert(result.message);
//       return;
//     }

//     setName("");
//     setEditId(null);
//     setEditName("");

//     fetchCategories();
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this category?")) return;

//     await fetch(`/api/categories/delete?id=${id}`, {
//       method: "DELETE",
//     });

//     fetchCategories();
//   };

//   return (
//     <div className="space-y-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold text-primary">All Categories</h1>

//       <div className="bg-white p-4 rounded-xl border flex gap-4">
//         <input
//           type="text"
//           placeholder="Enter category name..."
//           className="border w-full px-4 py-2 rounded-lg"
//           value={editId ? editName : name}
//           onChange={(e) =>
//             editId ? setEditName(e.target.value) : setName(e.target.value)
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
//               setEditName("");
//             }}
//             className="px-4 py-2 bg-gray-300 rounded-lg"
//           >
//             Cancel
//           </button>
//         )}
//       </div>

//       <div className="bg-white rounded-xl border overflow-hidden">
//         {loading ? (
//           <div className="p-6 text-center text-gray-500">
//             Loading categories...
//           </div>
//         ) : (
//           <table className="w-full text-sm border-collapse">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="p-3 border">S/L</th>
//                 <th className="p-3 border">Name</th>
//                 <th className="p-3 border">Slug</th>
//                 <th className="p-3 border text-center">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {categories.map((cat, i) => (
//                 <tr key={cat.id} className="even:bg-gray-50">
//                   <td className="p-3 border">{i + 1}</td>
//                   <td className="p-3 border">{cat.name}</td>
//                   <td className="p-3 border">{cat.slug}</td>

//                   <td className="p-3 border">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => {
//                           setEditId(cat.id);
//                           setEditName(cat.name);
//                         }}
//                         className="bg-blue-100 p-2 rounded"
//                       >
//                         <Pencil size={16} />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(cat.id)}
//                         className="bg-red-100 p-2 rounded"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {categories.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="p-6 text-center text-gray-400">
//                     No categories found
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

// CategoriesPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
