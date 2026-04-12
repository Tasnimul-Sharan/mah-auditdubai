


"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useCrud } from "@/Hooks/useCrud";
import {
  FaBriefcase,
  FaGlobe,
  FaUsers,
  FaAward,
  FaChartBar,
} from "react-icons/fa";

const iconOptions = [
  { name: "briefcase", icon: FaBriefcase },
  { name: "globe", icon: FaGlobe },
  { name: "users", icon: FaUsers },
  { name: "award", icon: FaAward },
  { name: "chart", icon: FaChartBar },
];

export default function StatsAdmin() {
  const { data, createItem, updateItem, deleteItem } = useCrud("stats");

  const [form, setForm] = useState({
    label: "",
    value: "",
    suffix: "",
    icon: "briefcase",
  });

  const [editingId, setEditingId] = useState(null);

  // ================= ADD / UPDATE =================
  const handleSubmit = async () => {
    if (!form.label || !form.value) {
      alert("Label and value are required");
      return;
    }

    const payload = {
      label: form.label,
      value: Number(form.value),
      suffix: form.suffix,
      icon: form.icon,
    };

    if (editingId) {
      await updateItem(editingId, payload);
      setEditingId(null);
    } else {
      await createItem(payload);
    }

    setForm({
      label: "",
      value: "",
      suffix: "",
      icon: "briefcase",
    });
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      label: item.label,
      value: item.value,
      suffix: item.suffix,
      icon: item.icon,
    });
  };

  // ================= CANCEL EDIT =================
  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      label: "",
      value: "",
      suffix: "",
      icon: "briefcase",
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Stats Section</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <input
          placeholder="Label"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Value"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Suffix (+, %, etc)"
          value={form.suffix}
          onChange={(e) => setForm({ ...form, suffix: e.target.value })}
          className="border p-3 w-full rounded"
        />

        {/* ICON SELECT */}
        <select
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="border p-3 w-full rounded"
        >
          {iconOptions.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded flex gap-2"
          >
            {editingId ? <Save size={16} /> : <Plus size={16} />}
            {editingId ? "Update Stat" : "Add Stat"}
          </button>

          {editingId && (
            <button
              onClick={cancelEdit}
              className="bg-gray-200 px-4 py-2 rounded flex gap-2"
            >
              <X size={16} /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((item) => {
          const Icon =
            iconOptions.find((i) => i.name === item.icon)?.icon || FaBriefcase;

          return (
            <div
              key={item.id}
              className="border p-5 rounded-xl bg-white flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
                  <Icon />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    {item.value}
                    {item.suffix}
                  </h2>
                  <p className="text-gray-600">{item.label}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-100 p-2 rounded"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-100 p-2 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

StatsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
