"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useCrud } from "@/Hooks/useCrud";

export default function StatsAdmin() {
  const { data, loading, createItem, deleteItem } = useCrud("stats");

  const [form, setForm] = useState({
    label: "",
    value: "",
    suffix: "",
  });

  const handleAdd = async () => {
    await createItem({
      label: form.label,
      value: Number(form.value),
      suffix: form.suffix,
    });

    setForm({ label: "", value: "", suffix: "" });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Stats</h1>

      <div className="bg-white p-6 rounded-xl border space-y-3">
        <input
          placeholder="Label"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Value (Number)"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Suffix (+, %)"
          value={form.suffix}
          onChange={(e) => setForm({ ...form, suffix: e.target.value })}
          className="border p-2 w-full"
        />

        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded flex gap-2"
        >
          <Plus size={16} /> Add Stat
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.id} className="border p-4 rounded-xl text-center">
            <h2 className="text-3xl font-bold">
              {item.value}
              {item.suffix}
            </h2>
            <p>{item.label}</p>

            <button
              onClick={() => deleteItem(item.id)}
              className="mt-3 bg-red-100 p-2 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

StatsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
