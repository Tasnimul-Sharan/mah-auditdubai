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

  // ================= FETCH DATA =================
  const fetchData = async () => {
    const { data, error } = await supabaseServer
      .from("faq")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
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

  // ================= SAVE SECTION =================
  const saveSection = async () => {
    try {
      await supabaseServer.from("faq").upsert([
        {
          id: section?.id,
          title: form.title,
          faqs,
        },
      ]);

      fetchData();
      alert("FAQ saved successfully");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ================= ADD FAQ =================
  const addFAQ = () => {
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;

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
  };

  // ================= DELETE FAQ =================
  const deleteFAQ = (index) => {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
  };

  // ================= EDIT FAQ =================
  const startEdit = (index) => {
    setEditingIndex(index);
    setFaqForm({
      question: faqs[index].question,
      answer: faqs[index].answer,
    });
  };

  // ================= UPDATE FAQ =================
  const updateFAQ = () => {
    if (editingIndex === null) return;

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
  };

  // ================= CANCEL EDIT =================
  const cancelEdit = () => {
    setEditingIndex(null);
    setFaqForm({
      question: "",
      answer: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <MessageCircleQuestion className="w-6 h-6 text-primary" />
        FAQ Section
      </h1>

      {/* SECTION TITLE */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">FAQ Section Title</h2>

        <input
          type="text"
          placeholder="Enter FAQ Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="border p-3 rounded-lg w-full"
        />
      </div>

      {/* ADD / EDIT FAQ */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">
          {editingIndex !== null ? "Edit FAQ" : "Add New FAQ"}
        </h2>

        <input
          type="text"
          placeholder="Question"
          value={faqForm.question}
          onChange={(e) =>
            setFaqForm({
              ...faqForm,
              question: e.target.value,
            })
          }
          className="border p-3 rounded-lg w-full"
        />

        <textarea
          rows={4}
          placeholder="Answer"
          value={faqForm.answer}
          onChange={(e) =>
            setFaqForm({
              ...faqForm,
              answer: e.target.value,
            })
          }
          className="border p-3 rounded-lg w-full"
        />

        <div className="flex gap-3">
          {editingIndex !== null ? (
            <>
              <button
                onClick={updateFAQ}
                className="bg-primary text-white px-5 py-3 rounded-lg flex items-center gap-2"
              >
                <Save size={16} />
                Update FAQ
              </button>

              <button
                onClick={cancelEdit}
                className="bg-gray-200 px-5 py-3 rounded-lg flex items-center gap-2"
              >
                <X size={16} />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addFAQ}
              className="bg-primary text-white px-5 py-3 rounded-lg flex items-center gap-2"
            >
              <Plus size={16} />
              Add FAQ
            </button>
          )}
        </div>
      </div>

      {/* FAQ LIST */}
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-2xl p-5 shadow-sm flex justify-between gap-4"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-soft_black mb-2">
                {index + 1}. {item.question}
              </h3>
              <p className="text-secondary_two text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startEdit(index)}
                className="bg-blue-100 p-3 rounded-lg"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => deleteFAQ(index)}
                className="bg-red-100 p-3 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SAVE ALL */}
      <button
        onClick={saveSection}
        className="bg-primary text-white px-6 py-3 rounded-xl flex items-center gap-2"
      >
        <Save size={18} />
        Save FAQ Section
      </button>
    </div>
  );
}

FAQAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
