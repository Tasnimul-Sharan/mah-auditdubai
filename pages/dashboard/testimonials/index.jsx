// "use client";

// import { useEffect, useState } from "react";
// import { Eye, Pencil, Trash2, Plus } from "lucide-react";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";

// export default function TestimonialsAdmin() {
//   const [data, setData] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     role: "",
//     text: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH =================
//   const fetchData = async () => {
//     setLoading(true);
//     const { data } = await supabaseServer
//       .from("testimonials")
//       .select("*")
//       .order("created_at", { ascending: false });

//     setData(data || []);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // ================= ADD / UPDATE =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.text) {
//       alert("Name & Text required");
//       return;
//     }

//     if (editingId) {
//       await supabaseServer
//         .from("testimonials")
//         .update(form)
//         .eq("id", editingId);

//       setEditingId(null);
//     } else {
//       await supabaseServer.from("testimonials").insert([form]);
//     }

//     setForm({ name: "", role: "", text: "" });
//     fetchData();
//   };

//   // ================= EDIT =================
//   const handleEdit = (item) => {
//     setForm({
//       name: item.name,
//       role: item.role,
//       text: item.text,
//     });
//     setEditingId(item.id);
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!confirm("Delete this testimonial?")) return;

//     await supabaseServer.from("testimonials").delete().eq("id", id);
//     fetchData();
//   };

//   return (
//     <div className="space-y-6 max-w-6xl mx-auto">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Testimonials</h1>
//       </div>

//       {/* ================= FORM ================= */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl border space-y-4"
//       >
//         <h2 className="text-lg font-semibold">
//           {editingId ? "Edit Testimonial" : "Add Testimonial"}
//         </h2>

//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Client Name"
//           className="border p-3 w-full rounded-lg"
//         />

//         <input
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           placeholder="Client Role"
//           className="border p-3 w-full rounded-lg"
//         />

//         <textarea
//           name="text"
//           value={form.text}
//           onChange={handleChange}
//           placeholder="Testimonial Text"
//           rows={4}
//           className="border p-3 w-full rounded-lg"
//         />

//         <button
//           type="submit"
//           className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-secondary transition"
//         >
//           <Plus size={18} />
//           {editingId ? "Update" : "Add"}
//         </button>
//       </form>

//       {/* ================= TABLE ================= */}
//       <div className="bg-white rounded-xl border overflow-hidden">
//         {loading ? (
//           <div className="p-6 text-center text-gray-500">
//             Loading testimonials...
//           </div>
//         ) : (
//           <table className="w-full text-sm border border-gray-200">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="p-3 text-left border">Name</th>
//                 <th className="p-3 text-left border">Role</th>
//                 <th className="p-3 text-left border">Text</th>
//                 <th className="p-3 text-center border w-32">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.map((item) => (
//                 <tr
//                   key={item.id}
//                   className="even:bg-gray-50 hover:bg-blue-50 transition"
//                 >
//                   <td className="p-3 border font-medium">{item.name}</td>

//                   <td className="p-3 border">{item.role}</td>

//                   <td className="p-3 border">{item.text}</td>

//                   <td className="p-3 border">
//                     <div className="flex justify-center gap-2">
//                       {/* EDIT */}
//                       <button
//                         onClick={() => handleEdit(item)}
//                         className="bg-blue-100 p-2 rounded hover:bg-blue-200"
//                       >
//                         <Pencil size={16} className="text-blue-600" />
//                       </button>

//                       {/* DELETE */}
//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         className="bg-red-100 p-2 rounded hover:bg-red-200"
//                       >
//                         <Trash2 size={16} className="text-red-600" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {data.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="p-6 text-center text-gray-400">
//                     No testimonials found
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

// TestimonialsAdmin.getLayout = (page) => (
//   <AdminLayout title="Testimonials">{page}</AdminLayout>
// );

"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Save } from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function TestimonialsAdmin() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    badge: "",
    section_title: "",
    section_subtitle: "",
    name: "",
    role: "",
    text: "",
    rating: 5,
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true);

    const { data, error } = await supabaseServer
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setData(data || []);

    if (data?.length > 0 && !editingId) {
      setForm((prev) => ({
        ...prev,
        badge: data[0]?.badge || "Testimonials",
        section_title: data[0]?.section_title || "What Our Clients Say",
        section_subtitle:
          data[0]?.section_subtitle ||
          "Trusted by businesses for delivering reliable audit, compliance, and financial advisory services.",
      }));
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  // ================= RESET =================
  const resetForm = () => {
    setEditingId(null);

    setForm({
      badge: form.badge || "Testimonials",
      section_title: form.section_title || "What Our Clients Say",
      section_subtitle:
        form.section_subtitle ||
        "Trusted by businesses for delivering reliable audit, compliance, and financial advisory services.",
      name: "",
      role: "",
      text: "",
      rating: 5,
    });
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.text) {
      alert("Name & Text required");
      return;
    }

    const payload = {
      badge: form.badge,
      section_title: form.section_title,
      section_subtitle: form.section_subtitle,
      name: form.name,
      role: form.role,
      text: form.text,
      rating: form.rating,
    };

    if (editingId) {
      const { error } = await supabaseServer
        .from("testimonials")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        alert("Update failed");
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabaseServer
        .from("testimonials")
        .insert([payload]);

      if (error) {
        alert("Insert failed");
        console.error(error);
        return;
      }
    }

    resetForm();
    fetchData();
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      badge: item.badge || "",
      section_title: item.section_title || "",
      section_subtitle: item.section_subtitle || "",
      name: item.name || "",
      role: item.role || "",
      text: item.text || "",
      rating: item.rating || 5,
    });

    setEditingId(item.id);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;

    const { error } = await supabaseServer
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed");
      console.error(error);
      return;
    }

    fetchData();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Testimonials</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border space-y-4"
      >
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit Testimonial" : "Add Testimonial"}
        </h2>

        <div className="border rounded-xl p-4 space-y-4 bg-gray-50">
          <h3 className="font-semibold text-sm">Section Heading</h3>

          <input
            name="badge"
            value={form.badge}
            onChange={handleChange}
            placeholder="Badge Text"
            className="border p-3 w-full rounded-lg"
          />

          <input
            name="section_title"
            value={form.section_title}
            onChange={handleChange}
            placeholder="Section Title"
            className="border p-3 w-full rounded-lg"
          />

          <textarea
            name="section_subtitle"
            value={form.section_subtitle}
            onChange={handleChange}
            placeholder="Section Subtitle"
            rows={3}
            className="border p-3 w-full rounded-lg"
          />
        </div>

        <div className="border rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-sm">Client Testimonial</h3>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Client Name"
            className="border p-3 w-full rounded-lg"
          />

          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Client Role"
            className="border p-3 w-full rounded-lg"
          />

          <textarea
            name="text"
            value={form.text}
            onChange={handleChange}
            placeholder="Testimonial Text"
            rows={4}
            className="border p-3 w-full rounded-lg"
          />

          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          >
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-secondary transition"
          >
            {editingId ? <Save size={18} /> : <Plus size={18} />}
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading testimonials...
          </div>
        ) : (
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 text-left border">Name</th>
                <th className="p-3 text-left border">Role</th>
                <th className="p-3 text-left border">Rating</th>
                <th className="p-3 text-left border">Text</th>
                <th className="p-3 text-center border w-32">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="even:bg-gray-50 hover:bg-blue-50 transition"
                >
                  <td className="p-3 border font-medium">{item.name}</td>
                  <td className="p-3 border">{item.role}</td>
                  <td className="p-3 border">{item.rating || 5}</td>
                  <td className="p-3 border">{item.text}</td>

                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-100 p-2 rounded hover:bg-blue-200"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-100 p-2 rounded hover:bg-red-200"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No testimonials found
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

TestimonialsAdmin.getLayout = (page) => (
  <AdminLayout title="Testimonials">{page}</AdminLayout>
);