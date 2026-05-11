"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Save, Trash2, ImageIcon, Search } from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";
import OptimizedImage from "@/components/OptimizedImage";

export default function ContactPageDashboard() {
  const { uploadFile } = useUpload();

  const [rowId, setRowId] = useState(null);
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

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

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

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const fetchData = async () => {
    const { data, error } = await supabaseServer
      .from("contact_page")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setRowId(data.id);
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const requestDeleteImage = () => {
    if (!meta?.public_id || !rowId) {
      showModal("error", "No image found to delete.");
      return;
    }

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDeleteImage = async () => {
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

      const { error } = await supabaseServer
        .from("contact_page")
        .update({
          hero_image: null,
          public_id: null,
        })
        .eq("id", rowId);

      if (error) throw error;

      setMeta({
        ...meta,
        hero_image: "",
        public_id: null,
      });

      setFile(null);
      setPreview("");

      setConfirmModal({
        show: false,
        loading: false,
      });

      showModal("success", "Image deleted successfully.");
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
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_id: meta.public_id }),
          });
        }

        const res = await uploadFile(file, "contact");

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
          .from("contact_page")
          .update(payload)
          .eq("id", rowId);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("contact_page")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setRowId(data.id);
      }

      setFile(null);
      setPreview("");

      showModal("success", "Contact page data saved successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Save failed. Please check your data and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Contact Page SEO & Hero
          </h1>
          <p className="text-gray-500 mt-1">
            Manage contact page top hero image, title and SEO metadata.
          </p>
        </div>

        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <ImageIcon size={20} className="text-primary" />
            Top Hero Section
          </h2>

          <input
            placeholder="Hero Title"
            value={meta.hero_title || ""}
            onChange={(e) =>
              setMeta({
                ...meta,
                hero_title: e.target.value,
              })
            }
            className={inputClass}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={inputClass}
          />

          {(preview || meta.hero_image) && (
            <div className="relative w-fit rounded-2xl border bg-gray-50 p-2">
              <div className="relative h-44 w-72 overflow-hidden rounded-xl">
                <OptimizedImage
                  src={preview || meta.hero_image}
                  alt="Contact Hero Preview"
                  fill
                  width={700}
                  sizes="288px"
                  className="object-cover"
                  unoptimized={Boolean(preview)}
                />
              </div>

              {!preview && meta.hero_image && (
                <button
                  type="button"
                  onClick={requestDeleteImage}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-500"
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
            value={meta.meta_title || ""}
            onChange={(e) =>
              setMeta({
                ...meta,
                meta_title: e.target.value,
              })
            }
            className={inputClass}
          />

          <textarea
            placeholder="Meta Description"
            value={meta.meta_description || ""}
            onChange={(e) =>
              setMeta({
                ...meta,
                meta_description: e.target.value,
              })
            }
            rows={4}
            className={inputClass}
          />

          <textarea
            placeholder="Meta Keywords"
            value={meta.meta_keywords || ""}
            onChange={(e) =>
              setMeta({
                ...meta,
                meta_keywords: e.target.value,
              })
            }
            rows={3}
            className={inputClass}
          />

          <input
            placeholder="Meta Author"
            value={meta.meta_author || ""}
            onChange={(e) =>
              setMeta({
                ...meta,
                meta_author: e.target.value,
              })
            }
            className={inputClass}
          />

          <input
            placeholder="Meta URL"
            value={meta.meta_url || ""}
            onChange={(e) =>
              setMeta({
                ...meta,
                meta_url: e.target.value,
              })
            }
            className={inputClass}
          />

          <input
            placeholder="Meta Image URL"
            value={meta.meta_image || ""}
            onChange={(e) =>
              setMeta({
                ...meta,
                meta_image: e.target.value,
              })
            }
            className={inputClass}
          />
        </div>

        <button
          type="button"
          onClick={saveData}
          disabled={saving}
          className="sticky bottom-6 z-20 w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-2xl font-semibold shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:bg-secondary hover:-translate-y-1 transition-all duration-500 disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Contact Page"}
        </button>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Image?"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete Image"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={() => setConfirmModal({ show: false, loading: false })}
        onConfirm={confirmDeleteImage}
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

ContactPageDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
