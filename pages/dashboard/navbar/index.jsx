"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import { Trash2 } from "lucide-react";

export default function NavbarAdmin() {
  const { uploadFile } = useUpload();

  const [form, setForm] = useState({});
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ name: "", path: "" });

  const [id, setId] = useState(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  // ================= FETCH =================
  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   const { data } = await supabaseServer.from("navbar").select("*").single();

  //   const { data: linksData } = await supabaseServer
  //     .from("nav_links")
  //     .select("*")
  //     .order("order", { ascending: true });

  //   if (data) {
  //     setForm(data);
  //     setId(data.id);
  //   }

  //   setLinks(linksData || []);
  // };

  const fetchData = async () => {
    const { data } = await supabaseServer.from("navbar").select("*").single();

    const { data: linksData, error } = await supabaseServer
      .from("nav_links")
      .select("*")
      .order("order_no", { ascending: true });

    if (error) {
      console.error("Links fetch error:", error);
    }

    if (data) {
      setForm(data);
      setId(data.id);
    }

    console.log("Links Data:", linksData);

    setLinks(linksData || []);
  };

  // ================= IMAGE CHANGE =================
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // ================= DELETE IMAGE =================
  const deleteImage = async () => {
    if (!form.public_id) return;

    await fetch("/api/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id: form.public_id }),
    });

    await supabaseServer
      .from("navbar")
      .update({ logo: null, public_id: null })
      .eq("id", id);

    fetchData();
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      let imageUrl = form.logo;
      let publicId = form.public_id || null;

      // 🔥 new upload
      if (file) {
        // delete old first
        if (form.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: form.public_id }),
          });
        }

        const res = await uploadFile(file, "navbar");

        imageUrl = res.url;
        publicId = res.public_id;
      }

      await supabaseServer
        .from("navbar")
        .update({
          ...form,
          logo: imageUrl,
          public_id: publicId,
        })
        .eq("id", id);

      setFile(null);
      setPreview("");

      fetchData();

      alert("Navbar Updated");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ================= LINKS =================
  const addLink = async () => {
    const { data } = await supabaseServer
      .from("nav_links")
      .insert({ ...newLink, order: links.length + 1 })
      .select()
      .single();

    setLinks([...links, data]);
    setNewLink({ name: "", path: "" });
  };

  const deleteLink = async (id) => {
    await supabaseServer.from("nav_links").delete().eq("id", id);
    setLinks(links.filter((l) => l.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Navbar Settings</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        {/* LOGO UPLOAD */}
        <input type="file" onChange={handleFileChange} />

        {/* PREVIEW */}
        {preview ? (
          <div className="relative w-fit">
            <img
              src={preview}
              className="w-40 h-20 object-contain border rounded"
            />
          </div>
        ) : form.logo ? (
          <div className="relative w-fit">
            <img
              src={form.logo}
              className="w-40 h-20 object-contain border rounded"
            />

            <button
              onClick={deleteImage}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : null}

        {/* TEXT FIELDS */}
        <input
          placeholder="Address"
          value={form.address || ""}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Email"
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Phone"
          value={form.phone || ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 w-full"
        />

        {/* SOCIAL */}
        <input
          placeholder="Facebook"
          value={form.facebook || ""}
          onChange={(e) => setForm({ ...form, facebook: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="YouTube"
          value={form.youtube || ""}
          onChange={(e) => setForm({ ...form, youtube: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="LinkedIn"
          value={form.linkedin || ""}
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Instagram"
          value={form.instagram || ""}
          onChange={(e) => setForm({ ...form, instagram: e.target.value })}
          className="border p-2 w-full"
        />

        <button
          onClick={handleSave}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Save Navbar
        </button>
      </div>

      {/* ================= NAV LINKS ================= */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <h2 className="font-semibold">Menu Links</h2>

        <div className="flex gap-2">
          <input
            placeholder="Name"
            value={newLink.name}
            onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
            className="border p-2"
          />
          <input
            placeholder="Path"
            value={newLink.path}
            onChange={(e) => setNewLink({ ...newLink, path: e.target.value })}
            className="border p-2"
          />
          <button
            onClick={addLink}
            className="bg-green-500 text-white px-3 rounded"
          >
            Add
          </button>
        </div>

        {/* {links.map((l) => (
          <div key={l.id} className="flex justify-between border p-2 rounded">
            <span>
              {l.name} ({l.path})
            </span>
            <button onClick={() => deleteLink(l.id)} className="text-red-500">
              Delete
            </button>
          </div>
        ))} */}
        {links.map((l) => {
          if (!l) return null;

          return (
            <div key={l.id} className="flex justify-between border p-2 rounded">
              <span>
                {l.name} ({l.path})
              </span>
              <button onClick={() => deleteLink(l.id)} className="text-red-500">
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

NavbarAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

