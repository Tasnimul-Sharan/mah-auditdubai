"use client";

import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";
import {
  Plus,
  Save,
  Trash2,
  Pencil,
  X,
  Eye,
  EyeOff,
  ImageIcon,
  Layers,
  FileText,
  Settings,
  UploadCloud,
} from "lucide-react";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

export default function PageEditor({ slug }) {
  const { uploadFile } = useUpload();

  const [sections, setSections] = useState([]);
  const [types, setTypes] = useState([]);

  const [typeId, setTypeId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [singleImage, setSingleImage] = useState(null);
  const [singlePreview, setSinglePreview] = useState("");
  const [multiImages, setMultiImages] = useState([]);
  const [multiPreviews, setMultiPreviews] = useState([]);

  const [status, setStatus] = useState("active");
  const [isVisible, setIsVisible] = useState(true);
  const [bg, setBg] = useState("white");
  const [align, setAlign] = useState("left");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [visibilityLoadingId, setVisibilityLoadingId] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState({
    type: null,
    section: null,
    imageUrl: null,
  });

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
    "w-full min-h-[120px] resize-none rounded-2xl border border-border_color bg-white px-4 py-3 text-sm text-soft_black outline-none transition-all duration-500 placeholder:text-gray-400 focus:border-primary focus:shadow-[0_0_0_4px_rgba(56,182,255,0.12)]";

  const cardClass =
    "relative overflow-hidden rounded-[1.5rem] border border-border_color bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] space-y-5";

  const sectionTitleClass =
    "flex items-center gap-2 text-xl font-bold text-soft_black";

  const iconBoxClass =
    "flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary";

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

  const closeConfirmModal = () => {
    setConfirmModal({
      show: false,
      loading: false,
    });

    setDeleteTarget({
      type: null,
      section: null,
      imageUrl: null,
    });
  };

  // ================= CLOUDINARY DELETE HELPERS =================
  const getCloudinaryPublicId = (url) => {
    if (!url) return null;

    return url
      .split("/upload/")[1]
      ?.split(".")[0]
      ?.replace(/^v\d+\//, "");
  };

  const deleteCloudinaryImage = async (url) => {
    const public_id = getCloudinaryPublicId(url);

    if (!public_id) return;

    await fetch("/api/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id }),
    });
  };

  // ================= FETCH =================
  const fetchTypes = async () => {
    const { data, error } = await supabaseServer.from("types").select("*");

    if (error) {
      console.error(error);
      showModal("error", "Types fetch failed. Please try again.");
      return;
    }

    setTypes(data || []);
  };

  const fetchSections = async () => {
    const { data, error } = await supabaseServer
      .from("sections")
      .select("*, types(name, slug)")
      .eq("page_slug", slug)
      .order("position");

    if (error) {
      console.error(error);
      showModal("error", "Sections fetch failed. Please try again.");
      return;
    }

    setSections(data || []);
  };

  useEffect(() => {
    if (slug) {
      fetchTypes();
      fetchSections();
    }
  }, [slug]);

  // ================= ADD SECTION =================
  const resetAddForm = () => {
    setTypeId("");
    setTitle("");
    setText("");
    setSingleImage(null);
    setSinglePreview("");
    setMultiImages([]);
    setMultiPreviews([]);
    setStatus("active");
    setIsVisible(true);
    setBg("white");
    setAlign("left");
  };

  const handleSingleImageChange = (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setSingleImage(selected);
    setSinglePreview(URL.createObjectURL(selected));
  };

  const handleMultiImageChange = (e) => {
    const selected = Array.from(e.target.files || []);

    setMultiImages(selected);
    setMultiPreviews(selected.map((file) => URL.createObjectURL(file)));
  };

  const removeSinglePreview = () => {
    setSingleImage(null);
    setSinglePreview("");
    showModal("success", "Selected single image removed.");
  };

  const removeMultiPreview = (index) => {
    setMultiImages((prev) => prev.filter((_, i) => i !== index));
    setMultiPreviews((prev) => prev.filter((_, i) => i !== index));
    showModal("success", "Selected image removed.");
  };

  const addSection = async () => {
    if (!typeId) {
      showModal("error", "Please select a section type.");
      return;
    }

    try {
      setLoading(true);

      let singleImageUrl = null;

      if (singleImage) {
        const res = await uploadFile(singleImage, "sections");
        singleImageUrl = res.url;
      }

      const multiImageUrls = [];

      for (const file of multiImages) {
        const res = await uploadFile(file, "sections");
        multiImageUrls.push(res.url);
      }

      const content = {
        title,
        text,
        image: singleImageUrl,
        images: multiImageUrls.length ? multiImageUrls : [],
      };

      const settings = {
        bg,
        align,
      };

      const { error } = await supabaseServer.from("sections").insert([
        {
          page_slug: slug,
          type_id: typeId,
          content,
          settings,
          status,
          is_visible: isVisible,
          position: sections.length + 1,
        },
      ]);

      if (error) throw error;

      resetAddForm();
      showModal("success", "Section added successfully.");
      fetchSections();
    } catch (err) {
      console.error(err);
      showModal("error", "Failed to add section. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT MODE =================
  const startEdit = (sec) => {
    setEditingId(sec.id);

    setEditForm({
      type_id: sec.type_id,
      title: sec.content?.title || "",
      text: sec.content?.text || "",
      image: sec.content?.image || null,
      images: sec.content?.images || [],
      status: sec.status || "active",
      is_visible: sec.is_visible,
      bg: sec.settings?.bg || "white",
      align: sec.settings?.align || "left",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  // ================= UPDATE SECTION =================
  const updateSection = async (sec) => {
    if (!editForm?.type_id) {
      showModal("error", "Please select a section type.");
      return;
    }

    try {
      setUpdatingId(sec.id);

      const updatedContent = {
        title: editForm.title,
        text: editForm.text,
        image: editForm.image,
        images: editForm.images || [],
      };

      const updatedSettings = {
        bg: editForm.bg,
        align: editForm.align,
      };

      const { error } = await supabaseServer
        .from("sections")
        .update({
          type_id: editForm.type_id,
          content: updatedContent,
          settings: updatedSettings,
          status: editForm.status,
          is_visible: editForm.is_visible,
        })
        .eq("id", sec.id);

      if (error) throw error;

      setEditingId(null);
      setEditForm(null);

      showModal("success", "Section updated successfully.");
      fetchSections();
    } catch (err) {
      console.error(err);
      showModal("error", "Update failed. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  // ================= REPLACE SINGLE IMAGE =================
  const replaceSingleImage = async (sec, file) => {
    if (!file) return;

    try {
      const oldImage = editForm?.image || sec.content?.image;

      if (oldImage) {
        await deleteCloudinaryImage(oldImage);
      }

      const res = await uploadFile(file, "sections");

      setEditForm((prev) => ({
        ...prev,
        image: res.url,
      }));

      showModal("success", "Single image replaced. Please update section.");
    } catch (err) {
      console.error(err);
      showModal("error", "Image replace failed. Please try again.");
    }
  };

  // ================= ADD MULTIPLE IMAGES IN EDIT =================
  const addMoreImages = async (files) => {
    if (!files?.length) return;

    try {
      const uploadedImages = [];

      for (const file of files) {
        const res = await uploadFile(file, "sections");
        uploadedImages.push(res.url);
      }

      setEditForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedImages],
      }));

      showModal("success", "Images uploaded. Please update section.");
    } catch (err) {
      console.error(err);
      showModal("error", "Multiple image upload failed. Please try again.");
    }
  };

  // ================= DELETE REQUESTS =================
  const requestDeleteSection = (sec) => {
    setDeleteTarget({
      type: "section",
      section: sec,
      imageUrl: null,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const requestRemoveSingleImage = () => {
    if (!editForm?.image) {
      showModal("error", "No single image found to remove.");
      return;
    }

    setDeleteTarget({
      type: "singleImage",
      section: null,
      imageUrl: editForm.image,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const requestRemoveMultiImage = (imgUrl) => {
    setDeleteTarget({
      type: "multiImage",
      section: null,
      imageUrl: imgUrl,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDelete = async () => {
    if (deleteTarget.type === "section") {
      await confirmDeleteSection();
      return;
    }

    if (deleteTarget.type === "singleImage") {
      await confirmRemoveSingleImage();
      return;
    }

    if (deleteTarget.type === "multiImage") {
      await confirmRemoveMultiImage();
      return;
    }

    showModal("error", "No delete action selected.");
    closeConfirmModal();
  };

  // ================= REMOVE SINGLE IMAGE =================
  const confirmRemoveSingleImage = async () => {
    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      if (deleteTarget.imageUrl) {
        await deleteCloudinaryImage(deleteTarget.imageUrl);
      }

      setEditForm((prev) => ({
        ...prev,
        image: null,
      }));

      closeConfirmModal();
      showModal("success", "Single image removed. Please update section.");
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Image remove failed. Please try again.");
    }
  };

  // ================= REMOVE ONE MULTI IMAGE =================
  const confirmRemoveMultiImage = async () => {
    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      if (deleteTarget.imageUrl) {
        await deleteCloudinaryImage(deleteTarget.imageUrl);
      }

      setEditForm((prev) => ({
        ...prev,
        images: (prev.images || []).filter(
          (img) => img !== deleteTarget.imageUrl,
        ),
      }));

      closeConfirmModal();
      showModal("success", "Image removed. Please update section.");
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Image delete failed. Please try again.");
    }
  };

  // ================= DELETE SECTION =================
  const confirmDeleteSection = async () => {
    const sec = deleteTarget.section;

    if (!sec?.id) {
      showModal("error", "No section selected to delete.");
      closeConfirmModal();
      return;
    }

    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      const content = sec.content || {};

      if (content.image) {
        await deleteCloudinaryImage(content.image);
      }

      if (content.images?.length > 0) {
        for (const img of content.images) {
          await deleteCloudinaryImage(img);
        }
      }

      const { error } = await supabaseServer
        .from("sections")
        .delete()
        .eq("id", sec.id);

      if (error) throw error;

      if (editingId === sec.id) {
        cancelEdit();
      }

      closeConfirmModal();
      showModal("success", "Section deleted successfully.");
      fetchSections();
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Delete failed. Please try again.");
    }
  };

  // ================= TOGGLE VISIBILITY =================
  const toggleVisibility = async (sec) => {
    try {
      setVisibilityLoadingId(sec.id);

      const { error } = await supabaseServer
        .from("sections")
        .update({
          is_visible: !sec.is_visible,
        })
        .eq("id", sec.id);

      if (error) throw error;

      showModal(
        "success",
        !sec.is_visible ? "Section is now visible." : "Section is now hidden.",
      );

      fetchSections();
    } catch (err) {
      console.error(err);
      showModal("error", "Visibility update failed. Please try again.");
    } finally {
      setVisibilityLoadingId(null);
    }
  };

  const getConfirmContent = () => {
    if (deleteTarget.type === "section") {
      return {
        title: "Delete Section?",
        message:
          "Are you sure you want to delete this section and all related images? This action cannot be undone.",
        confirmText: "Delete Section",
      };
    }

    if (deleteTarget.type === "singleImage") {
      return {
        title: "Remove Image?",
        message:
          "Are you sure you want to remove this image? Please update the section after removing.",
        confirmText: "Remove Image",
      };
    }

    if (deleteTarget.type === "multiImage") {
      return {
        title: "Remove Image?",
        message:
          "Are you sure you want to remove this gallery image? Please update the section after removing.",
        confirmText: "Remove Image",
      };
    }

    return {
      title: "Are you sure?",
      message: "This action cannot be undone.",
      confirmText: "Confirm",
    };
  };

  const confirmContent = getConfirmContent();

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
                <Layers size={14} />
                Dynamic Sections
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-soft_black md:text-4xl">
                Manage Sections
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-secondary_two/70">
                Page slug:{" "}
                <span className="font-semibold text-primary">/{slug}</span>
              </p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/80 px-6 py-4 text-right shadow-[0_12px_35px_rgba(15,23,42,0.06)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Total Sections
              </p>
              <p className="mt-1 text-3xl font-extrabold text-primary">
                {sections.length}
              </p>
            </div>
          </div>
        </div>

        {/* ADD SECTION */}
        <div className={cardClass}>
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary_light to-secondary" />

          <div>
            <h2 className={sectionTitleClass}>
              <span className={iconBoxClass}>
                <Plus size={18} />
              </span>
              Add Section
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Create a new content block for this dynamic page.
            </p>
          </div>

          <select
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            className={inputClass}
          >
            <option value="">Select Type</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />

          <textarea
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={textareaClass}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border_color bg-background/60 p-4">
              <p className="mb-3 text-sm font-bold text-soft_black">
                Single Image
              </p>

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-primary/40 bg-white px-4 py-7 text-center transition hover:bg-primary/5">
                <UploadCloud className="mb-2 text-primary" size={28} />
                <span className="text-sm font-semibold text-soft_black">
                  Upload Single Image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSingleImageChange}
                  className="hidden"
                />
              </label>

              {singlePreview && (
                <div className="relative mt-4 w-fit rounded-2xl border bg-white p-2">
                  <img
                    src={singlePreview}
                    className="h-32 w-52 rounded-xl object-cover"
                    alt="Single Preview"
                  />

                  <button
                    type="button"
                    onClick={removeSinglePreview}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border_color bg-background/60 p-4">
              <p className="mb-3 text-sm font-bold text-soft_black">
                Multiple Images
              </p>

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-primary/40 bg-white px-4 py-7 text-center transition hover:bg-primary/5">
                <ImageIcon className="mb-2 text-primary" size={28} />
                <span className="text-sm font-semibold text-soft_black">
                  Upload Gallery Images
                </span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultiImageChange}
                  className="hidden"
                />
              </label>

              {multiPreviews.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {multiPreviews.map((src, i) => (
                    <div
                      key={i}
                      className="relative rounded-xl border bg-white p-1"
                    >
                      <img
                        src={src}
                        className="h-20 w-24 rounded-lg object-cover"
                        alt="Gallery Preview"
                      />

                      <button
                        type="button"
                        onClick={() => removeMultiPreview(i)}
                        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className={inputClass}
            >
              <option value="white">White Background</option>
              <option value="gray">Gray Background</option>
              <option value="dark">Dark Background</option>
            </select>

            <select
              value={align}
              onChange={(e) => setAlign(e.target.value)}
              className={inputClass}
            >
              <option value="left">Left Align</option>
              <option value="center">Center Align</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>

            <label className="flex items-center justify-between rounded-2xl border border-border_color bg-white px-4 py-3 text-sm font-medium text-soft_black">
              Visible
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => setIsVisible(!isVisible)}
                className="h-4 w-4"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={addSection}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(15,23,42,0.22)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary_two disabled:opacity-60"
          >
            <Plus size={18} />
            {loading ? "Uploading..." : "Add Section"}
          </button>
        </div>

        {/* SECTION LIST */}
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-soft_black">
              Existing Sections
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit, hide/show, or delete page sections.
            </p>
          </div>

          {sections.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-border_color bg-background p-10 text-center text-gray-400">
              No section added yet.
            </div>
          ) : (
            sections.map((sec) => {
              const content = sec.content || {};
              const settings = sec.settings || {};
              const isEditing = editingId === sec.id;

              return (
                <div
                  key={sec.id}
                  className={`relative overflow-hidden rounded-[1.5rem] border border-border_color bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition-all duration-500 ${
                    !sec.is_visible ? "opacity-60" : ""
                  }`}
                >
                  {!isEditing ? (
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                            {sec.types?.name || "Section"}
                          </span>

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                            {sec.status}
                          </span>

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                            BG: {settings.bg}
                          </span>

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                            Align: {settings.align}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-soft_black">
                          {content.title || "Untitled Section"}
                        </h3>

                        {content.text && (
                          <p className="max-w-3xl text-sm leading-7 text-gray-500">
                            {content.text}
                          </p>
                        )}

                        {content.image && (
                          <img
                            src={content.image}
                            className="h-28 w-44 rounded-2xl border object-cover"
                            alt="Section"
                          />
                        )}

                        {content.images?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {content.images.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                className="h-16 w-20 rounded-xl border object-cover"
                                alt="Gallery"
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-2 md:flex-col">
                        <button
                          type="button"
                          onClick={() => startEdit(sec)}
                          className="flex items-center justify-center gap-2 rounded-xl bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-500 hover:text-white"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleVisibility(sec)}
                          disabled={visibilityLoadingId === sec.id}
                          className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:opacity-60"
                        >
                          {sec.is_visible ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                          {visibilityLoadingId === sec.id
                            ? "Updating..."
                            : sec.is_visible
                              ? "Hide"
                              : "Show"}
                        </button>

                        <button
                          type="button"
                          onClick={() => requestDeleteSection(sec)}
                          className="flex items-center justify-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="flex items-center gap-2 text-xl font-bold text-soft_black">
                          <Settings className="text-primary" size={20} />
                          Edit Section
                        </h3>

                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <select
                        value={editForm.type_id}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            type_id: e.target.value,
                          })
                        }
                        className={inputClass}
                      >
                        {types.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </select>

                      <input
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            title: e.target.value,
                          })
                        }
                        className={inputClass}
                        placeholder="Title"
                      />

                      <textarea
                        value={editForm.text}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            text: e.target.value,
                          })
                        }
                        className={textareaClass}
                        placeholder="Text"
                      />

                      <div className="rounded-2xl border border-border_color bg-background/60 p-4">
                        <p className="mb-3 text-sm font-bold text-soft_black">
                          Single Image
                        </p>

                        {editForm.image && (
                          <div className="mb-4 flex flex-wrap items-center gap-3">
                            <img
                              src={editForm.image}
                              className="h-24 w-40 rounded-xl border object-cover"
                              alt="Single"
                            />

                            <button
                              type="button"
                              onClick={requestRemoveSingleImage}
                              className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                            >
                              Remove Image
                            </button>
                          </div>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            replaceSingleImage(sec, e.target.files?.[0])
                          }
                          className={inputClass}
                        />
                      </div>

                      <div className="rounded-2xl border border-border_color bg-background/60 p-4">
                        <p className="mb-3 text-sm font-bold text-soft_black">
                          Multiple Images
                        </p>

                        {editForm.images?.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-3">
                            {editForm.images.map((img, i) => (
                              <div key={i} className="relative">
                                <img
                                  src={img}
                                  className="h-20 w-24 rounded-xl border object-cover"
                                  alt="Gallery"
                                />

                                <button
                                  type="button"
                                  onClick={() => requestRemoveMultiImage(img)}
                                  className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white"
                                >
                                  <X size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) =>
                            addMoreImages(Array.from(e.target.files || []))
                          }
                          className={inputClass}
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <select
                          value={editForm.bg}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              bg: e.target.value,
                            })
                          }
                          className={inputClass}
                        >
                          <option value="white">White Background</option>
                          <option value="gray">Gray Background</option>
                          <option value="dark">Dark Background</option>
                        </select>

                        <select
                          value={editForm.align}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              align: e.target.value,
                            })
                          }
                          className={inputClass}
                        >
                          <option value="left">Left Align</option>
                          <option value="center">Center Align</option>
                        </select>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <select
                          value={editForm.status}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              status: e.target.value,
                            })
                          }
                          className={inputClass}
                        >
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                        </select>

                        <label className="flex items-center justify-between rounded-2xl border border-border_color bg-white px-4 py-3 text-sm font-medium text-soft_black">
                          Visible
                          <input
                            type="checkbox"
                            checked={editForm.is_visible}
                            onChange={() =>
                              setEditForm({
                                ...editForm,
                                is_visible: !editForm.is_visible,
                              })
                            }
                            className="h-4 w-4"
                          />
                        </label>
                      </div>

                      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                        <button
                          type="button"
                          onClick={() => updateSection(sec)}
                          disabled={updatingId === sec.id}
                          className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-secondary disabled:opacity-60"
                        >
                          <Save size={17} />
                          {updatingId === sec.id
                            ? "Updating..."
                            : "Update Section"}
                        </button>

                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="flex items-center justify-center gap-2 rounded-2xl border border-border_color bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-background"
                        >
                          <X size={17} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title={confirmContent.title}
        message={confirmContent.message}
        confirmText={confirmContent.confirmText}
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

// SSR
export async function getServerSideProps({ params }) {
  return {
    props: {
      slug: params.slug,
    },
  };
}

PageEditor.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
