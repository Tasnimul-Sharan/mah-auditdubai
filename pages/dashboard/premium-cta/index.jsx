"use client";

import { useEffect, useState } from "react";
import { Save, Megaphone } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

const cardClass =
  "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

export default function PremiumCTAAdmin() {
  const [rowId, setRowId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    button_text: "",
    button_link: "",
  });

  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("premium_cta")
      .select("*")
      .single();

    if (data) {
      setRowId(data.id);
      setForm({
        title: data.title || "",
        subtitle: data.subtitle || "",
        button_text: data.button_text || "",
        button_link: data.button_link || "",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);

      if (rowId) {
        await supabaseServer.from("premium_cta").update(form).eq("id", rowId);
      } else {
        const { data } = await supabaseServer
          .from("premium_cta")
          .insert([form])
          .select()
          .single();

        setRowId(data.id);
      }

      alert("CTA saved successfully");
      fetchData();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Megaphone className="text-primary" size={30} />
          Premium CTA
        </h1>

        <p className="mt-1 text-gray-500">
          Manage CTA title, subtitle and consultation button.
        </p>
      </div>

      <div className={cardClass}>
        <input
          placeholder="CTA Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClass}
        />

        <textarea
          rows={4}
          placeholder="CTA Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className={inputClass}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Button Text"
            value={form.button_text}
            onChange={(e) => setForm({ ...form, button_text: e.target.value })}
            className={inputClass}
          />

          <input
            placeholder="Button Link"
            value={form.button_link}
            onChange={(e) => setForm({ ...form, button_link: e.target.value })}
            className={inputClass}
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save CTA"}
        </button>
      </div>
    </div>
  );
}

PremiumCTAAdmin.getLayout = (page) => (
  <AdminLayout title="Premium CTA">{page}</AdminLayout>
);
