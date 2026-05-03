"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import OptimizedImage from "@/components/OptimizedImage";
import {
  Save,
  Trash2,
  ImageIcon,
  Search,
  Layers,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

export default function AboutDashboard() {
  const { uploadFile } = useUpload();

  const [meta, setMeta] = useState({
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

  const [rowId, setRowId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    loading: false,
  });

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

  const openConfirmModal = () => {
    if (!meta?.public_id || !rowId) {
      showModal("error", "No image found to delete.");
      return;
    }

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const closeConfirmModal = () => {
    if (confirmModal.loading) return;

    setConfirmModal({
      show: false,
      loading: false,
    });
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const revokePreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };

  const fetchData = async () => {
    const { data, error } = await supabaseServer
      .from("about_page")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setMeta({
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        meta_keywords: data.meta_keywords || "",
        meta_author: data.meta_author || "",
        meta_url: data.meta_url || "",
        meta_image: data.meta_image || "",
        hero_title: data.hero_title || "",
        hero_image: data.hero_image || "",
        public_id: data.public_id || null,
      });

      setRowId(data.id);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  // ================= IMAGE =================
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const previewUrl = URL.createObjectURL(selected);

    setFile(selected);
    setPreview(previewUrl);
  };

  const deleteImage = async () => {
    if (!meta?.public_id || !rowId) {
      showModal("error", "No image found to delete.");
      setConfirmModal({
        show: false,
        loading: false,
      });
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
        body: JSON.stringify({ public_id: meta.public_id }),
      });

      await supabaseServer
        .from("about_page")
        .update({ hero_image: null, public_id: null })
        .eq("id", rowId);

      revokePreview();
      setPreview("");
      setFile(null);

      setConfirmModal({
        show: false,
        loading: false,
      });

      showModal("success", "Hero image deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);

      setConfirmModal({
        show: false,
        loading: false,
      });

      showModal("error", "Image delete failed. Please try again.");
    }
  };

  const saveData = async () => {
    try {
      setSaving(true);

      let imageUrl = meta.hero_image;
      let publicId = meta.public_id;

      if (file) {
        if (meta.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: meta.public_id }),
          });
        }

        const res = await uploadFile(file, "about");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      const payload = {
        meta_title: meta.meta_title,
        meta_description: meta.meta_description,
        meta_keywords: meta.meta_keywords,
        meta_author: meta.meta_author,
        meta_url: meta.meta_url,
        meta_image: meta.meta_image,
        hero_title: meta.hero_title,
        hero_image: imageUrl,
        public_id: publicId,
      };

      if (rowId) {
        const { error } = await supabaseServer
          .from("about_page")
          .update(payload)
          .eq("id", rowId);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("about_page")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setRowId(data.id);
      }

      revokePreview();
      setFile(null);
      setPreview("");

      showModal("success", "About page data saved successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Save failed. Please check your data and try again.");
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { name: "About Section", link: "/dashboard/about-section" },
    { name: "Why Us", link: "/dashboard/why-us" },
    { name: "Vision Mission", link: "/dashboard/vision-mission" },
    { name: "Testimonials", link: "/dashboard/testimonials" },
    { name: "FAQ", link: "/dashboard/faq" },
    { name: "Clients", link: "/dashboard/clients" },
    { name: "Team Section", link: "/dashboard/team-section" },
    { name: "Premium CTA", link: "/dashboard/premium-cta" },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
            <Layers className="text-primary" size={28} />
            About Page Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage about page hero content and SEO metadata.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <Link key={i} href={section.link}>
              <div className="group relative h-full overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.04)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.1)]">
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-primary/8 via-white to-secondary/8" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white">
                      <LayoutDashboard size={20} />
                    </div>

                    <h2 className="text-lg font-bold text-gray-900">
                      {section.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Manage {section.name} content
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-700 group-hover:bg-primary group-hover:text-white group-hover:translate-x-1">
                    <ArrowRight size={18} />
                  </div>
                </div>

                <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Edit Section
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <ImageIcon size={20} className="text-primary" />
            Hero Section
          </h2>

          <input
            placeholder="Hero Title"
            value={meta.hero_title || ""}
            onChange={(e) => setMeta({ ...meta, hero_title: e.target.value })}
            className={inputClass}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={inputClass}
          />

          {(preview || meta.hero_image) && (
            <div className="relative w-fit rounded-2xl border bg-gray-50 p-3">
              <div className="relative h-44 w-72 overflow-hidden rounded-xl">
                <OptimizedImage
                  src={preview || meta.hero_image}
                  alt={meta.hero_title || "Hero Preview"}
                  fill
                  width={288}
                  sizes="288px"
                  className="object-cover"
                  unoptimized={Boolean(preview)}
                />
              </div>

              {!preview && meta.hero_image && (
                <button
                  type="button"
                  onClick={openConfirmModal}
                  className="absolute top-4 right-4 z-20 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}
        </div>

        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Search size={20} className="text-primary" />
            SEO Meta
          </h2>

          <input
            placeholder="Meta Title"
            value={meta.meta_title}
            onChange={(e) => setMeta({ ...meta, meta_title: e.target.value })}
            className={inputClass}
          />

          <textarea
            placeholder="Meta Description"
            value={meta.meta_description}
            onChange={(e) =>
              setMeta({ ...meta, meta_description: e.target.value })
            }
            rows={4}
            className={inputClass}
          />

          <textarea
            placeholder="Meta Keywords"
            value={meta.meta_keywords}
            onChange={(e) =>
              setMeta({ ...meta, meta_keywords: e.target.value })
            }
            rows={3}
            className={inputClass}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Meta Author"
              value={meta.meta_author}
              onChange={(e) =>
                setMeta({ ...meta, meta_author: e.target.value })
              }
              className={inputClass}
            />

            <input
              placeholder="Meta URL"
              value={meta.meta_url}
              onChange={(e) => setMeta({ ...meta, meta_url: e.target.value })}
              className={inputClass}
            />
          </div>

          <input
            placeholder="Meta Image"
            value={meta.meta_image}
            onChange={(e) => setMeta({ ...meta, meta_image: e.target.value })}
            className={inputClass}
          />
        </div>

        <button
          type="button"
          onClick={saveData}
          disabled={saving}
          className="sticky bottom-6 w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition disabled:opacity-60 z-40"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save About Page"}
        </button>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Hero Image?"
        message="Are you sure you want to delete this hero image? This action cannot be undone."
        confirmText="Delete Image"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={closeConfirmModal}
        onConfirm={deleteImage}
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

AboutDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
