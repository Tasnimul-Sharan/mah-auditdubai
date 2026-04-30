"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import {
  Plus,
  Save,
  Trash2,
  FileText,
  Layers,
  Megaphone,
  ImageIcon,
} from "lucide-react";
import StatusModal from "@/components/StatusModal";

export default function AddServicePage() {
  const { uploadFile } = useUpload();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    public_id: "",
    hero: {
      title: "",
      description1: "",
      description2: "",
    },
    sections: [],
    footerNote: "",
    cta: {
      title: "",
      description: "",
      buttonText: "",
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
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

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      description: "",
      image: "",
      public_id: "",
      hero: {
        title: "",
        description1: "",
        description2: "",
      },
      sections: [],
      footerNote: "",
      cta: {
        title: "",
        description: "",
        buttonText: "",
      },
    });

    setSelectedImage(null);
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);

    setForm((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const removeSelectedImage = () => {
    setForm({
      ...form,
      image: "",
      public_id: "",
    });

    setSelectedImage(null);

    showModal("success", "Selected image removed successfully.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setForm({
        ...form,
        title: value,
        slug: generateSlug(value),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleHeroChange = (field, value) => {
    setForm({
      ...form,
      hero: {
        ...form.hero,
        [field]: value,
      },
    });
  };

  const handleCtaChange = (field, value) => {
    setForm({
      ...form,
      cta: {
        ...form.cta,
        [field]: value,
      },
    });
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        {
          title: "",
          description: "",
          items: [""],
        },
      ],
    });
  };

  const updateSection = (sectionIndex, field, value) => {
    const updated = [...form.sections];

    updated[sectionIndex] = {
      ...updated[sectionIndex],
      [field]: value,
    };

    setForm({
      ...form,
      sections: updated,
    });
  };

  const removeSection = (sectionIndex) => {
    setForm({
      ...form,
      sections: form.sections.filter((_, i) => i !== sectionIndex),
    });

    showModal("success", "Section removed. Please save the service.");
  };

  const addItem = (sectionIndex) => {
    const updated = [...form.sections];

    updated[sectionIndex].items = [...(updated[sectionIndex].items || []), ""];

    setForm({
      ...form,
      sections: updated,
    });
  };

  const updateItem = (sectionIndex, itemIndex, value) => {
    const updated = [...form.sections];

    updated[sectionIndex].items[itemIndex] = value;

    setForm({
      ...form,
      sections: updated,
    });
  };

  const removeItem = (sectionIndex, itemIndex) => {
    const updated = [...form.sections];

    updated[sectionIndex].items = updated[sectionIndex].items.filter(
      (_, i) => i !== itemIndex,
    );

    setForm({
      ...form,
      sections: updated,
    });

    showModal("success", "Section item removed. Please save the service.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      showModal("error", "Service title is required.");
      return;
    }

    try {
      setSaving(true);

      let imageUrl = "";
      let publicId = null;

      if (selectedImage) {
        const res = await uploadFile(selectedImage, "services");

        imageUrl = res.url;
        publicId = res.public_id || null;
      }

      const payload = {
        slug: form.slug,
        title: form.title,
        description: form.description,
        image: imageUrl,
        public_id: publicId,
        hero: form.hero,
        sections: form.sections,
        footer_note: form.footerNote,
        cta: form.cta,
      };

      const { error } = await supabaseServer.from("services").insert([payload]);

      if (error) throw error;

      showModal("success", "Service added successfully.");
      resetForm();
    } catch (err) {
      console.error(err);
      showModal(
        "error",
        err.message || "Error adding service. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-primary" size={28} />
            Add Service
          </h1>

          <p className="text-gray-500 mt-1">
            Create service content, hero copy, sections, CTA and footer note.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <ImageIcon size={20} className="text-primary" />
              Basic Information
            </h2>

            <input
              name="title"
              placeholder="Service Title"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              value={form.slug}
              readOnly
              placeholder="Auto generated slug"
              className={`${inputClass} bg-gray-50 text-gray-500`}
            />

            <textarea
              name="description"
              placeholder="Service Description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className={inputClass}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className={inputClass}
            />

            {form.image && (
              <div className="relative w-fit rounded-2xl border bg-gray-50 p-3">
                <img
                  src={form.image}
                  alt="Service Preview"
                  className="w-72 h-44 object-cover rounded-xl"
                />

                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Layers size={20} className="text-primary" />
              Hero Content
            </h2>

            <input
              placeholder="Hero Title"
              value={form.hero.title}
              onChange={(e) => handleHeroChange("title", e.target.value)}
              className={inputClass}
            />

            <textarea
              placeholder="Hero Description 1"
              value={form.hero.description1}
              onChange={(e) => handleHeroChange("description1", e.target.value)}
              rows={3}
              className={inputClass}
            />

            <textarea
              placeholder="Hero Description 2"
              value={form.hero.description2}
              onChange={(e) => handleHeroChange("description2", e.target.value)}
              rows={3}
              className={inputClass}
            />
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <Layers size={20} className="text-primary" />
                Service Sections
              </h2>

              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
              >
                <Plus size={14} />
                Add Section
              </button>
            </div>

            {form.sections.length === 0 ? (
              <p className="rounded-2xl bg-gray-50 p-6 text-center text-gray-400">
                No sections added yet.
              </p>
            ) : (
              <div className="space-y-4">
                {form.sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="rounded-2xl border bg-gray-50 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-700">
                        Section {sectionIndex + 1}
                      </h3>

                      <button
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <input
                      placeholder="Section Title"
                      value={section.title}
                      onChange={(e) =>
                        updateSection(sectionIndex, "title", e.target.value)
                      }
                      className={inputClass}
                    />

                    <textarea
                      placeholder="Section Description"
                      value={section.description}
                      onChange={(e) =>
                        updateSection(
                          sectionIndex,
                          "description",
                          e.target.value,
                        )
                      }
                      rows={3}
                      className={inputClass}
                    />

                    {(section.items || []).map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="grid gap-3 md:grid-cols-[1fr_auto]"
                      >
                        <input
                          placeholder="Section Item"
                          value={item}
                          onChange={(e) =>
                            updateItem(sectionIndex, itemIndex, e.target.value)
                          }
                          className={inputClass}
                        />

                        <button
                          type="button"
                          onClick={() => removeItem(sectionIndex, itemIndex)}
                          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addItem(sectionIndex)}
                      className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
                    >
                      <Plus size={14} />
                      Add Item
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Megaphone size={20} className="text-primary" />
              CTA Content
            </h2>

            <input
              placeholder="CTA Title"
              value={form.cta.title}
              onChange={(e) => handleCtaChange("title", e.target.value)}
              className={inputClass}
            />

            <textarea
              placeholder="CTA Description"
              value={form.cta.description}
              onChange={(e) => handleCtaChange("description", e.target.value)}
              rows={3}
              className={inputClass}
            />

            <input
              placeholder="CTA Button Text"
              value={form.cta.buttonText}
              onChange={(e) => handleCtaChange("buttonText", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className={cardClass}>
            <h2 className="text-xl font-bold text-gray-900">Footer Note</h2>

            <textarea
              name="footerNote"
              placeholder="Footer Note"
              value={form.footerNote}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Service"}
          </button>
        </form>
      </div>

      <StatusModal
        show={modal.show}
        type={modal.type}
        message={modal.message}
        onClose={closeModal}
      />
    </>
  );
}

AddServicePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
