"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  Sparkles,
  ShieldCheck,
  BarChart3,
  User,
  Globe2,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

const cardClass =
  "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

const primaryBtn =
  "flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60";

const iconOptions = [
  { label: "Shield", value: "FaShieldAlt", icon: ShieldCheck },
  { label: "Chart", value: "FaChartLine", icon: BarChart3 },
  { label: "User", value: "FaUserTie", icon: User },
  { label: "Globe", value: "FaGlobe", icon: Globe2 },
];

const getIcon = (iconName) => {
  const found = iconOptions.find((item) => item.value === iconName);
  const Icon = found?.icon || ShieldCheck;
  return <Icon size={18} />;
};

export default function WhyUsAdmin() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    points: [],
  });

  const [id, setId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    const { data } = await supabaseServer.from("why_us").select("*").single();

    if (data) {
      setForm({
        title: data.title || "",
        subtitle: data.subtitle || "",
        description: data.description || "",
        points: Array.isArray(data.points) ? data.points : [],
      });
      setId(data.id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addPoint = () => {
    setForm({
      ...form,
      points: [...form.points, { text: "", icon: "FaShieldAlt" }],
    });
  };

  const updatePoint = (index, field, value) => {
    const updated = [...form.points];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm({ ...form, points: updated });
  };

  const deletePoint = (index) => {
    const updated = form.points.filter((_, i) => i !== index);
    setForm({ ...form, points: updated });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        title: form.title,
        subtitle: form.subtitle,
        description: form.description,
        points: form.points,
      };

      if (id) {
        await supabaseServer.from("why_us").update(payload).eq("id", id);
      } else {
        const { data } = await supabaseServer
          .from("why_us")
          .insert([payload])
          .select()
          .single();

        setId(data.id);
      }

      alert("Saved Successfully");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Sparkles className="text-primary" size={28} />
          Why Us Section
        </h1>

        <p className="mt-1 text-gray-500">
          Manage section content, icon cards and feature points.
        </p>
      </div>

      <div className={cardClass}>
        <h2 className="text-xl font-bold text-gray-900">Section Content</h2>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClass}
        />

        <input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className={inputClass}
        />

        <textarea
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={inputClass}
        />

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={primaryBtn}
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Section"}
        </button>
      </div>

      <div className={cardClass}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Points</h2>
            <p className="text-sm text-gray-500">
              Add premium icon-based reasons for the frontend section.
            </p>
          </div>

          <button
            type="button"
            onClick={addPoint}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary/10 px-5 py-3 font-semibold text-primary transition-all duration-500 hover:bg-primary hover:text-white"
          >
            <Plus size={16} />
            Add Point
          </button>
        </div>

        {form.points.length === 0 ? (
          <div className="rounded-2xl bg-gray-50 p-8 text-center text-gray-400">
            No points added yet.
          </div>
        ) : (
          <div className="space-y-4">
            {form.points.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-500 hover:bg-white hover:shadow-sm"
              >
                <div className="grid gap-4 md:grid-cols-[64px_1fr_220px_48px] md:items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                    {getIcon(item.icon)}
                  </div>

                  <input
                    placeholder="Point Text"
                    value={item.text || ""}
                    onChange={(e) =>
                      updatePoint(index, "text", e.target.value)
                    }
                    className={inputClass}
                  />

                  <select
                    value={item.icon || "FaShieldAlt"}
                    onChange={(e) =>
                      updatePoint(index, "icon", e.target.value)
                    }
                    className={inputClass}
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => deletePoint(index)}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-all duration-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={primaryBtn}
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}

WhyUsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;