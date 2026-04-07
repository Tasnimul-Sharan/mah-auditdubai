// "use client";

// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useEffect, useState } from "react";

// export default function TestimonialsAdmin() {
//   const [data, setData] = useState([]);
//   const [form, setForm] = useState({ name: "", role: "", text: "" });

//   const fetchData = async () => {
//     const { data } = await supabaseServer.from("testimonials").select("*");
//     setData(data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // CREATE
//   const addItem = async () => {
//     await supabaseServer.from("testimonials").insert(form);
//     setForm({ name: "", role: "", text: "" });
//     fetchData();
//   };

//   // DELETE
//   const deleteItem = async (id) => {
//     await supabaseServer.from("testimonials").delete().eq("id", id);
//     fetchData();
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-xl font-bold">Testimonials</h1>

//       {/* ADD */}
//       <input
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />
//       <input
//         placeholder="Role"
//         value={form.role}
//         onChange={(e) => setForm({ ...form, role: e.target.value })}
//       />
//       <textarea
//         placeholder="Text"
//         value={form.text}
//         onChange={(e) => setForm({ ...form, text: e.target.value })}
//       />

//       <button onClick={addItem}>Add</button>

//       {/* LIST */}
//       {data.map((item) => (
//         <div key={item.id} className="border p-3">
//           <p>{item.name}</p>
//           <button onClick={() => deleteItem(item.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// TestimonialsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function TestimonialsAdmin() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    text: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabaseServer
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.text) {
      alert("Name & Text required");
      return;
    }

    if (editingId) {
      await supabaseServer
        .from("testimonials")
        .update(form)
        .eq("id", editingId);

      setEditingId(null);
    } else {
      await supabaseServer.from("testimonials").insert([form]);
    }

    setForm({ name: "", role: "", text: "" });
    fetchData();
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      role: item.role,
      text: item.text,
    });
    setEditingId(item.id);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;

    await supabaseServer.from("testimonials").delete().eq("id", id);
    fetchData();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Testimonials</h1>
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border space-y-4"
      >
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit Testimonial" : "Add Testimonial"}
        </h2>

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

        <button
          type="submit"
          className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-secondary transition"
        >
          <Plus size={18} />
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* ================= TABLE ================= */}
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

                  <td className="p-3 border">{item.text}</td>

                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-100 p-2 rounded hover:bg-blue-200"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </button>

                      {/* DELETE */}
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
                  <td colSpan="4" className="p-6 text-center text-gray-400">
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
