// // "use client";

// // import { useState } from "react";
// // import { Plus, Trash2 } from "lucide-react";
// // import AdminLayout from "@/components/AdminLayout";
// // import { useCrud } from "@/Hooks/useCrud";

// // export default function WhyChooseAdmin() {
// //   const { data, createItem, deleteItem } = useCrud("why_choose_us");

// //   const [point, setPoint] = useState("");

// //   const handleAdd = async () => {
// //     await createItem({ point });
// //     setPoint("");
// //   };

// //   return (
// //     <div className="max-w-3xl mx-auto space-y-6">
// //       <h1 className="text-2xl font-bold">Why Choose Us</h1>

// //       <div className="bg-white p-6 rounded-xl border flex gap-3">
// //         <input
// //           value={point}
// //           onChange={(e) => setPoint(e.target.value)}
// //           placeholder="Enter point"
// //           className="border p-2 w-full"
// //         />

// //         <button
// //           onClick={handleAdd}
// //           className="bg-primary text-white px-4 py-2 rounded"
// //         >
// //           <Plus size={16} />
// //         </button>
// //       </div>

// //       {data.map((item) => (
// //         <div key={item.id} className="border p-3 rounded flex justify-between">
// //           <p>{item.point}</p>

// //           <button
// //             onClick={() => deleteItem(item.id)}
// //             className="bg-red-100 p-2 rounded"
// //           >
// //             <Trash2 size={16} />
// //           </button>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // WhyChooseAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// "use client";

// import { useState } from "react";
// import { Plus, Trash2, Pencil } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { useCrud } from "@/Hooks/useCrud";

// export default function WhyChooseAdmin() {
//   const { data, createItem, updateItem, deleteItem } = useCrud("why_choose_us");

//   const [point, setPoint] = useState("");
//   const [editId, setEditId] = useState(null);

//   const handleSubmit = async () => {
//     if (!point) return;

//     if (editId) {
//       // UPDATE
//       await updateItem(editId, { point });
//       setEditId(null);
//     } else {
//       // CREATE
//       await createItem({ point });
//     }

//     setPoint("");
//   };

//   const handleEdit = (item) => {
//     setPoint(item.point);
//     setEditId(item.id);
//   };

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Why Choose Us</h1>

//       {/* FORM */}
//       <div className="bg-white p-6 rounded-xl border flex gap-3">
//         <input
//           value={point}
//           onChange={(e) => setPoint(e.target.value)}
//           placeholder="Enter point"
//           className="border p-2 w-full"
//         />

//         <button
//           onClick={handleSubmit}
//           className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <Plus size={16} />
//           {editId ? "Update" : "Add"}
//         </button>
//       </div>

//       {/* LIST */}
//       {data.map((item) => (
//         <div
//           key={item.id}
//           className="border p-3 rounded flex justify-between items-center"
//         >
//           <p>{item.point}</p>

//           <div className="flex gap-2">
//             {/* EDIT */}
//             <button
//               onClick={() => handleEdit(item)}
//               className="bg-blue-100 p-2 rounded"
//             >
//               <Pencil size={16} className="text-blue-600" />
//             </button>

//             {/* DELETE */}
//             <button
//               onClick={() => deleteItem(item.id)}
//               className="bg-red-100 p-2 rounded"
//             >
//               <Trash2 size={16} className="text-red-600" />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// WhyChooseAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Save } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";

export default function WhyChooseAdmin() {
  const { uploadFile } = useUpload();

  const [section, setSection] = useState(null);
  const [points, setPoints] = useState([]);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
  });

  const [file, setFile] = useState(null);
  const [editingPoint, setEditingPoint] = useState(null);
  const [pointText, setPointText] = useState("");

  // ================= FETCH =================
  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("why_choose_us")
      .select("*")
      .single();

    if (data) {
      setSection(data);
      setForm(data);

      const { data: pts } = await supabaseServer
        .from("why_choose_points")
        .select("*")
        .eq("why_id", data.id);

      setPoints(pts || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= SAVE SECTION =================
  const handleSave = async () => {
    let imageUrl = form.image;

    if (file) {
      imageUrl = await uploadFile(file, "why");
    }

    if (section) {
      await supabaseServer
        .from("why_choose_us")
        .update({ ...form, image: imageUrl })
        .eq("id", section.id);
    } else {
      await supabaseServer
        .from("why_choose_us")
        .insert([{ ...form, image: imageUrl }]);
    }

    fetchData();
  };

  // ================= ADD POINT =================
  const addPoint = async () => {
    if (!pointText || !section) return;

    await supabaseServer.from("why_choose_points").insert([
      {
        why_id: section.id,
        point: pointText,
      },
    ]);

    setPointText("");
    fetchData();
  };

  // ================= DELETE POINT =================
  const deletePoint = async (id) => {
    await supabaseServer.from("why_choose_points").delete().eq("id", id);
    fetchData();
  };

  // ================= EDIT POINT =================
  const updatePoint = async (id) => {
    await supabaseServer
      .from("why_choose_points")
      .update({ point: pointText })
      .eq("id", id);

    setEditingPoint(null);
    setPointText("");
    fetchData();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Why Choose Us</h1>

      {/* SECTION FORM */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        {form.image && <img src={form.image} className="w-32 rounded" />}

        <button
          onClick={handleSave}
          className="bg-primary text-white px-4 py-2 rounded flex gap-2"
        >
          <Save size={16} /> Save Section
        </button>
      </div>

      {/* ADD POINT */}
      <div className="bg-white p-4 rounded-xl border flex gap-3">
        <input
          value={pointText}
          onChange={(e) => setPointText(e.target.value)}
          placeholder="Add point"
          className="border p-2 w-full"
        />

        <button onClick={addPoint} className="bg-primary text-white px-3">
          <Plus size={16} />
        </button>
      </div>

      {/* POINT LIST */}
      {points.map((item) => (
        <div
          key={item.id}
          className="border p-3 rounded flex justify-between items-center"
        >
          {editingPoint === item.id ? (
            <>
              <input
                value={pointText}
                onChange={(e) => setPointText(e.target.value)}
                className="border p-2 w-full"
              />
              <button onClick={() => updatePoint(item.id)}>
                <Save size={16} />
              </button>
            </>
          ) : (
            <>
              <p>{item.point}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingPoint(item.id);
                    setPointText(item.point);
                  }}
                  className="bg-blue-100 p-2 rounded"
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() => deletePoint(item.id)}
                  className="bg-red-100 p-2 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

WhyChooseAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;