"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  ImageIcon,
  Sparkles,
  Save,
  X,
  LayoutDashboard,
  ArrowUpRight,
  MousePointerClick,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";
import { useCrud } from "@/Hooks/useCrud";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";
import OptimizedImage from "@/components/OptimizedImage";

export default function HeroSlidesAdmin() {
  const { data, loading, createItem, deleteItem, updateItem } =
    useCrud("hero_slides");

  const { uploadFile } = useUpload();

  const [form, setForm] = useState({
    subtitle: "",
    title: "",
    description: "",
    primary_button_text: "",
    primary_button_link: "",
    secondary_button_text: "",
    secondary_button_link: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);

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
    "w-full rounded-2xl border border-border_color bg-white px-4 py-3 text-sm text-soft_black outline-none transition-all duration-500 placeholder:text-gray-400 focus:border-primary focus:shadow-[0_0_0_4px_rgba(56,182,255,0.12)]";

  const textareaClass =
    "w-full min-h-[130px] resize-none rounded-2xl border border-border_color bg-white px-4 py-3 text-sm text-soft_black outline-none transition-all duration-500 placeholder:text-gray-400 focus:border-primary focus:shadow-[0_0_0_4px_rgba(56,182,255,0.12)]";

  const cardClass =
    "relative overflow-hidden rounded-[1.5rem] border border-border_color bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]";

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

  const resetForm = () => {
    setEditingId(null);
    setForm({
      subtitle: "",
      title: "",
      description: "",
      primary_button_text: "",
      primary_button_link: "",
      secondary_button_text: "",
      secondary_button_link: "",
    });
    setFile(null);
    setPreview("");
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      showModal("error", "Please write a slide title first.");
      return;
    }

    if (!editingId && !file) {
      showModal("error", "Please upload a slide image first.");
      return;
    }

    try {
      setUploading(true);

      let imageUrl = null;
      let publicId = null;

      if (file) {
        const res = await uploadFile(file, "hero");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      if (editingId) {
        await updateItem(editingId, {
          ...form,
          button_text: form.secondary_button_text,
          ...(imageUrl && { image: imageUrl }),
          ...(publicId && { public_id: publicId }),
        });

        showModal("success", "Hero slide updated successfully.");
      } else {
        await createItem({
          ...form,
          button_text: form.secondary_button_text,
          image: imageUrl,
          public_id: publicId,
        });

        showModal("success", "Hero slide added successfully.");
      }

      resetForm();
    } catch (err) {
      console.error(err);
      showModal("error", "Save failed. Please check your data and try again.");
    } finally {
      setUploading(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      subtitle: item.subtitle || "",
      title: item.title || "",
      description: item.description || "",
      primary_button_text: item.primary_button_text || "",
      primary_button_link: item.primary_button_link || "",
      secondary_button_text: item.secondary_button_text || item.button_text || "",
      secondary_button_link: item.secondary_button_link || "",
    });

    setPreview(item.image || "");
    setEditingId(item.id);
    setFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= DELETE WITH MODAL =================
  const requestDeleteSlide = (item) => {
    setSelectedDeleteItem(item);

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDeleteImage = async () => {
    if (!selectedDeleteItem) {
      showModal("error", "No slide selected to delete.");
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

      if (selectedDeleteItem.public_id) {
        await fetch("/api/delete-image", {
          method: "POST",
          body: JSON.stringify({ public_id: selectedDeleteItem.public_id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await deleteItem(selectedDeleteItem.id);

      if (editingId === selectedDeleteItem.id) {
        resetForm();
      }

      setSelectedDeleteItem(null);

      setConfirmModal({
        show: false,
        loading: false,
      });

      showModal("success", "Hero slide deleted successfully.");
    } catch (err) {
      console.error(err);

      setConfirmModal({
        show: false,
        loading: false,
      });

      showModal("error", "Delete failed. Please try again.");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-[2rem] border border-border_color bg-gradient-to-br from-white via-background to-primary/10 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Sparkles size={14} />
                Homepage Hero
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-soft_black md:text-4xl">
                Hero Slides Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-secondary_two/70">
                Add, update and manage homepage hero slider content, image,
                title, subtitle and description.
              </p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/80 px-6 py-4 text-right shadow-[0_12px_35px_rgba(15,23,42,0.06)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Total Slides
              </p>
              <p className="mt-1 text-3xl font-extrabold text-primary">
                {data?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className={cardClass}>
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary_light to-secondary" />

          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-soft_black">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <LayoutDashboard size={18} />
                </span>
                {editingId ? "Update Hero Slide" : "Create New Hero Slide"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Fill slide content and upload a hero image.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border_color bg-white px-5 py-3 text-sm font-semibold text-secondary transition hover:bg-background"
              >
                <X size={16} />
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
            <div className="space-y-4">
              <input
                placeholder="Subtitle"
                value={form.subtitle}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subtitle: e.target.value,
                  })
                }
                className={inputClass}
              />

              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className={inputClass}
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className={textareaClass}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  placeholder="Primary Button Text"
                  value={form.primary_button_text}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      primary_button_text: e.target.value,
                    })
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Primary Button Link"
                  value={form.primary_button_link}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      primary_button_link: e.target.value,
                    })
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Secondary Button Text"
                  value={form.secondary_button_text}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      secondary_button_text: e.target.value,
                    })
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Secondary Button Link"
                  value={form.secondary_button_link}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      secondary_button_link: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-primary/40 bg-primary/5 px-5 py-8 text-center transition-all duration-500 hover:bg-primary/10">
                <ImageIcon className="mb-3 text-primary" size={34} />
                <span className="text-sm font-bold text-soft_black">
                  Upload Slide Image
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  PNG, JPG, WEBP supported
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (!selected) return;

                    setFile(selected);
                    setPreview(URL.createObjectURL(selected));
                  }}
                  className="hidden"
                />
              </label>

              {preview && (
                <div className="relative overflow-hidden rounded-[1.5rem] border border-border_color bg-background p-2">
                  <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                    <OptimizedImage
                      src={preview}
                      alt="Hero Slide Preview"
                      fill
                      width={900}
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover"
                      unoptimized={preview.startsWith("blob:")}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={uploading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(15,23,42,0.22)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary_two disabled:opacity-60"
          >
            {editingId ? <Save size={18} /> : <Plus size={18} />}
            {uploading ? "Saving..." : editingId ? "Update Slide" : "Add Slide"}
          </button>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-soft_black">
                Existing Hero Slides
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage all homepage slider items.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="rounded-[1.5rem] border border-border_color bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-medium text-gray-500">Loading...</p>
            </div>
          ) : data?.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {data.map((item) => {
                const ctaItems = [
                  {
                    label: "Primary CTA",
                    text: item.primary_button_text,
                    link: item.primary_button_link,
                    className:
                      "border-primary/15 bg-primary/5 text-primary",
                  },
                  {
                    label: "Secondary CTA",
                    text: item.secondary_button_text || item.button_text,
                    link: item.secondary_button_link,
                    className:
                      "border-secondary/15 bg-secondary/5 text-secondary",
                  },
                ].filter((cta) => cta.text || cta.link);

                return (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-border_color bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.1)]"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-background">
                      <div className="relative h-56 w-full overflow-hidden">
                        <OptimizedImage
                          src={item.image || "/placeholder.jpg"}
                          alt={item.title || "Hero Slide"}
                          fill
                          width={900}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/75 via-secondary/10 to-transparent opacity-80" />

                      <div className="absolute bottom-4 left-4 right-4">
                        {item.subtitle && (
                          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary_light">
                            {item.subtitle}
                          </p>
                        )}

                        <h3 className="line-clamp-2 text-xl font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {item.description && (
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                        {item.description}
                      </p>
                    )}

                    {ctaItems.length > 0 ? (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {ctaItems.map((cta) => (
                          <div
                            key={cta.label}
                            className={`rounded-2xl border p-3 ${cta.className}`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] opacity-70">
                                <MousePointerClick size={13} />
                                {cta.label}
                              </span>
                              <ArrowUpRight size={15} />
                            </div>

                            {cta.text && (
                              <p className="mt-2 truncate text-sm font-extrabold">
                                {cta.text}
                              </p>
                            )}

                            {cta.link && (
                              <p className="mt-1 truncate text-xs font-semibold opacity-60">
                                {cta.link}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-400">
                        No CTA buttons configured
                      </div>
                    )}

                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-secondary_two"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => requestDeleteSlide(item)}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-4 text-sm font-semibold text-red-500 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-border_color bg-background p-8 text-center">
              <p className="text-sm font-medium text-gray-500">
                No hero slide found. Add your first slide.
              </p>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Slide?"
        message="Are you sure you want to delete this hero slide? This action cannot be undone."
        confirmText="Delete Slide"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={() => {
          setConfirmModal({ show: false, loading: false });
          setSelectedDeleteItem(null);
        }}
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

HeroSlidesAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
