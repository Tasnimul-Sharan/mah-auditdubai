// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/router";
// // import { supabaseServer } from "@/lib/supabaseServer";
// // import AdminLayout from "@/components/AdminLayout";
// // import {
// //   ArrowLeft,
// //   ImageIcon,
// //   ListChecks,
// //   Newspaper,
// //   Quote,
// //   Save,
// //   Tags,
// //   Trash2,
// //   User,
// // } from "lucide-react";
// // import StatusModal from "@/components/StatusModal";
// // import ConfirmModal from "@/components/ConfirmModal";

// // const inputClass =
// //   "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

// // const cardClass =
// //   "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

// // const Input = ({ label, value, onChange, type = "text" }) => (
// //   <div className="space-y-2">
// //     <label className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
// //       {label}
// //     </label>
// //     <input
// //       type={type}
// //       className={inputClass}
// //       value={value || ""}
// //       onChange={onChange}
// //     />
// //   </div>
// // );

// // const Textarea = ({ label, value, onChange, rows = 4 }) => (
// //   <div className="space-y-2">
// //     <label className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
// //       {label}
// //     </label>
// //     <textarea
// //       rows={rows}
// //       className={inputClass}
// //       value={value || ""}
// //       onChange={onChange}
// //     />
// //   </div>
// // );

// // export default function EditBlogPage() {
// //   const router = useRouter();
// //   const { id } = router.query;

// //   const [form, setForm] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   const [deleteTarget, setDeleteTarget] = useState({
// //     type: null,
// //     index: null,
// //   });

// //   const [modal, setModal] = useState({
// //     show: false,
// //     type: "success",
// //     message: "",
// //     redirect: false,
// //   });

// //   const [confirmModal, setConfirmModal] = useState({
// //     show: false,
// //     loading: false,
// //   });

// //   const showModal = (type, message, redirect = false) => {
// //     setModal({
// //       show: true,
// //       type,
// //       message,
// //       redirect,
// //     });
// //   };

// //   const closeModal = () => {
// //     const shouldRedirect = modal.redirect;

// //     setModal({
// //       show: false,
// //       type: "success",
// //       message: "",
// //       redirect: false,
// //     });

// //     if (shouldRedirect) {
// //       router.push("/dashboard/blogs");
// //     }
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
// //     if (!id) return;

// //     fetchBlog();
// //   }, [id]);

// //   const fetchBlog = async () => {
// //     setLoading(true);

// //     const { data, error } = await supabaseServer
// //       .from("blogs")
// //       .select("*")
// //       .eq("id", id)
// //       .single();

// //     if (error) {
// //       console.error(error);
// //       showModal("error", "Blog data fetch failed.");
// //       setLoading(false);
// //       return;
// //     }

// //     setForm(data);
// //     setLoading(false);
// //   };

// //   const formatArray = (value) =>
// //     value
// //       .split("\n")
// //       .map((item) => item.trim())
// //       .filter(Boolean);

// //   const uploadImage = async (e, type = "sub") => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     const reader = new FileReader();

// //     reader.onloadend = async () => {
// //       try {
// //         const res = await fetch("/api/upload-blogs", {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ file: reader.result }),
// //         });

// //         const data = await res.json();

// //         if (!data.url) {
// //           showModal("error", "Upload failed. Please try again.");
// //           return;
// //         }

// //         if (type === "main") {
// //           setForm({ ...form, image: data.url });

// //           const { error } = await supabaseServer
// //             .from("blogs")
// //             .update({ image: data.url })
// //             .eq("id", id);

// //           if (error) throw error;

// //           showModal("success", "Main image uploaded successfully.");
// //         } else {
// //           const updatedImages = [...(form.subimages || []), data.url];

// //           setForm({ ...form, subimages: updatedImages });

// //           const { error } = await supabaseServer
// //             .from("blogs")
// //             .update({ subimages: updatedImages })
// //             .eq("id", id);

// //           if (error) throw error;

// //           showModal("success", "Sub image uploaded successfully.");
// //         }
// //       } catch (err) {
// //         console.error(err);
// //         showModal("error", "Upload error. Please try again.");
// //       }
// //     };

// //     reader.readAsDataURL(file);
// //   };

// //   const deleteImageFromCloudinary = async (imageUrl) => {
// //     if (!imageUrl) return;

// //     const public_id = imageUrl
// //       .split("/upload/")[1]
// //       ?.split(".")[0]
// //       ?.replace(/^v\d+\//, "");

// //     if (!public_id) return;

// //     await fetch("/api/delete-image", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ public_id }),
// //     });
// //   };

// //   const requestRemoveMainImage = () => {
// //     if (!form?.image) {
// //       showModal("error", "No main image found to delete.");
// //       return;
// //     }

// //     setDeleteTarget({
// //       type: "mainImage",
// //       index: null,
// //     });

// //     setConfirmModal({
// //       show: true,
// //       loading: false,
// //     });
// //   };

// //   const requestRemoveSubImage = (index) => {
// //     setDeleteTarget({
// //       type: "subImage",
// //       index,
// //     });

// //     setConfirmModal({
// //       show: true,
// //       loading: false,
// //     });
// //   };

// //   const confirmDelete = async () => {
// //     if (deleteTarget.type === "mainImage") {
// //       await confirmRemoveMainImage();
// //       return;
// //     }

// //     if (deleteTarget.type === "subImage") {
// //       await confirmRemoveSubImage();
// //       return;
// //     }

// //     showModal("error", "No delete action selected.");
// //     closeConfirmModal();
// //   };

// //   const confirmRemoveMainImage = async () => {
// //     try {
// //       setConfirmModal({
// //         show: true,
// //         loading: true,
// //       });

// //       await deleteImageFromCloudinary(form.image);

// //       setForm({ ...form, image: "" });

// //       const { error } = await supabaseServer
// //         .from("blogs")
// //         .update({ image: "" })
// //         .eq("id", id);

// //       if (error) throw error;

// //       closeConfirmModal();
// //       showModal("success", "Main image deleted successfully.");
// //     } catch (err) {
// //       console.error(err);
// //       closeConfirmModal();
// //       showModal("error", "Main image delete failed. Please try again.");
// //     }
// //   };

// //   const confirmRemoveSubImage = async () => {
// //     if (deleteTarget.index === null) {
// //       showModal("error", "No sub image selected.");
// //       closeConfirmModal();
// //       return;
// //     }

// //     try {
// //       setConfirmModal({
// //         show: true,
// //         loading: true,
// //       });

// //       const imageUrl = form.subimages[deleteTarget.index];

// //       await deleteImageFromCloudinary(imageUrl);

// //       const updated = form.subimages.filter((_, i) => i !== deleteTarget.index);

// //       setForm({ ...form, subimages: updated });

// //       const { error } = await supabaseServer
// //         .from("blogs")
// //         .update({ subimages: updated })
// //         .eq("id", id);

// //       if (error) throw error;

// //       closeConfirmModal();
// //       showModal("success", "Sub image deleted successfully.");
// //     } catch (err) {
// //       console.error(err);
// //       closeConfirmModal();
// //       showModal("error", "Sub image delete failed. Please try again.");
// //     }
// //   };

// //   const updateBlog = async () => {
// //     if (!form.title?.trim()) {
// //       showModal("error", "Blog title is required.");
// //       return;
// //     }

// //     try {
// //       setSaving(true);

// //       const payload = {
// //         ...form,
// //         checklist: Array.isArray(form.checklist)
// //           ? form.checklist
// //           : formatArray(form.checklist || ""),

// //         highlights: Array.isArray(form.highlights)
// //           ? form.highlights
// //           : formatArray(form.highlights || ""),

// //         posttags: Array.isArray(form.posttags)
// //           ? form.posttags
// //           : formatArray(form.posttags || ""),
// //       };

// //       const { error } = await supabaseServer
// //         .from("blogs")
// //         .update(payload)
// //         .eq("id", id);

// //       if (error) throw error;

// //       showModal("success", "Blog updated successfully.", true);
// //     } catch (err) {
// //       console.error(err);
// //       showModal("error", "Update failed. Please try again.");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const getConfirmContent = () => {
// //     if (deleteTarget.type === "mainImage") {
// //       return {
// //         title: "Delete Main Image?",
// //         message:
// //           "Are you sure you want to delete this main image? This action cannot be undone.",
// //         confirmText: "Delete Image",
// //       };
// //     }

// //     if (deleteTarget.type === "subImage") {
// //       return {
// //         title: "Delete Sub Image?",
// //         message:
// //           "Are you sure you want to delete this sub image? This action cannot be undone.",
// //         confirmText: "Delete Image",
// //       };
// //     }

// //     return {
// //       title: "Are you sure?",
// //       message: "This action cannot be undone.",
// //       confirmText: "Confirm",
// //     };
// //   };

// //   const confirmContent = getConfirmContent();

// //   if (loading)
// //     return <div className="p-10 text-center text-gray-500">Loading...</div>;

// //   if (!form)
// //     return <div className="p-10 text-center text-gray-500">Blog not found</div>;

// //   return (
// //     <>
// //       <div className="max-w-6xl mx-auto space-y-8">
// //         {/* HEADER */}
// //         <div className="flex justify-between items-center">
// //           <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
// //             <Newspaper className="text-primary" />
// //             Edit Blog
// //           </h1>

// //           <button
// //             onClick={() => router.back()}
// //             className="flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-semibold hover:bg-gray-50 transition"
// //           >
// //             <ArrowLeft size={16} />
// //             Back
// //           </button>
// //         </div>

// //         {/* BASIC */}
// //         <div className={cardClass}>
// //           <h2 className="flex items-center gap-2 text-lg font-bold">
// //             <User className="text-primary" /> Basic Info
// //           </h2>

// //           <Input
// //             label="Title"
// //             value={form.title}
// //             onChange={(e) => setForm({ ...form, title: e.target.value })}
// //           />

// //           <Input
// //             label="Author"
// //             value={form.author}
// //             onChange={(e) => setForm({ ...form, author: e.target.value })}
// //           />

// //           <Input
// //             label="Date"
// //             type="date"
// //             value={form.date}
// //             onChange={(e) => setForm({ ...form, date: e.target.value })}
// //           />

// //           <Textarea
// //             label="Description"
// //             value={form.description}
// //             onChange={(e) => setForm({ ...form, description: e.target.value })}
// //           />
// //         </div>

// //         {/* QUOTE */}
// //         <div className={cardClass}>
// //           <h2 className="flex items-center gap-2 text-lg font-bold">
// //             <Quote className="text-primary" /> Quote
// //           </h2>

// //           <Textarea
// //             label="Quote"
// //             value={form.quote}
// //             onChange={(e) => setForm({ ...form, quote: e.target.value })}
// //           />
// //         </div>

// //         {/* CHECKLIST */}
// //         <div className={cardClass}>
// //           <h2 className="flex items-center gap-2 text-lg font-bold">
// //             <ListChecks className="text-primary" /> Checklist & Highlights
// //           </h2>

// //           <Textarea
// //             label="Checklist (one per line)"
// //             value={
// //               Array.isArray(form.checklist)
// //                 ? form.checklist.join("\n")
// //                 : form.checklist
// //             }
// //             onChange={(e) => setForm({ ...form, checklist: e.target.value })}
// //           />

// //           <Textarea
// //             label="Highlights (one per line)"
// //             value={
// //               Array.isArray(form.highlights)
// //                 ? form.highlights.join("\n")
// //                 : form.highlights
// //             }
// //             onChange={(e) => setForm({ ...form, highlights: e.target.value })}
// //           />
// //         </div>

// //         {/* TAGS */}
// //         <div className={cardClass}>
// //           <h2 className="flex items-center gap-2 text-lg font-bold">
// //             <Tags className="text-primary" /> Tags
// //           </h2>

// //           <Textarea
// //             label="Tags (one per line)"
// //             value={
// //               Array.isArray(form.posttags)
// //                 ? form.posttags.join("\n")
// //                 : form.posttags
// //             }
// //             onChange={(e) => setForm({ ...form, posttags: e.target.value })}
// //           />
// //         </div>

// //         {/* MAIN IMAGE */}
// //         <div className={cardClass}>
// //           <h2 className="flex items-center gap-2 text-lg font-bold">
// //             <ImageIcon className="text-primary" /> Main Image
// //           </h2>

// //           <input type="file" onChange={(e) => uploadImage(e, "main")} />

// //           {form.image && (
// //             <div className="relative w-48">
// //               <img
// //                 src={form.image}
// //                 className="w-full h-40 object-cover rounded-xl border"
// //                 alt=""
// //               />

// //               <button
// //                 type="button"
// //                 onClick={requestRemoveMainImage}
// //                 className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
// //               >
// //                 <Trash2 size={14} />
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {/* SUB IMAGES */}
// //         <div className={cardClass}>
// //           <h2 className="flex items-center gap-2 text-lg font-bold">
// //             <ImageIcon className="text-primary" /> Sub Images
// //           </h2>

// //           <input type="file" onChange={(e) => uploadImage(e, "sub")} />

// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //             {form.subimages?.map((img, i) => (
// //               <div key={i} className="relative">
// //                 <img
// //                   src={img}
// //                   className="w-full h-32 object-cover rounded-xl border"
// //                   alt=""
// //                 />

// //                 <button
// //                   type="button"
// //                   onClick={() => requestRemoveSubImage(i)}
// //                   className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
// //                 >
// //                   <Trash2 size={12} />
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* SAVE BUTTON */}
// //         <button
// //           type="button"
// //           onClick={updateBlog}
// //           disabled={saving}
// //           className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-secondary transition"
// //         >
// //           <Save size={18} />
// //           {saving ? "Updating..." : "Update Blog"}
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

// // EditBlogPage.getLayout = (page) => (
// //   <AdminLayout title="Edit Blog">{page}</AdminLayout>
// // );

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { supabaseServer } from "@/lib/supabaseServer";
// import AdminLayout from "@/components/AdminLayout";
// import {
//   ArrowLeft,
//   ImageIcon,
//   ListChecks,
//   Newspaper,
//   Quote,
//   Save,
//   Tags,
//   Trash2,
//   User,
// } from "lucide-react";
// import StatusModal from "@/components/StatusModal";
// import ConfirmModal from "@/components/ConfirmModal";

// const inputClass =
//   "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

// const cardClass =
//   "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

// const Input = ({ label, value, onChange, type = "text" }) => (
//   <div className="space-y-2">
//     <label className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
//       {label}
//     </label>
//     <input
//       type={type}
//       className={inputClass}
//       value={value || ""}
//       onChange={onChange}
//     />
//   </div>
// );

// const Textarea = ({ label, value, onChange, rows = 4 }) => (
//   <div className="space-y-2">
//     <label className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
//       {label}
//     </label>
//     <textarea
//       rows={rows}
//       className={inputClass}
//       value={value || ""}
//       onChange={onChange}
//     />
//   </div>
// );

// export default function EditBlogPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [imageUploading, setImageUploading] = useState(false);

//   const [deleteTarget, setDeleteTarget] = useState({
//     type: null,
//     index: null,
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
//       router.push("/dashboard/blogs");
//     }
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
//     if (!id) return;

//     fetchBlog();
//   }, [id]);

//   const fetchBlog = async () => {
//     setLoading(true);

//     const { data, error } = await supabaseServer
//       .from("blogs")
//       .select("*")
//       .eq("id", id)
//       .single();

//     if (error) {
//       console.error(error);
//       showModal("error", "Blog data fetch failed.");
//       setLoading(false);
//       return;
//     }

//     setForm({
//       ...data,
//       subimages: Array.isArray(data.subimages) ? data.subimages : [],
//       checklist: Array.isArray(data.checklist) ? data.checklist : [],
//       highlights: Array.isArray(data.highlights) ? data.highlights : [],
//       posttags: Array.isArray(data.posttags) ? data.posttags : [],
//     });

//     setLoading(false);
//   };

//   const formatArray = (value) =>
//     value
//       .split("\n")
//       .map((item) => item.trim())
//       .filter(Boolean);

//   const uploadSingleFileToCloudinary = async (file) => {
//     const reader = new FileReader();

//     const base64 = await new Promise((resolve, reject) => {
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });

//     const res = await fetch("/api/upload-blogs", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ file: base64 }),
//     });

//     const data = await res.json();

//     if (!res.ok || !data.url) {
//       throw new Error("Upload failed. Please try again.");
//     }

//     return data.url;
//   };

//   const uploadImage = async (e, type = "sub") => {
//     const files = Array.from(e.target.files || []);

//     if (!files.length) return;

//     try {
//       setImageUploading(true);

//       if (type === "main") {
//         const file = files[0];
//         const uploadedUrl = await uploadSingleFileToCloudinary(file);

//         setForm((prev) => ({
//           ...prev,
//           image: uploadedUrl,
//         }));

//         const { error } = await supabaseServer
//           .from("blogs")
//           .update({ image: uploadedUrl })
//           .eq("id", id);

//         if (error) throw error;

//         showModal("success", "Main image uploaded successfully.");
//       } else {
//         const uploadedUrls = await Promise.all(
//           files.map((file) => uploadSingleFileToCloudinary(file)),
//         );

//         const updatedImages = [...(form.subimages || []), ...uploadedUrls];

//         setForm((prev) => ({
//           ...prev,
//           subimages: updatedImages,
//         }));

//         const { error } = await supabaseServer
//           .from("blogs")
//           .update({ subimages: updatedImages })
//           .eq("id", id);

//         if (error) throw error;

//         showModal(
//           "success",
//           `${uploadedUrls.length} sub image${
//             uploadedUrls.length > 1 ? "s" : ""
//           } uploaded successfully.`,
//         );
//       }
//     } catch (err) {
//       console.error(err);
//       showModal("error", err.message || "Upload error. Please try again.");
//     } finally {
//       setImageUploading(false);
//       e.target.value = "";
//     }
//   };

//   const deleteImageFromCloudinary = async (imageUrl) => {
//     if (!imageUrl) return;

//     const public_id = imageUrl
//       .split("/upload/")[1]
//       ?.split(".")[0]
//       ?.replace(/^v\d+\//, "");

//     if (!public_id) return;

//     await fetch("/api/delete-image", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ public_id }),
//     });
//   };

//   const requestRemoveMainImage = () => {
//     if (!form?.image) {
//       showModal("error", "No main image found to delete.");
//       return;
//     }

//     setDeleteTarget({
//       type: "mainImage",
//       index: null,
//     });

//     setConfirmModal({
//       show: true,
//       loading: false,
//     });
//   };

//   const requestRemoveSubImage = (index) => {
//     setDeleteTarget({
//       type: "subImage",
//       index,
//     });

//     setConfirmModal({
//       show: true,
//       loading: false,
//     });
//   };

//   const confirmDelete = async () => {
//     if (deleteTarget.type === "mainImage") {
//       await confirmRemoveMainImage();
//       return;
//     }

//     if (deleteTarget.type === "subImage") {
//       await confirmRemoveSubImage();
//       return;
//     }

//     showModal("error", "No delete action selected.");
//     closeConfirmModal();
//   };

//   const confirmRemoveMainImage = async () => {
//     try {
//       setConfirmModal({
//         show: true,
//         loading: true,
//       });

//       await deleteImageFromCloudinary(form.image);

//       setForm((prev) => ({
//         ...prev,
//         image: "",
//       }));

//       const { error } = await supabaseServer
//         .from("blogs")
//         .update({ image: "" })
//         .eq("id", id);

//       if (error) throw error;

//       closeConfirmModal();
//       showModal("success", "Main image deleted successfully.");
//     } catch (err) {
//       console.error(err);
//       closeConfirmModal();
//       showModal("error", "Main image delete failed. Please try again.");
//     }
//   };

//   const confirmRemoveSubImage = async () => {
//     if (deleteTarget.index === null) {
//       showModal("error", "No sub image selected.");
//       closeConfirmModal();
//       return;
//     }

//     try {
//       setConfirmModal({
//         show: true,
//         loading: true,
//       });

//       const currentSubImages = form.subimages || [];
//       const imageUrl = currentSubImages[deleteTarget.index];

//       await deleteImageFromCloudinary(imageUrl);

//       const updated = currentSubImages.filter(
//         (_, i) => i !== deleteTarget.index,
//       );

//       setForm((prev) => ({
//         ...prev,
//         subimages: updated,
//       }));

//       const { error } = await supabaseServer
//         .from("blogs")
//         .update({ subimages: updated })
//         .eq("id", id);

//       if (error) throw error;

//       closeConfirmModal();
//       showModal("success", "Sub image deleted successfully.");
//     } catch (err) {
//       console.error(err);
//       closeConfirmModal();
//       showModal("error", "Sub image delete failed. Please try again.");
//     }
//   };

//   const updateBlog = async () => {
//     if (!form.title?.trim()) {
//       showModal("error", "Blog title is required.");
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         ...form,

//         checklist: Array.isArray(form.checklist)
//           ? form.checklist
//           : formatArray(form.checklist || ""),

//         highlights: Array.isArray(form.highlights)
//           ? form.highlights
//           : formatArray(form.highlights || ""),

//         posttags: Array.isArray(form.posttags)
//           ? form.posttags
//           : formatArray(form.posttags || ""),

//         subimages: Array.isArray(form.subimages) ? form.subimages : [],
//       };

//       const { error } = await supabaseServer
//         .from("blogs")
//         .update(payload)
//         .eq("id", id);

//       if (error) throw error;

//       showModal("success", "Blog updated successfully.", true);
//     } catch (err) {
//       console.error(err);
//       showModal("error", "Update failed. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getConfirmContent = () => {
//     if (deleteTarget.type === "mainImage") {
//       return {
//         title: "Delete Main Image?",
//         message:
//           "Are you sure you want to delete this main image? This action cannot be undone.",
//         confirmText: "Delete Image",
//       };
//     }

//     if (deleteTarget.type === "subImage") {
//       return {
//         title: "Delete Sub Image?",
//         message:
//           "Are you sure you want to delete this sub image? This action cannot be undone.",
//         confirmText: "Delete Image",
//       };
//     }

//     return {
//       title: "Are you sure?",
//       message: "This action cannot be undone.",
//       confirmText: "Confirm",
//     };
//   };

//   const confirmContent = getConfirmContent();

//   if (loading) {
//     return <div className="p-10 text-center text-gray-500">Loading...</div>;
//   }

//   if (!form) {
//     return <div className="p-10 text-center text-gray-500">Blog not found</div>;
//   }

//   return (
//     <>
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* HEADER */}
//         <div className="flex justify-between items-center">
//           <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
//             <Newspaper className="text-primary" />
//             Edit Blog
//           </h1>

//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-semibold hover:bg-gray-50 transition"
//           >
//             <ArrowLeft size={16} />
//             Back
//           </button>
//         </div>

//         {/* BASIC */}
//         <div className={cardClass}>
//           <h2 className="flex items-center gap-2 text-lg font-bold">
//             <User className="text-primary" /> Basic Info
//           </h2>

//           <Input
//             label="Title"
//             value={form.title}
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 title: e.target.value,
//               }))
//             }
//           />

//           <Input
//             label="Author"
//             value={form.author}
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 author: e.target.value,
//               }))
//             }
//           />

//           <Input
//             label="Date"
//             type="date"
//             value={form.date}
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 date: e.target.value,
//               }))
//             }
//           />

//           <Textarea
//             label="Description"
//             value={form.description}
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 description: e.target.value,
//               }))
//             }
//           />
//         </div>

//         {/* QUOTE */}
//         <div className={cardClass}>
//           <h2 className="flex items-center gap-2 text-lg font-bold">
//             <Quote className="text-primary" /> Quote
//           </h2>

//           <Textarea
//             label="Quote"
//             value={form.quote}
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 quote: e.target.value,
//               }))
//             }
//           />
//         </div>

//         {/* CHECKLIST */}
//         <div className={cardClass}>
//           <h2 className="flex items-center gap-2 text-lg font-bold">
//             <ListChecks className="text-primary" /> Checklist & Highlights
//           </h2>

//           <Textarea
//             label="Checklist (one per line)"
//             value={
//               Array.isArray(form.checklist)
//                 ? form.checklist.join("\n")
//                 : form.checklist
//             }
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 checklist: e.target.value,
//               }))
//             }
//           />

//           <Textarea
//             label="Highlights (one per line)"
//             value={
//               Array.isArray(form.highlights)
//                 ? form.highlights.join("\n")
//                 : form.highlights
//             }
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 highlights: e.target.value,
//               }))
//             }
//           />
//         </div>

//         {/* TAGS */}
//         <div className={cardClass}>
//           <h2 className="flex items-center gap-2 text-lg font-bold">
//             <Tags className="text-primary" /> Tags
//           </h2>

//           <Textarea
//             label="Tags (one per line)"
//             value={
//               Array.isArray(form.posttags)
//                 ? form.posttags.join("\n")
//                 : form.posttags
//             }
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 posttags: e.target.value,
//               }))
//             }
//           />
//         </div>

//         {/* MAIN IMAGE */}
//         <div className={cardClass}>
//           <h2 className="flex items-center gap-2 text-lg font-bold">
//             <ImageIcon className="text-primary" /> Main Image
//           </h2>

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => uploadImage(e, "main")}
//             disabled={imageUploading}
//             className={inputClass}
//           />

//           {form.image && (
//             <div className="relative w-48">
//               <img
//                 src={form.image}
//                 className="w-full h-40 object-cover rounded-xl border"
//                 alt="Main blog"
//               />

//               <button
//                 type="button"
//                 onClick={requestRemoveMainImage}
//                 className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
//               >
//                 <Trash2 size={14} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* SUB IMAGES */}
//         <div className={cardClass}>
//           <h2 className="flex items-center gap-2 text-lg font-bold">
//             <ImageIcon className="text-primary" /> Sub Images
//           </h2>

//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={(e) => uploadImage(e, "sub")}
//             disabled={imageUploading}
//             className={inputClass}
//           />

//           {imageUploading && (
//             <p className="text-sm font-medium text-gray-500">
//               Uploading image, please wait...
//             </p>
//           )}

//           {form.subimages?.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {form.subimages.map((img, i) => (
//                 <div key={`${img}-${i}`} className="relative">
//                   <img
//                     src={img}
//                     className="w-full h-32 object-cover rounded-xl border"
//                     alt={`Sub image ${i + 1}`}
//                   />

//                   <button
//                     type="button"
//                     onClick={() => requestRemoveSubImage(i)}
//                     className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
//                   >
//                     <Trash2 size={12} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-sm text-gray-400">No sub images uploaded yet.</p>
//           )}
//         </div>

//         {/* SAVE BUTTON */}
//         <button
//           type="button"
//           onClick={updateBlog}
//           disabled={saving || imageUploading}
//           className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-secondary transition disabled:opacity-60"
//         >
//           <Save size={18} />
//           {saving ? "Updating..." : "Update Blog"}
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

// EditBlogPage.getLayout = (page) => (
//   <AdminLayout title="Edit Blog">{page}</AdminLayout>
// );

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import {
  ArrowLeft,
  ImageIcon,
  ListChecks,
  Newspaper,
  Quote,
  Save,
  Tags,
  Trash2,
  User,
} from "lucide-react";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

const cardClass =
  "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

const Input = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
      {label}
    </label>
    <input
      type={type}
      className={inputClass}
      value={value || ""}
      onChange={onChange}
    />
  </div>
);

const Textarea = ({ label, value, onChange, rows = 4 }) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
      {label}
    </label>
    <textarea
      rows={rows}
      className={inputClass}
      value={value || ""}
      onChange={onChange}
    />
  </div>
);

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New selected images only for preview. These will upload only after Update Blog.
  const [newMainImage, setNewMainImage] = useState(null);
  const [newMainPreview, setNewMainPreview] = useState("");

  const [newSubImages, setNewSubImages] = useState([]);
  const [newSubPreviews, setNewSubPreviews] = useState([]);

  // Existing images marked for deletion, but real Cloudinary delete happens after Update Blog.
  const [removeExistingMain, setRemoveExistingMain] = useState(false);
  const [deletedExistingSubImages, setDeletedExistingSubImages] = useState([]);

  const [deleteTarget, setDeleteTarget] = useState({
    type: null,
    index: null,
    url: null,
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
      router.push("/dashboard/blogs");
    }
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      show: false,
      loading: false,
    });

    setDeleteTarget({
      type: null,
      index: null,
      url: null,
    });
  };

  useEffect(() => {
    if (!id) return;
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);

    const { data, error } = await supabaseServer
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      showModal("error", "Blog data fetch failed.");
      setLoading(false);
      return;
    }

    setForm({
      ...data,
      subimages: Array.isArray(data.subimages) ? data.subimages : [],
      checklist: Array.isArray(data.checklist) ? data.checklist : [],
      highlights: Array.isArray(data.highlights) ? data.highlights : [],
      posttags: Array.isArray(data.posttags) ? data.posttags : [],
    });

    setLoading(false);
  };

  const formatArray = (value) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const uploadFileToCloudinary = async (file, folder = "blogs") => {
    const reader = new FileReader();

    const base64 = await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: base64, folder }),
    });

    const data = await res.json();

    if (!res.ok || !data.url) {
      throw new Error(data.message || "Upload failed. Please try again.");
    }

    return data;
  };

  const getPublicIdFromCloudinaryUrl = (imageUrl) => {
    if (!imageUrl) return null;

    return imageUrl
      .split("/upload/")[1]
      ?.split(".")[0]
      ?.replace(/^v\d+\//, "");
  };

  const deleteImageFromCloudinary = async (imageUrl) => {
    const public_id = getPublicIdFromCloudinaryUrl(imageUrl);

    if (!public_id) return;

    await fetch("/api/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id }),
    });
  };

  // ================= IMAGE SELECT: ONLY PREVIEW =================
  const handleMainImageSelect = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (newMainPreview) {
      URL.revokeObjectURL(newMainPreview);
    }

    setNewMainImage(selected);
    setNewMainPreview(URL.createObjectURL(selected));

    e.target.value = "";
  };

  const handleSubImagesSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));

    setNewSubImages((prev) => [...prev, ...files]);
    setNewSubPreviews((prev) => [...prev, ...previews]);

    e.target.value = "";
  };

  // ================= DELETE REQUESTS =================
  const requestRemoveNewMainPreview = () => {
    setDeleteTarget({
      type: "newMainPreview",
      index: null,
      url: null,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const requestRemoveExistingMainImage = () => {
    if (!form?.image) {
      showModal("error", "No main image found.");
      return;
    }

    setDeleteTarget({
      type: "existingMainImage",
      index: null,
      url: form.image,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const requestRemoveNewSubPreview = (index) => {
    setDeleteTarget({
      type: "newSubPreview",
      index,
      url: null,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const requestRemoveExistingSubImage = (index, url) => {
    setDeleteTarget({
      type: "existingSubImage",
      index,
      url,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDelete = () => {
    if (deleteTarget.type === "newMainPreview") {
      removeNewMainPreview();
      return;
    }

    if (deleteTarget.type === "existingMainImage") {
      removeExistingMainImageFromPreview();
      return;
    }

    if (deleteTarget.type === "newSubPreview") {
      removeNewSubPreview();
      return;
    }

    if (deleteTarget.type === "existingSubImage") {
      removeExistingSubImageFromPreview();
      return;
    }

    showModal("error", "No delete action selected.");
    closeConfirmModal();
  };

  const removeNewMainPreview = () => {
    if (newMainPreview) {
      URL.revokeObjectURL(newMainPreview);
    }

    setNewMainImage(null);
    setNewMainPreview("");

    closeConfirmModal();
    showModal("success", "Selected main image preview removed.");
  };

  const removeExistingMainImageFromPreview = () => {
    setRemoveExistingMain(true);

    setForm((prev) => ({
      ...prev,
      image: "",
    }));

    closeConfirmModal();
    showModal(
      "success",
      "Main image removed from preview. Click Update Blog to save.",
    );
  };

  const removeNewSubPreview = () => {
    if (deleteTarget.index === null) {
      showModal("error", "No sub image selected.");
      closeConfirmModal();
      return;
    }

    const previewUrl = newSubPreviews[deleteTarget.index];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setNewSubImages((prev) => prev.filter((_, i) => i !== deleteTarget.index));

    setNewSubPreviews((prev) =>
      prev.filter((_, i) => i !== deleteTarget.index),
    );

    closeConfirmModal();
    showModal("success", "Selected sub image preview removed.");
  };

  const removeExistingSubImageFromPreview = () => {
    if (!deleteTarget.url) {
      showModal("error", "No sub image selected.");
      closeConfirmModal();
      return;
    }

    setDeletedExistingSubImages((prev) => [...prev, deleteTarget.url]);

    setForm((prev) => ({
      ...prev,
      subimages: (prev.subimages || []).filter(
        (img) => img !== deleteTarget.url,
      ),
    }));

    closeConfirmModal();
    showModal(
      "success",
      "Sub image removed from preview. Click Update Blog to save.",
    );
  };

  // ================= UPDATE BLOG: UPLOAD HAPPENS HERE =================
  const updateBlog = async () => {
    if (!form.title?.trim()) {
      showModal("error", "Blog title is required.");
      return;
    }

    try {
      setSaving(true);

      let finalMainImage = form.image || "";

      if (newMainImage) {
        const uploaded = await uploadFileToCloudinary(newMainImage, "blogs");
        finalMainImage = uploaded.url;

        if (removeExistingMain && deleteTarget.url) {
          await deleteImageFromCloudinary(deleteTarget.url);
        }
      }

      if (removeExistingMain && !newMainImage) {
        finalMainImage = "";
      }

      const uploadedSubUrls = [];

      if (newSubImages.length > 0) {
        for (const file of newSubImages) {
          const uploaded = await uploadFileToCloudinary(file, "blogs");
          uploadedSubUrls.push(uploaded.url);
        }
      }

      for (const oldUrl of deletedExistingSubImages) {
        await deleteImageFromCloudinary(oldUrl);
      }

      const finalSubImages = [
        ...(Array.isArray(form.subimages) ? form.subimages : []),
        ...uploadedSubUrls,
      ];

      const payload = {
        ...form,
        image: finalMainImage,
        subimages: finalSubImages,

        checklist: Array.isArray(form.checklist)
          ? form.checklist
          : formatArray(form.checklist || ""),

        highlights: Array.isArray(form.highlights)
          ? form.highlights
          : formatArray(form.highlights || ""),

        posttags: Array.isArray(form.posttags)
          ? form.posttags
          : formatArray(form.posttags || ""),
      };

      const { error } = await supabaseServer
        .from("blogs")
        .update(payload)
        .eq("id", id);

      if (error) throw error;

      if (newMainPreview) {
        URL.revokeObjectURL(newMainPreview);
      }

      newSubPreviews.forEach((url) => URL.revokeObjectURL(url));

      setNewMainImage(null);
      setNewMainPreview("");
      setNewSubImages([]);
      setNewSubPreviews([]);
      setDeletedExistingSubImages([]);
      setRemoveExistingMain(false);

      showModal("success", "Blog updated successfully.", true);
    } catch (err) {
      console.error(err);
      showModal("error", err.message || "Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const getConfirmContent = () => {
    if (deleteTarget.type === "newMainPreview") {
      return {
        title: "Remove Selected Main Image?",
        message: "Are you sure you want to remove this selected preview image?",
        confirmText: "Remove Image",
      };
    }

    if (deleteTarget.type === "existingMainImage") {
      return {
        title: "Remove Main Image?",
        message:
          "This image will be removed from the blog after you click Update Blog.",
        confirmText: "Remove Image",
      };
    }

    if (deleteTarget.type === "newSubPreview") {
      return {
        title: "Remove Selected Sub Image?",
        message: "Are you sure you want to remove this selected preview image?",
        confirmText: "Remove Image",
      };
    }

    if (deleteTarget.type === "existingSubImage") {
      return {
        title: "Remove Sub Image?",
        message:
          "This image will be removed from the blog after you click Update Blog.",
        confirmText: "Remove Image",
      };
    }

    return {
      title: "Are you sure?",
      message: "This action cannot be undone.",
      confirmText: "Confirm",
    };
  };

  const confirmContent = getConfirmContent();

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  }

  if (!form) {
    return <div className="p-10 text-center text-gray-500">Blog not found</div>;
  }

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Newspaper className="text-primary" />
            Edit Blog
          </h1>

          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-semibold hover:bg-gray-50 transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* BASIC */}
        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <User className="text-primary" /> Basic Info
          </h2>

          <Input
            label="Title"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />

          <Input
            label="Author"
            value={form.author}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                author: e.target.value,
              }))
            }
          />

          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
          />

          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>

        {/* QUOTE */}
        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Quote className="text-primary" /> Quote
          </h2>

          <Textarea
            label="Quote"
            value={form.quote}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                quote: e.target.value,
              }))
            }
          />
        </div>

        {/* CHECKLIST */}
        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ListChecks className="text-primary" /> Checklist & Highlights
          </h2>

          <Textarea
            label="Checklist (one per line)"
            value={
              Array.isArray(form.checklist)
                ? form.checklist.join("\n")
                : form.checklist
            }
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                checklist: e.target.value,
              }))
            }
          />

          <Textarea
            label="Highlights (one per line)"
            value={
              Array.isArray(form.highlights)
                ? form.highlights.join("\n")
                : form.highlights
            }
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                highlights: e.target.value,
              }))
            }
          />
        </div>

        {/* TAGS */}
        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Tags className="text-primary" /> Tags
          </h2>

          <Textarea
            label="Tags (one per line)"
            value={
              Array.isArray(form.posttags)
                ? form.posttags.join("\n")
                : form.posttags
            }
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                posttags: e.target.value,
              }))
            }
          />
        </div>

        {/* MAIN IMAGE */}
        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ImageIcon className="text-primary" /> Main Image
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageSelect}
            disabled={saving}
            className={inputClass}
          />

          {(newMainPreview || form.image) && (
            <div className="relative w-48">
              <img
                src={newMainPreview || form.image}
                className="w-full h-40 object-cover rounded-xl border"
                alt="Main blog"
              />

              <button
                type="button"
                onClick={
                  newMainPreview
                    ? requestRemoveNewMainPreview
                    : requestRemoveExistingMainImage
                }
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
              >
                <Trash2 size={14} />
              </button>

              {newMainPreview && (
                <p className="mt-2 text-xs font-medium text-primary">
                  New image selected. It will upload after Update Blog.
                </p>
              )}
            </div>
          )}
        </div>

        {/* SUB IMAGES */}
        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ImageIcon className="text-primary" /> Sub Images
          </h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleSubImagesSelect}
            disabled={saving}
            className={inputClass}
          />

          {form.subimages?.length > 0 || newSubPreviews.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {form.subimages?.map((img, i) => (
                <div key={`existing-${img}-${i}`} className="relative">
                  <img
                    src={img}
                    className="w-full h-32 object-cover rounded-xl border"
                    alt={`Sub image ${i + 1}`}
                  />

                  <button
                    type="button"
                    onClick={() => requestRemoveExistingSubImage(i, img)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}

              {newSubPreviews.map((img, i) => (
                <div key={`new-${img}-${i}`} className="relative">
                  <img
                    src={img}
                    className="w-full h-32 object-cover rounded-xl border"
                    alt={`New sub image ${i + 1}`}
                  />

                  <button
                    type="button"
                    onClick={() => requestRemoveNewSubPreview(i)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
                  >
                    <Trash2 size={12} />
                  </button>

                  <p className="mt-1 text-xs font-medium text-primary">
                    New selected
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No sub images uploaded yet.</p>
          )}
        </div>

        {/* SAVE BUTTON */}
        <button
          type="button"
          onClick={updateBlog}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-secondary transition disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Updating & Uploading..." : "Update Blog"}
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

EditBlogPage.getLayout = (page) => (
  <AdminLayout title="Edit Blog">{page}</AdminLayout>
);
