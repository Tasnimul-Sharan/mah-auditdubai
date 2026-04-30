// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";
// import { useUpload } from "@/Hooks/useUpload";
// import {
//   Plus,
//   Save,
//   Trash2,
//   FileText,
//   Layers,
//   Megaphone,
//   ImageIcon,
// } from "lucide-react";

// export default function EditService() {
//   const router = useRouter();
//   const { id } = router.query;
//   const { uploadFile } = useUpload();

//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const inputClass =
//     "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

//   const cardClass =
//     "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

//   useEffect(() => {
//     if (!id) return;

//     supabaseServer
//       .from("services")
//       .select("*")
//       .eq("id", id)
//       .single()
//       .then(({ data }) => {
//         setForm({
//           ...data,
//           footerNote: data?.footer_note || "",
//         });
//         setLoading(false);
//       });
//   }, [id]);

//   const handleFileChange = async (e) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));

//     try {
//       let oldPublicId = form.public_id || null;

//       if (!oldPublicId && form.image) {
//         oldPublicId = form.image
//           .split("/upload/")[1]
//           ?.split(".")[0]
//           ?.replace(/^v\d+\//, "");
//       }

//       if (oldPublicId) {
//         await fetch("/api/delete-image", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ public_id: oldPublicId }),
//         });
//       }

//       const res = await uploadFile(selected, "services");

//       setForm({
//         ...form,
//         image: res.url,
//         public_id: res.public_id || null,
//       });

//       await supabaseServer
//         .from("services")
//         .update({
//           image: res.url,
//           public_id: res.public_id || null,
//         })
//         .eq("id", id);
//     } catch (err) {
//       console.error(err);
//       alert("Upload error");
//     }
//   };

//   const removeImage = async () => {
//     try {
//       if (!form.image && !form.public_id) return;

//       let public_id = form.public_id;

//       if (!public_id && form.image) {
//         public_id = form.image
//           .split("/upload/")[1]
//           ?.split(".")[0]
//           ?.replace(/^v\d+\//, "");
//       }

//       if (public_id) {
//         await fetch("/api/delete-image", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ public_id }),
//         });
//       }

//       setForm({
//         ...form,
//         image: "",
//         public_id: null,
//       });

//       setFile(null);
//       setPreview("");

//       await supabaseServer
//         .from("services")
//         .update({
//           image: "",
//           public_id: null,
//         })
//         .eq("id", id);
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   const addSection = () => {
//     setForm({
//       ...form,
//       sections: [
//         ...(form.sections || []),
//         { title: "", description: "", items: [""] },
//       ],
//     });
//   };

//   const updateSection = (i, field, value) => {
//     const updated = [...(form.sections || [])];
//     updated[i][field] = value;
//     setForm({ ...form, sections: updated });
//   };

//   const removeSection = (i) => {
//     setForm({
//       ...form,
//       sections: (form.sections || []).filter((_, idx) => idx !== i),
//     });
//   };

//   const addItem = (i) => {
//     const updated = [...(form.sections || [])];
//     updated[i].items = [...(updated[i].items || []), ""];
//     setForm({ ...form, sections: updated });
//   };

//   const updateItem = (i, idx, value) => {
//     const updated = [...(form.sections || [])];
//     updated[i].items[idx] = value;
//     setForm({ ...form, sections: updated });
//   };

//   const removeItem = (i, idx) => {
//     const updated = [...(form.sections || [])];
//     updated[i].items = updated[i].items.filter((_, index) => index !== idx);
//     setForm({ ...form, sections: updated });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);

//       const payload = {
//         title: form.title,
//         slug: form.slug,
//         description: form.description,
//         image: form.image,
//         public_id: form.public_id || null,
//         hero: form.hero,
//         sections: form.sections,
//         footer_note: form.footerNote,
//         cta: form.cta,
//       };

//       const { error } = await supabaseServer
//         .from("services")
//         .update(payload)
//         .eq("id", id);

//       if (error) throw error;

//       alert("Updated successfully");
//       router.push("/dashboard/services");
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="p-6 text-center">Loading...</div>;
//   if (!form) return <div className="p-6 text-center">Service not found</div>;

//   return (
//     <div className="max-w-6xl mx-auto space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//           <FileText className="text-primary" size={28} />
//           Edit Service
//         </h1>

//         <p className="text-gray-500 mt-1">
//           Update service content, hero copy, sections, CTA and footer note.
//         </p>
//       </div>

//       <form onSubmit={handleUpdate} className="space-y-8">
//         <div className={cardClass}>
//           <h2 className="flex items-center gap-2 text-xl font-bold">
//             <ImageIcon size={20} className="text-primary" />
//             Basic Information
//           </h2>

//           <input
//             value={form.title || ""}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className={inputClass}
//             placeholder="Title"
//           />

//           <input
//             value={form.slug || ""}
//             readOnly
//             className={`${inputClass} bg-gray-50 text-gray-500`}
//             placeholder="Slug"
//           />

//           <textarea
//             value={form.description || ""}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             rows={4}
//             className={inputClass}
//             placeholder="Description"
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className={inputClass}
//           />

//           {(preview || form.image) && (
//             <div className="relative w-fit rounded-2xl border bg-gray-50 p-3">
//               <img
//                 src={preview || form.image}
//                 className="w-72 h-44 object-cover rounded-xl"
//                 alt=""
//               />

//               <button
//                 type="button"
//                 onClick={removeImage}
//                 className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
//               >
//                 <Trash2 size={14} />
//               </button>
//             </div>
//           )}
//         </div>

//         <div className={cardClass}>
//           <h2 className="flex items-center gap-2 text-xl font-bold">
//             <Layers size={20} className="text-primary" />
//             Hero Content
//           </h2>

//           <input
//             value={form.hero?.title || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 hero: { ...form.hero, title: e.target.value },
//               })
//             }
//             className={inputClass}
//             placeholder="Hero Title"
//           />

//           <textarea
//             value={form.hero?.description1 || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 hero: { ...form.hero, description1: e.target.value },
//               })
//             }
//             rows={3}
//             className={inputClass}
//             placeholder="Description 1"
//           />

//           <textarea
//             value={form.hero?.description2 || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 hero: { ...form.hero, description2: e.target.value },
//               })
//             }
//             rows={3}
//             className={inputClass}
//             placeholder="Description 2"
//           />
//         </div>

//         <div className={cardClass}>
//           <div className="flex items-center justify-between">
//             <h2 className="flex items-center gap-2 text-xl font-bold">
//               <Layers size={20} className="text-primary" />
//               Service Sections
//             </h2>

//             <button
//               type="button"
//               onClick={addSection}
//               className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
//             >
//               <Plus size={14} />
//               Add Section
//             </button>
//           </div>

//           {(form.sections || []).map((sec, i) => (
//             <div
//               key={i}
//               className="rounded-2xl border bg-gray-50 p-4 space-y-3"
//             >
//               <div className="flex items-center justify-between">
//                 <h3 className="font-semibold text-gray-700">Section {i + 1}</h3>

//                 <button
//                   type="button"
//                   onClick={() => removeSection(i)}
//                   className="rounded-lg bg-red-100 p-2 text-red-500 hover:bg-red-500 hover:text-white transition"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>

//               <input
//                 value={sec.title || ""}
//                 onChange={(e) => updateSection(i, "title", e.target.value)}
//                 className={inputClass}
//                 placeholder="Title"
//               />

//               <textarea
//                 value={sec.description || ""}
//                 onChange={(e) =>
//                   updateSection(i, "description", e.target.value)
//                 }
//                 rows={3}
//                 className={inputClass}
//                 placeholder="Description"
//               />

//               {(sec.items || []).map((item, idx) => (
//                 <div key={idx} className="grid gap-3 md:grid-cols-[1fr_auto]">
//                   <input
//                     value={item || ""}
//                     onChange={(e) => updateItem(i, idx, e.target.value)}
//                     className={inputClass}
//                     placeholder="Item"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => removeItem(i, idx)}
//                     className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
//                   >
//                     <Trash2 size={15} />
//                   </button>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={() => addItem(i)}
//                 className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
//               >
//                 <Plus size={14} />
//                 Add Item
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className={cardClass}>
//           <h2 className="flex items-center gap-2 text-xl font-bold">
//             <Megaphone size={20} className="text-primary" />
//             CTA Content
//           </h2>

//           <input
//             value={form.cta?.title || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 cta: { ...form.cta, title: e.target.value },
//               })
//             }
//             className={inputClass}
//             placeholder="CTA Title"
//           />

//           <textarea
//             value={form.cta?.description || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 cta: { ...form.cta, description: e.target.value },
//               })
//             }
//             rows={3}
//             className={inputClass}
//             placeholder="CTA Description"
//           />

//           <input
//             value={form.cta?.buttonText || ""}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 cta: { ...form.cta, buttonText: e.target.value },
//               })
//             }
//             className={inputClass}
//             placeholder="Button Text"
//           />
//         </div>

//         <div className={cardClass}>
//           <h2 className="text-xl font-bold">Footer Note</h2>

//           <textarea
//             value={form.footerNote || ""}
//             onChange={(e) => setForm({ ...form, footerNote: e.target.value })}
//             rows={3}
//             className={inputClass}
//             placeholder="Footer Note"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={saving}
//           className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:-translate-y-1 hover:bg-secondary transition disabled:opacity-60"
//         >
//           <Save size={18} />
//           {saving ? "Updating..." : "Update Service"}
//         </button>
//       </form>
//     </div>
//   );
// }

// EditService.getLayout = (page) => (
//   <AdminLayout title="Edit Service">{page}</AdminLayout>
// );

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
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
import ConfirmModal from "@/components/ConfirmModal";

export default function EditService() {
  const router = useRouter();
  const { id } = router.query;
  const { uploadFile } = useUpload();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [deleteTarget, setDeleteTarget] = useState({
    type: null,
    sectionIndex: null,
    itemIndex: null,
  });

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
    redirect: false,
  });

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    loading: false,
  });

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const showModal = (type, message, redirect = false) => {
    setModal({
      show: true,
      type,
      message,
      redirect,
    });
  };

  const closeModal = () => {
    const shouldRedirect = modal.redirect;

    setModal({
      show: false,
      type: "success",
      message: "",
      redirect: false,
    });

    if (shouldRedirect) {
      router.push("/dashboard/services");
    }
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      show: false,
      loading: false,
    });

    setDeleteTarget({
      type: null,
      sectionIndex: null,
      itemIndex: null,
    });
  };

  useEffect(() => {
    if (!id) return;

    fetchService();
  }, [id]);

  const fetchService = async () => {
    setLoading(true);

    const { data, error } = await supabaseServer
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      showModal("error", "Service data fetch failed.");
      setLoading(false);
      return;
    }

    if (data) {
      setForm({
        ...data,
        hero: data.hero || {
          title: "",
          description1: "",
          description2: "",
        },
        sections: data.sections || [],
        cta: data.cta || {
          title: "",
          description: "",
          buttonText: "",
        },
        footerNote: data.footer_note || "",
      });
    }

    setLoading(false);
  };

  const getPublicIdFromUrl = (imageUrl) => {
    if (!imageUrl) return null;

    return imageUrl
      .split("/upload/")[1]
      ?.split(".")[0]
      ?.replace(/^v\d+\//, "");
  };

  const deleteFromCloudinary = async (publicId) => {
    if (!publicId) return;

    await fetch("/api/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id: publicId }),
    });
  };

  const handleFileChange = async (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));

    try {
      let oldPublicId = form.public_id || null;

      if (!oldPublicId && form.image) {
        oldPublicId = getPublicIdFromUrl(form.image);
      }

      if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId);
      }

      const res = await uploadFile(selected, "services");

      const updatedForm = {
        ...form,
        image: res.url,
        public_id: res.public_id || null,
      };

      setForm(updatedForm);

      const { error } = await supabaseServer
        .from("services")
        .update({
          image: res.url,
          public_id: res.public_id || null,
        })
        .eq("id", id);

      if (error) throw error;

      setFile(null);
      setPreview("");

      showModal("success", "Service image uploaded successfully.");
    } catch (err) {
      console.error(err);
      showModal("error", "Image upload failed. Please try again.");
    }
  };

  const requestDelete = (type, sectionIndex = null, itemIndex = null) => {
    setDeleteTarget({
      type,
      sectionIndex,
      itemIndex,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDelete = async () => {
    if (deleteTarget.type === "image") {
      await confirmRemoveImage();
      return;
    }

    if (deleteTarget.type === "section") {
      confirmRemoveSection();
      return;
    }

    if (deleteTarget.type === "item") {
      confirmRemoveItem();
      return;
    }

    showModal("error", "No delete action selected.");
    closeConfirmModal();
  };

  const confirmRemoveImage = async () => {
    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      if (!form.image && !form.public_id) {
        showModal("error", "No image found to remove.");
        closeConfirmModal();
        return;
      }

      let publicId = form.public_id || null;

      if (!publicId && form.image) {
        publicId = getPublicIdFromUrl(form.image);
      }

      if (publicId) {
        await deleteFromCloudinary(publicId);
      }

      const updatedForm = {
        ...form,
        image: "",
        public_id: null,
      };

      setForm(updatedForm);
      setFile(null);
      setPreview("");

      const { error } = await supabaseServer
        .from("services")
        .update({
          image: "",
          public_id: null,
        })
        .eq("id", id);

      if (error) throw error;

      closeConfirmModal();
      showModal("success", "Service image removed successfully.");
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Image remove failed. Please try again.");
    }
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...(form.sections || []),
        {
          title: "",
          description: "",
          items: [""],
        },
      ],
    });
  };

  const updateSection = (i, field, value) => {
    const updated = [...(form.sections || [])];

    updated[i] = {
      ...updated[i],
      [field]: value,
    };

    setForm({
      ...form,
      sections: updated,
    });
  };

  const confirmRemoveSection = () => {
    if (deleteTarget.sectionIndex === null) {
      showModal("error", "No section selected to remove.");
      closeConfirmModal();
      return;
    }

    setConfirmModal({
      show: true,
      loading: true,
    });

    setForm({
      ...form,
      sections: (form.sections || []).filter(
        (_, idx) => idx !== deleteTarget.sectionIndex,
      ),
    });

    closeConfirmModal();
    showModal("success", "Section removed. Please update the service.");
  };

  const addItem = (i) => {
    const updated = [...(form.sections || [])];

    updated[i].items = [...(updated[i].items || []), ""];

    setForm({
      ...form,
      sections: updated,
    });
  };

  const updateItem = (i, idx, value) => {
    const updated = [...(form.sections || [])];

    updated[i].items[idx] = value;

    setForm({
      ...form,
      sections: updated,
    });
  };

  const confirmRemoveItem = () => {
    const { sectionIndex, itemIndex } = deleteTarget;

    if (sectionIndex === null || itemIndex === null) {
      showModal("error", "No item selected to remove.");
      closeConfirmModal();
      return;
    }

    setConfirmModal({
      show: true,
      loading: true,
    });

    const updated = [...(form.sections || [])];

    updated[sectionIndex].items = updated[sectionIndex].items.filter(
      (_, index) => index !== itemIndex,
    );

    setForm({
      ...form,
      sections: updated,
    });

    closeConfirmModal();
    showModal("success", "Section item removed. Please update the service.");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!form.title?.trim()) {
      showModal("error", "Service title is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        image: form.image,
        public_id: form.public_id || null,
        hero: form.hero,
        sections: form.sections,
        footer_note: form.footerNote,
        cta: form.cta,
      };

      const { error } = await supabaseServer
        .from("services")
        .update(payload)
        .eq("id", id);

      if (error) throw error;

      showModal("success", "Service updated successfully.", true);
    } catch (err) {
      console.error(err);
      showModal(
        "error",
        "Update failed. Please check your data and try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const confirmContent =
    deleteTarget.type === "image"
      ? {
          title: "Remove Image?",
          message:
            "Are you sure you want to remove this service image? This action cannot be undone.",
          confirmText: "Remove Image",
        }
      : deleteTarget.type === "section"
        ? {
            title: "Remove Section?",
            message:
              "Are you sure you want to remove this service section? Please update the service after removing.",
            confirmText: "Remove Section",
          }
        : deleteTarget.type === "item"
          ? {
              title: "Remove Item?",
              message:
                "Are you sure you want to remove this section item? Please update the service after removing.",
              confirmText: "Remove Item",
            }
          : {
              title: "Are you sure?",
              message: "This action cannot be undone.",
              confirmText: "Confirm",
            };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!form) {
    return <div className="p-6 text-center">Service not found</div>;
  }

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-primary" size={28} />
            Edit Service
          </h1>

          <p className="text-gray-500 mt-1">
            Update service content, hero copy, sections, CTA and footer note.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <ImageIcon size={20} className="text-primary" />
              Basic Information
            </h2>

            <input
              value={form.title || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className={inputClass}
              placeholder="Title"
            />

            <input
              value={form.slug || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  slug: e.target.value,
                })
              }
              className={inputClass}
              placeholder="Slug"
            />

            <textarea
              value={form.description || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              rows={4}
              className={inputClass}
              placeholder="Description"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={inputClass}
            />

            {(preview || form.image) && (
              <div className="relative w-fit rounded-2xl border bg-gray-50 p-3">
                <img
                  src={preview || form.image}
                  className="w-72 h-44 object-cover rounded-xl"
                  alt="Service"
                />

                <button
                  type="button"
                  onClick={() => requestDelete("image")}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Layers size={20} className="text-primary" />
              Hero Content
            </h2>

            <input
              value={form.hero?.title || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  hero: {
                    ...form.hero,
                    title: e.target.value,
                  },
                })
              }
              className={inputClass}
              placeholder="Hero Title"
            />

            <textarea
              value={form.hero?.description1 || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  hero: {
                    ...form.hero,
                    description1: e.target.value,
                  },
                })
              }
              rows={3}
              className={inputClass}
              placeholder="Description 1"
            />

            <textarea
              value={form.hero?.description2 || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  hero: {
                    ...form.hero,
                    description2: e.target.value,
                  },
                })
              }
              rows={3}
              className={inputClass}
              placeholder="Description 2"
            />
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Layers size={20} className="text-primary" />
                Service Sections
              </h2>

              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
              >
                <Plus size={14} />
                Add Section
              </button>
            </div>

            {(form.sections || []).length === 0 ? (
              <p className="rounded-2xl bg-gray-50 p-6 text-center text-gray-400">
                No sections added yet.
              </p>
            ) : (
              (form.sections || []).map((sec, i) => (
                <div
                  key={i}
                  className="rounded-2xl border bg-gray-50 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700">
                      Section {i + 1}
                    </h3>

                    <button
                      type="button"
                      onClick={() => requestDelete("section", i)}
                      className="rounded-lg bg-red-100 p-2 text-red-500 hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <input
                    value={sec.title || ""}
                    onChange={(e) => updateSection(i, "title", e.target.value)}
                    className={inputClass}
                    placeholder="Title"
                  />

                  <textarea
                    value={sec.description || ""}
                    onChange={(e) =>
                      updateSection(i, "description", e.target.value)
                    }
                    rows={3}
                    className={inputClass}
                    placeholder="Description"
                  />

                  {(sec.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="grid gap-3 md:grid-cols-[1fr_auto]"
                    >
                      <input
                        value={item || ""}
                        onChange={(e) => updateItem(i, idx, e.target.value)}
                        className={inputClass}
                        placeholder="Item"
                      />

                      <button
                        type="button"
                        onClick={() => requestDelete("item", i, idx)}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addItem(i)}
                    className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
                  >
                    <Plus size={14} />
                    Add Item
                  </button>
                </div>
              ))
            )}
          </div>

          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Megaphone size={20} className="text-primary" />
              CTA Content
            </h2>

            <input
              value={form.cta?.title || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  cta: {
                    ...form.cta,
                    title: e.target.value,
                  },
                })
              }
              className={inputClass}
              placeholder="CTA Title"
            />

            <textarea
              value={form.cta?.description || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  cta: {
                    ...form.cta,
                    description: e.target.value,
                  },
                })
              }
              rows={3}
              className={inputClass}
              placeholder="CTA Description"
            />

            <input
              value={form.cta?.buttonText || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  cta: {
                    ...form.cta,
                    buttonText: e.target.value,
                  },
                })
              }
              className={inputClass}
              placeholder="Button Text"
            />
          </div>

          <div className={cardClass}>
            <h2 className="text-xl font-bold">Footer Note</h2>

            <textarea
              value={form.footerNote || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  footerNote: e.target.value,
                })
              }
              rows={3}
              className={inputClass}
              placeholder="Footer Note"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:-translate-y-1 hover:bg-secondary transition disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Updating..." : "Update Service"}
          </button>
        </form>
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

EditService.getLayout = (page) => (
  <AdminLayout title="Edit Service">{page}</AdminLayout>
);