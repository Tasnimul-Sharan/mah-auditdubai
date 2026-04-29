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