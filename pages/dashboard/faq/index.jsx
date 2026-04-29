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

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  // ================= FETCH =================
  const fetchData = async () => {
    const { data } = await supabaseServer.from("faq").select("*").single();

    if (data) {
      setSection(data);
      setForm({ title: data.title || "" });
      setFaqs(data.faqs || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= SAVE =================
  const saveSection = async () => {
    await supabaseServer.from("faq").upsert([
      {
        id: section?.id,
        title: form.title,
        faqs,
      },
    ]);

    fetchData();
    alert("Saved Successfully");
  };

  // ================= ADD =================
  const addFAQ = () => {
    if (!faqForm.question || !faqForm.answer) return;

    setFaqs([...faqs, faqForm]);

    setFaqForm({ question: "", answer: "" });
  };

  // ================= UPDATE =================
  const updateFAQ = () => {
    const updated = [...faqs];
    updated[editingIndex] = faqForm;

    setFaqs(updated);
    setEditingIndex(null);
    setFaqForm({ question: "", answer: "" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
          <MessageCircleQuestion className="text-primary" size={30} />
          FAQ Section
        </h1>
        <p className="text-gray-500 mt-1">
          Manage FAQ content and structure dynamically
        </p>
      </div>

      {/* TITLE */}
      <div className={cardClass}>
        <h2 className="text-xl font-bold text-gray-900">Section Title</h2>

        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
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
          onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
          placeholder="Question"
          className={inputClass}
        />

        <textarea
          rows={4}
          value={faqForm.answer}
          onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
          placeholder="Answer"
          className={inputClass}
        />

        <div className="flex gap-3">
          {editingIndex !== null ? (
            <>
              <button
                onClick={updateFAQ}
                className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 transition"
              >
                <Save size={16} /> Update
              </button>

              <button
                onClick={() => {
                  setEditingIndex(null);
                  setFaqForm({ question: "", answer: "" });
                }}
                className="flex items-center gap-2 bg-gray-200 px-6 py-3 rounded-2xl"
              >
                <X size={16} /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addFAQ}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl hover:bg-secondary transition"
            >
              <Plus size={16} /> Add FAQ
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
              className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-500 flex justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {index + 1}. {item.question}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingIndex(index);
                    setFaqForm(item);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white transition"
                >
                  <Pencil size={15} />
                </button>

                <button
                  onClick={() => setFaqs(faqs.filter((_, i) => i !== index))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SAVE */}
      <button
        onClick={saveSection}
        className="flex items-center justify-center gap-2 w-full bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-secondary transition-all duration-500"
      >
        <Save size={18} />
        Save FAQ Section
      </button>
    </div>
  );
}

FAQAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
