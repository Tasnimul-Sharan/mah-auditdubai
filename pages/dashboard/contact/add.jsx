// // "use client";

// // import { useEffect, useState } from "react";
// // import AdminLayout from "@/components/AdminLayout";
// // import { supabaseServer } from "@/lib/supabaseServer";
// // import { useUpload } from "@/Hooks/useUpload";
// // import {
// //   Save,
// //   Trash2,
// //   Plus,
// //   Contact,
// //   MapPin,
// //   BarChart3,
// //   Search,
// //   ImageIcon,
// // } from "lucide-react";
// // import StatusModal from "@/components/StatusModal";
// // import ConfirmModal from "@/components/ConfirmModal";

// // export default function AddContactPageAdmin() {
// //   const { uploadFile } = useUpload();

// //   const [rowId, setRowId] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [fetching, setFetching] = useState(true);

// //   const [file, setFile] = useState(null);
// //   const [preview, setPreview] = useState("");

// //   const [deleteTarget, setDeleteTarget] = useState({
// //     type: null,
// //     index: null,
// //   });

// //   const [modal, setModal] = useState({
// //     show: false,
// //     type: "success",
// //     message: "",
// //   });

// //   const [confirmModal, setConfirmModal] = useState({
// //     show: false,
// //     loading: false,
// //   });

// //   const [data, setData] = useState({
// //     hero: {
// //       badge: "",
// //       title: "",
// //       description: "",
// //     },
// //     stats: [
// //       { number: "", label: "" },
// //       { number: "", label: "" },
// //       { number: "", label: "" },
// //     ],
// //     contact_info: {
// //       form_title: "",
// //       form_subtitle: "",
// //       button_text: "",
// //       cards: [
// //         { icon: "phone", title: "", text: "", value: "" },
// //         { icon: "email", title: "", text: "", value: "" },
// //         { icon: "location", title: "", text: "", value: "" },
// //       ],
// //     },
// //     map_url: "",

// //     meta_title: "",
// //     meta_description: "",
// //     meta_keywords: "",
// //     meta_author: "",
// //     meta_url: "",
// //     meta_image: "",

// //     hero_title: "",
// //     hero_image: "",
// //     public_id: null,
// //   });

// //   const inputClass =
// //     "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

// //   const textareaClass =
// //     "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

// //   const cardClass =
// //     "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

// //   const sectionTitleClass =
// //     "flex items-center gap-2 text-lg font-bold text-gray-900";

// //   const showModal = (type, message) => {
// //     setModal({
// //       show: true,
// //       type,
// //       message,
// //     });
// //   };

// //   const closeModal = () => {
// //     setModal({
// //       show: false,
// //       type: "success",
// //       message: "",
// //     });
// //   };

// //   const closeConfirmModal = () => {
// //     setConfirmModal({
// //       show: false,
// //       loading: false,
// //     });

// //     setDeleteTarget({
// //       type: null,
// //       index: null,
// //     });
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const normalizeData = (res) => ({
// //     hero: res?.hero || {
// //       badge: "",
// //       title: "",
// //       description: "",
// //     },
// //     stats: res?.stats || [
// //       { number: "", label: "" },
// //       { number: "", label: "" },
// //       { number: "", label: "" },
// //     ],
// //     contact_info:
// //       res?.contact_info && !Array.isArray(res.contact_info)
// //         ? {
// //             form_title: res.contact_info.form_title || "",
// //             form_subtitle: res.contact_info.form_subtitle || "",
// //             button_text: res.contact_info.button_text || "",
// //             cards: res.contact_info.cards || [
// //               { icon: "phone", title: "", text: "", value: "" },
// //               { icon: "email", title: "", text: "", value: "" },
// //               { icon: "location", title: "", text: "", value: "" },
// //             ],
// //           }
// //         : {
// //             form_title: "",
// //             form_subtitle: "",
// //             button_text: "",
// //             cards: Array.isArray(res?.contact_info)
// //               ? res.contact_info.map((item, index) => ({
// //                   icon:
// //                     index === 0 ? "phone" : index === 1 ? "email" : "location",
// //                   title: item.title || "",
// //                   text: item.text || "",
// //                   value: item.value || "",
// //                 }))
// //               : [
// //                   { icon: "phone", title: "", text: "", value: "" },
// //                   { icon: "email", title: "", text: "", value: "" },
// //                   { icon: "location", title: "", text: "", value: "" },
// //                 ],
// //           },
// //     map_url: res?.map_url || "",

// //     meta_title: res?.meta_title || "",
// //     meta_description: res?.meta_description || "",
// //     meta_keywords: res?.meta_keywords || "",
// //     meta_author: res?.meta_author || "",
// //     meta_url: res?.meta_url || "",
// //     meta_image: res?.meta_image || "",

// //     hero_title: res?.hero_title || "",
// //     hero_image: res?.hero_image || "",
// //     public_id: res?.public_id || null,
// //   });

// //   const fetchData = async () => {
// //     setFetching(true);

// //     const { data: res, error } = await supabaseServer
// //       .from("contact_page")
// //       .select("*")
// //       .single();

// //     if (error && error.code !== "PGRST116") {
// //       console.error(error);
// //     }

// //     if (res) {
// //       setRowId(res.id);
// //       setData(normalizeData(res));
// //     }

// //     setFetching(false);
// //   };

// //   const handleHeroChange = (field, value) => {
// //     setData({
// //       ...data,
// //       hero: {
// //         ...data.hero,
// //         [field]: value,
// //       },
// //     });
// //   };

// //   const handleStatChange = (index, field, value) => {
// //     const updated = [...(data.stats || [])];

// //     updated[index] = {
// //       ...updated[index],
// //       [field]: value,
// //     };

// //     setData({
// //       ...data,
// //       stats: updated,
// //     });
// //   };

// //   const handleContactChange = (index, field, value) => {
// //     const updatedCards = [...(data.contact_info.cards || [])];

// //     updatedCards[index] = {
// //       ...updatedCards[index],
// //       [field]: value,
// //     };

// //     setData({
// //       ...data,
// //       contact_info: {
// //         ...data.contact_info,
// //         cards: updatedCards,
// //       },
// //     });
// //   };

// //   const handleFormInfoChange = (field, value) => {
// //     setData({
// //       ...data,
// //       contact_info: {
// //         ...data.contact_info,
// //         [field]: value,
// //       },
// //     });
// //   };

// //   const addStat = () => {
// //     setData({
// //       ...data,
// //       stats: [...(data.stats || []), { number: "", label: "" }],
// //     });
// //   };

// //   const addContactCard = () => {
// //     setData({
// //       ...data,
// //       contact_info: {
// //         ...data.contact_info,
// //         cards: [
// //           ...(data.contact_info.cards || []),
// //           { icon: "phone", title: "", text: "", value: "" },
// //         ],
// //       },
// //     });
// //   };

// //   const requestDelete = (type, index = null) => {
// //     if (type === "image" && !data?.public_id) {
// //       showModal("error", "No image found to delete.");
// //       return;
// //     }

// //     setDeleteTarget({
// //       type,
// //       index,
// //     });

// //     setConfirmModal({
// //       show: true,
// //       loading: false,
// //     });
// //   };

// //   const confirmDelete = async () => {
// //     const { type, index } = deleteTarget;

// //     if (!type) {
// //       showModal("error", "No delete action selected.");
// //       closeConfirmModal();
// //       return;
// //     }

// //     setConfirmModal({
// //       show: true,
// //       loading: true,
// //     });

// //     if (type === "image") {
// //       await confirmDeleteImage();
// //       return;
// //     }

// //     if (type === "stat") {
// //       setData({
// //         ...data,
// //         stats: data.stats.filter((_, i) => i !== index),
// //       });

// //       closeConfirmModal();
// //       showModal("success", "Stat removed successfully. Please save changes.");
// //       return;
// //     }

// //     if (type === "contactCard") {
// //       setData({
// //         ...data,
// //         contact_info: {
// //           ...data.contact_info,
// //           cards: data.contact_info.cards.filter((_, i) => i !== index),
// //         },
// //       });

// //       closeConfirmModal();
// //       showModal(
// //         "success",
// //         "Contact card removed successfully. Please save changes.",
// //       );
// //       return;
// //     }

// //     closeConfirmModal();
// //   };

// //   const getConfirmContent = () => {
// //     if (deleteTarget.type === "image") {
// //       return {
// //         title: "Delete Image?",
// //         message:
// //           "Are you sure you want to delete this hero image? This action cannot be undone.",
// //         confirmText: "Delete Image",
// //       };
// //     }

// //     if (deleteTarget.type === "stat") {
// //       return {
// //         title: "Delete Stat?",
// //         message:
// //           "Are you sure you want to remove this stat item? Please save the page after removing.",
// //         confirmText: "Delete Stat",
// //       };
// //     }

// //     if (deleteTarget.type === "contactCard") {
// //       return {
// //         title: "Delete Contact Card?",
// //         message:
// //           "Are you sure you want to remove this contact card? Please save the page after removing.",
// //         confirmText: "Delete Card",
// //       };
// //     }

// //     return {
// //       title: "Are you sure?",
// //       message: "This action cannot be undone.",
// //       confirmText: "Delete",
// //     };
// //   };

// //   const confirmDeleteImage = async () => {
// //     if (!data?.public_id) {
// //       showModal("error", "No image found to delete.");
// //       closeConfirmModal();
// //       return;
// //     }

// //     try {
// //       await fetch("/api/delete-image", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ public_id: data.public_id }),
// //       });

// //       if (rowId) {
// //         const { error } = await supabaseServer
// //           .from("contact_page")
// //           .update({
// //             hero_image: null,
// //             public_id: null,
// //           })
// //           .eq("id", rowId);

// //         if (error) throw error;
// //       }

// //       setData({
// //         ...data,
// //         hero_image: "",
// //         public_id: null,
// //       });

// //       setPreview("");
// //       setFile(null);

// //       closeConfirmModal();
// //       showModal("success", "Hero image deleted successfully.");
// //       fetchData();
// //     } catch (err) {
// //       console.error(err);
// //       closeConfirmModal();
// //       showModal("error", "Image delete failed. Please try again.");
// //     }
// //   };

// //   const handleFileChange = (e) => {
// //     const selected = e.target.files?.[0];
// //     if (!selected) return;

// //     setFile(selected);
// //     setPreview(URL.createObjectURL(selected));
// //   };

// //   const handleSave = async () => {
// //     setLoading(true);

// //     try {
// //       let imageUrl = data.hero_image;
// //       let publicId = data.public_id;

// //       if (file) {
// //         if (data.public_id) {
// //           await fetch("/api/delete-image", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ public_id: data.public_id }),
// //           });
// //         }

// //         const res = await uploadFile(file, "contact");
// //         imageUrl = res.url;
// //         publicId = res.public_id;
// //       }

// //       const payload = {
// //         hero: data.hero,
// //         stats: data.stats,
// //         contact_info: data.contact_info,
// //         map_url: data.map_url,

// //         meta_title: data.meta_title,
// //         meta_description: data.meta_description,
// //         meta_keywords: data.meta_keywords,
// //         meta_author: data.meta_author,
// //         meta_url: data.meta_url,
// //         meta_image: data.meta_image,

// //         hero_title: data.hero_title,
// //         hero_image: imageUrl,
// //         public_id: publicId,
// //       };

// //       if (rowId) {
// //         const { error } = await supabaseServer
// //           .from("contact_page")
// //           .update(payload)
// //           .eq("id", rowId);

// //         if (error) throw error;
// //       } else {
// //         const { data: inserted, error } = await supabaseServer
// //           .from("contact_page")
// //           .insert([payload])
// //           .select()
// //           .single();

// //         if (error) throw error;
// //         setRowId(inserted.id);
// //       }

// //       setFile(null);
// //       setPreview("");

// //       showModal("success", "Contact page saved successfully.");
// //       fetchData();
// //     } catch (err) {
// //       console.error(err);
// //       showModal("error", "Save failed. Please check your data and try again.");
// //     }

// //     setLoading(false);
// //   };

// //   const confirmContent = getConfirmContent();

// //   if (fetching) {
// //     return <div className="p-6 text-gray-500">Loading contact page...</div>;
// //   }

// //   return (
// //     <>
// //       <div className="mx-auto max-w-6xl space-y-8">
// //         <div className="flex flex-col gap-2">
// //           <h1 className="text-3xl font-bold text-gray-900">
// //             Contact Page Management
// //           </h1>
// //           <p className="text-gray-500">
// //             Manage hero content, contact cards, map, and SEO metadata.
// //           </p>
// //         </div>

// //         <div className={cardClass}>
// //           <h2 className={sectionTitleClass}>
// //             <ImageIcon size={20} className="text-primary" />
// //             Top Page Hero
// //           </h2>

// //           <input
// //             placeholder="Hero Title"
// //             value={data.hero_title || ""}
// //             onChange={(e) => setData({ ...data, hero_title: e.target.value })}
// //             className={inputClass}
// //           />

// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={handleFileChange}
// //             className={inputClass}
// //           />

// //           {(preview || data.hero_image) && (
// //             <div className="relative w-fit overflow-hidden rounded-2xl border bg-gray-50 p-2">
// //               <img
// //                 src={preview || data.hero_image}
// //                 className="h-40 w-64 rounded-xl object-cover"
// //                 alt="Contact Hero"
// //               />

// //               {!preview && data.hero_image && (
// //                 <button
// //                   type="button"
// //                   onClick={() => requestDelete("image")}
// //                   className="absolute right-3 top-3 rounded-lg bg-red-500 p-2 text-white transition-all duration-500 hover:bg-red-600"
// //                 >
// //                   <Trash2 size={14} />
// //                 </button>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         <div className={cardClass}>
// //           <h2 className={sectionTitleClass}>
// //             <Contact size={20} className="text-primary" />
// //             Contact Hero Content
// //           </h2>

// //           <input
// //             placeholder="Badge"
// //             value={data.hero.badge || ""}
// //             onChange={(e) => handleHeroChange("badge", e.target.value)}
// //             className={inputClass}
// //           />

// //           <input
// //             placeholder="Title"
// //             value={data.hero.title || ""}
// //             onChange={(e) => handleHeroChange("title", e.target.value)}
// //             className={inputClass}
// //           />

// //           <textarea
// //             placeholder="Description"
// //             value={data.hero.description || ""}
// //             onChange={(e) => handleHeroChange("description", e.target.value)}
// //             rows={4}
// //             className={textareaClass}
// //           />
// //         </div>

// //         <div className={cardClass}>
// //           <div className="flex items-center justify-between gap-4">
// //             <h2 className={sectionTitleClass}>
// //               <BarChart3 size={20} className="text-primary" />
// //               Stats
// //             </h2>

// //             <button
// //               type="button"
// //               onClick={addStat}
// //               className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
// //             >
// //               <Plus size={14} />
// //               Add Stat
// //             </button>
// //           </div>

// //           <div className="grid gap-4 md:grid-cols-3">
// //             {(data.stats || []).map((stat, i) => (
// //               <div
// //                 key={i}
// //                 className="rounded-2xl border bg-gray-50 p-4 space-y-3"
// //               >
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm font-semibold text-gray-500">
// //                     Stat {i + 1}
// //                   </span>

// //                   {data.stats.length > 1 && (
// //                     <button
// //                       type="button"
// //                       onClick={() => requestDelete("stat", i)}
// //                       className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
// //                     >
// //                       <Trash2 size={14} />
// //                     </button>
// //                   )}
// //                 </div>

// //                 <input
// //                   placeholder="Number"
// //                   value={stat.number || ""}
// //                   onChange={(e) =>
// //                     handleStatChange(i, "number", e.target.value)
// //                   }
// //                   className={inputClass}
// //                 />

// //                 <input
// //                   placeholder="Label"
// //                   value={stat.label || ""}
// //                   onChange={(e) => handleStatChange(i, "label", e.target.value)}
// //                   className={inputClass}
// //                 />
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className={cardClass}>
// //           <div className="flex items-center justify-between gap-4">
// //             <h2 className={sectionTitleClass}>
// //               <Contact size={20} className="text-primary" />
// //               Contact Info & Form
// //             </h2>

// //             <button
// //               type="button"
// //               onClick={addContactCard}
// //               className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
// //             >
// //               <Plus size={14} />
// //               Add Card
// //             </button>
// //           </div>

// //           <div className="rounded-2xl border bg-gray-50 p-4 space-y-4">
// //             <h3 className="font-semibold text-gray-700">Form Content</h3>

// //             <input
// //               placeholder="Form Title"
// //               value={data.contact_info.form_title || ""}
// //               onChange={(e) =>
// //                 handleFormInfoChange("form_title", e.target.value)
// //               }
// //               className={inputClass}
// //             />

// //             <textarea
// //               placeholder="Form Subtitle"
// //               value={data.contact_info.form_subtitle || ""}
// //               onChange={(e) =>
// //                 handleFormInfoChange("form_subtitle", e.target.value)
// //               }
// //               rows={3}
// //               className={textareaClass}
// //             />

// //             <input
// //               placeholder="Button Text"
// //               value={data.contact_info.button_text || ""}
// //               onChange={(e) =>
// //                 handleFormInfoChange("button_text", e.target.value)
// //               }
// //               className={inputClass}
// //             />
// //           </div>

// //           <div className="grid gap-4 md:grid-cols-3">
// //             {(data.contact_info.cards || []).map((item, i) => (
// //               <div
// //                 key={i}
// //                 className="rounded-2xl border bg-gray-50 p-4 space-y-3"
// //               >
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm font-semibold text-gray-500">
// //                     Contact Card {i + 1}
// //                   </span>

// //                   {data.contact_info.cards.length > 1 && (
// //                     <button
// //                       type="button"
// //                       onClick={() => requestDelete("contactCard", i)}
// //                       className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
// //                     >
// //                       <Trash2 size={14} />
// //                     </button>
// //                   )}
// //                 </div>

// //                 <select
// //                   value={item.icon || "phone"}
// //                   onChange={(e) =>
// //                     handleContactChange(i, "icon", e.target.value)
// //                   }
// //                   className={inputClass}
// //                 >
// //                   <option value="phone">Phone</option>
// //                   <option value="email">Email</option>
// //                   <option value="location">Location</option>
// //                 </select>

// //                 <input
// //                   placeholder="Title"
// //                   value={item.title || ""}
// //                   onChange={(e) =>
// //                     handleContactChange(i, "title", e.target.value)
// //                   }
// //                   className={inputClass}
// //                 />

// //                 <input
// //                   placeholder="Text"
// //                   value={item.text || ""}
// //                   onChange={(e) =>
// //                     handleContactChange(i, "text", e.target.value)
// //                   }
// //                   className={inputClass}
// //                 />

// //                 <input
// //                   placeholder="Value"
// //                   value={item.value || ""}
// //                   onChange={(e) =>
// //                     handleContactChange(i, "value", e.target.value)
// //                   }
// //                   className={inputClass}
// //                 />
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className={cardClass}>
// //           <h2 className={sectionTitleClass}>
// //             <MapPin size={20} className="text-primary" />
// //             Map
// //           </h2>

// //           <textarea
// //             placeholder="Google Map Embed URL"
// //             value={data.map_url || ""}
// //             onChange={(e) => setData({ ...data, map_url: e.target.value })}
// //             rows={4}
// //             className={textareaClass}
// //           />
// //         </div>

// //         <div className={cardClass}>
// //           <h2 className={sectionTitleClass}>
// //             <Search size={20} className="text-primary" />
// //             SEO Meta
// //           </h2>

// //           <input
// //             placeholder="Meta Title"
// //             value={data.meta_title || ""}
// //             onChange={(e) => setData({ ...data, meta_title: e.target.value })}
// //             className={inputClass}
// //           />

// //           <textarea
// //             placeholder="Meta Description"
// //             value={data.meta_description || ""}
// //             onChange={(e) =>
// //               setData({ ...data, meta_description: e.target.value })
// //             }
// //             rows={3}
// //             className={textareaClass}
// //           />

// //           <textarea
// //             placeholder="Meta Keywords"
// //             value={data.meta_keywords || ""}
// //             onChange={(e) =>
// //               setData({ ...data, meta_keywords: e.target.value })
// //             }
// //             rows={3}
// //             className={textareaClass}
// //           />

// //           <input
// //             placeholder="Meta Author"
// //             value={data.meta_author || ""}
// //             onChange={(e) => setData({ ...data, meta_author: e.target.value })}
// //             className={inputClass}
// //           />

// //           <input
// //             placeholder="Meta URL"
// //             value={data.meta_url || ""}
// //             onChange={(e) => setData({ ...data, meta_url: e.target.value })}
// //             className={inputClass}
// //           />

// //           <input
// //             placeholder="Meta Image URL"
// //             value={data.meta_image || ""}
// //             onChange={(e) => setData({ ...data, meta_image: e.target.value })}
// //             className={inputClass}
// //           />
// //         </div>

// //         <button
// //           type="button"
// //           onClick={handleSave}
// //           disabled={loading}
// //           className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
// //         >
// //           <Save size={18} />
// //           {loading ? "Saving..." : "Save Contact Page"}
// //         </button>
// //       </div>

// //       <ConfirmModal
// //         show={confirmModal.show}
// //         title={confirmContent.title}
// //         message={confirmContent.message}
// //         confirmText={confirmContent.confirmText}
// //         cancelText="Cancel"
// //         loading={confirmModal.loading}
// //         onCancel={closeConfirmModal}
// //         onConfirm={confirmDelete}
// //       />

// //       <StatusModal
// //         show={modal.show}
// //         type={modal.type}
// //         message={modal.message}
// //         onClose={closeModal}
// //       />
// //     </>
// //   );
// // }

// // AddContactPageAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// "use client";

// import { useEffect, useState } from "react";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useUpload } from "@/Hooks/useUpload";
// import {
//   Save,
//   Trash2,
//   Plus,
//   Contact,
//   MapPin,
//   BarChart3,
//   Search,
//   ImageIcon,
// } from "lucide-react";
// import StatusModal from "@/components/StatusModal";
// import ConfirmModal from "@/components/ConfirmModal";

// export default function AddContactPageAdmin() {
//   const { uploadFile } = useUpload();

//   const [rowId, setRowId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [deleteTarget, setDeleteTarget] = useState({
//     type: null,
//     index: null,
//   });

//   const [modal, setModal] = useState({
//     show: false,
//     type: "success",
//     message: "",
//   });

//   const [confirmModal, setConfirmModal] = useState({
//     show: false,
//     loading: false,
//   });

//   const [data, setData] = useState({
//     hero: {
//       badge: "",
//       title: "",
//       description: "",
//     },

//     form_content: {
//       badge: "",
//       title: "",
//       description: "",
//     },

//     stats: [
//       { number: "", label: "" },
//       { number: "", label: "" },
//       { number: "", label: "" },
//     ],

//     contact_info: {
//       button_text: "",
//       cards: [
//         { icon: "phone", title: "", text: "", value: "" },
//         { icon: "email", title: "", text: "", value: "" },
//         { icon: "location", title: "", text: "", value: "" },
//       ],
//     },

//     map_url: "",

//     meta_title: "",
//     meta_description: "",
//     meta_keywords: "",
//     meta_author: "",
//     meta_url: "",
//     meta_image: "",

//     hero_title: "",
//     hero_image: "",
//     public_id: null,
//   });

//   const inputClass =
//     "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

//   const textareaClass =
//     "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

//   const cardClass =
//     "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

//   const sectionTitleClass =
//     "flex items-center gap-2 text-lg font-bold text-gray-900";

//   const showModal = (type, message) => {
//     setModal({
//       show: true,
//       type,
//       message,
//     });
//   };

//   const closeModal = () => {
//     setModal({
//       show: false,
//       type: "success",
//       message: "",
//     });
//   };

//   const closeConfirmModal = () => {
//     setConfirmModal({
//       show: false,
//       loading: false,
//     });

//     setDeleteTarget({
//       type: null,
//       index: null,
//     });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const getDefaultCards = () => [
//     { icon: "phone", title: "", text: "", value: "" },
//     { icon: "email", title: "", text: "", value: "" },
//     { icon: "location", title: "", text: "", value: "" },
//   ];

//   const normalizeData = (res) => ({
//     hero: res?.hero || {
//       badge: "",
//       title: "",
//       description: "",
//     },

//     form_content: res?.form_content || {
//       badge: "",
//       title: "",
//       description: "",
//     },

//     stats: res?.stats || [
//       { number: "", label: "" },
//       { number: "", label: "" },
//       { number: "", label: "" },
//     ],

//     contact_info:
//       res?.contact_info && !Array.isArray(res.contact_info)
//         ? {
//             button_text: res.contact_info.button_text || "",
//             cards: res.contact_info.cards || getDefaultCards(),
//           }
//         : {
//             button_text: "",
//             cards: Array.isArray(res?.contact_info)
//               ? res.contact_info.map((item, index) => ({
//                   icon:
//                     item.icon ||
//                     (index === 0
//                       ? "phone"
//                       : index === 1
//                         ? "email"
//                         : "location"),
//                   title: item.title || "",
//                   text: item.text || "",
//                   value: item.value || "",
//                 }))
//               : getDefaultCards(),
//           },

//     map_url: res?.map_url || "",

//     meta_title: res?.meta_title || "",
//     meta_description: res?.meta_description || "",
//     meta_keywords: res?.meta_keywords || "",
//     meta_author: res?.meta_author || "",
//     meta_url: res?.meta_url || "",
//     meta_image: res?.meta_image || "",

//     hero_title: res?.hero_title || "",
//     hero_image: res?.hero_image || "",
//     public_id: res?.public_id || null,
//   });

//   const fetchData = async () => {
//     setFetching(true);

//     const { data: res, error } = await supabaseServer
//       .from("contact_page")
//       .select("*")
//       .single();

//     if (error && error.code !== "PGRST116") {
//       console.error(error);
//     }

//     if (res) {
//       setRowId(res.id);
//       setData(normalizeData(res));
//     }

//     setFetching(false);
//   };

//   const handleHeroChange = (field, value) => {
//     setData({
//       ...data,
//       hero: {
//         ...data.hero,
//         [field]: value,
//       },
//     });
//   };

//   const handleFormContentChange = (field, value) => {
//     setData({
//       ...data,
//       form_content: {
//         ...data.form_content,
//         [field]: value,
//       },
//     });
//   };

//   const handleStatChange = (index, field, value) => {
//     const updated = [...(data.stats || [])];

//     updated[index] = {
//       ...updated[index],
//       [field]: value,
//     };

//     setData({
//       ...data,
//       stats: updated,
//     });
//   };

//   const handleContactChange = (index, field, value) => {
//     const updatedCards = [...(data.contact_info.cards || [])];

//     updatedCards[index] = {
//       ...updatedCards[index],
//       [field]: value,
//     };

//     setData({
//       ...data,
//       contact_info: {
//         ...data.contact_info,
//         cards: updatedCards,
//       },
//     });
//   };

//   const handleFormInfoChange = (field, value) => {
//     setData({
//       ...data,
//       contact_info: {
//         ...data.contact_info,
//         [field]: value,
//       },
//     });
//   };

//   const addStat = () => {
//     setData({
//       ...data,
//       stats: [...(data.stats || []), { number: "", label: "" }],
//     });
//   };

//   const addContactCard = () => {
//     setData({
//       ...data,
//       contact_info: {
//         ...data.contact_info,
//         cards: [
//           ...(data.contact_info.cards || []),
//           { icon: "phone", title: "", text: "", value: "" },
//         ],
//       },
//     });
//   };

//   const requestDelete = (type, index = null) => {
//     if (type === "image" && !data?.public_id) {
//       showModal("error", "No image found to delete.");
//       return;
//     }

//     setDeleteTarget({
//       type,
//       index,
//     });

//     setConfirmModal({
//       show: true,
//       loading: false,
//     });
//   };

//   const confirmDelete = async () => {
//     const { type, index } = deleteTarget;

//     if (!type) {
//       showModal("error", "No delete action selected.");
//       closeConfirmModal();
//       return;
//     }

//     setConfirmModal({
//       show: true,
//       loading: true,
//     });

//     if (type === "image") {
//       await confirmDeleteImage();
//       return;
//     }

//     if (type === "stat") {
//       setData({
//         ...data,
//         stats: data.stats.filter((_, i) => i !== index),
//       });

//       closeConfirmModal();
//       showModal("success", "Stat removed successfully. Please save changes.");
//       return;
//     }

//     if (type === "contactCard") {
//       setData({
//         ...data,
//         contact_info: {
//           ...data.contact_info,
//           cards: data.contact_info.cards.filter((_, i) => i !== index),
//         },
//       });

//       closeConfirmModal();
//       showModal(
//         "success",
//         "Contact card removed successfully. Please save changes.",
//       );
//       return;
//     }

//     closeConfirmModal();
//   };

//   const getConfirmContent = () => {
//     if (deleteTarget.type === "image") {
//       return {
//         title: "Delete Image?",
//         message:
//           "Are you sure you want to delete this hero image? This action cannot be undone.",
//         confirmText: "Delete Image",
//       };
//     }

//     if (deleteTarget.type === "stat") {
//       return {
//         title: "Delete Stat?",
//         message:
//           "Are you sure you want to remove this stat item? Please save the page after removing.",
//         confirmText: "Delete Stat",
//       };
//     }

//     if (deleteTarget.type === "contactCard") {
//       return {
//         title: "Delete Contact Card?",
//         message:
//           "Are you sure you want to remove this contact card? Please save the page after removing.",
//         confirmText: "Delete Card",
//       };
//     }

//     return {
//       title: "Are you sure?",
//       message: "This action cannot be undone.",
//       confirmText: "Delete",
//     };
//   };

//   const confirmDeleteImage = async () => {
//     if (!data?.public_id) {
//       showModal("error", "No image found to delete.");
//       closeConfirmModal();
//       return;
//     }

//     try {
//       await fetch("/api/delete-image", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ public_id: data.public_id }),
//       });

//       if (rowId) {
//         const { error } = await supabaseServer
//           .from("contact_page")
//           .update({
//             hero_image: null,
//             public_id: null,
//           })
//           .eq("id", rowId);

//         if (error) throw error;
//       }

//       setData({
//         ...data,
//         hero_image: "",
//         public_id: null,
//       });

//       setPreview("");
//       setFile(null);

//       closeConfirmModal();
//       showModal("success", "Hero image deleted successfully.");
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       closeConfirmModal();
//       showModal("error", "Image delete failed. Please try again.");
//     }
//   };

//   const handleFileChange = (e) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//   };

//   const handleSave = async () => {
//     setLoading(true);

//     try {
//       let imageUrl = data.hero_image;
//       let publicId = data.public_id;

//       if (file) {
//         if (data.public_id) {
//           await fetch("/api/delete-image", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ public_id: data.public_id }),
//           });
//         }

//         const res = await uploadFile(file, "contact");
//         imageUrl = res.url;
//         publicId = res.public_id;
//       }

//       const payload = {
//         hero: data.hero,
//         form_content: data.form_content,
//         stats: data.stats,
//         contact_info: data.contact_info,
//         map_url: data.map_url,

//         meta_title: data.meta_title,
//         meta_description: data.meta_description,
//         meta_keywords: data.meta_keywords,
//         meta_author: data.meta_author,
//         meta_url: data.meta_url,
//         meta_image: data.meta_image,

//         hero_title: data.hero_title,
//         hero_image: imageUrl,
//         public_id: publicId,
//       };

//       if (rowId) {
//         const { error } = await supabaseServer
//           .from("contact_page")
//           .update(payload)
//           .eq("id", rowId);

//         if (error) throw error;
//       } else {
//         const { data: inserted, error } = await supabaseServer
//           .from("contact_page")
//           .insert([payload])
//           .select()
//           .single();

//         if (error) throw error;
//         setRowId(inserted.id);
//       }

//       setFile(null);
//       setPreview("");

//       showModal("success", "Contact page saved successfully.");
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       showModal("error", "Save failed. Please check your data and try again.");
//     }

//     setLoading(false);
//   };

//   const confirmContent = getConfirmContent();

//   if (fetching) {
//     return <div className="p-6 text-gray-500">Loading contact page...</div>;
//   }

//   return (
//     <>
//       <div className="mx-auto max-w-6xl space-y-8">
//         <div className="flex flex-col gap-2">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Contact Page Management
//           </h1>
//           <p className="text-gray-500">
//             Manage hero content, contact cards, map, and SEO metadata.
//           </p>
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <ImageIcon size={20} className="text-primary" />
//             Top Page Hero
//           </h2>

//           <input
//             placeholder="Hero Title"
//             value={data.hero_title || ""}
//             onChange={(e) => setData({ ...data, hero_title: e.target.value })}
//             className={inputClass}
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className={inputClass}
//           />

//           {(preview || data.hero_image) && (
//             <div className="relative w-fit overflow-hidden rounded-2xl border bg-gray-50 p-2">
//               <img
//                 src={preview || data.hero_image}
//                 className="h-40 w-64 rounded-xl object-cover"
//                 alt="Contact Hero"
//               />

//               {!preview && data.hero_image && (
//                 <button
//                   type="button"
//                   onClick={() => requestDelete("image")}
//                   className="absolute right-3 top-3 rounded-lg bg-red-500 p-2 text-white transition-all duration-500 hover:bg-red-600"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <Contact size={20} className="text-primary" />
//             Contact Hero Content
//           </h2>

//           <input
//             placeholder="Badge"
//             value={data.hero.badge || ""}
//             onChange={(e) => handleHeroChange("badge", e.target.value)}
//             className={inputClass}
//           />

//           <input
//             placeholder="Title"
//             value={data.hero.title || ""}
//             onChange={(e) => handleHeroChange("title", e.target.value)}
//             className={inputClass}
//           />

//           <textarea
//             placeholder="Description"
//             value={data.hero.description || ""}
//             onChange={(e) => handleHeroChange("description", e.target.value)}
//             rows={4}
//             className={textareaClass}
//           />
//         </div>

//         <div className={cardClass}>
//           <div className="flex items-center justify-between gap-4">
//             <h2 className={sectionTitleClass}>
//               <BarChart3 size={20} className="text-primary" />
//               Stats
//             </h2>

//             <button
//               type="button"
//               onClick={addStat}
//               className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
//             >
//               <Plus size={14} />
//               Add Stat
//             </button>
//           </div>

//           <div className="grid gap-4 md:grid-cols-3">
//             {(data.stats || []).map((stat, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl border bg-gray-50 p-4 space-y-3"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-semibold text-gray-500">
//                     Stat {i + 1}
//                   </span>

//                   {data.stats.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => requestDelete("stat", i)}
//                       className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   placeholder="Number"
//                   value={stat.number || ""}
//                   onChange={(e) =>
//                     handleStatChange(i, "number", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Label"
//                   value={stat.label || ""}
//                   onChange={(e) => handleStatChange(i, "label", e.target.value)}
//                   className={inputClass}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={cardClass}>
//           <div className="flex items-center justify-between gap-4">
//             <h2 className={sectionTitleClass}>
//               <Contact size={20} className="text-primary" />
//               Contact Info & Form
//             </h2>

//             <button
//               type="button"
//               onClick={addContactCard}
//               className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
//             >
//               <Plus size={14} />
//               Add Card
//             </button>
//           </div>

//           <div className="rounded-2xl border bg-gray-50 p-4 space-y-4">
//             <h3 className="font-semibold text-gray-700">Form Content</h3>

//             <input
//               placeholder="Form Badge"
//               value={data.form_content.badge || ""}
//               onChange={(e) => handleFormContentChange("badge", e.target.value)}
//               className={inputClass}
//             />

//             <input
//               placeholder="Form Title"
//               value={data.form_content.title || ""}
//               onChange={(e) => handleFormContentChange("title", e.target.value)}
//               className={inputClass}
//             />

//             <textarea
//               placeholder="Form Description"
//               value={data.form_content.description || ""}
//               onChange={(e) =>
//                 handleFormContentChange("description", e.target.value)
//               }
//               rows={3}
//               className={textareaClass}
//             />

//             <input
//               placeholder="Button Text"
//               value={data.contact_info.button_text || ""}
//               onChange={(e) =>
//                 handleFormInfoChange("button_text", e.target.value)
//               }
//               className={inputClass}
//             />
//           </div>

//           <div className="grid gap-4 md:grid-cols-3">
//             {(data.contact_info.cards || []).map((item, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl border bg-gray-50 p-4 space-y-3"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-semibold text-gray-500">
//                     Contact Card {i + 1}
//                   </span>

//                   {data.contact_info.cards.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => requestDelete("contactCard", i)}
//                       className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   )}
//                 </div>

//                 <select
//                   value={item.icon || "phone"}
//                   onChange={(e) =>
//                     handleContactChange(i, "icon", e.target.value)
//                   }
//                   className={inputClass}
//                 >
//                   <option value="phone">Phone</option>
//                   <option value="email">Email</option>
//                   <option value="location">Location</option>
//                 </select>

//                 <input
//                   placeholder="Title"
//                   value={item.title || ""}
//                   onChange={(e) =>
//                     handleContactChange(i, "title", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Text"
//                   value={item.text || ""}
//                   onChange={(e) =>
//                     handleContactChange(i, "text", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Value"
//                   value={item.value || ""}
//                   onChange={(e) =>
//                     handleContactChange(i, "value", e.target.value)
//                   }
//                   className={inputClass}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <MapPin size={20} className="text-primary" />
//             Map
//           </h2>

//           <textarea
//             placeholder="Google Map Embed URL"
//             value={data.map_url || ""}
//             onChange={(e) => setData({ ...data, map_url: e.target.value })}
//             rows={4}
//             className={textareaClass}
//           />
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <Search size={20} className="text-primary" />
//             SEO Meta
//           </h2>

//           <input
//             placeholder="Meta Title"
//             value={data.meta_title || ""}
//             onChange={(e) => setData({ ...data, meta_title: e.target.value })}
//             className={inputClass}
//           />

//           <textarea
//             placeholder="Meta Description"
//             value={data.meta_description || ""}
//             onChange={(e) =>
//               setData({ ...data, meta_description: e.target.value })
//             }
//             rows={3}
//             className={textareaClass}
//           />

//           <textarea
//             placeholder="Meta Keywords"
//             value={data.meta_keywords || ""}
//             onChange={(e) =>
//               setData({ ...data, meta_keywords: e.target.value })
//             }
//             rows={3}
//             className={textareaClass}
//           />

//           <input
//             placeholder="Meta Author"
//             value={data.meta_author || ""}
//             onChange={(e) => setData({ ...data, meta_author: e.target.value })}
//             className={inputClass}
//           />

//           <input
//             placeholder="Meta URL"
//             value={data.meta_url || ""}
//             onChange={(e) => setData({ ...data, meta_url: e.target.value })}
//             className={inputClass}
//           />

//           <input
//             placeholder="Meta Image URL"
//             value={data.meta_image || ""}
//             onChange={(e) => setData({ ...data, meta_image: e.target.value })}
//             className={inputClass}
//           />
//         </div>

//         <button
//           type="button"
//           onClick={handleSave}
//           disabled={loading}
//           className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
//         >
//           <Save size={18} />
//           {loading ? "Saving..." : "Save Contact Page"}
//         </button>
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

// AddContactPageAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// "use client";

// import { useEffect, useState } from "react";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useUpload } from "@/Hooks/useUpload";
// import {
//   Save,
//   Trash2,
//   Plus,
//   Contact,
//   MapPin,
//   BarChart3,
//   Search,
//   ImageIcon,
// } from "lucide-react";
// import StatusModal from "@/components/StatusModal";
// import ConfirmModal from "@/components/ConfirmModal";

// export default function AddContactPageAdmin() {
//   const { uploadFile } = useUpload();

//   const [rowId, setRowId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [deleteTarget, setDeleteTarget] = useState({
//     type: null,
//     index: null,
//   });

//   const [modal, setModal] = useState({
//     show: false,
//     type: "success",
//     message: "",
//   });

//   const [confirmModal, setConfirmModal] = useState({
//     show: false,
//     loading: false,
//   });

//   const [data, setData] = useState({
//     hero: {
//       badge: "",
//       title: "",
//       description: "",
//     },
//     stats: [
//       { number: "", label: "" },
//       { number: "", label: "" },
//       { number: "", label: "" },
//     ],
//     contact_info: {
//       form_title: "",
//       form_subtitle: "",
//       button_text: "",
//       cards: [
//         { icon: "phone", title: "", text: "", value: "" },
//         { icon: "email", title: "", text: "", value: "" },
//         { icon: "location", title: "", text: "", value: "" },
//       ],
//     },
//     map_url: "",

//     meta_title: "",
//     meta_description: "",
//     meta_keywords: "",
//     meta_author: "",
//     meta_url: "",
//     meta_image: "",

//     hero_title: "",
//     hero_image: "",
//     public_id: null,
//   });

//   const inputClass =
//     "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

//   const textareaClass =
//     "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

//   const cardClass =
//     "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

//   const sectionTitleClass =
//     "flex items-center gap-2 text-lg font-bold text-gray-900";

//   const showModal = (type, message) => {
//     setModal({
//       show: true,
//       type,
//       message,
//     });
//   };

//   const closeModal = () => {
//     setModal({
//       show: false,
//       type: "success",
//       message: "",
//     });
//   };

//   const closeConfirmModal = () => {
//     setConfirmModal({
//       show: false,
//       loading: false,
//     });

//     setDeleteTarget({
//       type: null,
//       index: null,
//     });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const normalizeData = (res) => ({
//     hero: res?.hero || {
//       badge: "",
//       title: "",
//       description: "",
//     },
//     stats: res?.stats || [
//       { number: "", label: "" },
//       { number: "", label: "" },
//       { number: "", label: "" },
//     ],
//     contact_info:
//       res?.contact_info && !Array.isArray(res.contact_info)
//         ? {
//             form_title: res.contact_info.form_title || "",
//             form_subtitle: res.contact_info.form_subtitle || "",
//             button_text: res.contact_info.button_text || "",
//             cards: res.contact_info.cards || [
//               { icon: "phone", title: "", text: "", value: "" },
//               { icon: "email", title: "", text: "", value: "" },
//               { icon: "location", title: "", text: "", value: "" },
//             ],
//           }
//         : {
//             form_title: "",
//             form_subtitle: "",
//             button_text: "",
//             cards: Array.isArray(res?.contact_info)
//               ? res.contact_info.map((item, index) => ({
//                   icon:
//                     index === 0 ? "phone" : index === 1 ? "email" : "location",
//                   title: item.title || "",
//                   text: item.text || "",
//                   value: item.value || "",
//                 }))
//               : [
//                   { icon: "phone", title: "", text: "", value: "" },
//                   { icon: "email", title: "", text: "", value: "" },
//                   { icon: "location", title: "", text: "", value: "" },
//                 ],
//           },
//     map_url: res?.map_url || "",

//     meta_title: res?.meta_title || "",
//     meta_description: res?.meta_description || "",
//     meta_keywords: res?.meta_keywords || "",
//     meta_author: res?.meta_author || "",
//     meta_url: res?.meta_url || "",
//     meta_image: res?.meta_image || "",

//     hero_title: res?.hero_title || "",
//     hero_image: res?.hero_image || "",
//     public_id: res?.public_id || null,
//   });

//   const fetchData = async () => {
//     setFetching(true);

//     const { data: res, error } = await supabaseServer
//       .from("contact_page")
//       .select("*")
//       .single();

//     if (error && error.code !== "PGRST116") {
//       console.error(error);
//     }

//     if (res) {
//       setRowId(res.id);
//       setData(normalizeData(res));
//     }

//     setFetching(false);
//   };

//   const handleHeroChange = (field, value) => {
//     setData({
//       ...data,
//       hero: {
//         ...data.hero,
//         [field]: value,
//       },
//     });
//   };

//   const handleStatChange = (index, field, value) => {
//     const updated = [...(data.stats || [])];

//     updated[index] = {
//       ...updated[index],
//       [field]: value,
//     };

//     setData({
//       ...data,
//       stats: updated,
//     });
//   };

//   const handleContactChange = (index, field, value) => {
//     const updatedCards = [...(data.contact_info.cards || [])];

//     updatedCards[index] = {
//       ...updatedCards[index],
//       [field]: value,
//     };

//     setData({
//       ...data,
//       contact_info: {
//         ...data.contact_info,
//         cards: updatedCards,
//       },
//     });
//   };

//   const handleFormInfoChange = (field, value) => {
//     setData({
//       ...data,
//       contact_info: {
//         ...data.contact_info,
//         [field]: value,
//       },
//     });
//   };

//   const addStat = () => {
//     setData({
//       ...data,
//       stats: [...(data.stats || []), { number: "", label: "" }],
//     });
//   };

//   const addContactCard = () => {
//     setData({
//       ...data,
//       contact_info: {
//         ...data.contact_info,
//         cards: [
//           ...(data.contact_info.cards || []),
//           { icon: "phone", title: "", text: "", value: "" },
//         ],
//       },
//     });
//   };

//   const requestDelete = (type, index = null) => {
//     if (type === "image" && !data?.public_id) {
//       showModal("error", "No image found to delete.");
//       return;
//     }

//     setDeleteTarget({
//       type,
//       index,
//     });

//     setConfirmModal({
//       show: true,
//       loading: false,
//     });
//   };

//   const confirmDelete = async () => {
//     const { type, index } = deleteTarget;

//     if (!type) {
//       showModal("error", "No delete action selected.");
//       closeConfirmModal();
//       return;
//     }

//     setConfirmModal({
//       show: true,
//       loading: true,
//     });

//     if (type === "image") {
//       await confirmDeleteImage();
//       return;
//     }

//     if (type === "stat") {
//       setData({
//         ...data,
//         stats: data.stats.filter((_, i) => i !== index),
//       });

//       closeConfirmModal();
//       showModal("success", "Stat removed successfully. Please save changes.");
//       return;
//     }

//     if (type === "contactCard") {
//       setData({
//         ...data,
//         contact_info: {
//           ...data.contact_info,
//           cards: data.contact_info.cards.filter((_, i) => i !== index),
//         },
//       });

//       closeConfirmModal();
//       showModal(
//         "success",
//         "Contact card removed successfully. Please save changes.",
//       );
//       return;
//     }

//     closeConfirmModal();
//   };

//   const getConfirmContent = () => {
//     if (deleteTarget.type === "image") {
//       return {
//         title: "Delete Image?",
//         message:
//           "Are you sure you want to delete this hero image? This action cannot be undone.",
//         confirmText: "Delete Image",
//       };
//     }

//     if (deleteTarget.type === "stat") {
//       return {
//         title: "Delete Stat?",
//         message:
//           "Are you sure you want to remove this stat item? Please save the page after removing.",
//         confirmText: "Delete Stat",
//       };
//     }

//     if (deleteTarget.type === "contactCard") {
//       return {
//         title: "Delete Contact Card?",
//         message:
//           "Are you sure you want to remove this contact card? Please save the page after removing.",
//         confirmText: "Delete Card",
//       };
//     }

//     return {
//       title: "Are you sure?",
//       message: "This action cannot be undone.",
//       confirmText: "Delete",
//     };
//   };

//   const confirmDeleteImage = async () => {
//     if (!data?.public_id) {
//       showModal("error", "No image found to delete.");
//       closeConfirmModal();
//       return;
//     }

//     try {
//       await fetch("/api/delete-image", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ public_id: data.public_id }),
//       });

//       if (rowId) {
//         const { error } = await supabaseServer
//           .from("contact_page")
//           .update({
//             hero_image: null,
//             public_id: null,
//           })
//           .eq("id", rowId);

//         if (error) throw error;
//       }

//       setData({
//         ...data,
//         hero_image: "",
//         public_id: null,
//       });

//       setPreview("");
//       setFile(null);

//       closeConfirmModal();
//       showModal("success", "Hero image deleted successfully.");
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       closeConfirmModal();
//       showModal("error", "Image delete failed. Please try again.");
//     }
//   };

//   const handleFileChange = (e) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//   };

//   const handleSave = async () => {
//     setLoading(true);

//     try {
//       let imageUrl = data.hero_image;
//       let publicId = data.public_id;

//       if (file) {
//         if (data.public_id) {
//           await fetch("/api/delete-image", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ public_id: data.public_id }),
//           });
//         }

//         const res = await uploadFile(file, "contact");
//         imageUrl = res.url;
//         publicId = res.public_id;
//       }

//       const payload = {
//         hero: data.hero,
//         stats: data.stats,
//         contact_info: data.contact_info,
//         map_url: data.map_url,

//         meta_title: data.meta_title,
//         meta_description: data.meta_description,
//         meta_keywords: data.meta_keywords,
//         meta_author: data.meta_author,
//         meta_url: data.meta_url,
//         meta_image: data.meta_image,

//         hero_title: data.hero_title,
//         hero_image: imageUrl,
//         public_id: publicId,
//       };

//       if (rowId) {
//         const { error } = await supabaseServer
//           .from("contact_page")
//           .update(payload)
//           .eq("id", rowId);

//         if (error) throw error;
//       } else {
//         const { data: inserted, error } = await supabaseServer
//           .from("contact_page")
//           .insert([payload])
//           .select()
//           .single();

//         if (error) throw error;
//         setRowId(inserted.id);
//       }

//       setFile(null);
//       setPreview("");

//       showModal("success", "Contact page saved successfully.");
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       showModal("error", "Save failed. Please check your data and try again.");
//     }

//     setLoading(false);
//   };

//   const confirmContent = getConfirmContent();

//   if (fetching) {
//     return <div className="p-6 text-gray-500">Loading contact page...</div>;
//   }

//   return (
//     <>
//       <div className="mx-auto max-w-6xl space-y-8">
//         <div className="flex flex-col gap-2">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Contact Page Management
//           </h1>
//           <p className="text-gray-500">
//             Manage hero content, contact cards, map, and SEO metadata.
//           </p>
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <ImageIcon size={20} className="text-primary" />
//             Top Page Hero
//           </h2>

//           <input
//             placeholder="Hero Title"
//             value={data.hero_title || ""}
//             onChange={(e) => setData({ ...data, hero_title: e.target.value })}
//             className={inputClass}
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className={inputClass}
//           />

//           {(preview || data.hero_image) && (
//             <div className="relative w-fit overflow-hidden rounded-2xl border bg-gray-50 p-2">
//               <img
//                 src={preview || data.hero_image}
//                 className="h-40 w-64 rounded-xl object-cover"
//                 alt="Contact Hero"
//               />

//               {!preview && data.hero_image && (
//                 <button
//                   type="button"
//                   onClick={() => requestDelete("image")}
//                   className="absolute right-3 top-3 rounded-lg bg-red-500 p-2 text-white transition-all duration-500 hover:bg-red-600"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <Contact size={20} className="text-primary" />
//             Contact Hero Content
//           </h2>

//           <input
//             placeholder="Badge"
//             value={data.hero.badge || ""}
//             onChange={(e) => handleHeroChange("badge", e.target.value)}
//             className={inputClass}
//           />

//           <input
//             placeholder="Title"
//             value={data.hero.title || ""}
//             onChange={(e) => handleHeroChange("title", e.target.value)}
//             className={inputClass}
//           />

//           <textarea
//             placeholder="Description"
//             value={data.hero.description || ""}
//             onChange={(e) => handleHeroChange("description", e.target.value)}
//             rows={4}
//             className={textareaClass}
//           />
//         </div>

//         <div className={cardClass}>
//           <div className="flex items-center justify-between gap-4">
//             <h2 className={sectionTitleClass}>
//               <BarChart3 size={20} className="text-primary" />
//               Stats
//             </h2>

//             <button
//               type="button"
//               onClick={addStat}
//               className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
//             >
//               <Plus size={14} />
//               Add Stat
//             </button>
//           </div>

//           <div className="grid gap-4 md:grid-cols-3">
//             {(data.stats || []).map((stat, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl border bg-gray-50 p-4 space-y-3"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-semibold text-gray-500">
//                     Stat {i + 1}
//                   </span>

//                   {data.stats.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => requestDelete("stat", i)}
//                       className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   placeholder="Number"
//                   value={stat.number || ""}
//                   onChange={(e) =>
//                     handleStatChange(i, "number", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Label"
//                   value={stat.label || ""}
//                   onChange={(e) => handleStatChange(i, "label", e.target.value)}
//                   className={inputClass}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={cardClass}>
//           <div className="flex items-center justify-between gap-4">
//             <h2 className={sectionTitleClass}>
//               <Contact size={20} className="text-primary" />
//               Contact Info & Form
//             </h2>

//             <button
//               type="button"
//               onClick={addContactCard}
//               className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
//             >
//               <Plus size={14} />
//               Add Card
//             </button>
//           </div>

//           <div className="rounded-2xl border bg-gray-50 p-4 space-y-4">
//             <h3 className="font-semibold text-gray-700">Form Content</h3>

//             <input
//               placeholder="Form Title"
//               value={data.contact_info.form_title || ""}
//               onChange={(e) =>
//                 handleFormInfoChange("form_title", e.target.value)
//               }
//               className={inputClass}
//             />

//             <textarea
//               placeholder="Form Subtitle"
//               value={data.contact_info.form_subtitle || ""}
//               onChange={(e) =>
//                 handleFormInfoChange("form_subtitle", e.target.value)
//               }
//               rows={3}
//               className={textareaClass}
//             />

//             <input
//               placeholder="Button Text"
//               value={data.contact_info.button_text || ""}
//               onChange={(e) =>
//                 handleFormInfoChange("button_text", e.target.value)
//               }
//               className={inputClass}
//             />
//           </div>

//           <div className="grid gap-4 md:grid-cols-3">
//             {(data.contact_info.cards || []).map((item, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl border bg-gray-50 p-4 space-y-3"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-semibold text-gray-500">
//                     Contact Card {i + 1}
//                   </span>

//                   {data.contact_info.cards.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => requestDelete("contactCard", i)}
//                       className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   )}
//                 </div>

//                 <select
//                   value={item.icon || "phone"}
//                   onChange={(e) =>
//                     handleContactChange(i, "icon", e.target.value)
//                   }
//                   className={inputClass}
//                 >
//                   <option value="phone">Phone</option>
//                   <option value="email">Email</option>
//                   <option value="location">Location</option>
//                 </select>

//                 <input
//                   placeholder="Title"
//                   value={item.title || ""}
//                   onChange={(e) =>
//                     handleContactChange(i, "title", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Text"
//                   value={item.text || ""}
//                   onChange={(e) =>
//                     handleContactChange(i, "text", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Value"
//                   value={item.value || ""}
//                   onChange={(e) =>
//                     handleContactChange(i, "value", e.target.value)
//                   }
//                   className={inputClass}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <MapPin size={20} className="text-primary" />
//             Map
//           </h2>

//           <textarea
//             placeholder="Google Map Embed URL"
//             value={data.map_url || ""}
//             onChange={(e) => setData({ ...data, map_url: e.target.value })}
//             rows={4}
//             className={textareaClass}
//           />
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <Search size={20} className="text-primary" />
//             SEO Meta
//           </h2>

//           <input
//             placeholder="Meta Title"
//             value={data.meta_title || ""}
//             onChange={(e) => setData({ ...data, meta_title: e.target.value })}
//             className={inputClass}
//           />

//           <textarea
//             placeholder="Meta Description"
//             value={data.meta_description || ""}
//             onChange={(e) =>
//               setData({ ...data, meta_description: e.target.value })
//             }
//             rows={3}
//             className={textareaClass}
//           />

//           <textarea
//             placeholder="Meta Keywords"
//             value={data.meta_keywords || ""}
//             onChange={(e) =>
//               setData({ ...data, meta_keywords: e.target.value })
//             }
//             rows={3}
//             className={textareaClass}
//           />

//           <input
//             placeholder="Meta Author"
//             value={data.meta_author || ""}
//             onChange={(e) => setData({ ...data, meta_author: e.target.value })}
//             className={inputClass}
//           />

//           <input
//             placeholder="Meta URL"
//             value={data.meta_url || ""}
//             onChange={(e) => setData({ ...data, meta_url: e.target.value })}
//             className={inputClass}
//           />

//           <input
//             placeholder="Meta Image URL"
//             value={data.meta_image || ""}
//             onChange={(e) => setData({ ...data, meta_image: e.target.value })}
//             className={inputClass}
//           />
//         </div>

//         <button
//           type="button"
//           onClick={handleSave}
//           disabled={loading}
//           className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
//         >
//           <Save size={18} />
//           {loading ? "Saving..." : "Save Contact Page"}
//         </button>
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

// AddContactPageAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// "use client";

// import { useEffect, useState } from "react";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useUpload } from "@/Hooks/useUpload";
// import {
//   Save,
//   Trash2,
//   Plus,
//   Contact,
//   MapPin,
//   BarChart3,
//   Search,
//   ImageIcon,
// } from "lucide-react";
// import StatusModal from "@/components/StatusModal";
// import ConfirmModal from "@/components/ConfirmModal";

// export default function AddContactPageAdmin() {
//   const { uploadFile } = useUpload();

//   const [rowId, setRowId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [deleteTarget, setDeleteTarget] = useState({
//     type: null,
//     index: null,
//   });

//   const [modal, setModal] = useState({
//     show: false,
//     type: "success",
//     message: "",
//   });

//   const [confirmModal, setConfirmModal] = useState({
//     show: false,
//     loading: false,
//   });

//   const [data, setData] = useState({
//     hero: {
//       badge: "",
//       title: "",
//       description: "",
//     },

//     form_content: {
//       badge: "",
//       title: "",
//       description: "",
//     },

//     stats: [
//       { number: "", label: "" },
//       { number: "", label: "" },
//       { number: "", label: "" },
//     ],

//     contact_info: {
//       button_text: "",
//       cards: [
//         { icon: "phone", title: "", text: "", value: "" },
//         { icon: "email", title: "", text: "", value: "" },
//         { icon: "location", title: "", text: "", value: "" },
//       ],
//     },

//     map_url: "",

//     meta_title: "",
//     meta_description: "",
//     meta_keywords: "",
//     meta_author: "",
//     meta_url: "",
//     meta_image: "",

//     hero_title: "",
//     hero_image: "",
//     public_id: null,
//   });

//   const inputClass =
//     "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

//   const textareaClass =
//     "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

//   const cardClass =
//     "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

//   const sectionTitleClass =
//     "flex items-center gap-2 text-lg font-bold text-gray-900";

//   const showModal = (type, message) => {
//     setModal({
//       show: true,
//       type,
//       message,
//     });
//   };

//   const closeModal = () => {
//     setModal({
//       show: false,
//       type: "success",
//       message: "",
//     });
//   };

//   const closeConfirmModal = () => {
//     setConfirmModal({
//       show: false,
//       loading: false,
//     });

//     setDeleteTarget({
//       type: null,
//       index: null,
//     });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const getDefaultCards = () => [
//     { icon: "phone", title: "", text: "", value: "" },
//     { icon: "email", title: "", text: "", value: "" },
//     { icon: "location", title: "", text: "", value: "" },
//   ];

//   const normalizeData = (res) => ({
//     hero: res?.hero || {
//       badge: "",
//       title: "",
//       description: "",
//     },

//     form_content: res?.form_content || {
//       badge: "",
//       title: "",
//       description: "",
//     },

//     stats: res?.stats || [
//       { number: "", label: "" },
//       { number: "", label: "" },
//       { number: "", label: "" },
//     ],

//     contact_info:
//       res?.contact_info && !Array.isArray(res.contact_info)
//         ? {
//             button_text: res.contact_info.button_text || "",
//             cards: res.contact_info.cards || getDefaultCards(),
//           }
//         : {
//             button_text: "",
//             cards: Array.isArray(res?.contact_info)
//               ? res.contact_info.map((item, index) => ({
//                   icon:
//                     item.icon ||
//                     (index === 0
//                       ? "phone"
//                       : index === 1
//                         ? "email"
//                         : "location"),
//                   title: item.title || "",
//                   text: item.text || "",
//                   value: item.value || "",
//                 }))
//               : getDefaultCards(),
//           },

//     map_url: res?.map_url || "",

//     meta_title: res?.meta_title || "",
//     meta_description: res?.meta_description || "",
//     meta_keywords: res?.meta_keywords || "",
//     meta_author: res?.meta_author || "",
//     meta_url: res?.meta_url || "",
//     meta_image: res?.meta_image || "",

//     hero_title: res?.hero_title || "",
//     hero_image: res?.hero_image || "",
//     public_id: res?.public_id || null,
//   });

//   const fetchData = async () => {
//     setFetching(true);

//     const { data: res, error } = await supabaseServer
//       .from("contact_page")
//       .select("*")
//       .single();

//     if (error && error.code !== "PGRST116") {
//       console.error(error);
//     }

//     if (res) {
//       setRowId(res.id);
//       setData(normalizeData(res));
//     }

//     setFetching(false);
//   };

//   const handleHeroChange = (field, value) => {
//     setData({
//       ...data,
//       hero: {
//         ...data.hero,
//         [field]: value,
//       },
//     });
//   };

//   const handleFormContentChange = (field, value) => {
//     setData({
//       ...data,
//       form_content: {
//         ...data.form_content,
//         [field]: value,
//       },
//     });
//   };

//   const handleStatChange = (index, field, value) => {
//     const updated = [...(data.stats || [])];

//     updated[index] = {
//       ...updated[index],
//       [field]: value,
//     };

//     setData({
//       ...data,
//       stats: updated,
//     });
//   };

//   const handleContactChange = (index, field, value) => {
//     const updatedCards = [...(data.contact_info.cards || [])];

//     updatedCards[index] = {
//       ...updatedCards[index],
//       [field]: value,
//     };

//     setData({
//       ...data,
//       contact_info: {
//         ...data.contact_info,
//         cards: updatedCards,
//       },
//     });
//   };

//   const handleFormInfoChange = (field, value) => {
//     setData({
//       ...data,
//       contact_info: {
//         ...data.contact_info,
//         [field]: value,
//       },
//     });
//   };

//   const handleFormFieldChange = (fieldName, fieldKey, value) => {
//     setData({
//       ...data,
//       form_content: {
//         ...data.form_content,
//         fields: {
//           ...data.form_content.fields,
//           [fieldName]: {
//             ...data.form_content.fields?.[fieldName],
//             [fieldKey]: value,
//           },
//         },
//       },
//     });
//   };

//   const addStat = () => {
//     setData({
//       ...data,
//       stats: [...(data.stats || []), { number: "", label: "" }],
//     });
//   };

//   const addContactCard = () => {
//     setData({
//       ...data,
//       contact_info: {
//         ...data.contact_info,
//         cards: [
//           ...(data.contact_info.cards || []),
//           { icon: "phone", title: "", text: "", value: "" },
//         ],
//       },
//     });
//   };

//   const requestDelete = (type, index = null) => {
//     if (type === "image" && !data?.public_id) {
//       showModal("error", "No image found to delete.");
//       return;
//     }

//     setDeleteTarget({
//       type,
//       index,
//     });

//     setConfirmModal({
//       show: true,
//       loading: false,
//     });
//   };

//   const confirmDelete = async () => {
//     const { type, index } = deleteTarget;

//     if (!type) {
//       showModal("error", "No delete action selected.");
//       closeConfirmModal();
//       return;
//     }

//     setConfirmModal({
//       show: true,
//       loading: true,
//     });

//     if (type === "image") {
//       await confirmDeleteImage();
//       return;
//     }

//     if (type === "stat") {
//       setData({
//         ...data,
//         stats: data.stats.filter((_, i) => i !== index),
//       });

//       closeConfirmModal();
//       showModal("success", "Stat removed successfully. Please save changes.");
//       return;
//     }

//     if (type === "contactCard") {
//       setData({
//         ...data,
//         contact_info: {
//           ...data.contact_info,
//           cards: data.contact_info.cards.filter((_, i) => i !== index),
//         },
//       });

//       closeConfirmModal();
//       showModal(
//         "success",
//         "Contact card removed successfully. Please save changes.",
//       );
//       return;
//     }

//     closeConfirmModal();
//   };

//   const getConfirmContent = () => {
//     if (deleteTarget.type === "image") {
//       return {
//         title: "Delete Image?",
//         message:
//           "Are you sure you want to delete this hero image? This action cannot be undone.",
//         confirmText: "Delete Image",
//       };
//     }

//     if (deleteTarget.type === "stat") {
//       return {
//         title: "Delete Stat?",
//         message:
//           "Are you sure you want to remove this stat item? Please save the page after removing.",
//         confirmText: "Delete Stat",
//       };
//     }

//     if (deleteTarget.type === "contactCard") {
//       return {
//         title: "Delete Contact Card?",
//         message:
//           "Are you sure you want to remove this contact card? Please save the page after removing.",
//         confirmText: "Delete Card",
//       };
//     }

//     return {
//       title: "Are you sure?",
//       message: "This action cannot be undone.",
//       confirmText: "Delete",
//     };
//   };

//   const confirmDeleteImage = async () => {
//     if (!data?.public_id) {
//       showModal("error", "No image found to delete.");
//       closeConfirmModal();
//       return;
//     }

//     try {
//       await fetch("/api/delete-image", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ public_id: data.public_id }),
//       });

//       if (rowId) {
//         const { error } = await supabaseServer
//           .from("contact_page")
//           .update({
//             hero_image: null,
//             public_id: null,
//           })
//           .eq("id", rowId);

//         if (error) throw error;
//       }

//       setData({
//         ...data,
//         hero_image: "",
//         public_id: null,
//       });

//       setPreview("");
//       setFile(null);

//       closeConfirmModal();
//       showModal("success", "Hero image deleted successfully.");
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       closeConfirmModal();
//       showModal("error", "Image delete failed. Please try again.");
//     }
//   };

//   const handleFileChange = (e) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//   };

//   const handleSave = async () => {
//     setLoading(true);

//     try {
//       let imageUrl = data.hero_image;
//       let publicId = data.public_id;

//       if (file) {
//         if (data.public_id) {
//           await fetch("/api/delete-image", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ public_id: data.public_id }),
//           });
//         }

//         const res = await uploadFile(file, "contact");
//         imageUrl = res.url;
//         publicId = res.public_id;
//       }

//       const payload = {
//         hero: data.hero,
//         form_content: data.form_content,
//         stats: data.stats,
//         contact_info: data.contact_info,
//         map_url: data.map_url,

//         meta_title: data.meta_title,
//         meta_description: data.meta_description,
//         meta_keywords: data.meta_keywords,
//         meta_author: data.meta_author,
//         meta_url: data.meta_url,
//         meta_image: data.meta_image,

//         hero_title: data.hero_title,
//         hero_image: imageUrl,
//         public_id: publicId,
//       };

//       if (rowId) {
//         const { error } = await supabaseServer
//           .from("contact_page")
//           .update(payload)
//           .eq("id", rowId);

//         if (error) throw error;
//       } else {
//         const { data: inserted, error } = await supabaseServer
//           .from("contact_page")
//           .insert([payload])
//           .select()
//           .single();

//         if (error) throw error;
//         setRowId(inserted.id);
//       }

//       setFile(null);
//       setPreview("");

//       showModal("success", "Contact page saved successfully.");
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       showModal("error", "Save failed. Please check your data and try again.");
//     }

//     setLoading(false);
//   };

//   const confirmContent = getConfirmContent();

//   if (fetching) {
//     return <div className="p-6 text-gray-500">Loading contact page...</div>;
//   }

//   return (
//     <>
//       <div className="mx-auto max-w-6xl space-y-8">
//         <div className="flex flex-col gap-2">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Contact Page Management
//           </h1>
//           <p className="text-gray-500">
//             Manage hero content, contact cards, map, and SEO metadata.
//           </p>
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <ImageIcon size={20} className="text-primary" />
//             Top Page Hero
//           </h2>

//           <input
//             placeholder="Hero Title"
//             value={data.hero_title || ""}
//             onChange={(e) => setData({ ...data, hero_title: e.target.value })}
//             className={inputClass}
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className={inputClass}
//           />

//           {(preview || data.hero_image) && (
//             <div className="relative w-fit overflow-hidden rounded-2xl border bg-gray-50 p-2">
//               <img
//                 src={preview || data.hero_image}
//                 className="h-40 w-64 rounded-xl object-cover"
//                 alt="Contact Hero"
//               />

//               {!preview && data.hero_image && (
//                 <button
//                   type="button"
//                   onClick={() => requestDelete("image")}
//                   className="absolute right-3 top-3 rounded-lg bg-red-500 p-2 text-white transition-all duration-500 hover:bg-red-600"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <Contact size={20} className="text-primary" />
//             Contact Hero Content
//           </h2>

//           <input
//             placeholder="Badge"
//             value={data.hero.badge || ""}
//             onChange={(e) => handleHeroChange("badge", e.target.value)}
//             className={inputClass}
//           />

//           <input
//             placeholder="Title"
//             value={data.hero.title || ""}
//             onChange={(e) => handleHeroChange("title", e.target.value)}
//             className={inputClass}
//           />

//           <textarea
//             placeholder="Description"
//             value={data.hero.description || ""}
//             onChange={(e) => handleHeroChange("description", e.target.value)}
//             rows={4}
//             className={textareaClass}
//           />
//         </div>

//         <div className={cardClass}>
//           <div className="flex items-center justify-between gap-4">
//             <h2 className={sectionTitleClass}>
//               <BarChart3 size={20} className="text-primary" />
//               Stats
//             </h2>

//             <button
//               type="button"
//               onClick={addStat}
//               className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
//             >
//               <Plus size={14} />
//               Add Stat
//             </button>
//           </div>

//           <div className="grid gap-4 md:grid-cols-3">
//             {(data.stats || []).map((stat, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl border bg-gray-50 p-4 space-y-3"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-semibold text-gray-500">
//                     Stat {i + 1}
//                   </span>

//                   {data.stats.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => requestDelete("stat", i)}
//                       className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   placeholder="Number"
//                   value={stat.number || ""}
//                   onChange={(e) =>
//                     handleStatChange(i, "number", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Label"
//                   value={stat.label || ""}
//                   onChange={(e) => handleStatChange(i, "label", e.target.value)}
//                   className={inputClass}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={cardClass}>
//           <div className="flex items-center justify-between gap-4">
//             <h2 className={sectionTitleClass}>
//               <Contact size={20} className="text-primary" />
//               Contact Info & Form
//             </h2>

//             <button
//               type="button"
//               onClick={addContactCard}
//               className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
//             >
//               <Plus size={14} />
//               Add Card
//             </button>
//           </div>

//           <div className="space-y-6">
//             <div className="rounded-2xl border bg-gray-50 p-4 space-y-4">
//               <h3 className="flex items-center gap-2 font-semibold text-gray-700">
//                 <Send size={18} className="text-primary" />
//                 Form Content
//               </h3>

//               <div className="grid gap-4 md:grid-cols-2">
//                 <input
//                   placeholder="Form Badge"
//                   value={data.form_content.badge || ""}
//                   onChange={(e) =>
//                     handleFormContentChange("badge", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Form Title"
//                   value={data.form_content.title || ""}
//                   onChange={(e) =>
//                     handleFormContentChange("title", e.target.value)
//                   }
//                   className={inputClass}
//                 />
//               </div>

//               <textarea
//                 placeholder="Form Description"
//                 value={data.form_content.description || ""}
//                 onChange={(e) =>
//                   handleFormContentChange("description", e.target.value)
//                 }
//                 rows={3}
//                 className={textareaClass}
//               />

//               <div className="grid gap-4 md:grid-cols-2">
//                 <input
//                   placeholder="Form Endpoint"
//                   value={data.form_content.endpoint || ""}
//                   onChange={(e) =>
//                     handleFormContentChange("endpoint", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Access Key"
//                   value={data.form_content.access_key || ""}
//                   onChange={(e) =>
//                     handleFormContentChange("access_key", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Submit Text"
//                   value={data.form_content.submit_text || ""}
//                   onChange={(e) =>
//                     handleFormContentChange("submit_text", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Submitting Text"
//                   value={data.form_content.submitting_text || ""}
//                   onChange={(e) =>
//                     handleFormContentChange("submitting_text", e.target.value)
//                   }
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             <div className="rounded-2xl border bg-gray-50 p-4 space-y-4">
//               <h3 className="flex items-center gap-2 font-semibold text-gray-700">
//                 <ShieldCheck size={18} className="text-primary" />
//                 Success Message
//               </h3>

//               <input
//                 placeholder="Success Title"
//                 value={data.form_content.success_title || ""}
//                 onChange={(e) =>
//                   handleFormContentChange("success_title", e.target.value)
//                 }
//                 className={inputClass}
//               />

//               <textarea
//                 placeholder="Success Message"
//                 value={data.form_content.success_message || ""}
//                 onChange={(e) =>
//                   handleFormContentChange("success_message", e.target.value)
//                 }
//                 rows={3}
//                 className={textareaClass}
//               />
//             </div>

//             <div className="rounded-2xl border bg-gray-50 p-4 space-y-4">
//               <h3 className="flex items-center gap-2 font-semibold text-gray-700">
//                 <AlertTriangle size={18} className="text-primary" />
//                 Error Messages
//               </h3>

//               <input
//                 placeholder="Error Title"
//                 value={data.form_content.error_title || ""}
//                 onChange={(e) =>
//                   handleFormContentChange("error_title", e.target.value)
//                 }
//                 className={inputClass}
//               />

//               <textarea
//                 placeholder="Error Message"
//                 value={data.form_content.error_message || ""}
//                 onChange={(e) =>
//                   handleFormContentChange("error_message", e.target.value)
//                 }
//                 rows={3}
//                 className={textareaClass}
//               />

//               <textarea
//                 placeholder="Network Error Message"
//                 value={data.form_content.network_error_message || ""}
//                 onChange={(e) =>
//                   handleFormContentChange(
//                     "network_error_message",
//                     e.target.value,
//                   )
//                 }
//                 rows={3}
//                 className={textareaClass}
//               />
//             </div>

//             <div className="rounded-2xl border bg-gray-50 p-4 space-y-4">
//               <h3 className="flex items-center gap-2 font-semibold text-gray-700">
//                 <Mail size={18} className="text-primary" />
//                 Form Fields
//               </h3>

//               <div className="grid gap-4 md:grid-cols-2">
//                 {["name", "email", "subject", "message"].map((fieldName) => (
//                   <div
//                     key={fieldName}
//                     className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3"
//                   >
//                     <div className="flex items-center justify-between gap-3">
//                       <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-500">
//                         {fieldName} Field
//                       </h4>

//                       <label className="flex items-center gap-2 text-xs font-semibold text-gray-600">
//                         <input
//                           type="checkbox"
//                           checked={
//                             !!data.form_content.fields?.[fieldName]?.required
//                           }
//                           onChange={(e) =>
//                             handleFormFieldChange(
//                               fieldName,
//                               "required",
//                               e.target.checked,
//                             )
//                           }
//                         />
//                         Required
//                       </label>
//                     </div>

//                     <input
//                       placeholder="Label"
//                       value={data.form_content.fields?.[fieldName]?.label || ""}
//                       onChange={(e) =>
//                         handleFormFieldChange(
//                           fieldName,
//                           "label",
//                           e.target.value,
//                         )
//                       }
//                       className={inputClass}
//                     />

//                     <input
//                       placeholder="Placeholder"
//                       value={
//                         data.form_content.fields?.[fieldName]?.placeholder || ""
//                       }
//                       onChange={(e) =>
//                         handleFormFieldChange(
//                           fieldName,
//                           "placeholder",
//                           e.target.value,
//                         )
//                       }
//                       className={inputClass}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="grid gap-4 md:grid-cols-3">
//             {(data.contact_info.cards || []).map((item, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl border bg-gray-50 p-4 space-y-3"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-semibold text-gray-500">
//                     Contact Card {i + 1}
//                   </span>

//                   {data.contact_info.cards.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => requestDelete("contactCard", i)}
//                       className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   )}
//                 </div>

//                 <select
//                   value={item.icon || "phone"}
//                   onChange={(e) =>
//                     handleContactChange(i, "icon", e.target.value)
//                   }
//                   className={inputClass}
//                 >
//                   <option value="phone">Phone</option>
//                   <option value="email">Email</option>
//                   <option value="location">Location</option>
//                 </select>

//                 <input
//                   placeholder="Title"
//                   value={item.title || ""}
//                   onChange={(e) =>
//                     handleContactChange(i, "title", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Text"
//                   value={item.text || ""}
//                   onChange={(e) =>
//                     handleContactChange(i, "text", e.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 <input
//                   placeholder="Value"
//                   value={item.value || ""}
//                   onChange={(e) =>
//                     handleContactChange(i, "value", e.target.value)
//                   }
//                   className={inputClass}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <MapPin size={20} className="text-primary" />
//             Map
//           </h2>

//           <textarea
//             placeholder="Google Map Embed URL"
//             value={data.map_url || ""}
//             onChange={(e) => setData({ ...data, map_url: e.target.value })}
//             rows={4}
//             className={textareaClass}
//           />
//         </div>

//         <div className={cardClass}>
//           <h2 className={sectionTitleClass}>
//             <Search size={20} className="text-primary" />
//             SEO Meta
//           </h2>

//           <input
//             placeholder="Meta Title"
//             value={data.meta_title || ""}
//             onChange={(e) => setData({ ...data, meta_title: e.target.value })}
//             className={inputClass}
//           />

//           <textarea
//             placeholder="Meta Description"
//             value={data.meta_description || ""}
//             onChange={(e) =>
//               setData({ ...data, meta_description: e.target.value })
//             }
//             rows={3}
//             className={textareaClass}
//           />

//           <textarea
//             placeholder="Meta Keywords"
//             value={data.meta_keywords || ""}
//             onChange={(e) =>
//               setData({ ...data, meta_keywords: e.target.value })
//             }
//             rows={3}
//             className={textareaClass}
//           />

//           <input
//             placeholder="Meta Author"
//             value={data.meta_author || ""}
//             onChange={(e) => setData({ ...data, meta_author: e.target.value })}
//             className={inputClass}
//           />

//           <input
//             placeholder="Meta URL"
//             value={data.meta_url || ""}
//             onChange={(e) => setData({ ...data, meta_url: e.target.value })}
//             className={inputClass}
//           />

//           <input
//             placeholder="Meta Image URL"
//             value={data.meta_image || ""}
//             onChange={(e) => setData({ ...data, meta_image: e.target.value })}
//             className={inputClass}
//           />
//         </div>

//         <button
//           type="button"
//           onClick={handleSave}
//           disabled={loading}
//           className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
//         >
//           <Save size={18} />
//           {loading ? "Saving..." : "Save Contact Page"}
//         </button>
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

// AddContactPageAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import {
  Save,
  Trash2,
  Plus,
  Contact,
  MapPin,
  BarChart3,
  Search,
  ImageIcon,
  Send,
  ShieldCheck,
  AlertTriangle,
  Mail,
  MessageSquare,
} from "lucide-react";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

const getDefaultCards = () => [
  { icon: "phone", title: "", text: "", value: "" },
  { icon: "email", title: "", text: "", value: "" },
  { icon: "location", title: "", text: "", value: "" },
];

const getDefaultFormFields = () => ({
  name: {
    label: "",
    placeholder: "",
    required: true,
  },
  email: {
    label: "",
    placeholder: "",
    required: true,
  },
  subject: {
    label: "",
    placeholder: "",
    required: false,
  },
  message: {
    label: "",
    placeholder: "",
    required: true,
  },
});

const getDefaultFormContent = () => ({
  badge: "",
  title: "",
  description: "",

  endpoint: "",
  access_key: "",

  submit_text: "",
  submitting_text: "",

  success_title: "",
  success_message: "",

  error_title: "",
  error_message: "",
  network_error_message: "",

  fields: getDefaultFormFields(),
});

function normalizeFormContent(formContent) {
  const defaults = getDefaultFormContent();

  const source =
    formContent &&
    typeof formContent === "object" &&
    !Array.isArray(formContent)
      ? formContent
      : {};

  const sourceFields =
    source.fields &&
    typeof source.fields === "object" &&
    !Array.isArray(source.fields)
      ? source.fields
      : {};

  return {
    ...defaults,
    ...source,
    fields: {
      name: {
        ...defaults.fields.name,
        ...(sourceFields.name || {}),
      },
      email: {
        ...defaults.fields.email,
        ...(sourceFields.email || {}),
      },
      subject: {
        ...defaults.fields.subject,
        ...(sourceFields.subject || {}),
      },
      message: {
        ...defaults.fields.message,
        ...(sourceFields.message || {}),
      },
    },
  };
}

export default function AddContactPageAdmin() {
  const { uploadFile } = useUpload();

  const [rowId, setRowId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [deleteTarget, setDeleteTarget] = useState({
    type: null,
    index: null,
  });

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    loading: false,
  });

  const [data, setData] = useState({
    hero: {
      badge: "",
      title: "",
      description: "",
    },

    form_content: getDefaultFormContent(),

    stats: [
      { number: "", label: "" },
      { number: "", label: "" },
      { number: "", label: "" },
    ],

    contact_info: {
      cards: getDefaultCards(),
    },

    map_url: "",

    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_author: "",
    meta_url: "",
    meta_image: "",

    hero_title: "",
    hero_image: "",
    public_id: null,
  });

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const textareaClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const sectionTitleClass =
    "flex items-center gap-2 text-lg font-bold text-gray-900";

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

    setDeleteTarget({
      type: null,
      index: null,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const normalizeData = (res) => ({
    hero: res?.hero || {
      badge: "",
      title: "",
      description: "",
    },

    form_content: normalizeFormContent(res?.form_content),

    stats: res?.stats || [
      { number: "", label: "" },
      { number: "", label: "" },
      { number: "", label: "" },
    ],

    contact_info:
      res?.contact_info && !Array.isArray(res.contact_info)
        ? {
            cards: Array.isArray(res.contact_info.cards)
              ? res.contact_info.cards
              : getDefaultCards(),
          }
        : {
            cards: Array.isArray(res?.contact_info)
              ? res.contact_info.map((item, index) => ({
                  icon:
                    item.icon ||
                    (index === 0
                      ? "phone"
                      : index === 1
                        ? "email"
                        : "location"),
                  title: item.title || "",
                  text: item.text || "",
                  value: item.value || "",
                }))
              : getDefaultCards(),
          },

    map_url: res?.map_url || "",

    meta_title: res?.meta_title || "",
    meta_description: res?.meta_description || "",
    meta_keywords: res?.meta_keywords || "",
    meta_author: res?.meta_author || "",
    meta_url: res?.meta_url || "",
    meta_image: res?.meta_image || "",

    hero_title: res?.hero_title || "",
    hero_image: res?.hero_image || "",
    public_id: res?.public_id || null,
  });

  const fetchData = async () => {
    setFetching(true);

    const { data: res, error } = await supabaseServer
      .from("contact_page")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      console.error(error);
    }

    if (res) {
      setRowId(res.id);
      setData(normalizeData(res));
    }

    setFetching(false);
  };

  const handleHeroChange = (field, value) => {
    setData({
      ...data,
      hero: {
        ...data.hero,
        [field]: value,
      },
    });
  };

  const handleFormContentChange = (field, value) => {
    setData({
      ...data,
      form_content: {
        ...data.form_content,
        [field]: value,
      },
    });
  };

  const handleFormFieldChange = (fieldName, fieldKey, value) => {
    setData({
      ...data,
      form_content: {
        ...data.form_content,
        fields: {
          ...data.form_content.fields,
          [fieldName]: {
            ...data.form_content.fields?.[fieldName],
            [fieldKey]: value,
          },
        },
      },
    });
  };

  const handleStatChange = (index, field, value) => {
    const updated = [...(data.stats || [])];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setData({
      ...data,
      stats: updated,
    });
  };

  const handleContactChange = (index, field, value) => {
    const updatedCards = [...(data.contact_info.cards || [])];

    updatedCards[index] = {
      ...updatedCards[index],
      [field]: value,
    };

    setData({
      ...data,
      contact_info: {
        ...data.contact_info,
        cards: updatedCards,
      },
    });
  };

  const addStat = () => {
    setData({
      ...data,
      stats: [...(data.stats || []), { number: "", label: "" }],
    });
  };

  const addContactCard = () => {
    setData({
      ...data,
      contact_info: {
        ...data.contact_info,
        cards: [
          ...(data.contact_info.cards || []),
          { icon: "phone", title: "", text: "", value: "" },
        ],
      },
    });
  };

  const requestDelete = (type, index = null) => {
    if (type === "image" && !data?.public_id) {
      showModal("error", "No image found to delete.");
      return;
    }

    setDeleteTarget({
      type,
      index,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDelete = async () => {
    const { type, index } = deleteTarget;

    if (!type) {
      showModal("error", "No delete action selected.");
      closeConfirmModal();
      return;
    }

    setConfirmModal({
      show: true,
      loading: true,
    });

    if (type === "image") {
      await confirmDeleteImage();
      return;
    }

    if (type === "stat") {
      setData({
        ...data,
        stats: data.stats.filter((_, i) => i !== index),
      });

      closeConfirmModal();
      showModal("success", "Stat removed successfully. Please save changes.");
      return;
    }

    if (type === "contactCard") {
      setData({
        ...data,
        contact_info: {
          ...data.contact_info,
          cards: data.contact_info.cards.filter((_, i) => i !== index),
        },
      });

      closeConfirmModal();
      showModal(
        "success",
        "Contact card removed successfully. Please save changes.",
      );
      return;
    }

    closeConfirmModal();
  };

  const getConfirmContent = () => {
    if (deleteTarget.type === "image") {
      return {
        title: "Delete Image?",
        message:
          "Are you sure you want to delete this hero image? This action cannot be undone.",
        confirmText: "Delete Image",
      };
    }

    if (deleteTarget.type === "stat") {
      return {
        title: "Delete Stat?",
        message:
          "Are you sure you want to remove this stat item? Please save the page after removing.",
        confirmText: "Delete Stat",
      };
    }

    if (deleteTarget.type === "contactCard") {
      return {
        title: "Delete Contact Card?",
        message:
          "Are you sure you want to remove this contact card? Please save the page after removing.",
        confirmText: "Delete Card",
      };
    }

    return {
      title: "Are you sure?",
      message: "This action cannot be undone.",
      confirmText: "Delete",
    };
  };

  const confirmDeleteImage = async () => {
    if (!data?.public_id) {
      showModal("error", "No image found to delete.");
      closeConfirmModal();
      return;
    }

    try {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: data.public_id }),
      });

      if (rowId) {
        const { error } = await supabaseServer
          .from("contact_page")
          .update({
            hero_image: null,
            public_id: null,
          })
          .eq("id", rowId);

        if (error) throw error;
      }

      setData({
        ...data,
        hero_image: "",
        public_id: null,
      });

      setPreview("");
      setFile(null);

      closeConfirmModal();
      showModal("success", "Hero image deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Image delete failed. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      let imageUrl = data.hero_image;
      let publicId = data.public_id;

      if (file) {
        if (data.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: data.public_id }),
          });
        }

        const res = await uploadFile(file, "contact");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      const payload = {
        hero: data.hero,
        form_content: data.form_content,
        stats: data.stats,
        contact_info: data.contact_info,
        map_url: data.map_url,

        meta_title: data.meta_title,
        meta_description: data.meta_description,
        meta_keywords: data.meta_keywords,
        meta_author: data.meta_author,
        meta_url: data.meta_url,
        meta_image: data.meta_image,

        hero_title: data.hero_title,
        hero_image: imageUrl,
        public_id: publicId,
      };

      if (rowId) {
        const { error } = await supabaseServer
          .from("contact_page")
          .update(payload)
          .eq("id", rowId);

        if (error) throw error;
      } else {
        const { data: inserted, error } = await supabaseServer
          .from("contact_page")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setRowId(inserted.id);
      }

      setFile(null);
      setPreview("");

      showModal("success", "Contact page saved successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Save failed. Please check your data and try again.");
    }

    setLoading(false);
  };

  const confirmContent = getConfirmContent();

  if (fetching) {
    return <div className="p-6 text-gray-500">Loading contact page...</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Contact Page Management
          </h1>

          <p className="text-gray-500">
            Manage hero content, form content, contact cards, map, and SEO
            metadata.
          </p>
        </div>

        <div className={cardClass}>
          <h2 className={sectionTitleClass}>
            <ImageIcon size={20} className="text-primary" />
            Top Page Hero
          </h2>

          <input
            placeholder="Hero Title"
            value={data.hero_title || ""}
            onChange={(e) => setData({ ...data, hero_title: e.target.value })}
            className={inputClass}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={inputClass}
          />

          {(preview || data.hero_image) && (
            <div className="relative w-fit overflow-hidden rounded-2xl border bg-gray-50 p-2">
              <img
                src={preview || data.hero_image}
                className="h-40 w-64 rounded-xl object-cover"
                alt="Contact Hero"
              />

              {!preview && data.hero_image && (
                <button
                  type="button"
                  onClick={() => requestDelete("image")}
                  className="absolute right-3 top-3 rounded-lg bg-red-500 p-2 text-white transition-all duration-500 hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}
        </div>

        <div className={cardClass}>
          <h2 className={sectionTitleClass}>
            <Contact size={20} className="text-primary" />
            Contact Hero Content
          </h2>

          <input
            placeholder="Badge"
            value={data.hero.badge || ""}
            onChange={(e) => handleHeroChange("badge", e.target.value)}
            className={inputClass}
          />

          <input
            placeholder="Title"
            value={data.hero.title || ""}
            onChange={(e) => handleHeroChange("title", e.target.value)}
            className={inputClass}
          />

          <textarea
            placeholder="Description"
            value={data.hero.description || ""}
            onChange={(e) => handleHeroChange("description", e.target.value)}
            rows={4}
            className={textareaClass}
          />
        </div>

        <div className={cardClass}>
          <h2 className={sectionTitleClass}>
            <Send size={20} className="text-primary" />
            Contact Form Content
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Form Badge"
              value={data.form_content.badge || ""}
              onChange={(e) => handleFormContentChange("badge", e.target.value)}
              className={inputClass}
            />

            <input
              placeholder="Form Title"
              value={data.form_content.title || ""}
              onChange={(e) => handleFormContentChange("title", e.target.value)}
              className={inputClass}
            />
          </div>

          <textarea
            placeholder="Form Description"
            value={data.form_content.description || ""}
            onChange={(e) =>
              handleFormContentChange("description", e.target.value)
            }
            rows={3}
            className={textareaClass}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Form Endpoint"
              value={data.form_content.endpoint || ""}
              onChange={(e) =>
                handleFormContentChange("endpoint", e.target.value)
              }
              className={inputClass}
            />

            <input
              placeholder="Access Key"
              value={data.form_content.access_key || ""}
              onChange={(e) =>
                handleFormContentChange("access_key", e.target.value)
              }
              className={inputClass}
            />

            <input
              placeholder="Submit Text"
              value={data.form_content.submit_text || ""}
              onChange={(e) =>
                handleFormContentChange("submit_text", e.target.value)
              }
              className={inputClass}
            />

            <input
              placeholder="Submitting Text"
              value={data.form_content.submitting_text || ""}
              onChange={(e) =>
                handleFormContentChange("submitting_text", e.target.value)
              }
              className={inputClass}
            />
          </div>
        </div>

        <div className={cardClass}>
          <h2 className={sectionTitleClass}>
            <ShieldCheck size={20} className="text-primary" />
            Success Message
          </h2>

          <input
            placeholder="Success Title"
            value={data.form_content.success_title || ""}
            onChange={(e) =>
              handleFormContentChange("success_title", e.target.value)
            }
            className={inputClass}
          />

          <textarea
            placeholder="Success Message"
            value={data.form_content.success_message || ""}
            onChange={(e) =>
              handleFormContentChange("success_message", e.target.value)
            }
            rows={3}
            className={textareaClass}
          />
        </div>

        <div className={cardClass}>
          <h2 className={sectionTitleClass}>
            <AlertTriangle size={20} className="text-primary" />
            Error Messages
          </h2>

          <input
            placeholder="Error Title"
            value={data.form_content.error_title || ""}
            onChange={(e) =>
              handleFormContentChange("error_title", e.target.value)
            }
            className={inputClass}
          />

          <textarea
            placeholder="Error Message"
            value={data.form_content.error_message || ""}
            onChange={(e) =>
              handleFormContentChange("error_message", e.target.value)
            }
            rows={3}
            className={textareaClass}
          />

          <textarea
            placeholder="Network Error Message"
            value={data.form_content.network_error_message || ""}
            onChange={(e) =>
              handleFormContentChange("network_error_message", e.target.value)
            }
            rows={3}
            className={textareaClass}
          />
        </div>

        <div className={cardClass}>
          <h2 className={sectionTitleClass}>
            <Mail size={20} className="text-primary" />
            Form Fields
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {["name", "email", "subject", "message"].map((fieldName) => (
              <div
                key={fieldName}
                className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-500">
                    {fieldName} Field
                  </h3>

                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                    <input
                      type="checkbox"
                      checked={
                        !!data.form_content.fields?.[fieldName]?.required
                      }
                      onChange={(e) =>
                        handleFormFieldChange(
                          fieldName,
                          "required",
                          e.target.checked,
                        )
                      }
                    />
                    Required
                  </label>
                </div>

                <input
                  placeholder="Label"
                  value={data.form_content.fields?.[fieldName]?.label || ""}
                  onChange={(e) =>
                    handleFormFieldChange(fieldName, "label", e.target.value)
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Placeholder"
                  value={
                    data.form_content.fields?.[fieldName]?.placeholder || ""
                  }
                  onChange={(e) =>
                    handleFormFieldChange(
                      fieldName,
                      "placeholder",
                      e.target.value,
                    )
                  }
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between gap-4">
            <h2 className={sectionTitleClass}>
              <BarChart3 size={20} className="text-primary" />
              Stats
            </h2>

            <button
              type="button"
              onClick={addStat}
              className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
            >
              <Plus size={14} />
              Add Stat
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(data.stats || []).map((stat, i) => (
              <div
                key={i}
                className="space-y-3 rounded-2xl border bg-gray-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    Stat {i + 1}
                  </span>

                  {data.stats.length > 1 && (
                    <button
                      type="button"
                      onClick={() => requestDelete("stat", i)}
                      className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <input
                  placeholder="Number"
                  value={stat.number || ""}
                  onChange={(e) =>
                    handleStatChange(i, "number", e.target.value)
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Label"
                  value={stat.label || ""}
                  onChange={(e) => handleStatChange(i, "label", e.target.value)}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between gap-4">
            <h2 className={sectionTitleClass}>
              <MessageSquare size={20} className="text-primary" />
              Contact Cards
            </h2>

            <button
              type="button"
              onClick={addContactCard}
              className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-500 hover:bg-primary hover:text-white"
            >
              <Plus size={14} />
              Add Card
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(data.contact_info.cards || []).map((item, i) => (
              <div
                key={i}
                className="space-y-3 rounded-2xl border bg-gray-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    Contact Card {i + 1}
                  </span>

                  {data.contact_info.cards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => requestDelete("contactCard", i)}
                      className="rounded-lg bg-red-100 p-2 text-red-500 transition-all duration-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <select
                  value={item.icon || "phone"}
                  onChange={(e) =>
                    handleContactChange(i, "icon", e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="location">Location</option>
                </select>

                <input
                  placeholder="Title"
                  value={item.title || ""}
                  onChange={(e) =>
                    handleContactChange(i, "title", e.target.value)
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Text"
                  value={item.text || ""}
                  onChange={(e) =>
                    handleContactChange(i, "text", e.target.value)
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Value"
                  value={item.value || ""}
                  onChange={(e) =>
                    handleContactChange(i, "value", e.target.value)
                  }
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={cardClass}>
          <h2 className={sectionTitleClass}>
            <MapPin size={20} className="text-primary" />
            Map
          </h2>

          <textarea
            placeholder="Google Map Embed URL"
            value={data.map_url || ""}
            onChange={(e) => setData({ ...data, map_url: e.target.value })}
            rows={4}
            className={textareaClass}
          />
        </div>

        <div className={cardClass}>
          <h2 className={sectionTitleClass}>
            <Search size={20} className="text-primary" />
            SEO Meta
          </h2>

          <input
            placeholder="Meta Title"
            value={data.meta_title || ""}
            onChange={(e) => setData({ ...data, meta_title: e.target.value })}
            className={inputClass}
          />

          <textarea
            placeholder="Meta Description"
            value={data.meta_description || ""}
            onChange={(e) =>
              setData({ ...data, meta_description: e.target.value })
            }
            rows={3}
            className={textareaClass}
          />

          <textarea
            placeholder="Meta Keywords"
            value={data.meta_keywords || ""}
            onChange={(e) =>
              setData({ ...data, meta_keywords: e.target.value })
            }
            rows={3}
            className={textareaClass}
          />

          <input
            placeholder="Meta Author"
            value={data.meta_author || ""}
            onChange={(e) => setData({ ...data, meta_author: e.target.value })}
            className={inputClass}
          />

          <input
            placeholder="Meta URL"
            value={data.meta_url || ""}
            onChange={(e) => setData({ ...data, meta_url: e.target.value })}
            className={inputClass}
          />

          <input
            placeholder="Meta Image URL"
            value={data.meta_image || ""}
            onChange={(e) => setData({ ...data, meta_image: e.target.value })}
            className={inputClass}
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
        >
          <Save size={18} />
          {loading ? "Saving..." : "Save Contact Page"}
        </button>
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

AddContactPageAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
