// import { supabaseServer } from "@/lib/supabaseServer";

// export default function PageEditor({ page, sections }) {
//   return (
//     <div>
//       <h1>{page.title}</h1>

//       {sections.map((sec) => (
//         <div key={sec.id}>
//           <p>{sec.type}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export async function getServerSideProps({ params }) {
//   const { slug } = params;

//   const { data: page } = await supabaseServer
//     .from("pages")
//     .select("*")
//     .eq("slug", slug)
//     .single();

//   const { data: sections } = await supabaseServer
//     .from("sections")
//     .select("*")
//     .eq("page_slug", slug)
//     .order("position");

//   return {
//     props: {
//       page,
//       sections: sections || [],
//     },
//   };
// }

"use client";

import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function PageEditor({ slug }) {
  const [sections, setSections] = useState([]);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const fetchSections = async () => {
    const { data } = await supabaseServer
      .from("sections")
      .select("*")
      .eq("page_slug", slug)
      .order("position");

    setSections(data || []);
  };

  useEffect(() => {
    if (slug) fetchSections();
  }, [slug]);

  const addSection = async () => {
    if (!type) return alert("Select type");

    await supabaseServer.from("sections").insert([
      {
        page_slug: slug,
        type,
        content: { text: content },
        position: sections.length + 1,
      },
    ]);

    setType("");
    setContent("");
    fetchSections();
  };

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
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Type</option>
          <option value="hero">Hero</option>
          <option value="about">About</option>
          <option value="why">Why Us</option>
          <option value="services">Services</option>
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
            <p className="font-bold">{sec.type}</p>
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
