"use client";
import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function AddContactPageAdmin() {
  const [data, setData] = useState({
    hero: {
      badge: "",
      title: "",
      description: "",
    },
    stats: [
      { number: "", label: "" },
      { number: "", label: "" },
      { number: "", label: "" },
    ],
    contact_info: [
      { title: "", text: "", value: "" },
      { title: "", text: "", value: "" },
      { title: "", text: "", value: "" },
    ],
    map_url: "",
  });

  const [loading, setLoading] = useState(false);

  // 📥 Fetch existing data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: res } = await supabaseServer
      .from("contact_page")
      .select("*")
      .single();

    if (res) setData(res);
  };

  // 📝 Handle change
  const handleHeroChange = (field, value) => {
    setData({
      ...data,
      hero: { ...data.hero, [field]: value },
    });
  };

  const handleStatChange = (index, field, value) => {
    const updated = [...data.stats];
    updated[index][field] = value;
    setData({ ...data, stats: updated });
  };

  const handleContactChange = (index, field, value) => {
    const updated = [...data.contact_info];
    updated[index][field] = value;
    setData({ ...data, contact_info: updated });
  };

  // 💾 Save
  const handleSave = async () => {
    setLoading(true);

    const { error } = await supabaseServer.from("contact_page").upsert([data]); // 🔥 upsert = insert or update

    if (error) {
      alert("Error saving!");
      console.error(error);
    } else {
      alert("Saved successfully!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Edit Contact Page</h1>

      {/* HERO */}
      <div className="space-y-2">
        <h2 className="font-semibold">Hero Section</h2>
        <input
          placeholder="Badge"
          value={data.hero.badge}
          onChange={(e) => handleHeroChange("badge", e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="Title"
          value={data.hero.title}
          onChange={(e) => handleHeroChange("title", e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={data.hero.description}
          onChange={(e) => handleHeroChange("description", e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* STATS */}
      <div>
        <h2 className="font-semibold">Stats</h2>
        {data.stats.map((stat, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Number"
              value={stat.number}
              onChange={(e) => handleStatChange(i, "number", e.target.value)}
              className="border p-2 w-full"
            />
            <input
              placeholder="Label"
              value={stat.label}
              onChange={(e) => handleStatChange(i, "label", e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        ))}
      </div>

      {/* CONTACT INFO */}
      <div>
        <h2 className="font-semibold">Contact Info</h2>
        {data.contact_info.map((item, i) => (
          <div key={i} className="space-y-2 mb-4">
            <input
              placeholder="Title"
              value={item.title}
              onChange={(e) => handleContactChange(i, "title", e.target.value)}
              className="border p-2 w-full"
            />
            <input
              placeholder="Text"
              value={item.text}
              onChange={(e) => handleContactChange(i, "text", e.target.value)}
              className="border p-2 w-full"
            />
            <input
              placeholder="Value"
              value={item.value}
              onChange={(e) => handleContactChange(i, "value", e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        ))}
      </div>

      {/* MAP */}
      <div>
        <h2 className="font-semibold">Map URL</h2>
        <input
          value={data.map_url}
          onChange={(e) => setData({ ...data, map_url: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}


AddContactPageAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;