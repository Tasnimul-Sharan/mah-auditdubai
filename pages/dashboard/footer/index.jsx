"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import { Plus, Trash2 } from "lucide-react";

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
  });

  const [id, setId] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      });
      setId(data.id);
    }
  };

  // ================= LOGO UPLOAD =================
  const handleLogoUpload = async (file) => {
    setUploading(true);

    const { url } = await uploadFile(file, "footer");

    setForm({ ...form, logo: url });

    setUploading(false);
  };

  // ================= SOCIAL =================
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
    const updated = form.social_links.filter((_, index) => index !== i);
    setForm({ ...form, social_links: updated });
  };

  // ================= QUICK LINKS =================
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
    const updated = form.quick_links.filter((_, index) => index !== i);
    setForm({ ...form, quick_links: updated });
  };

  // ================= SERVICES =================
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
    const updated = form.services.filter((_, index) => index !== i);
    setForm({ ...form, services: updated });
  };

  // ================= SAVE =================
  const handleSave = async () => {
    await supabaseServer.from("footer").update(form).eq("id", id);
    alert("Footer Updated");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Footer Settings</h1>

      {/* LOGO */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <h3 className="font-semibold">Logo</h3>

        <input
          type="file"
          onChange={(e) => handleLogoUpload(e.target.files[0])}
        />

        {form.logo && (
          <img src={form.logo} className="w-40 h-20 object-contain" />
        )}
      </div>

      {/* BASIC INFO */}
      <div className="bg-white p-6 rounded-xl border space-y-3">
        <textarea
          placeholder="About"
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      {/* SOCIAL */}
      <div className="bg-white p-6 rounded-xl border space-y-3">
        <h3 className="font-semibold">Social Links</h3>

        {form.social_links.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              placeholder="type (facebook)"
              value={item.type}
              onChange={(e) => updateSocial(i, "type", e.target.value)}
              className="border p-2"
            />

            <input
              placeholder="URL"
              value={item.url}
              onChange={(e) => updateSocial(i, "url", e.target.value)}
              className="border p-2 flex-1"
            />

            <button onClick={() => deleteSocial(i)}>
              <Trash2 />
            </button>
          </div>
        ))}

        <button onClick={addSocial} className="flex gap-2">
          <Plus /> Add Social
        </button>
      </div>

      {/* QUICK LINKS */}
      <div className="bg-white p-6 rounded-xl border space-y-3">
        <h3 className="font-semibold">Quick Links</h3>

        {form.quick_links.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              placeholder="Label"
              value={item.label}
              onChange={(e) => updateLink(i, "label", e.target.value)}
              className="border p-2"
            />

            <input
              placeholder="Link"
              value={item.link}
              onChange={(e) => updateLink(i, "link", e.target.value)}
              className="border p-2 flex-1"
            />

            <button onClick={() => deleteLink(i)}>
              <Trash2 />
            </button>
          </div>
        ))}

        <button onClick={addLink} className="flex gap-2">
          <Plus /> Add Link
        </button>
      </div>

      {/* SERVICES */}
      <div className="bg-white p-6 rounded-xl border space-y-3">
        <h3 className="font-semibold">Services</h3>

        {form.services.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => updateService(i, e.target.value)}
              className="border p-2 flex-1"
            />

            <button onClick={() => deleteService(i)}>
              <Trash2 />
            </button>
          </div>
        ))}

        <button onClick={addService} className="flex gap-2">
          <Plus /> Add Service
        </button>
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        className="bg-primary text-white px-6 py-3 rounded"
      >
        Save Footer
      </button>
    </div>
  );
}

FooterAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;