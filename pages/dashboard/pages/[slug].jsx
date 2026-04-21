"use client";

import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function PageEditor({ slug }) {
  const [sections, setSections] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [content, setContent] = useState("");

  // FETCH TYPES
  const fetchTypes = async () => {
    const { data } = await supabaseServer.from("types").select("*");
    setTypes(data || []);
  };

  // FETCH SECTIONS
  const fetchSections = async () => {
    const { data } = await supabaseServer
      .from("sections")
      .select("*, types(name, slug)")
      .eq("page_slug", slug)
      .order("position");

    setSections(data || []);
  };

  useEffect(() => {
    if (slug) {
      fetchSections();
      fetchTypes();
    }
  }, [slug]);

  // ADD SECTION
  const addSection = async () => {
    if (!typeId) return alert("Select type");

    const { error } = await supabaseServer.from("sections").insert([
      {
        page_slug: slug,
        type_id: typeId,
        content: { text: content },
        position: sections.length + 1,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTypeId("");
    setContent("");
    fetchSections();
  };

  // DELETE
  const deleteSection = async (id) => {
    await supabaseServer.from("sections").delete().eq("id", id);
    fetchSections();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Manage Sections: {slug}</h1>

      {/* ADD */}
      <div className="flex gap-3">
        <select
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Type</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content text"
          className="border p-2 w-full"
        />

        <button onClick={addSection} className="bg-primary text-white px-4">
          Add
        </button>
      </div>

      {/* LIST */}
      {sections.map((sec) => (
        <div key={sec.id} className="border p-4 flex justify-between">
          <div>
            <p className="font-bold">{sec.types?.name}</p>
            <p className="text-gray-500">{sec.content?.text}</p>
          </div>

          <button
            onClick={() => deleteSection(sec.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
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