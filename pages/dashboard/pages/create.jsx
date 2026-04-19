import { useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async () => {
    await supabaseServer.from("pages").insert([{ title, slug }]);

    alert("Page created");
  };

  return (
    <div>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Slug" onChange={(e) => setSlug(e.target.value)} />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}

CreatePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// import { useState } from "react";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default function CreatePage() {
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");

//   const handleSubmit = async () => {
//     await supabaseServer.from("pages").insert([{ title, slug }]);

//     alert("Page created");
//   };

//   return (
//     <div>
//       <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
//       <input placeholder="Slug" onChange={(e) => setSlug(e.target.value)} />

//       <button onClick={handleSubmit}>Create</button>
//     </div>
//   );
// }
