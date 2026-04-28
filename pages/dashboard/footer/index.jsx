"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import {
  Plus,
  Trash2,
  Save,
  ImageIcon,
  Info,
  Share2,
  LinkIcon,
  Briefcase,
  Copyright,
} from "lucide-react";

export default function FooterAdmin() {
  const { uploadFile } = useUpload();

  const [form, setForm] = useState({
    logo: "",
    about: "",
    phone: "",
    email: "",
    address: "",
    social_links: [],
    quick_links: [],
    services: [],
    copyright: "",
  });

  const [id, setId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabaseServer.from("footer").select("*").single();

    if (data) {
      setForm({
        ...data,
        social_links: data.social_links || [],
        quick_links: data.quick_links || [],
        services: data.services || [],
        copyright: data.copyright || "",
      });
      setId(data.id);
    }
  };

  const handleLogoUpload = async (file) => {
    if (!file) return;

    try {
      setUploading(true);

      const { url } = await uploadFile(file, "footer");

      setForm({
        ...form,
        logo: url,
      });
    } catch (err) {
      console.error(err);
      alert("Logo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const addSocial = () => {
    setForm({
      ...form,
      social_links: [...form.social_links, { type: "", url: "" }],
    });
  };

  const updateSocial = (i, field, value) => {
    const updated = [...form.social_links];
    updated[i][field] = value;
    setForm({ ...form, social_links: updated });
  };

  const deleteSocial = (i) => {
    setForm({
      ...form,
      social_links: form.social_links.filter((_, index) => index !== i),
    });
  };

  const addLink = () => {
    setForm({
      ...form,
      quick_links: [...form.quick_links, { label: "", link: "" }],
    });
  };

  const updateLink = (i, field, value) => {
    const updated = [...form.quick_links];
    updated[i][field] = value;
    setForm({ ...form, quick_links: updated });
  };

  const deleteLink = (i) => {
    setForm({
      ...form,
      quick_links: form.quick_links.filter((_, index) => index !== i),
    });
  };

  const addService = () => {
    setForm({
      ...form,
      services: [...form.services, ""],
    });
  };

  const updateService = (i, value) => {
    const updated = [...form.services];
    updated[i] = value;
    setForm({ ...form, services: updated });
  };

  const deleteService = (i) => {
    setForm({
      ...form,
      services: form.services.filter((_, index) => index !== i),
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (id) {
        const { error } = await supabaseServer
          .from("footer")
          .update(form)
          .eq("id", id);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("footer")
          .insert([form])
          .select()
          .single();

        if (error) throw error;
        setId(data.id);
      }

      alert("Footer Updated");
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
        <h1 className="text-3xl font-bold text-gray-900">Footer Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage footer logo, company info, links, services and copyright.
        </p>
      </div>

      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <ImageIcon size={20} className="text-primary" />
          Footer Logo
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleLogoUpload(e.target.files?.[0])}
          className={inputClass}
        />

        {uploading && (
          <p className="text-sm text-gray-500">Uploading logo...</p>
        )}

        {form.logo && (
          <div className="w-fit rounded-2xl border bg-gray-50 p-4">
            <img
              src={form.logo}
              className="h-24 w-56 object-contain rounded-xl"
              alt=""
            />
          </div>
        )}
      </div>

      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Info size={20} className="text-primary" />
          Basic Information
        </h2>

        <textarea
          placeholder="About"
          value={form.about || ""}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
          rows={4}
          className={inputClass}
        />

        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="Phone"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />

          <input
            placeholder="Email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />

          <input
            placeholder="Address"
            value={form.address || ""}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <RepeaterCard
        title="Social Links"
        icon={<Share2 size={20} className="text-primary" />}
        onAdd={addSocial}
        addLabel="Add Social"
      >
        {form.social_links.map((item, i) => (
          <div key={i} className="grid md:grid-cols-[220px_1fr_auto] gap-3">
            <input
              placeholder="Type e.g. facebook"
              value={item.type || ""}
              onChange={(e) => updateSocial(i, "type", e.target.value)}
              className={inputClass}
            />

            <input
              placeholder="URL"
              value={item.url || ""}
              onChange={(e) => updateSocial(i, "url", e.target.value)}
              className={inputClass}
            />

            <DeleteButton onClick={() => deleteSocial(i)} />
          </div>
        ))}
      </RepeaterCard>

      <RepeaterCard
        title="Quick Links"
        icon={<LinkIcon size={20} className="text-primary" />}
        onAdd={addLink}
        addLabel="Add Link"
      >
        {form.quick_links.map((item, i) => (
          <div key={i} className="grid md:grid-cols-[220px_1fr_auto] gap-3">
            <input
              placeholder="Label"
              value={item.label || ""}
              onChange={(e) => updateLink(i, "label", e.target.value)}
              className={inputClass}
            />

            <input
              placeholder="Link"
              value={item.link || ""}
              onChange={(e) => updateLink(i, "link", e.target.value)}
              className={inputClass}
            />

            <DeleteButton onClick={() => deleteLink(i)} />
          </div>
        ))}
      </RepeaterCard>

      <RepeaterCard
        title="Services"
        icon={<Briefcase size={20} className="text-primary" />}
        onAdd={addService}
        addLabel="Add Service"
      >
        {form.services.map((item, i) => (
          <div key={i} className="grid md:grid-cols-[1fr_auto] gap-3">
            <input
              placeholder="Service Name"
              value={item || ""}
              onChange={(e) => updateService(i, e.target.value)}
              className={inputClass}
            />

            <DeleteButton onClick={() => deleteService(i)} />
          </div>
        ))}
      </RepeaterCard>

      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Copyright size={20} className="text-primary" />
          Copyright
        </h2>

        <input
          placeholder="Copyright Text"
          value={form.copyright || ""}
          onChange={(e) => setForm({ ...form, copyright: e.target.value })}
          className={inputClass}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
      >
        <Save size={18} />
        {saving ? "Saving..." : "Save Footer"}
      </button>
    </div>
  );
}

function RepeaterCard({ title, icon, children, onAdd, addLabel }) {
  return (
    <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          {icon}
          {title}
        </h2>

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
        >
          <Plus size={14} />
          {addLabel}
        </button>
      </div>

      <div className="space-y-3">
        {children?.length ? (
          children
        ) : (
          <p className="rounded-2xl bg-gray-50 p-6 text-center text-gray-400">
            No items added yet.
          </p>
        )}
      </div>
    </div>
  );
}

function DeleteButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
    >
      <Trash2 size={16} />
    </button>
  );
}

FooterAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
