"use client";

import AdminLayout from "@/components/AdminLayout";
import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import { Pencil, Trash2, Plus } from "lucide-react";

function TypesPage() {
  const [name, setName] = useState("");
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    setLoading(true);
    const { data } = await supabaseServer
      .from("types")
      .select("*")
      .order("id", { ascending: true });

    setTypes(data || []);
    setLoading(false);
  };

  const generateSlug = (text) => text.toLowerCase().trim().replace(/\s+/g, "-");

  const handleSave = async () => {
    if (!name.trim() && !editName.trim()) {
      alert("Type name required");
      return;
    }

    // UPDATE MODE
    if (editId) {
      const { error } = await supabaseServer
        .from("types")
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
      fetchTypes();
      return;
    }

    // ADD MODE
    const { error } = await supabaseServer.from("types").insert([
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
    fetchTypes();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this type?")) return;

    await supabase.from("types").delete().eq("id", id);
    fetchTypes();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage Types</h1>

      {/* Add / Update Box */}
      <div className="bg-white p-4 rounded-xl border flex gap-3">
        <input
          type="text"
          placeholder="Enter type name..."
          className="border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
          value={editId ? editName : name}
          onChange={(e) =>
            editId ? setEditName(e.target.value) : setName(e.target.value)
          }
        />

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} />
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
      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading types...</div>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 text-left w-16 border">S/L</th>
                <th className="p-3 text-left border">Name</th>
                <th className="p-3 text-left border">Slug</th>
                <th className="p-3 text-center w-32 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {types.map((type, i) => (
                <tr
                  key={type.id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="p-3 border">{i + 1}</td>
                  <td className="p-3 border font-medium">{type.name}</td>
                  <td className="p-3 border text-gray-500">{type.slug}</td>
                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditId(type.id);
                          setEditName(type.name);
                        }}
                        className="bg-blue-100 p-2 rounded hover:bg-blue-200"
                      >
                        <Pencil size={14} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(type.id)}
                        className="bg-red-100 p-2 rounded hover:bg-red-200"
                      >
                        <Trash2 size={14} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {types.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">
                    No types found
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

TypesPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default TypesPage;

// "use client";

// import AdminLayout from "@/components/AdminLayout";
// import { useEffect, useState } from "react";
// import { Pencil, Trash2, Plus } from "lucide-react";

// function TypesPage() {
//   const [name, setName] = useState("");
//   const [types, setTypes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [editId, setEditId] = useState(null);
//   const [editName, setEditName] = useState("");

//   useEffect(() => {
//     fetchTypes();
//   }, []);

//   const fetchTypes = async () => {
//     setLoading(true);
//     const res = await fetch("/api/types");
//     const data = await res.json();
//     setTypes(data || []);
//     setLoading(false);
//   };

//   const generateSlug = (text) => text.toLowerCase().trim().replace(/\s+/g, "-");

//   const handleSave = async () => {
//     const value = editId ? editName : name;

//     if (!value.trim()) {
//       alert("Type name required");
//       return;
//     }

//     const res = await fetch("/api/types/save", {
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
//     fetchTypes();
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this type?")) return;

//     await fetch(`/api/types/delete?id=${id}`, {
//       method: "DELETE",
//     });

//     fetchTypes();
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Manage Types</h1>

//       <div className="bg-white p-4 rounded-xl border flex gap-3">
//         <input
//           type="text"
//           placeholder="Enter type name..."
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
//           <Plus size={16} />
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
//           <div className="p-6 text-center text-gray-500">Loading types...</div>
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
//               {types.map((type, i) => (
//                 <tr key={type.id} className="even:bg-gray-50">
//                   <td className="p-3 border">{i + 1}</td>
//                   <td className="p-3 border">{type.name}</td>
//                   <td className="p-3 border">{type.slug}</td>

//                   <td className="p-3 border">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => {
//                           setEditId(type.id);
//                           setEditName(type.name);
//                         }}
//                         className="bg-blue-100 p-2 rounded"
//                       >
//                         <Pencil size={14} />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(type.id)}
//                         className="bg-red-100 p-2 rounded"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {types.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="p-6 text-center text-gray-400">
//                     No types found
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

// TypesPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// export default TypesPage;
