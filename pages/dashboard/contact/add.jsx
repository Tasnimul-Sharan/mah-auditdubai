// "use client";
// import { useEffect, useState } from "react";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";

// export default function AddContactPageAdmin() {
//   const [data, setData] = useState({
//     hero: {
//       badge: "",
//       title: "",
//       description: "",
//     },
//     stats: [
//       { number: "", label: "" },
//       { number: "", label: "" },
//       { number: "", label: "" },
//     ],
//     contact_info: [
//       { title: "", text: "", value: "" },
//       { title: "", text: "", value: "" },
//       { title: "", text: "", value: "" },
//     ],
//     map_url: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // 📥 Fetch existing data
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const { data: res } = await supabaseServer
//       .from("contact_page")
//       .select("*")
//       .single();

//     if (res) setData(res);
//   };

//   // 📝 Handle change
//   const handleHeroChange = (field, value) => {
//     setData({
//       ...data,
//       hero: { ...data.hero, [field]: value },
//     });
//   };

//   const handleStatChange = (index, field, value) => {
//     const updated = [...data.stats];
//     updated[index][field] = value;
//     setData({ ...data, stats: updated });
//   };

//   const handleContactChange = (index, field, value) => {
//     const updated = [...data.contact_info];
//     updated[index][field] = value;
//     setData({ ...data, contact_info: updated });
//   };

//   // 💾 Save
//   const handleSave = async () => {
//     setLoading(true);

//     const { error } = await supabaseServer.from("contact_page").upsert([data]); // 🔥 upsert = insert or update

//     if (error) {
//       alert("Error saving!");
//       console.error(error);
//     } else {
//       alert("Saved successfully!");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <h1 className="text-xl font-bold">Edit Contact Page</h1>

//       {/* HERO */}
//       <div className="space-y-2">
//         <h2 className="font-semibold">Hero Section</h2>
//         <input
//           placeholder="Badge"
//           value={data.hero.badge}
//           onChange={(e) => handleHeroChange("badge", e.target.value)}
//           className="border p-2 w-full"
//         />
//         <input
//           placeholder="Title"
//           value={data.hero.title}
//           onChange={(e) => handleHeroChange("title", e.target.value)}
//           className="border p-2 w-full"
//         />
//         <textarea
//           placeholder="Description"
//           value={data.hero.description}
//           onChange={(e) => handleHeroChange("description", e.target.value)}
//           className="border p-2 w-full"
//         />
//       </div>

//       {/* STATS */}
//       <div>
//         <h2 className="font-semibold">Stats</h2>
//         {data.stats.map((stat, i) => (
//           <div key={i} className="flex gap-2 mb-2">
//             <input
//               placeholder="Number"
//               value={stat.number}
//               onChange={(e) => handleStatChange(i, "number", e.target.value)}
//               className="border p-2 w-full"
//             />
//             <input
//               placeholder="Label"
//               value={stat.label}
//               onChange={(e) => handleStatChange(i, "label", e.target.value)}
//               className="border p-2 w-full"
//             />
//           </div>
//         ))}
//       </div>

//       {/* CONTACT INFO */}
//       <div>
//         <h2 className="font-semibold">Contact Info</h2>
//         {data.contact_info.map((item, i) => (
//           <div key={i} className="space-y-2 mb-4">
//             <input
//               placeholder="Title"
//               value={item.title}
//               onChange={(e) => handleContactChange(i, "title", e.target.value)}
//               className="border p-2 w-full"
//             />
//             <input
//               placeholder="Text"
//               value={item.text}
//               onChange={(e) => handleContactChange(i, "text", e.target.value)}
//               className="border p-2 w-full"
//             />
//             <input
//               placeholder="Value"
//               value={item.value}
//               onChange={(e) => handleContactChange(i, "value", e.target.value)}
//               className="border p-2 w-full"
//             />
//           </div>
//         ))}
//       </div>

//       {/* MAP */}
//       <div>
//         <h2 className="font-semibold">Map URL</h2>
//         <input
//           value={data.map_url}
//           onChange={(e) => setData({ ...data, map_url: e.target.value })}
//           className="border p-2 w-full"
//         />
//       </div>

//       <button
//         onClick={handleSave}
//         className="bg-black text-white px-4 py-2 rounded"
//       >
//         {loading ? "Saving..." : "Save"}
//       </button>
//     </div>
//   );
// }

// AddContactPageAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import {
  Save,
  Trash2,
  Plus,
  Contact,
  MapPin,
  BarChart3,
  Search,
  ImageIcon,
} from "lucide-react";

export default function AddContactPageAdmin() {
  const { uploadFile } = useUpload();

  const [rowId, setRowId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

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
    contact_info: {
      form_title: "",
      form_subtitle: "",
      button_text: "",
      cards: [
        { icon: "phone", title: "", text: "", value: "" },
        { icon: "email", title: "", text: "", value: "" },
        { icon: "location", title: "", text: "", value: "" },
      ],
    },
    map_url: "",

    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_author: "",
    meta_url: "",
    meta_image: "",

    hero_title: "",
    hero_image: "",
    public_id: null,
  });

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const textareaClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const sectionTitleClass =
    "flex items-center gap-2 text-lg font-bold text-gray-900";

  useEffect(() => {
    fetchData();
  }, []);

  const normalizeData = (res) => ({
    hero: res?.hero || {
      badge: "",
      title: "",
      description: "",
    },
    stats: res?.stats || [
      { number: "", label: "" },
      { number: "", label: "" },
      { number: "", label: "" },
    ],
    contact_info:
      res?.contact_info && !Array.isArray(res.contact_info)
        ? {
            form_title: res.contact_info.form_title || "",
            form_subtitle: res.contact_info.form_subtitle || "",
            button_text: res.contact_info.button_text || "",
            cards: res.contact_info.cards || [
              { icon: "phone", title: "", text: "", value: "" },
              { icon: "email", title: "", text: "", value: "" },
              { icon: "location", title: "", text: "", value: "" },
            ],
          }
        : {
            form_title: "",
            form_subtitle: "",
            button_text: "",
            cards: Array.isArray(res?.contact_info)
              ? res.contact_info.map((item, index) => ({
                  icon:
                    index === 0 ? "phone" : index === 1 ? "email" : "location",
                  title: item.title || "",
                  text: item.text || "",
                  value: item.value || "",
                }))
              : [
                  { icon: "phone", title: "", text: "", value: "" },
                  { icon: "email", title: "", text: "", value: "" },
                  { icon: "location", title: "", text: "", value: "" },
                ],
          },
    map_url: res?.map_url || "",

    meta_title: res?.meta_title || "",
    meta_description: res?.meta_description || "",
    meta_keywords: res?.meta_keywords || "",
    meta_author: res?.meta_author || "",
    meta_url: res?.meta_url || "",
    meta_image: res?.meta_image || "",

    hero_title: res?.hero_title || "",
    hero_image: res?.hero_image || "",
    public_id: res?.public_id || null,
  });

  const fetchData = async () => {
    setFetching(true);

    const { data: res, error } = await supabaseServer
      .from("contact_page")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      console.error(error);
    }

    if (res) {
      setRowId(res.id);
      setData(normalizeData(res));
    }

    setFetching(false);
  };

  const handleHeroChange = (field, value) => {
    setData({
      ...data,
      hero: {
        ...data.hero,
        [field]: value,
      },
    });
  };

  const handleStatChange = (index, field, value) => {
    const updated = [...(data.stats || [])];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setData({
      ...data,
      stats: updated,
    });
  };

  const handleContactChange = (index, field, value) => {
    const updatedCards = [...(data.contact_info.cards || [])];

    updatedCards[index] = {
      ...updatedCards[index],
      [field]: value,
    };

    setData({
      ...data,
      contact_info: {
        ...data.contact_info,
        cards: updatedCards,
      },
    });
  };

  const handleFormInfoChange = (field, value) => {
    setData({
      ...data,
      contact_info: {
        ...data.contact_info,
        [field]: value,
      },
    });
  };

  const addStat = () => {
    setData({
      ...data,
      stats: [...(data.stats || []), { number: "", label: "" }],
    });
  };

  const removeStat = (index) => {
    setData({
      ...data,
      stats: data.stats.filter((_, i) => i !== index),
    });
  };

  const addContactCard = () => {
    setData({
      ...data,
      contact_info: {
        ...data.contact_info,
        cards: [
          ...(data.contact_info.cards || []),
          { icon: "phone", title: "", text: "", value: "" },
        ],
      },
    });
  };

  const removeContactCard = (index) => {
    setData({
      ...data,
      contact_info: {
        ...data.contact_info,
        cards: data.contact_info.cards.filter((_, i) => i !== index),
      },
    });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const deleteImage = async () => {
    if (!data?.public_id) return;

    try {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: data.public_id }),
      });

      if (rowId) {
        await supabaseServer
          .from("contact_page")
          .update({ hero_image: null, public_id: null })
          .eq("id", rowId);
      }

      setData({
        ...data,
        hero_image: "",
        public_id: null,
      });

      setPreview("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Image delete failed");
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      let imageUrl = data.hero_image;
      let publicId = data.public_id;

      if (file) {
        if (data.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: data.public_id }),
          });
        }

        const res = await uploadFile(file, "contact");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      const payload = {
        hero: data.hero,
        stats: data.stats,
        contact_info: data.contact_info,
        map_url: data.map_url,

        meta_title: data.meta_title,
        meta_description: data.meta_description,
        meta_keywords: data.meta_keywords,
        meta_author: data.meta_author,
        meta_url: data.meta_url,
        meta_image: data.meta_image,

        hero_title: data.hero_title,
        hero_image: imageUrl,
        public_id: publicId,
      };

      if (rowId) {
        const { error } = await supabaseServer
          .from("contact_page")
          .update(payload)
          .eq("id", rowId);

        if (error) throw error;
      } else {
        const { data: inserted, error } = await supabaseServer
          .from("contact_page")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setRowId(inserted.id);
      }

      setFile(null);
      setPreview("");
      alert("Saved successfully!");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Save failed!");
    }

    setLoading(false);
  };

  if (fetching) {
    return <div className="p-6 text-gray-500">Loading contact page...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Contact Page Management
        </h1>
        <p className="text-gray-500">
          Manage hero content, contact cards, map, and SEO metadata.
        </p>
      </div>

      <div className={cardClass}>
        <h2 className={sectionTitleClass}>
          <ImageIcon size={20} className="text-primary" />
          Top Page Hero
        </h2>

        <input
          placeholder="Hero Title"
          value={data.hero_title || ""}
          onChange={(e) => setData({ ...data, hero_title: e.target.value })}
          className={inputClass}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={inputClass}
        />

        {(preview || data.hero_image) && (
          <div className="relative w-fit overflow-hidden rounded-2xl border bg-gray-50 p-2">
            <img
              src={preview || data.hero_image}
              className="h-40 w-64 rounded-xl object-cover"
              alt=""
            />

            <button
              type="button"
              onClick={deleteImage}
              className="absolute right-3 top-3 rounded-lg bg-red-500 p-2 text-white transition-all duration-500 hover:bg-red-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      <div className={cardClass}>
        <h2 className={sectionTitleClass}>
          <Contact size={20} className="text-primary" />
          Contact Hero Content
        </h2>

        <input
          placeholder="Badge"
          value={data.hero.badge || ""}
          onChange={(e) => handleHeroChange("badge", e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Title"
          value={data.hero.title || ""}
          onChange={(e) => handleHeroChange("title", e.target.value)}
          className={inputClass}
        />

        <textarea
          placeholder="Description"
          value={data.hero.description || ""}
          onChange={(e) => handleHeroChange("description", e.target.value)}
          rows={4}
          className={textareaClass}
        />
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between gap-4">
          <h2 className={sectionTitleClass}>
            <BarChart3 size={20} className="text-primary" />
            Stats
          </h2>

          <button
            type="button"
            onClick={addStat}
            className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
          >
            <Plus size={14} />
            Add Stat
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {(data.stats || []).map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-gray-50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500">
                  Stat {i + 1}
                </span>

                {data.stats.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStat(i)}
                    className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              <input
                placeholder="Number"
                value={stat.number || ""}
                onChange={(e) => handleStatChange(i, "number", e.target.value)}
                className={inputClass}
              />

              <input
                placeholder="Label"
                value={stat.label || ""}
                onChange={(e) => handleStatChange(i, "label", e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between gap-4">
          <h2 className={sectionTitleClass}>
            <Contact size={20} className="text-primary" />
            Contact Info & Form
          </h2>

          <button
            type="button"
            onClick={addContactCard}
            className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
          >
            <Plus size={14} />
            Add Card
          </button>
        </div>

        <div className="rounded-2xl border bg-gray-50 p-4 space-y-4">
          <h3 className="font-semibold text-gray-700">Form Content</h3>

          <input
            placeholder="Form Title"
            value={data.contact_info.form_title || ""}
            onChange={(e) => handleFormInfoChange("form_title", e.target.value)}
            className={inputClass}
          />

          <textarea
            placeholder="Form Subtitle"
            value={data.contact_info.form_subtitle || ""}
            onChange={(e) =>
              handleFormInfoChange("form_subtitle", e.target.value)
            }
            rows={3}
            className={textareaClass}
          />

          <input
            placeholder="Button Text"
            value={data.contact_info.button_text || ""}
            onChange={(e) =>
              handleFormInfoChange("button_text", e.target.value)
            }
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {(data.contact_info.cards || []).map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-gray-50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500">
                  Contact Card {i + 1}
                </span>

                {data.contact_info.cards.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContactCard(i)}
                    className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              <select
                value={item.icon || "phone"}
                onChange={(e) => handleContactChange(i, "icon", e.target.value)}
                className={inputClass}
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="location">Location</option>
              </select>

              <input
                placeholder="Title"
                value={item.title || ""}
                onChange={(e) =>
                  handleContactChange(i, "title", e.target.value)
                }
                className={inputClass}
              />

              <input
                placeholder="Text"
                value={item.text || ""}
                onChange={(e) => handleContactChange(i, "text", e.target.value)}
                className={inputClass}
              />

              <input
                placeholder="Value"
                value={item.value || ""}
                onChange={(e) =>
                  handleContactChange(i, "value", e.target.value)
                }
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={cardClass}>
        <h2 className={sectionTitleClass}>
          <MapPin size={20} className="text-primary" />
          Map
        </h2>

        <textarea
          placeholder="Google Map Embed URL"
          value={data.map_url || ""}
          onChange={(e) => setData({ ...data, map_url: e.target.value })}
          rows={4}
          className={textareaClass}
        />
      </div>

      <div className={cardClass}>
        <h2 className={sectionTitleClass}>
          <Search size={20} className="text-primary" />
          SEO Meta
        </h2>

        <input
          placeholder="Meta Title"
          value={data.meta_title || ""}
          onChange={(e) => setData({ ...data, meta_title: e.target.value })}
          className={inputClass}
        />

        <textarea
          placeholder="Meta Description"
          value={data.meta_description || ""}
          onChange={(e) =>
            setData({ ...data, meta_description: e.target.value })
          }
          rows={3}
          className={textareaClass}
        />

        <textarea
          placeholder="Meta Keywords"
          value={data.meta_keywords || ""}
          onChange={(e) => setData({ ...data, meta_keywords: e.target.value })}
          rows={3}
          className={textareaClass}
        />

        <input
          placeholder="Meta Author"
          value={data.meta_author || ""}
          onChange={(e) => setData({ ...data, meta_author: e.target.value })}
          className={inputClass}
        />

        <input
          placeholder="Meta URL"
          value={data.meta_url || ""}
          onChange={(e) => setData({ ...data, meta_url: e.target.value })}
          className={inputClass}
        />

        <input
          placeholder="Meta Image URL"
          value={data.meta_image || ""}
          onChange={(e) => setData({ ...data, meta_image: e.target.value })}
          className={inputClass}
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
      >
        <Save size={18} />
        {loading ? "Saving..." : "Save Contact Page"}
      </button>
    </div>
  );
}

AddContactPageAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;