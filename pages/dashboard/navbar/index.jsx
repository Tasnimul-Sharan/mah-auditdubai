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
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

export default function NavbarAdmin() {
  const { uploadFile } = useUpload();

  const [form, setForm] = useState({});
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ name: "", path: "" });

  const [id, setId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const [deleteType, setDeleteType] = useState(null);
  const [selectedLinkId, setSelectedLinkId] = useState(null);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    loading: false,
  });

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-5";

  const showModal = (type, message) => {
    setModal({
      show: true,
      type,
      message,
    });
  };

  const closeModal = () => {
    setModal({
      show: false,
      type: "success",
      message: "",
    });
  };

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

  const requestDeleteLogo = () => {
    if (!form.public_id || !id) {
      showModal("error", "No logo found to delete.");
      return;
    }

    setDeleteType("logo");
    setSelectedLinkId(null);
    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const requestDeleteLink = (linkId) => {
    setDeleteType("link");
    setSelectedLinkId(linkId);
    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      show: false,
      loading: false,
    });

    setDeleteType(null);
    setSelectedLinkId(null);
  };

  const confirmDelete = async () => {
    if (deleteType === "logo") {
      await confirmDeleteLogo();
      return;
    }

    if (deleteType === "link") {
      await confirmDeleteLink();
      return;
    }

    showModal("error", "No delete action selected.");
    closeConfirmModal();
  };

  const confirmDeleteLogo = async () => {
    if (!form.public_id || !id) {
      showModal("error", "No logo found to delete.");
      closeConfirmModal();
      return;
    }

    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: form.public_id }),
      });

      const { error } = await supabaseServer
        .from("navbar")
        .update({
          logo: null,
          public_id: null,
        })
        .eq("id", id);

      if (error) throw error;

      setForm({
        ...form,
        logo: null,
        public_id: null,
      });

      setPreview("");
      setFile(null);

      closeConfirmModal();
      showModal("success", "Logo deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Logo delete failed. Please try again.");
    }
  };

  const confirmDeleteLink = async () => {
    if (!selectedLinkId) {
      showModal("error", "No menu link selected.");
      closeConfirmModal();
      return;
    }

    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      const { error } = await supabaseServer
        .from("nav_links")
        .delete()
        .eq("id", selectedLinkId);

      if (error) throw error;

      setLinks(links.filter((l) => l.id !== selectedLinkId));

      closeConfirmModal();
      showModal("success", "Menu link deleted successfully.");
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Menu link delete failed. Please try again.");
    }
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

      showModal("success", "Navbar settings updated successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Save failed. Please check your data and try again.");
    } finally {
      setSaving(false);
    }
  };

  const addLink = async () => {
    if (!newLink.name.trim() || !newLink.path.trim()) {
      showModal("error", "Menu name and path are required.");
      return;
    }

    try {
      const { data, error } = await supabaseServer
        .from("nav_links")
        .insert({
          name: newLink.name,
          path: newLink.path,
          order_no: links.length + 1,
        })
        .select()
        .single();

      if (error) throw error;

      setLinks([...links, data]);
      setNewLink({
        name: "",
        path: "",
      });

      showModal("success", "Menu link added successfully.");
    } catch (err) {
      console.error(err);
      showModal("error", "Menu link add failed. Please try again.");
    }
  };

  return (
    <>
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
                alt="Navbar Logo"
              />

              {!preview && form.logo && (
                <button
                  type="button"
                  onClick={requestDeleteLogo}
                  className="absolute right-3 top-3 rounded-lg bg-red-500 p-2 text-white transition-all duration-500 hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              )}
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
              onChange={(e) =>
                setNewLink({
                  ...newLink,
                  name: e.target.value,
                })
              }
              className={inputClass}
            />

            <input
              placeholder="Path"
              value={newLink.path}
              onChange={(e) =>
                setNewLink({
                  ...newLink,
                  path: e.target.value,
                })
              }
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
                  onClick={() => requestDeleteLink(l.id)}
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

      <ConfirmModal
        show={confirmModal.show}
        title={deleteType === "link" ? "Delete Menu Link?" : "Delete Logo?"}
        message={
          deleteType === "link"
            ? "Are you sure you want to delete this menu link? This action cannot be undone."
            : "Are you sure you want to delete this logo? This action cannot be undone."
        }
        confirmText={deleteType === "link" ? "Delete Link" : "Delete Logo"}
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={closeConfirmModal}
        onConfirm={confirmDelete}
      />

      <StatusModal
        show={modal.show}
        type={modal.type}
        message={modal.message}
        onClose={closeModal}
      />
    </>
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
