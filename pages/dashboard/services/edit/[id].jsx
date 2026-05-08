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
// import StatusModal from "@/components/StatusModal";
// import ConfirmModal from "@/components/ConfirmModal";

// export default function EditService() {
//   const router = useRouter();
//   const { id } = router.query;
//   const { uploadFile } = useUpload();

//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [deleteTarget, setDeleteTarget] = useState({
//     type: null,
//     sectionIndex: null,
//     itemIndex: null,
//   });

//   const [modal, setModal] = useState({
//     show: false,
//     type: "success",
//     message: "",
//     redirect: false,
//   });

//   const [confirmModal, setConfirmModal] = useState({
//     show: false,
//     loading: false,
//   });

//   const inputClass =
//     "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

//   const cardClass =
//     "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

//   const showModal = (type, message, redirect = false) => {
//     setModal({
//       show: true,
//       type,
//       message,
//       redirect,
//     });
//   };

//   const closeModal = () => {
//     const shouldRedirect = modal.redirect;

//     setModal({
//       show: false,
//       type: "success",
//       message: "",
//       redirect: false,
//     });

//     if (shouldRedirect) {
//       router.push("/dashboard/services");
//     }
//   };

//   const closeConfirmModal = () => {
//     setConfirmModal({
//       show: false,
//       loading: false,
//     });

//     setDeleteTarget({
//       type: null,
//       sectionIndex: null,
//       itemIndex: null,
//     });
//   };

//   useEffect(() => {
//     if (!id) return;

//     fetchService();
//   }, [id]);

//   const fetchService = async () => {
//     setLoading(true);

//     const { data, error } = await supabaseServer
//       .from("services")
//       .select("*")
//       .eq("id", id)
//       .single();

//     if (error) {
//       console.error(error);
//       showModal("error", "Service data fetch failed.");
//       setLoading(false);
//       return;
//     }

//     if (data) {
//       setForm({
//         ...data,
//         hero: data.hero || {
//           title: "",
//           description1: "",
//           description2: "",
//         },
//         sections: data.sections || [],
//         cta: data.cta || {
//           title: "",
//           description: "",
//           buttonText: "",
//         },
//         footerNote: data.footer_note || "",
//       });
//     }

//     setLoading(false);
//   };

//   const getPublicIdFromUrl = (imageUrl) => {
//     if (!imageUrl) return null;

//     return imageUrl
//       .split("/upload/")[1]
//       ?.split(".")[0]
//       ?.replace(/^v\d+\//, "");
//   };

//   const deleteFromCloudinary = async (publicId) => {
//     if (!publicId) return;

//     await fetch("/api/delete-image", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ public_id: publicId }),
//     });
//   };

//   const handleFileChange = async (e) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));

//     try {
//       let oldPublicId = form.public_id || null;

//       if (!oldPublicId && form.image) {
//         oldPublicId = getPublicIdFromUrl(form.image);
//       }

//       if (oldPublicId) {
//         await deleteFromCloudinary(oldPublicId);
//       }

//       const res = await uploadFile(selected, "services");

//       const updatedForm = {
//         ...form,
//         image: res.url,
//         public_id: res.public_id || null,
//       };

//       setForm(updatedForm);

//       const { error } = await supabaseServer
//         .from("services")
//         .update({
//           image: res.url,
//           public_id: res.public_id || null,
//         })
//         .eq("id", id);

//       if (error) throw error;

//       setFile(null);
//       setPreview("");

//       showModal("success", "Service image uploaded successfully.");
//     } catch (err) {
//       console.error(err);
//       showModal("error", "Image upload failed. Please try again.");
//     }
//   };

//   const requestDelete = (type, sectionIndex = null, itemIndex = null) => {
//     setDeleteTarget({
//       type,
//       sectionIndex,
//       itemIndex,
//     });

//     setConfirmModal({
//       show: true,
//       loading: false,
//     });
//   };

//   const confirmDelete = async () => {
//     if (deleteTarget.type === "image") {
//       await confirmRemoveImage();
//       return;
//     }

//     if (deleteTarget.type === "section") {
//       confirmRemoveSection();
//       return;
//     }

//     if (deleteTarget.type === "item") {
//       confirmRemoveItem();
//       return;
//     }

//     showModal("error", "No delete action selected.");
//     closeConfirmModal();
//   };

//   const confirmRemoveImage = async () => {
//     try {
//       setConfirmModal({
//         show: true,
//         loading: true,
//       });

//       if (!form.image && !form.public_id) {
//         showModal("error", "No image found to remove.");
//         closeConfirmModal();
//         return;
//       }

//       let publicId = form.public_id || null;

//       if (!publicId && form.image) {
//         publicId = getPublicIdFromUrl(form.image);
//       }

//       if (publicId) {
//         await deleteFromCloudinary(publicId);
//       }

//       const updatedForm = {
//         ...form,
//         image: "",
//         public_id: null,
//       };

//       setForm(updatedForm);
//       setFile(null);
//       setPreview("");

//       const { error } = await supabaseServer
//         .from("services")
//         .update({
//           image: "",
//           public_id: null,
//         })
//         .eq("id", id);

//       if (error) throw error;

//       closeConfirmModal();
//       showModal("success", "Service image removed successfully.");
//     } catch (err) {
//       console.error(err);
//       closeConfirmModal();
//       showModal("error", "Image remove failed. Please try again.");
//     }
//   };

//   const addSection = () => {
//     setForm({
//       ...form,
//       sections: [
//         ...(form.sections || []),
//         {
//           title: "",
//           description: "",
//           items: [""],
//         },
//       ],
//     });
//   };

//   const updateSection = (i, field, value) => {
//     const updated = [...(form.sections || [])];

//     updated[i] = {
//       ...updated[i],
//       [field]: value,
//     };

//     setForm({
//       ...form,
//       sections: updated,
//     });
//   };

//   const confirmRemoveSection = () => {
//     if (deleteTarget.sectionIndex === null) {
//       showModal("error", "No section selected to remove.");
//       closeConfirmModal();
//       return;
//     }

//     setConfirmModal({
//       show: true,
//       loading: true,
//     });

//     setForm({
//       ...form,
//       sections: (form.sections || []).filter(
//         (_, idx) => idx !== deleteTarget.sectionIndex,
//       ),
//     });

//     closeConfirmModal();
//     showModal("success", "Section removed. Please update the service.");
//   };

//   const addItem = (i) => {
//     const updated = [...(form.sections || [])];

//     updated[i].items = [...(updated[i].items || []), ""];

//     setForm({
//       ...form,
//       sections: updated,
//     });
//   };

//   const updateItem = (i, idx, value) => {
//     const updated = [...(form.sections || [])];

//     updated[i].items[idx] = value;

//     setForm({
//       ...form,
//       sections: updated,
//     });
//   };

//   const confirmRemoveItem = () => {
//     const { sectionIndex, itemIndex } = deleteTarget;

//     if (sectionIndex === null || itemIndex === null) {
//       showModal("error", "No item selected to remove.");
//       closeConfirmModal();
//       return;
//     }

//     setConfirmModal({
//       show: true,
//       loading: true,
//     });

//     const updated = [...(form.sections || [])];

//     updated[sectionIndex].items = updated[sectionIndex].items.filter(
//       (_, index) => index !== itemIndex,
//     );

//     setForm({
//       ...form,
//       sections: updated,
//     });

//     closeConfirmModal();
//     showModal("success", "Section item removed. Please update the service.");
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     if (!form.title?.trim()) {
//       showModal("error", "Service title is required.");
//       return;
//     }

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

//       showModal("success", "Service updated successfully.", true);
//     } catch (err) {
//       console.error(err);
//       showModal(
//         "error",
//         "Update failed. Please check your data and try again.",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const confirmContent =
//     deleteTarget.type === "image"
//       ? {
//           title: "Remove Image?",
//           message:
//             "Are you sure you want to remove this service image? This action cannot be undone.",
//           confirmText: "Remove Image",
//         }
//       : deleteTarget.type === "section"
//         ? {
//             title: "Remove Section?",
//             message:
//               "Are you sure you want to remove this service section? Please update the service after removing.",
//             confirmText: "Remove Section",
//           }
//         : deleteTarget.type === "item"
//           ? {
//               title: "Remove Item?",
//               message:
//                 "Are you sure you want to remove this section item? Please update the service after removing.",
//               confirmText: "Remove Item",
//             }
//           : {
//               title: "Are you sure?",
//               message: "This action cannot be undone.",
//               confirmText: "Confirm",
//             };

//   if (loading) return <div className="p-6 text-center">Loading...</div>;

//   if (!form) {
//     return <div className="p-6 text-center">Service not found</div>;
//   }

//   return (
//     <>
//       <div className="max-w-6xl mx-auto space-y-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//             <FileText className="text-primary" size={28} />
//             Edit Service
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Update service content, hero copy, sections, CTA and footer note.
//           </p>
//         </div>

//         <form onSubmit={handleUpdate} className="space-y-8">
//           <div className={cardClass}>
//             <h2 className="flex items-center gap-2 text-xl font-bold">
//               <ImageIcon size={20} className="text-primary" />
//               Basic Information
//             </h2>

//             <input
//               value={form.title || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   title: e.target.value,
//                 })
//               }
//               className={inputClass}
//               placeholder="Title"
//             />

//             <input
//               value={form.slug || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   slug: e.target.value,
//                 })
//               }
//               className={inputClass}
//               placeholder="Slug"
//             />

//             <textarea
//               value={form.description || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   description: e.target.value,
//                 })
//               }
//               rows={4}
//               className={inputClass}
//               placeholder="Description"
//             />

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className={inputClass}
//             />

//             {(preview || form.image) && (
//               <div className="relative w-fit rounded-2xl border bg-gray-50 p-3">
//                 <img
//                   src={preview || form.image}
//                   className="w-72 h-44 object-cover rounded-xl"
//                   alt="Service"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => requestDelete("image")}
//                   className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className={cardClass}>
//             <h2 className="flex items-center gap-2 text-xl font-bold">
//               <Layers size={20} className="text-primary" />
//               Hero Content
//             </h2>

//             <input
//               value={form.hero?.title || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   hero: {
//                     ...form.hero,
//                     title: e.target.value,
//                   },
//                 })
//               }
//               className={inputClass}
//               placeholder="Hero Title"
//             />

//             <textarea
//               value={form.hero?.description1 || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   hero: {
//                     ...form.hero,
//                     description1: e.target.value,
//                   },
//                 })
//               }
//               rows={3}
//               className={inputClass}
//               placeholder="Description 1"
//             />

//             <textarea
//               value={form.hero?.description2 || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   hero: {
//                     ...form.hero,
//                     description2: e.target.value,
//                   },
//                 })
//               }
//               rows={3}
//               className={inputClass}
//               placeholder="Description 2"
//             />
//           </div>

//           <div className={cardClass}>
//             <div className="flex items-center justify-between">
//               <h2 className="flex items-center gap-2 text-xl font-bold">
//                 <Layers size={20} className="text-primary" />
//                 Service Sections
//               </h2>

//               <button
//                 type="button"
//                 onClick={addSection}
//                 className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
//               >
//                 <Plus size={14} />
//                 Add Section
//               </button>
//             </div>

//             {(form.sections || []).length === 0 ? (
//               <p className="rounded-2xl bg-gray-50 p-6 text-center text-gray-400">
//                 No sections added yet.
//               </p>
//             ) : (
//               (form.sections || []).map((sec, i) => (
//                 <div
//                   key={i}
//                   className="rounded-2xl border bg-gray-50 p-4 space-y-3"
//                 >
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-semibold text-gray-700">
//                       Section {i + 1}
//                     </h3>

//                     <button
//                       type="button"
//                       onClick={() => requestDelete("section", i)}
//                       className="rounded-lg bg-red-100 p-2 text-red-500 hover:bg-red-500 hover:text-white transition"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </div>

//                   <input
//                     value={sec.title || ""}
//                     onChange={(e) => updateSection(i, "title", e.target.value)}
//                     className={inputClass}
//                     placeholder="Title"
//                   />

//                   <textarea
//                     value={sec.description || ""}
//                     onChange={(e) =>
//                       updateSection(i, "description", e.target.value)
//                     }
//                     rows={3}
//                     className={inputClass}
//                     placeholder="Description"
//                   />

//                   {(sec.items || []).map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="grid gap-3 md:grid-cols-[1fr_auto]"
//                     >
//                       <input
//                         value={item || ""}
//                         onChange={(e) => updateItem(i, idx, e.target.value)}
//                         className={inputClass}
//                         placeholder="Item"
//                       />

//                       <button
//                         type="button"
//                         onClick={() => requestDelete("item", i, idx)}
//                         className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
//                       >
//                         <Trash2 size={15} />
//                       </button>
//                     </div>
//                   ))}

//                   <button
//                     type="button"
//                     onClick={() => addItem(i)}
//                     className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
//                   >
//                     <Plus size={14} />
//                     Add Item
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className={cardClass}>
//             <h2 className="flex items-center gap-2 text-xl font-bold">
//               <Megaphone size={20} className="text-primary" />
//               CTA Content
//             </h2>

//             <input
//               value={form.cta?.title || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   cta: {
//                     ...form.cta,
//                     title: e.target.value,
//                   },
//                 })
//               }
//               className={inputClass}
//               placeholder="CTA Title"
//             />

//             <textarea
//               value={form.cta?.description || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   cta: {
//                     ...form.cta,
//                     description: e.target.value,
//                   },
//                 })
//               }
//               rows={3}
//               className={inputClass}
//               placeholder="CTA Description"
//             />

//             <input
//               value={form.cta?.buttonText || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   cta: {
//                     ...form.cta,
//                     buttonText: e.target.value,
//                   },
//                 })
//               }
//               className={inputClass}
//               placeholder="Button Text"
//             />
//           </div>

//           <div className={cardClass}>
//             <h2 className="text-xl font-bold">Footer Note</h2>

//             <textarea
//               value={form.footerNote || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   footerNote: e.target.value,
//                 })
//               }
//               rows={3}
//               className={inputClass}
//               placeholder="Footer Note"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={saving}
//             className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:-translate-y-1 hover:bg-secondary transition disabled:opacity-60"
//           >
//             <Save size={18} />
//             {saving ? "Updating..." : "Update Service"}
//           </button>
//         </form>
//       </div>

//       <ConfirmModal
//         show={confirmModal.show}
//         title={confirmContent.title}
//         message={confirmContent.message}
//         confirmText={confirmContent.confirmText}
//         cancelText="Cancel"
//         loading={confirmModal.loading}
//         onCancel={closeConfirmModal}
//         onConfirm={confirmDelete}
//       />

//       <StatusModal
//         show={modal.show}
//         type={modal.type}
//         message={modal.message}
//         onClose={closeModal}
//       />
//     </>
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
  ShieldCheck,
  ClipboardList,
} from "lucide-react";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

const emptySnapshot = {
  label: "Service Snapshot",
  core_area_label: "Core areas",
  audit_points_label: "Audit points",
  best_for_label: "Best for",
  best_for_title: "",
  best_for_description: "",
};

const emptyHero = {
  title: "",
  description1: "",
  description2: "",
  trust_items: ["", "", ""],
  snapshot: emptySnapshot,
};

const emptyCta = {
  eyebrow: "Speak with MAH Audit Dubai",
  title: "",
  description: "",
  badges: [""],
  cardLabel: "Ready to talk?",
  cardTitle: "",
  buttonText: "",
  buttonLink: "/contact",
  note: "No obligation. 100% confidential.",
};

function parseJSON(value, fallback) {
  if (!value) return fallback;

  if (typeof value === "object") return value;

  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  return fallback;
}

function normalizeTrustItems(items) {
  const parsed = parseJSON(items, []);

  if (!Array.isArray(parsed)) return ["", "", ""];

  const normalized = parsed
    .map((item) => {
      if (typeof item === "string") return item;
      return item?.label || "";
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized : ["", "", ""];
}

function normalizeBadges(items) {
  const parsed = parseJSON(items, []);

  if (!Array.isArray(parsed)) return [""];

  const normalized = parsed
    .map((item) => (typeof item === "string" ? item : ""))
    .filter(Boolean);

  return normalized.length > 0 ? normalized : [""];
}

function normalizeHero(heroData) {
  const hero = parseJSON(heroData, {});

  return {
    title: hero?.title || "",
    description1: hero?.description1 || "",
    description2: hero?.description2 || "",
    trust_items: normalizeTrustItems(hero?.trust_items),
    snapshot: {
      ...emptySnapshot,
      ...(hero?.snapshot && typeof hero.snapshot === "object"
        ? hero.snapshot
        : {}),
    },
  };
}

function normalizeCta(ctaData) {
  const cta = parseJSON(ctaData, {});

  return {
    ...emptyCta,
    ...cta,
    badges: normalizeBadges(cta?.badges),
  };
}

function normalizeSections(sectionsData) {
  const sections = parseJSON(sectionsData, []);

  if (!Array.isArray(sections)) return [];

  return sections.map((section) => ({
    title: section?.title || "",
    description: section?.description || "",
    items: Array.isArray(section?.items) ? section.items : [],
  }));
}

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

  const textareaClass =
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
        hero: normalizeHero(data.hero),
        sections: normalizeSections(data.sections),
        cta: normalizeCta(data.cta),
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

  const handleHeroChange = (field, value) => {
    setForm({
      ...form,
      hero: {
        ...form.hero,
        [field]: value,
      },
    });
  };

  const updateTrustItem = (index, value) => {
    const updated = [...(form.hero.trust_items || [])];
    updated[index] = value;

    setForm({
      ...form,
      hero: {
        ...form.hero,
        trust_items: updated,
      },
    });
  };

  const addTrustItem = () => {
    setForm({
      ...form,
      hero: {
        ...form.hero,
        trust_items: [...(form.hero.trust_items || []), ""],
      },
    });
  };

  const removeTrustItem = (index) => {
    setForm({
      ...form,
      hero: {
        ...form.hero,
        trust_items: (form.hero.trust_items || []).filter(
          (_, i) => i !== index,
        ),
      },
    });
  };

  const handleSnapshotChange = (field, value) => {
    setForm({
      ...form,
      hero: {
        ...form.hero,
        snapshot: {
          ...form.hero.snapshot,
          [field]: value,
        },
      },
    });
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

  const handleCtaChange = (field, value) => {
    setForm({
      ...form,
      cta: {
        ...form.cta,
        [field]: value,
      },
    });
  };

  const updateCtaBadge = (index, value) => {
    const updated = [...(form.cta.badges || [])];
    updated[index] = value;

    setForm({
      ...form,
      cta: {
        ...form.cta,
        badges: updated,
      },
    });
  };

  const addCtaBadge = () => {
    setForm({
      ...form,
      cta: {
        ...form.cta,
        badges: [...(form.cta.badges || []), ""],
      },
    });
  };

  const removeCtaBadge = (index) => {
    setForm({
      ...form,
      cta: {
        ...form.cta,
        badges: (form.cta.badges || []).filter((_, i) => i !== index),
      },
    });
  };

  const getCleanPayload = () => {
    const cleanTrustItems = (form.hero.trust_items || [])
      .map((item) => item.trim())
      .filter(Boolean);

    const cleanBadges = (form.cta.badges || [])
      .map((badge) => badge.trim())
      .filter(Boolean);

    const cleanSections = (form.sections || [])
      .filter((section) => section.title?.trim())
      .map((section) => ({
        title: section.title,
        description: section.description || "",
        items: (section.items || []).map((item) => item.trim()).filter(Boolean),
      }));

    return {
      title: form.title,
      slug: form.slug,
      description: form.description,
      image: form.image,
      public_id: form.public_id || null,
      hero: {
        title: form.hero.title,
        description1: form.hero.description1,
        description2: form.hero.description2,
        trust_items: cleanTrustItems,
        snapshot: {
          label: form.hero.snapshot.label,
          core_area_label: form.hero.snapshot.core_area_label,
          audit_points_label: form.hero.snapshot.audit_points_label,
          best_for_label: form.hero.snapshot.best_for_label,
          best_for_title: form.hero.snapshot.best_for_title,
          best_for_description: form.hero.snapshot.best_for_description,
        },
      },
      sections: cleanSections,
      footer_note: form.footerNote,
      cta: {
        eyebrow: form.cta.eyebrow,
        title: form.cta.title,
        description: form.cta.description,
        badges: cleanBadges,
        cardLabel: form.cta.cardLabel,
        cardTitle: form.cta.cardTitle,
        buttonText: form.cta.buttonText,
        buttonLink: form.cta.buttonLink,
        note: form.cta.note,
      },
    };
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!form.title?.trim()) {
      showModal("error", "Service title is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = getCleanPayload();

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
            Update service content, hero copy, trust items, snapshot, sections,
            CTA and footer note.
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
              className={textareaClass}
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
              onChange={(e) => handleHeroChange("title", e.target.value)}
              className={inputClass}
              placeholder="Hero Title"
            />

            <textarea
              value={form.hero?.description1 || ""}
              onChange={(e) => handleHeroChange("description1", e.target.value)}
              rows={3}
              className={textareaClass}
              placeholder="Description 1"
            />

            <textarea
              value={form.hero?.description2 || ""}
              onChange={(e) => handleHeroChange("description2", e.target.value)}
              rows={3}
              className={textareaClass}
              placeholder="Description 2"
            />
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <ShieldCheck size={20} className="text-primary" />
                Hero Trust Items
              </h2>

              <button
                type="button"
                onClick={addTrustItem}
                className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
              >
                <Plus size={14} />
                Add Trust Item
              </button>
            </div>

            {(form.hero?.trust_items || []).map((item, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                  value={item || ""}
                  onChange={(e) => updateTrustItem(index, e.target.value)}
                  className={inputClass}
                  placeholder={`Trust Item ${index + 1}`}
                />

                <button
                  type="button"
                  onClick={() => removeTrustItem(index)}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <ClipboardList size={20} className="text-primary" />
              Service Snapshot
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.hero?.snapshot?.label || ""}
                onChange={(e) => handleSnapshotChange("label", e.target.value)}
                className={inputClass}
                placeholder="Snapshot Label"
              />

              <input
                value={form.hero?.snapshot?.core_area_label || ""}
                onChange={(e) =>
                  handleSnapshotChange("core_area_label", e.target.value)
                }
                className={inputClass}
                placeholder="Core Area Label"
              />

              <input
                value={form.hero?.snapshot?.audit_points_label || ""}
                onChange={(e) =>
                  handleSnapshotChange("audit_points_label", e.target.value)
                }
                className={inputClass}
                placeholder="Audit Points Label"
              />

              <input
                value={form.hero?.snapshot?.best_for_label || ""}
                onChange={(e) =>
                  handleSnapshotChange("best_for_label", e.target.value)
                }
                className={inputClass}
                placeholder="Best For Label"
              />
            </div>

            <input
              value={form.hero?.snapshot?.best_for_title || ""}
              onChange={(e) =>
                handleSnapshotChange("best_for_title", e.target.value)
              }
              className={inputClass}
              placeholder="Best For Title"
            />

            <textarea
              value={form.hero?.snapshot?.best_for_description || ""}
              onChange={(e) =>
                handleSnapshotChange("best_for_description", e.target.value)
              }
              rows={3}
              className={textareaClass}
              placeholder="Best For Description"
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
                    className={textareaClass}
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
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Megaphone size={20} className="text-primary" />
                CTA Content
              </h2>

              <button
                type="button"
                onClick={addCtaBadge}
                className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
              >
                <Plus size={14} />
                Add CTA Badge
              </button>
            </div>

            <input
              value={form.cta?.eyebrow || ""}
              onChange={(e) => handleCtaChange("eyebrow", e.target.value)}
              className={inputClass}
              placeholder="CTA Eyebrow"
            />

            <input
              value={form.cta?.title || ""}
              onChange={(e) => handleCtaChange("title", e.target.value)}
              className={inputClass}
              placeholder="CTA Title"
            />

            <textarea
              value={form.cta?.description || ""}
              onChange={(e) => handleCtaChange("description", e.target.value)}
              rows={3}
              className={textareaClass}
              placeholder="CTA Description"
            />

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">CTA Badges</h3>

              {(form.cta?.badges || []).map((badge, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input
                    value={badge || ""}
                    onChange={(e) => updateCtaBadge(index, e.target.value)}
                    className={inputClass}
                    placeholder={`CTA Badge ${index + 1}`}
                  />

                  <button
                    type="button"
                    onClick={() => removeCtaBadge(index)}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.cta?.cardLabel || ""}
                onChange={(e) => handleCtaChange("cardLabel", e.target.value)}
                className={inputClass}
                placeholder="CTA Card Label"
              />

              <input
                value={form.cta?.cardTitle || ""}
                onChange={(e) => handleCtaChange("cardTitle", e.target.value)}
                className={inputClass}
                placeholder="CTA Card Title"
              />

              <input
                value={form.cta?.buttonText || ""}
                onChange={(e) => handleCtaChange("buttonText", e.target.value)}
                className={inputClass}
                placeholder="CTA Button Text"
              />

              <input
                value={form.cta?.buttonLink || ""}
                onChange={(e) => handleCtaChange("buttonLink", e.target.value)}
                className={inputClass}
                placeholder="CTA Button Link"
              />
            </div>

            <input
              value={form.cta?.note || ""}
              onChange={(e) => handleCtaChange("note", e.target.value)}
              className={inputClass}
              placeholder="CTA Note"
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
              className={textareaClass}
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
