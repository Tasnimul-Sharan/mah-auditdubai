"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  MessageCircleQuestion,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

export default function FAQAdmin() {
  const [section, setSection] = useState(null);

  const [form, setForm] = useState({
    title: "",
  });

  const [faqs, setFaqs] = useState([]);

  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

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

    setDeleteIndex(null);
  };

  const fetchData = async () => {
    const { data, error } = await supabaseServer
      .from("faq")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setSection(data);
      setForm({
        title: data.title || "",
      });
      setFaqs(data.faqs || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveSection = async () => {
    try {
      setSaving(true);

      const payload = {
        title: form.title,
        faqs,
      };

      if (section?.id) {
        const { error } = await supabaseServer
          .from("faq")
          .update(payload)
          .eq("id", section.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("faq")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setSection(data);
      }

      showModal("success", "FAQ section saved successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Save failed. Please check your data and try again.");
    } finally {
      setSaving(false);
    }
  };

  // ================= ADD =================
  const addFAQ = () => {
    if (!faqForm.question.trim() || !faqForm.answer.trim()) {
      showModal("error", "Question and answer are required.");
      return;
    }

    setFaqs([
      ...faqs,
      {
        question: faqForm.question,
        answer: faqForm.answer,
      },
    ]);

    setFaqForm({
      question: "",
      answer: "",
    });

    showModal("success", "FAQ added. Please save the section.");
  };

  // ================= UPDATE =================
  const updateFAQ = () => {
    if (editingIndex === null) return;

    if (!faqForm.question.trim() || !faqForm.answer.trim()) {
      showModal("error", "Question and answer are required.");
      return;
    }

    const updated = [...faqs];

    updated[editingIndex] = {
      question: faqForm.question,
      answer: faqForm.answer,
    };

    setFaqs(updated);
    setEditingIndex(null);
    setFaqForm({
      question: "",
      answer: "",
    });

    showModal("success", "FAQ updated. Please save the section.");
  };

  // ================= EDIT =================
  const handleEdit = (item, index) => {
    setEditingIndex(index);
    setFaqForm({
      question: item.question || "",
      answer: item.answer || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setFaqForm({
      question: "",
      answer: "",
    });
  };

  // ================= DELETE =================
  const requestDeleteFAQ = (index) => {
    setDeleteIndex(index);

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDeleteFAQ = () => {
    if (deleteIndex === null) {
      showModal("error", "No FAQ selected to delete.");
      closeConfirmModal();
      return;
    }

    setConfirmModal({
      show: true,
      loading: true,
    });

    const updated = faqs.filter((_, i) => i !== deleteIndex);

    setFaqs(updated);

    if (editingIndex === deleteIndex) {
      cancelEdit();
    }

    if (editingIndex !== null && editingIndex > deleteIndex) {
      setEditingIndex(editingIndex - 1);
    }

    closeConfirmModal();
    showModal("success", "FAQ deleted. Please save the section.");
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
            <MessageCircleQuestion className="text-primary" size={30} />
            FAQ Section
          </h1>
          <p className="text-gray-500 mt-1">
            Manage FAQ content and structure dynamically.
          </p>
        </div>

        {/* TITLE */}
        <div className={cardClass}>
          <h2 className="text-xl font-bold text-gray-900">Section Title</h2>

          <input
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            placeholder="Enter FAQ Title"
            className={inputClass}
          />
        </div>

        {/* ADD / EDIT */}
        <div className={cardClass}>
          <h2 className="text-xl font-bold text-gray-900">
            {editingIndex !== null ? "Edit FAQ" : "Add FAQ"}
          </h2>

          <input
            value={faqForm.question}
            onChange={(e) =>
              setFaqForm({
                ...faqForm,
                question: e.target.value,
              })
            }
            placeholder="Question"
            className={inputClass}
          />

          <textarea
            rows={4}
            value={faqForm.answer}
            onChange={(e) =>
              setFaqForm({
                ...faqForm,
                answer: e.target.value,
              })
            }
            placeholder="Answer"
            className={inputClass}
          />

          <div className="flex flex-wrap gap-3">
            {editingIndex !== null ? (
              <>
                <button
                  type="button"
                  onClick={updateFAQ}
                  className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 transition"
                >
                  <Save size={16} />
                  Update
                </button>

                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex items-center gap-2 bg-gray-200 px-6 py-3 rounded-2xl hover:bg-gray-300 transition"
                >
                  <X size={16} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={addFAQ}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl hover:bg-secondary transition"
              >
                <Plus size={16} />
                Add FAQ
              </button>
            )}
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {faqs.length === 0 ? (
            <div className="text-center text-gray-400 py-10 bg-white rounded-2xl border">
              No FAQ added yet
            </div>
          ) : (
            faqs.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col md:flex-row md:justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {index + 1}. {item.question}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEdit(item, index)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white transition"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => requestDeleteFAQ(index)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={saveSection}
          disabled={saving}
          className="sticky bottom-6 z-20 flex items-center justify-center gap-2 w-full bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-secondary transition-all duration-500 disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save FAQ Section"}
        </button>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete FAQ?"
        message="Are you sure you want to delete this FAQ? Please save the section after deleting."
        confirmText="Delete FAQ"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={closeConfirmModal}
        onConfirm={confirmDeleteFAQ}
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

FAQAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
