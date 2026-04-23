// "use client";

// import { useEffect, useState } from "react";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";

// export default function PageEditor({ slug }) {
//   const [sections, setSections] = useState([]);
//   const [types, setTypes] = useState([]);
//   const [typeId, setTypeId] = useState("");
//   const [content, setContent] = useState("");

//   // FETCH TYPES
//   const fetchTypes = async () => {
//     const { data } = await supabaseServer.from("types").select("*");
//     setTypes(data || []);
//   };

//   // FETCH SECTIONS
//   const fetchSections = async () => {
//     const { data } = await supabaseServer
//       .from("sections")
//       .select("*, types(name, slug)")
//       .eq("page_slug", slug)
//       .order("position");

//     setSections(data || []);
//   };

//   useEffect(() => {
//     if (slug) {
//       fetchSections();
//       fetchTypes();
//     }
//   }, [slug]);

//   // ADD SECTION
//   const addSection = async () => {
//     if (!typeId) return alert("Select type");

//     const { error } = await supabaseServer.from("sections").insert([
//       {
//         page_slug: slug,
//         type_id: typeId,
//         content: { text: content },
//         position: sections.length + 1,
//       },
//     ]);

//     if (error) {
//       alert(error.message);
//       return;
//     }

//     setTypeId("");
//     setContent("");
//     fetchSections();
//   };

//   // DELETE
//   const deleteSection = async (id) => {
//     await supabaseServer.from("sections").delete().eq("id", id);
//     fetchSections();
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">
//       <h1 className="text-xl font-bold">Manage Sections: {slug}</h1>

//       {/* ADD */}
//       <div className="flex gap-3">
//         <select
//           value={typeId}
//           onChange={(e) => setTypeId(e.target.value)}
//           className="border p-2"
//         >
//           <option value="">Select Type</option>
//           {types.map((t) => (
//             <option key={t.id} value={t.id}>
//               {t.name}
//             </option>
//           ))}
//         </select>

//         <input
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Content text"
//           className="border p-2 w-full"
//         />

//         <button onClick={addSection} className="bg-primary text-white px-4">
//           Add
//         </button>
//       </div>

//       {/* LIST */}
//       {sections.map((sec) => (
//         <div key={sec.id} className="border p-4 flex justify-between">
//           <div>
//             <p className="font-bold">{sec.types?.name}</p>
//             <p className="text-gray-500">{sec.content?.text}</p>
//           </div>

//           <button
//             onClick={() => deleteSection(sec.id)}
//             className="text-red-500"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// // SSR
// export async function getServerSideProps({ params }) {
//   return {
//     props: {
//       slug: params.slug,
//     },
//   };
// }

// PageEditor.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";

export default function PageEditor({ slug }) {
  const { uploadFile } = useUpload();

  const [sections, setSections] = useState([]);
  const [types, setTypes] = useState([]);

  const [typeId, setTypeId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [singleImage, setSingleImage] = useState(null);
  const [multiImages, setMultiImages] = useState([]);

  const [loading, setLoading] = useState(false);

  // ================= FETCH TYPES =================
  const fetchTypes = async () => {
    const { data } = await supabaseServer.from("types").select("*");
    setTypes(data || []);
  };

  // ================= FETCH SECTIONS =================
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
      fetchTypes();
      fetchSections();
    }
  }, [slug]);

  // ================= ADD SECTION =================
  const addSection = async () => {
    if (!typeId) return alert("Select type");

    setLoading(true);

    try {
      // -------- upload single image --------
      let singleImageUrl = null;

      if (singleImage) {
        const res = await uploadFile(singleImage, "sections");
        singleImageUrl = res.url;
      }

      // -------- upload multiple images --------
      let multiImageUrls = [];

      if (multiImages.length > 0) {
        for (let file of multiImages) {
          const res = await uploadFile(file, "sections");
          multiImageUrls.push(res.url);
        }
      }

      // -------- build content --------
      const content = {
        title,
        text,
        image: singleImageUrl,
        images: multiImageUrls,
      };

      // -------- insert --------
      const { error } = await supabaseServer.from("sections").insert([
        {
          page_slug: slug,
          type_id: typeId,
          content,
          position: sections.length + 1,
        },
      ]);

      if (error) throw error;

      // reset
      setTypeId("");
      setTitle("");
      setText("");
      setSingleImage(null);
      setMultiImages([]);

      fetchSections();
    } catch (err) {
      console.error(err);
      alert("Failed to add section");
    }

    setLoading(false);
  };

  // ================= DELETE =================
  const deleteSection = async (id) => {
    await supabaseServer.from("sections").delete().eq("id", id);
    fetchSections();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Manage Sections: {slug}</h1>

      {/* ================= ADD SECTION ================= */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <h2 className="font-semibold">Add Section</h2>

        <select
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          className="border p-2 w-full"
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
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full"
        />

        {/* SINGLE IMAGE */}
        <div>
          <p className="text-sm mb-1">Single Image</p>
          <input
            type="file"
            onChange={(e) => setSingleImage(e.target.files[0])}
          />
        </div>

        {/* MULTIPLE IMAGES */}
        <div>
          <p className="text-sm mb-1">Multiple Images</p>
          <input
            type="file"
            multiple
            onChange={(e) => setMultiImages([...e.target.files])}
          />
        </div>

        <button
          onClick={addSection}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Add Section"}
        </button>
      </div>

      {/* ================= SECTION LIST ================= */}
      <div className="space-y-4">
        {sections.map((sec) => {
          const content = sec.content || {};

          return (
            <div
              key={sec.id}
              className="border p-4 rounded-lg flex justify-between gap-4"
            >
              <div className="space-y-2">
                <p className="font-bold">{sec.types?.name}</p>

                <p className="text-gray-600">{content.title}</p>
                <p className="text-sm text-gray-500">{content.text}</p>

                {/* SINGLE */}
                {content.image && (
                  <img
                    src={content.image}
                    className="w-32 h-20 object-cover rounded"
                  />
                )}

                {/* MULTIPLE */}
                {content.images?.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {content.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-20 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => deleteSection(sec.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ================= SSR =================
export async function getServerSideProps({ params }) {
  return {
    props: {
      slug: params.slug,
    },
  };
}

PageEditor.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;