// "use client";

// import { useState, useEffect } from "react";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useUpload } from "@/Hooks/useUpload";
// import { Trash2 } from "lucide-react";

// export default function NavbarAdmin() {
//   const { uploadFile } = useUpload();

//   const [form, setForm] = useState({});
//   const [links, setLinks] = useState([]);
//   const [newLink, setNewLink] = useState({ name: "", path: "" });

//   const [id, setId] = useState(null);

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   // ================= FETCH =================
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // const fetchData = async () => {
//   //   const { data } = await supabaseServer.from("navbar").select("*").single();

//   //   const { data: linksData } = await supabaseServer
//   //     .from("nav_links")
//   //     .select("*")
//   //     .order("order", { ascending: true });

//   //   if (data) {
//   //     setForm(data);
//   //     setId(data.id);
//   //   }

//   //   setLinks(linksData || []);
//   // };

//   const fetchData = async () => {
//     const { data } = await supabaseServer.from("navbar").select("*").single();

//     const { data: linksData, error } = await supabaseServer
//       .from("nav_links")
//       .select("*")
//       .order("order_no", { ascending: true });

//     if (error) {
//       console.error("Links fetch error:", error);
//     }

//     if (data) {
//       setForm(data);
//       setId(data.id);
//     }

//     console.log("Links Data:", linksData);

//     setLinks(linksData || []);
//   };

//   // ================= IMAGE CHANGE =================
//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//   };

//   // ================= DELETE IMAGE =================
//   const deleteImage = async () => {
//     if (!form.public_id) return;

//     await fetch("/api/delete-image", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ public_id: form.public_id }),
//     });

//     await supabaseServer
//       .from("navbar")
//       .update({ logo: null, public_id: null })
//       .eq("id", id);

//     fetchData();
//   };

//   // ================= SAVE =================
//   const handleSave = async () => {
//     try {
//       let imageUrl = form.logo;
//       let publicId = form.public_id || null;

//       // 🔥 new upload
//       if (file) {
//         // delete old first
//         if (form.public_id) {
//           await fetch("/api/delete-image", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ public_id: form.public_id }),
//           });
//         }

//         const res = await uploadFile(file, "navbar");

//         imageUrl = res.url;
//         publicId = res.public_id;
//       }

//       await supabaseServer
//         .from("navbar")
//         .update({
//           ...form,
//           logo: imageUrl,
//           public_id: publicId,
//         })
//         .eq("id", id);

//       setFile(null);
//       setPreview("");

//       fetchData();

//       alert("Navbar Updated");
//     } catch (err) {
//       console.error(err);
//       alert("Save failed");
//     }
//   };

//   // ================= LINKS =================
//   const addLink = async () => {
//     const { data } = await supabaseServer
//       .from("nav_links")
//       .insert({ ...newLink, order: links.length + 1 })
//       .select()
//       .single();

//     setLinks([...links, data]);
//     setNewLink({ name: "", path: "" });
//   };

//   const deleteLink = async (id) => {
//     await supabaseServer.from("nav_links").delete().eq("id", id);
//     setLinks(links.filter((l) => l.id !== id));
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Navbar Settings</h1>

//       {/* ================= FORM ================= */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         {/* LOGO UPLOAD */}
//         <input type="file" onChange={handleFileChange} />

//         {/* PREVIEW */}
//         {preview ? (
//           <div className="relative w-fit">
//             <img
//               src={preview}
//               className="w-40 h-20 object-contain border rounded"
//             />
//           </div>
//         ) : form.logo ? (
//           <div className="relative w-fit">
//             <img
//               src={form.logo}
//               className="w-40 h-20 object-contain border rounded"
//             />

//             <button
//               onClick={deleteImage}
//               className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
//             >
//               <Trash2 size={14} />
//             </button>
//           </div>
//         ) : null}

//         {/* TEXT FIELDS */}
//         <input
//           placeholder="Address"
//           value={form.address || ""}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="Email"
//           value={form.email || ""}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="Phone"
//           value={form.phone || ""}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//           className="border p-2 w-full"
//         />

//         {/* SOCIAL */}
//         <input
//           placeholder="Facebook"
//           value={form.facebook || ""}
//           onChange={(e) => setForm({ ...form, facebook: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="YouTube"
//           value={form.youtube || ""}
//           onChange={(e) => setForm({ ...form, youtube: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="LinkedIn"
//           value={form.linkedin || ""}
//           onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <input
//           placeholder="Instagram"
//           value={form.instagram || ""}
//           onChange={(e) => setForm({ ...form, instagram: e.target.value })}
//           className="border p-2 w-full"
//         />

//         <button
//           onClick={handleSave}
//           className="bg-primary text-white px-4 py-2 rounded"
//         >
//           Save Navbar
//         </button>
//       </div>

//       {/* ================= NAV LINKS ================= */}
//       <div className="bg-white p-6 rounded-xl border space-y-4">
//         <h2 className="font-semibold">Menu Links</h2>

//         <div className="flex gap-2">
//           <input
//             placeholder="Name"
//             value={newLink.name}
//             onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
//             className="border p-2"
//           />
//           <input
//             placeholder="Path"
//             value={newLink.path}
//             onChange={(e) => setNewLink({ ...newLink, path: e.target.value })}
//             className="border p-2"
//           />
//           <button
//             onClick={addLink}
//             className="bg-green-500 text-white px-3 rounded"
//           >
//             Add
//           </button>
//         </div>

//         {/* {links.map((l) => (
//           <div key={l.id} className="flex justify-between border p-2 rounded">
//             <span>
//               {l.name} ({l.path})
//             </span>
//             <button onClick={() => deleteLink(l.id)} className="text-red-500">
//               Delete
//             </button>
//           </div>
//         ))} */}
//         {links.map((l) => {
//           if (!l) return null;

//           return (
//             <div key={l.id} className="flex justify-between border p-2 rounded">
//               <span>
//                 {l.name} ({l.path})
//               </span>
//               <button onClick={() => deleteLink(l.id)} className="text-red-500">
//                 Delete
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// NavbarAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import {
  Trash2,
  Save,
  Plus,
  Menu,
  ImageIcon,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function NavbarAdmin() {
  const { uploadFile } = useUpload();

  const [form, setForm] = useState({});
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ name: "", path: "" });

  const [id, setId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-5";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabaseServer.from("navbar").select("*").single();

    const { data: linksData, error } = await supabaseServer
      .from("nav_links")
      .select("*")
      .order("order_no", { ascending: true });

    if (error) console.error("Links fetch error:", error);

    if (data) {
      setForm(data);
      setId(data.id);
    }

    setLinks(linksData || []);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const deleteImage = async () => {
    if (!form.public_id || !id) return;

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

    setPreview("");
    setFile(null);
    fetchData();
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      let imageUrl = form.logo;
      let publicId = form.public_id || null;

      if (file) {
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

      const payload = {
        ...form,
        logo: imageUrl,
        public_id: publicId,
      };

      if (id) {
        const { error } = await supabaseServer
          .from("navbar")
          .update(payload)
          .eq("id", id);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("navbar")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setId(data.id);
      }

      setFile(null);
      setPreview("");

      alert("Navbar Updated");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const addLink = async () => {
    if (!newLink.name || !newLink.path) return alert("Name and path required");

    const { data, error } = await supabaseServer
      .from("nav_links")
      .insert({
        name: newLink.name,
        path: newLink.path,
        order_no: links.length + 1,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Link add failed");
      return;
    }

    setLinks([...links, data]);
    setNewLink({ name: "", path: "" });
  };

  const deleteLink = async (linkId) => {
    if (!confirm("Delete this menu link?")) return;

    await supabaseServer.from("nav_links").delete().eq("id", linkId);
    setLinks(links.filter((l) => l.id !== linkId));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Navbar Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage logo, contact information, social links and menu navigation.
        </p>
      </div>

      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <ImageIcon size={20} className="text-primary" />
          Logo & Brand
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={inputClass}
        />

        {(preview || form.logo) && (
          <div className="relative w-fit rounded-2xl border bg-gray-50 p-4">
            <img
              src={preview || form.logo}
              className="h-24 w-56 object-contain rounded-xl"
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
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <MapPin size={20} className="text-primary" />
          Contact Information
        </h2>

        <Input
          icon={<MapPin size={16} />}
          placeholder="Address"
          value={form.address || ""}
          onChange={(value) => setForm({ ...form, address: value })}
        />

        <Input
          icon={<Mail size={16} />}
          placeholder="Email"
          value={form.email || ""}
          onChange={(value) => setForm({ ...form, email: value })}
        />

        <Input
          icon={<Phone size={16} />}
          placeholder="Phone"
          value={form.phone || ""}
          onChange={(value) => setForm({ ...form, phone: value })}
        />
      </div>

      <div className={cardClass}>
        <h2 className="text-xl font-bold text-gray-900">Social Links</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            icon={<Facebook size={16} />}
            placeholder="Facebook URL"
            value={form.facebook || ""}
            onChange={(value) => setForm({ ...form, facebook: value })}
          />

          <Input
            icon={<Youtube size={16} />}
            placeholder="YouTube URL"
            value={form.youtube || ""}
            onChange={(value) => setForm({ ...form, youtube: value })}
          />

          <Input
            icon={<Linkedin size={16} />}
            placeholder="LinkedIn URL"
            value={form.linkedin || ""}
            onChange={(value) => setForm({ ...form, linkedin: value })}
          />

          <Input
            icon={<Instagram size={16} />}
            placeholder="Instagram URL"
            value={form.instagram || ""}
            onChange={(value) => setForm({ ...form, instagram: value })}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
      >
        <Save size={18} />
        {saving ? "Saving..." : "Save Navbar Settings"}
      </button>

      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Menu size={20} className="text-primary" />
          Menu Links
        </h2>

        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            placeholder="Menu Name"
            value={newLink.name}
            onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
            className={inputClass}
          />

          <input
            placeholder="Path"
            value={newLink.path}
            onChange={(e) => setNewLink({ ...newLink, path: e.target.value })}
            className={inputClass}
          />

          <button
            type="button"
            onClick={addLink}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white transition-all duration-500 hover:bg-secondary"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {links.map((l) => (
            <div
              key={l.id}
              className="flex items-center justify-between rounded-2xl border bg-gray-50 p-4 transition-all duration-500 hover:bg-white hover:shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-900">{l.name}</p>
                <p className="text-sm text-gray-500">{l.path}</p>
              </div>

              <button
                type="button"
                onClick={() => deleteLink(l.id)}
                className="rounded-xl bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {links.length === 0 && (
            <p className="text-center text-gray-400 py-6">
              No menu links found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ icon, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>

      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]"
      />
    </div>
  );
}

NavbarAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
