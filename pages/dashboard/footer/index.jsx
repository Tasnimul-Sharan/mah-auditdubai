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
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";
import OptimizedImage from "@/components/OptimizedImage";

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

  const [deleteTarget, setDeleteTarget] = useState({
    type: null,
    index: null,
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
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

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
      index: null,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabaseServer
      .from("footer")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setForm({
        ...data,
        social_links: data.social_links || [],
        quick_links: data.quick_links || [],
        services: normalizeServices(data.services || []),
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

      showModal("success", "Logo uploaded successfully. Please save footer.");
    } catch (err) {
      console.error(err);
      showModal("error", "Logo upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const requestDelete = (type, index = null) => {
    setDeleteTarget({
      type,
      index,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDelete = () => {
    const { type, index } = deleteTarget;

    if (!type) {
      showModal("error", "No delete action selected.");
      closeConfirmModal();
      return;
    }

    setConfirmModal({
      show: true,
      loading: true,
    });

    if (type === "logo") {
      setForm({
        ...form,
        logo: "",
      });

      closeConfirmModal();
      showModal("success", "Logo removed successfully. Please save footer.");
      return;
    }

    if (type === "social") {
      setForm({
        ...form,
        social_links: form.social_links.filter((_, i) => i !== index),
      });

      closeConfirmModal();
      showModal("success", "Social link removed successfully.");
      return;
    }

    if (type === "quick") {
      setForm({
        ...form,
        quick_links: form.quick_links.filter((_, i) => i !== index),
      });

      closeConfirmModal();
      showModal("success", "Quick link removed successfully.");
      return;
    }

    if (type === "service") {
      setForm({
        ...form,
        services: form.services.filter((_, i) => i !== index),
      });

      closeConfirmModal();
      showModal("success", "Service removed successfully.");
      return;
    }

    closeConfirmModal();
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

  const generateSlug = (text = "") =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const getServiceLink = (slug = "") => {
    if (!slug) return "";
    return `/services/${slug}`;
  };

  const normalizeServices = (services = []) => {
    if (!Array.isArray(services)) return [];

    return services.map((item) => {
      if (typeof item === "string") {
        const slug = generateSlug(item);

        return {
          label: item,
          slug,
          link: getServiceLink(slug),
        };
      }

      const label = item?.label || item?.title || "";
      const slug = item?.slug || generateSlug(label);

      return {
        label,
        slug,
        link: item?.link || getServiceLink(slug),
      };
    });
  };

  const addService = () => {
    setForm({
      ...form,
      services: [
        ...form.services,
        {
          label: "",
          slug: "",
          link: "",
        },
      ],
    });
  };

  const updateService = (i, field, value) => {
    const updated = [...form.services];

    const current = updated[i] || {
      label: "",
      slug: "",
      link: "",
    };

    if (field === "label") {
      const slug = generateSlug(value);

      updated[i] = {
        ...current,
        label: value,
        slug,
        link: getServiceLink(slug),
      };
    } else if (field === "slug") {
      const slug = generateSlug(value);

      updated[i] = {
        ...current,
        slug,
        link: getServiceLink(slug),
      };
    } else {
      updated[i] = {
        ...current,
        [field]: value,
      };
    }

    setForm({
      ...form,
      services: updated,
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

      showModal("success", "Footer updated successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Save failed. Please check your data and try again.");
    } finally {
      setSaving(false);
    }
  };

  const getConfirmContent = () => {
    if (deleteTarget.type === "logo") {
      return {
        title: "Delete Footer Logo?",
        message:
          "Are you sure you want to remove this footer logo? Please save footer after removing.",
        confirmText: "Delete Logo",
      };
    }

    if (deleteTarget.type === "social") {
      return {
        title: "Delete Social Link?",
        message:
          "Are you sure you want to delete this social link? This action cannot be undone.",
        confirmText: "Delete Link",
      };
    }

    if (deleteTarget.type === "quick") {
      return {
        title: "Delete Quick Link?",
        message:
          "Are you sure you want to delete this quick link? This action cannot be undone.",
        confirmText: "Delete Link",
      };
    }

    if (deleteTarget.type === "service") {
      return {
        title: "Delete Service?",
        message:
          "Are you sure you want to delete this service? This action cannot be undone.",
        confirmText: "Delete Service",
      };
    }

    return {
      title: "Are you sure?",
      message: "This action cannot be undone.",
      confirmText: "Delete",
    };
  };

  const confirmContent = getConfirmContent();

  return (
    <>
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
            <div className="relative w-fit rounded-2xl border bg-gray-50 p-4">
              <div className="relative h-24 w-56 overflow-hidden rounded-xl">
                <OptimizedImage
                  src={form.logo}
                  alt="Footer Logo"
                  fill
                  width={300}
                  sizes="224px"
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => requestDelete("logo")}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg shadow-red-200 transition-all duration-500 hover:bg-red-600"
              >
                <Trash2 size={15} />
              </button>
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

              <DeleteButton onClick={() => requestDelete("social", i)} />
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

              <DeleteButton onClick={() => requestDelete("quick", i)} />
            </div>
          ))}
        </RepeaterCard>

        <RepeaterCard
          title="Services"
          icon={<Briefcase size={20} className="text-primary" />}
          onAdd={addService}
          addLabel="Add Service"
        >
          {form.services.map((item, i) => {
            const service =
              typeof item === "string"
                ? {
                    label: item,
                    slug: generateSlug(item),
                    link: getServiceLink(generateSlug(item)),
                  }
                : item;

            return (
              <div
                key={i}
                className="grid gap-3 md:grid-cols-[1fr_220px_1fr_auto]"
              >
                <input
                  placeholder="Service Name"
                  value={service.label || ""}
                  onChange={(e) => updateService(i, "label", e.target.value)}
                  className={inputClass}
                />

                <input
                  placeholder="Auto Slug"
                  value={service.slug || ""}
                  onChange={(e) => updateService(i, "slug", e.target.value)}
                  className={`${inputClass} bg-gray-50 text-gray-500`}
                />

                <input
                  placeholder="Service Link"
                  value={service.link || ""}
                  onChange={(e) => updateService(i, "link", e.target.value)}
                  className={inputClass}
                />

                <DeleteButton onClick={() => requestDelete("service", i)} />
              </div>
            );
          })}
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
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Footer"}
        </button>
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
