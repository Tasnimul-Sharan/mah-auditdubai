"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  BarChart3,
  BriefcaseBusiness,
  Globe2,
  Users,
  Award,
  ChartNoAxesColumn,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useCrud } from "@/Hooks/useCrud";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

const cardClass =
  "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

const primaryBtn =
  "flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary";

const iconOptions = [
  { name: "briefcase", label: "Briefcase", icon: BriefcaseBusiness },
  { name: "globe", label: "Globe", icon: Globe2 },
  { name: "users", label: "Users", icon: Users },
  { name: "award", label: "Award", icon: Award },
  { name: "chart", label: "Chart", icon: ChartNoAxesColumn },
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

  const resetForm = () => {
    setEditingId(null);
    setForm({
      label: "",
      value: "",
      suffix: "",
      icon: "briefcase",
    });
  };

  const handleSubmit = async () => {
    if (!form.label.trim() || !form.value) {
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
    } else {
      await createItem(payload);
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      label: item.label || "",
      value: item.value || "",
      suffix: item.suffix || "",
      icon: item.icon || "briefcase",
    });
  };

  const getIcon = (name) => {
    const found = iconOptions.find((item) => item.name === name);
    return found?.icon || BriefcaseBusiness;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
          <BarChart3 className="text-primary" size={30} />
          Stats Section
        </h1>

        <p className="mt-1 text-gray-500">
          Manage achievement counters, icons and labels.
        </p>
      </div>

      <div className={cardClass}>
        <h2 className="text-xl font-bold text-gray-900">
          {editingId ? "Edit Stat" : "Add Stat"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Label"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className={inputClass}
          />

          <input
            type="number"
            placeholder="Value"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_1.5fr]">
          <input
            placeholder="Suffix (+, %, etc)"
            value={form.suffix}
            onChange={(e) => setForm({ ...form, suffix: e.target.value })}
            className={inputClass}
          />

          <select
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className={inputClass}
          >
            {iconOptions.map((item) => (
              <option key={item.name} value={item.name}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <button type="button" onClick={handleSubmit} className={primaryBtn}>
            {editingId ? <Save size={18} /> : <Plus size={18} />}
            {editingId ? "Update Stat" : "Add Stat"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 font-semibold text-gray-700 transition-all duration-500 hover:bg-gray-50"
            >
              <X size={18} />
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {data?.map((item) => {
          const Icon = getIcon(item.icon);

          return (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(0,0,0,0.12)]"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

              <div className="relative flex items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary text-2xl transition-all duration-700 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    <Icon size={28} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {item.value}
                      {item.suffix}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-500 hover:bg-blue-500 hover:text-white"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-all duration-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {data?.length === 0 && (
          <div className="rounded-[1.5rem] border border-gray-100 bg-white p-10 text-center text-gray-400 md:col-span-2">
            No stats found.
          </div>
        )}
      </div>
    </div>
  );
}

StatsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
