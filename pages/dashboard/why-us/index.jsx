// "use client";

// import { useEffect, useState } from "react";
// import { Plus, Trash2, Pencil, Save } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useUpload } from "@/Hooks/useUpload";

// export default function WhyUsAdmin() {
//   const { uploadFile } = useUpload();

//   const [section, setSection] = useState(null);
//   const [points, setPoints] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     subtitle: "",
//     description: "",
//     image: "",
//   });

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [text, setText] = useState("");
//   const [editing, setEditing] = useState(null);

//   const fetchData = async () => {
//     const { data } = await supabaseServer.from("why_us").select("*").single();

//     if (data) {
//       setSection(data);
//       setForm(data);
//       setPoints(data.points || []);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleFileChange = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;

//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   };

//   const saveSection = async () => {
//     let imageUrl = form.image;
//     let publicId = section?.public_id || null;

//     if (file) {
//       if (section?.public_id) {
//         await fetch("/api/delete-image", {
//           method: "POST",
//           body: JSON.stringify({ public_id: section.public_id }),
//         });
//       }

//       const res = await uploadFile(file, "why");
//       imageUrl = res.url;
//       publicId = res.public_id;
//     }

//     await supabaseServer.from("why_us").upsert([
//       {
//         id: section?.id,
//         ...form,
//         image: imageUrl,
//         public_id: publicId,
//         points,
//       },
//     ]);

//     setPreview("");
//     setFile(null);
//     fetchData();
//   };

//   const addItem = () => {
//     if (!text) return;
//     setPoints([...points, text]);
//     setText("");
//   };

//   const deleteItem = (i) => {
//     setPoints(points.filter((_, index) => index !== i));
//   };

//   const updateItem = (i) => {
//     const updated = [...points];
//     updated[i] = text;
//     setPoints(updated);
//     setEditing(null);
//     setText("");
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Why Us</h1>

//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="Subtitle"
//           value={form.subtitle}
//           onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="border p-2 w-full"
//         />

//         {/* <input type="file" onChange={handleFileChange} />

//         <div className="relative w-fit">
//           {(preview || form.image) && (
//             <>
//               <img
//                 src={preview || form.image}
//                 className="w-40 h-28 object-cover rounded border"
//               />
//               <button className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded">
//                 <Trash2 size={14} />
//               </button>
//             </>
//           )}
//         </div> */}

//         <div className="bg-white p-4 rounded-xl border flex gap-3">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="border p-2 w-full"
//           />
//           <button onClick={addItem} className="bg-primary text-white px-3">
//             <Plus size={16} />
//           </button>
//         </div>

//         {points.map((item, i) => (
//           <div key={i} className="flex justify-between border p-3">
//             {editing === i ? (
//               <>
//                 <input
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   className="border p-2 w-full"
//                 />
//                 <button onClick={() => updateItem(i)}>
//                   <Save size={16} />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p>{item}</p>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => {
//                       setEditing(i);
//                       setText(item);
//                     }}
//                   >
//                     <Pencil size={14} />
//                   </button>
//                   <button onClick={() => deleteItem(i)}>
//                     <Trash2 size={14} />
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}

//         <button
//           onClick={saveSection}
//           className="bg-primary text-white px-4 py-2 rounded"
//         >
//           <Save size={16} /> Save
//         </button>
//       </div>

//       {/* ITEMS */}
//       {/* <div className="bg-white p-4 rounded-xl border flex gap-3">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="border p-2 w-full"
//         />
//         <button onClick={addItem} className="bg-primary text-white px-3">
//           <Plus size={16} />
//         </button>
//       </div>

//       {points.map((item, i) => (
//         <div key={i} className="flex justify-between border p-3">
//           {editing === i ? (
//             <>
//               <input
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 className="border p-2 w-full"
//               />
//               <button onClick={() => updateItem(i)}>
//                 <Save size={16} />
//               </button>
//             </>
//           ) : (
//             <>
//               <p>{item}</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => {
//                     setEditing(i);
//                     setText(item);
//                   }}
//                 >
//                   <Pencil size={14} />
//                 </button>
//                 <button onClick={() => deleteItem(i)}>
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       ))} */}
//     </div>
//   );
// }

// WhyUsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";

export default function WhyUsAdmin() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    points: [],
  });

  const [id, setId] = useState(null);

  // ================= FETCH =================
  const fetchData = async () => {
    const { data } = await supabaseServer.from("why_us").select("*").single();

    if (data) {
      setForm({
        title: data.title || "",
        subtitle: data.subtitle || "",
        description: data.description || "",
        points: data.points || [],
      });
      setId(data.id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= ADD POINT =================
  const addPoint = () => {
    setForm({
      ...form,
      points: [...form.points, { text: "", icon: "FaShieldAlt" }],
    });
  };

  // ================= UPDATE POINT =================
  const updatePoint = (index, field, value) => {
    const updated = [...form.points];
    updated[index][field] = value;

    setForm({ ...form, points: updated });
  };

  // ================= DELETE POINT =================
  const deletePoint = (index) => {
    const updated = form.points.filter((_, i) => i !== index);
    setForm({ ...form, points: updated });
  };

  // ================= SAVE =================
  const handleSave = async () => {
    if (id) {
      await supabaseServer.from("why_us").update(form).eq("id", id);
    } else {
      const { data } = await supabaseServer
        .from("why_us")
        .insert([form])
        .select()
        .single();

      setId(data.id);
    }

    alert("Saved Successfully");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Why Us Section</h1>

      {/* SECTION INFO */}
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

        <button
          onClick={handleSave}
          className="bg-primary text-white px-4 py-2 rounded flex gap-2"
        >
          <Save size={16} /> Save Section
        </button>
      </div>

      {/* POINTS */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Points</h3>

          <button
            onClick={addPoint}
            className="bg-green-500 text-white px-3 py-2 rounded flex gap-2"
          >
            <Plus size={16} /> Add Point
          </button>
        </div>

        {form.points.map((item, index) => (
          <div key={index} className="border p-4 rounded flex flex-col gap-3">
            <input
              placeholder="Point Text"
              value={item.text}
              onChange={(e) => updatePoint(index, "text", e.target.value)}
              className="border p-2 w-full"
            />

            <select
              value={item.icon}
              onChange={(e) => updatePoint(index, "icon", e.target.value)}
              className="border p-2"
            >
              <option value="FaShieldAlt">Shield</option>
              <option value="FaChartLine">Chart</option>
              <option value="FaUserTie">User</option>
              <option value="FaGlobe">Globe</option>
            </select>

            <button
              onClick={() => deletePoint(index)}
              className="bg-red-100 text-red-600 px-3 py-2 rounded w-fit flex gap-2"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

WhyUsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// "use client";

// import { useEffect, useState } from "react";
// import { Plus, Trash2, Save } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";

// import {
//   FaShieldAlt,
//   FaChartLine,
//   FaBalanceScale,
//   FaUserTie,
//   FaGlobe,
// } from "react-icons/fa";

// const iconMap = {
//   shield: FaShieldAlt,
//   chart: FaChartLine,
//   balance: FaBalanceScale,
//   user: FaUserTie,
//   globe: FaGlobe,
// };

// const iconOptions = Object.keys(iconMap);

// export default function WhyUsAdmin() {
//   const [section, setSection] = useState(null);
//   const [points, setPoints] = useState([]);

//   const [form, setForm] = useState({
//     title: "",
//     subtitle: "",
//     description: "",
//   });

//   const [formPoint, setFormPoint] = useState({
//     icon: "shield",
//     title: "",
//     desc: "",
//   });

//   const fetchData = async () => {
//     const { data } = await supabaseServer.from("why_us").select("*").single();

//     if (data) {
//       setSection(data);
//       setForm(data);
//       setPoints(data.points || []);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const saveSection = async () => {
//     await supabaseServer.from("why_us").upsert([
//       {
//         id: section?.id,
//         ...form,
//         points,
//       },
//     ]);

//     fetchData();
//   };

//   const addItem = () => {
//     if (!formPoint.title || !formPoint.desc) return;

//     setPoints([
//       ...points,
//       {
//         ...formPoint,
//         id: Date.now().toString(),
//       },
//     ]);

//     setFormPoint({ icon: "shield", title: "", desc: "" });
//   };

//   const deleteItem = (index) => {
//     setPoints(points.filter((_, i) => i !== index));
//   };

//   // 🔥 manual reorder
//   const moveUp = (index) => {
//     if (index === 0) return;
//     const updated = [...points];
//     [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
//     setPoints(updated);
//   };

//   const moveDown = (index) => {
//     if (index === points.length - 1) return;
//     const updated = [...points];
//     [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
//     setPoints(updated);
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Why Us</h1>

//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         {/* SECTION DATA */}
//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="Subtitle"
//           value={form.subtitle}
//           onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="border p-2 w-full"
//         />

//         {/* ICON PICKER */}
//         <div className="grid grid-cols-5 gap-2">
//           {iconOptions.map((key) => {
//             const Icon = iconMap[key];

//             return (
//               <button
//                 key={key}
//                 onClick={() => setFormPoint({ ...formPoint, icon: key })}
//                 className={`p-3 border rounded ${
//                   formPoint.icon === key ? "bg-primary text-white" : ""
//                 }`}
//               >
//                 <Icon />
//               </button>
//             );
//           })}
//         </div>

//         {/* FEATURE INPUT */}
//         <input
//           placeholder="Feature Title"
//           value={formPoint.title}
//           onChange={(e) =>
//             setFormPoint({ ...formPoint, title: e.target.value })
//           }
//           className="border p-2 w-full"
//         />

//         <textarea
//           placeholder="Feature Description"
//           value={formPoint.desc}
//           onChange={(e) => setFormPoint({ ...formPoint, desc: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <button
//           onClick={addItem}
//           className="bg-primary text-white px-4 py-2 flex items-center gap-2"
//         >
//           <Plus size={16} /> Add Feature
//         </button>

//         {/* LIST */}
//         {points.map((item, i) => {
//           const Icon = iconMap[item.icon];

//           return (
//             <div key={item.id} className="border p-3 rounded space-y-1">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   {Icon && <Icon className="text-primary" />}
//                   <p className="font-semibold">{item.title}</p>
//                 </div>

//                 <div className="flex gap-2">
//                   <button onClick={() => moveUp(i)}>⬆</button>
//                   <button onClick={() => moveDown(i)}>⬇</button>
//                   <button onClick={() => deleteItem(i)}>
//                     <Trash2 size={14} />
//                   </button>
//                 </div>
//               </div>

//               <p className="text-sm text-gray-500">{item.desc}</p>
//             </div>
//           );
//         })}

//         {/* LIVE PREVIEW */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-xl">
//           <h2 className="font-semibold mb-3">Live Preview</h2>

//           <div className="grid grid-cols-2 gap-4">
//             {points.map((item, i) => {
//               const Icon = iconMap[item.icon];

//               return (
//                 <div key={i} className="bg-white p-4 rounded shadow">
//                   {Icon && <Icon className="text-primary mb-2" />}
//                   <h3 className="font-semibold">{item.title}</h3>
//                   <p className="text-sm text-gray-600">{item.desc}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* SAVE */}
//         <button
//           onClick={saveSection}
//           className="bg-primary text-white px-4 py-2 rounded"
//         >
//           <Save size={16} /> Save
//         </button>
//       </div>
//     </div>
//   );
// }

// WhyUsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
