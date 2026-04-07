// "use client";

// import { useState } from "react";
// import { Plus, Trash2 } from "lucide-react";
// import AdminLayout from "@/components/AdminLayout";
// import { useCrud } from "@/Hooks/useCrud";

// export default function IndustriesAdmin() {
//   const { data, createItem, deleteItem } = useCrud("industries");

//   const [title, setTitle] = useState("");

//   const handleAdd = async () => {
//     await createItem({ title });
//     setTitle("");
//   };

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Industries</h1>

//       <div className="bg-white p-6 rounded-xl border flex gap-3">
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Industry name"
//           className="border p-2 w-full"
//         />

//         <button
//           onClick={handleAdd}
//           className="bg-primary text-white px-4 py-2 rounded"
//         >
//           <Plus size={16} />
//         </button>
//       </div>

//       {data.map((item) => (
//         <div key={item.id} className="border p-3 rounded flex justify-between">
//           <p>{item.title}</p>

//           <button
//             onClick={() => deleteItem(item.id)}
//             className="bg-red-100 p-2 rounded"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// IndustriesAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Save } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";

export default function IndustriesAdmin() {
  const { uploadFile } = useUpload();

  const [section, setSection] = useState(null);
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
  });

  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(null);

  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("industries")
      .select("*")
      .single();

    if (data) {
      setSection(data);
      setForm(data);

      const { data: list } = await supabaseServer
        .from("industry_items")
        .select("*")
        .eq("industry_id", data.id);

      setItems(list || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveSection = async () => {
    let imageUrl = form.image;

    if (file) {
      imageUrl = await uploadFile(file, "industries");
    }

    if (section) {
      await supabaseServer
        .from("industries")
        .update({ ...form, image: imageUrl })
        .eq("id", section.id);
    } else {
      await supabaseServer
        .from("industries")
        .insert([{ ...form, image: imageUrl }]);
    }

    fetchData();
  };

  const addItem = async () => {
    if (!text || !section) return;

    await supabaseServer.from("industry_items").insert([
      {
        industry_id: section.id,
        title: text,
      },
    ]);

    setText("");
    fetchData();
  };

  const deleteItem = async (id) => {
    await supabaseServer.from("industry_items").delete().eq("id", id);
    fetchData();
  };

  const updateItem = async (id) => {
    await supabaseServer
      .from("industry_items")
      .update({ title: text })
      .eq("id", id);

    setEditing(null);
    setText("");
    fetchData();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Industries</h1>

      {/* SECTION */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        {form.image && <img src={form.image} className="w-32 rounded" />}

        <button
          onClick={saveSection}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Save Section
        </button>
      </div>

      {/* ADD ITEM */}
      <div className="bg-white p-4 rounded-xl border flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add industry"
          className="border p-2 w-full"
        />

        <button onClick={addItem} className="bg-primary text-white px-3">
          <Plus size={16} />
        </button>
      </div>

      {/* LIST */}
      {items.map((item) => (
        <div
          key={item.id}
          className="border p-3 rounded flex justify-between items-center"
        >
          {editing === item.id ? (
            <>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border p-2 w-full"
              />
              <button onClick={() => updateItem(item.id)}>
                <Save size={16} />
              </button>
            </>
          ) : (
            <>
              <p>{item.title}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(item.id);
                    setText(item.title);
                  }}
                  className="bg-blue-100 p-2 rounded"
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-100 p-2 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

IndustriesAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;