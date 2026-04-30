// "use client";

// import { useEffect, useState } from "react";
// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useUpload } from "@/Hooks/useUpload";
// import { Plus, Trash2, Save } from "lucide-react";
// import StatusModal from "@/components/StatusModal";
// import ConfirmModal from "@/components/ConfirmModal";

// export default function AboutAdmin() {
//   const { uploadFile } = useUpload();

//   const [section, setSection] = useState(null);
//   const [form, setForm] = useState({
//     badge: "",
//     title: "",
//     highlighted_title: "",
//     description1: "",
//     description2: "",
//     image: "",
//     public_id: "",
//     features: [],
//     button_primary_text: "",
//     button_primary_link: "",
//     button_secondary_text: "",
//     button_secondary_link: "",
//     stats_title: "",
//     stats_value: "",
//     stats_subtitle: "",
//   });

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [newFeature, setNewFeature] = useState("");
//   const [saving, setSaving] = useState(false);

//   const [modal, setModal] = useState({
//     show: false,
//     type: "success",
//     message: "",
//   });

//   const [confirmModal, setConfirmModal] = useState({
//     show: false,
//     loading: false,
//   });

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

//   // ================= FETCH =================
//   const fetchData = async () => {
//     const { data, error } = await supabaseServer
//       .from("about_section")
//       .select("*")
//       .single();

//     if (error) {
//       console.error(error);
//       return;
//     }

//     if (data) {
//       setSection(data);
//       setForm({
//         ...data,
//         features: data.features || [],
//       });
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ================= IMAGE =================
//   const handleFileChange = (e) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//   };

//   const requestDeleteImage = () => {
//     if (!section?.public_id) {
//       showModal("error", "No image found to delete.");
//       return;
//     }

//     setConfirmModal({
//       show: true,
//       loading: false,
//     });
//   };

//   const confirmDeleteImage = async () => {
//     if (!section?.public_id) {
//       showModal("error", "No image found to delete.");
//       setConfirmModal({ show: false, loading: false });
//       return;
//     }

//     try {
//       setConfirmModal({
//         show: true,
//         loading: true,
//       });

//       await fetch("/api/delete-image", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ public_id: section.public_id }),
//       });

//       const { error } = await supabaseServer
//         .from("about_section")
//         .update({ image: null, public_id: null })
//         .eq("id", section.id);

//       if (error) throw error;

//       setPreview("");
//       setFile(null);

//       setConfirmModal({
//         show: false,
//         loading: false,
//       });

//       showModal("success", "Image deleted successfully.");
//       fetchData();
//     } catch (err) {
//       console.error(err);

//       setConfirmModal({
//         show: false,
//         loading: false,
//       });

//       showModal("error", "Image delete failed. Please try again.");
//     }
//   };

//   // const deleteImage = async () => {
//   //   if (!section?.public_id) {
//   //     showModal("error", "No image found to delete.");
//   //     return;
//   //   }

//   //   try {
//   //     setConfirmModal({
//   //       show: true,
//   //       loading: true,
//   //     });

//   //     await fetch("/api/delete-image", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ public_id: section.public_id }),
//   //     });

//   //     const { error } = await supabaseServer
//   //       .from("about_section")
//   //       .update({ image: null, public_id: null })
//   //       .eq("id", section.id);

//   //     if (error) throw error;

//   //     setPreview("");
//   //     setFile(null);

//   //     setConfirmModal({
//   //       show: false,
//   //       loading: false,
//   //     });

//   //     showModal("success", "Image deleted successfully.");
//   //     fetchData();
//   //   } catch (err) {
//   //     console.error(err);

//   //     setConfirmModal({
//   //       show: false,
//   //       loading: false,
//   //     });

//   //     showModal("error", "Image delete failed. Please try again.");
//   //   }
//   // };

//   // ================= FEATURES =================
//   const addFeature = () => {
//     if (!newFeature.trim()) {
//       showModal("error", "Please write a feature title first.");
//       return;
//     }

//     setForm({
//       ...form,
//       features: [...form.features, { title: newFeature }],
//     });

//     setNewFeature("");
//   };

//   const deleteFeature = (index) => {
//     const updated = form.features.filter((_, i) => i !== index);
//     setForm({ ...form, features: updated });
//   };

//   const updateFeature = (index, value) => {
//     const updated = [...form.features];
//     updated[index].title = value;
//     setForm({ ...form, features: updated });
//   };

//   // ================= SAVE =================
//   const handleSave = async () => {
//     try {
//       setSaving(true);

//       let imageUrl = form.image;
//       let publicId = form.public_id;

//       if (file) {
//         if (form.public_id) {
//           await fetch("/api/delete-image", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ public_id: form.public_id }),
//           });
//         }

//         const res = await uploadFile(file, "about");
//         imageUrl = res.url;
//         publicId = res.public_id;
//       }

//       const payload = {
//         badge: form.badge,
//         title: form.title,
//         highlighted_title: form.highlighted_title,
//         description1: form.description1,
//         description2: form.description2,
//         image: imageUrl,
//         public_id: publicId,
//         features: form.features,
//         button_primary_text: form.button_primary_text,
//         button_primary_link: form.button_primary_link,
//         button_secondary_text: form.button_secondary_text,
//         button_secondary_link: form.button_secondary_link,
//         stats_title: form.stats_title,
//         stats_value: form.stats_value,
//         stats_subtitle: form.stats_subtitle,
//       };

//       if (section) {
//         const { error } = await supabaseServer
//           .from("about_section")
//           .update(payload)
//           .eq("id", section.id);

//         if (error) throw error;
//       } else {
//         const { error } = await supabaseServer
//           .from("about_section")
//           .insert([payload]);

//         if (error) throw error;
//       }

//       setFile(null);
//       setPreview("");

//       showModal("success", "About section saved successfully.");
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       showModal("error", "Save failed. Please check your data and try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ================= UI =================
//   return (
//     <>
//       <div className="max-w-5xl mx-auto space-y-6">
//         <h1 className="text-2xl font-bold">About Section</h1>

//         <div className="bg-white p-6 rounded-xl border space-y-4">
//           <input
//             placeholder="Badge"
//             value={form.badge}
//             onChange={(e) => setForm({ ...form, badge: e.target.value })}
//             className="border p-3 w-full rounded"
//           />

//           <input
//             placeholder="Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className="border p-3 w-full rounded"
//           />

//           <input
//             placeholder="Highlighted Title"
//             value={form.highlighted_title}
//             onChange={(e) =>
//               setForm({ ...form, highlighted_title: e.target.value })
//             }
//             className="border p-3 w-full rounded"
//           />

//           <textarea
//             placeholder="Description 1"
//             value={form.description1}
//             onChange={(e) => setForm({ ...form, description1: e.target.value })}
//             className="border p-3 w-full rounded"
//           />

//           <textarea
//             placeholder="Description 2"
//             value={form.description2}
//             onChange={(e) => setForm({ ...form, description2: e.target.value })}
//             className="border p-3 w-full rounded"
//           />

//           {/* IMAGE */}
//           <div>
//             <input type="file" accept="image/*" onChange={handleFileChange} />

//             {preview ? (
//               <img src={preview} className="w-40 mt-3 rounded" alt="Preview" />
//             ) : form.image ? (
//               <div className="relative w-fit mt-3">
//                 <img src={form.image} className="w-40 rounded" alt="About" />
//                 <button
//                   type="button"
//                   onClick={requestDeleteImage}
//                   className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             ) : null}
//           </div>

//           {/* FEATURES */}
//           <div>
//             <h3 className="font-semibold mb-2">Features</h3>

//             <div className="flex gap-2 mb-3">
//               <input
//                 value={newFeature}
//                 onChange={(e) => setNewFeature(e.target.value)}
//                 className="border p-3 w-full rounded"
//                 placeholder="Add feature"
//               />
//               <button
//                 type="button"
//                 onClick={addFeature}
//                 className="bg-primary text-white px-4 rounded"
//               >
//                 <Plus size={16} />
//               </button>
//             </div>

//             {form.features.map((f, i) => (
//               <div key={i} className="flex gap-2 mb-2">
//                 <input
//                   value={f.title}
//                   onChange={(e) => updateFeature(i, e.target.value)}
//                   className="border p-3 w-full rounded"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => deleteFeature(i)}
//                   className="bg-red-100 p-2 rounded"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* BUTTONS */}
//           <input
//             placeholder="Primary Button Text"
//             value={form.button_primary_text}
//             onChange={(e) =>
//               setForm({ ...form, button_primary_text: e.target.value })
//             }
//             className="border p-3 w-full rounded"
//           />

//           <input
//             placeholder="Primary Button Link"
//             value={form.button_primary_link}
//             onChange={(e) =>
//               setForm({ ...form, button_primary_link: e.target.value })
//             }
//             className="border p-3 w-full rounded"
//           />

//           <input
//             placeholder="Secondary Button Text"
//             value={form.button_secondary_text}
//             onChange={(e) =>
//               setForm({ ...form, button_secondary_text: e.target.value })
//             }
//             className="border p-3 w-full rounded"
//           />

//           <input
//             placeholder="Secondary Button Link"
//             value={form.button_secondary_link}
//             onChange={(e) =>
//               setForm({ ...form, button_secondary_link: e.target.value })
//             }
//             className="border p-3 w-full rounded"
//           />

//           {/* STATS */}
//           <input
//             placeholder="Stats Title"
//             value={form.stats_title}
//             onChange={(e) => setForm({ ...form, stats_title: e.target.value })}
//             className="border p-3 w-full rounded"
//           />

//           <input
//             placeholder="Stats Value"
//             value={form.stats_value}
//             onChange={(e) => setForm({ ...form, stats_value: e.target.value })}
//             className="border p-3 w-full rounded"
//           />

//           <input
//             placeholder="Stats Subtitle"
//             value={form.stats_subtitle}
//             onChange={(e) =>
//               setForm({ ...form, stats_subtitle: e.target.value })
//             }
//             className="border p-3 w-full rounded"
//           />

//           <button
//             type="button"
//             onClick={handleSave}
//             disabled={saving}
//             className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-60"
//           >
//             <Save size={16} />
//             {saving ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>

//       <ConfirmModal
//         show={confirmModal.show}
//         title="Delete Image?"
//         message="Are you sure you want to delete this image? This action cannot be undone."
//         confirmText="Delete Image"
//         cancelText="Cancel"
//         loading={confirmModal.loading}
//         onCancel={() => setConfirmModal({ show: false, loading: false })}
//         onConfirm={confirmDeleteImage}
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

// AboutAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import {
  Plus,
  Trash2,
  Save,
  ImageIcon,
  Sparkles,
  Type,
  MousePointerClick,
  BarChart3,
  ListChecks,
} from "lucide-react";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

export default function AboutAdmin() {
  const { uploadFile } = useUpload();

  const [section, setSection] = useState(null);

  const [form, setForm] = useState({
    badge: "",
    title: "",
    highlighted_title: "",
    description1: "",
    description2: "",
    image: "",
    public_id: "",
    features: [],
    button_primary_text: "",
    button_primary_link: "",
    button_secondary_text: "",
    button_secondary_link: "",
    stats_title: "",
    stats_value: "",
    stats_subtitle: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [newFeature, setNewFeature] = useState({
    icon: "shield",
    text: "",
  });

  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    loading: false,
  });

  const featureIconOptions = [
    { value: "shield", label: "Shield / Compliance" },
    { value: "chart", label: "Chart / Growth" },
    { value: "balance", label: "Balance / Advisory" },
  ];

  const inputClass =
    "w-full rounded-2xl border border-border_color bg-white px-4 py-3 text-sm text-soft_black outline-none transition-all duration-500 placeholder:text-gray-400 focus:border-primary focus:shadow-[0_0_0_4px_rgba(56,182,255,0.12)]";

  const textareaClass =
    "w-full rounded-2xl border border-border_color bg-white px-4 py-3 text-sm text-soft_black outline-none transition-all duration-500 placeholder:text-gray-400 focus:border-primary focus:shadow-[0_0_0_4px_rgba(56,182,255,0.12)] min-h-[120px] resize-none";

  const cardClass =
    "relative overflow-hidden rounded-[1.5rem] border border-border_color bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] space-y-5";

  const sectionTitleClass =
    "flex items-center gap-2 text-xl font-bold text-soft_black";

  const iconBoxClass =
    "flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary";

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

  // ================= FETCH =================
  const fetchData = async () => {
    const { data, error } = await supabaseServer
      .from("about_section")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setSection(data);

      setForm({
        badge: data.badge || "",
        title: data.title || "",
        highlighted_title: data.highlighted_title || "",
        description1: data.description1 || "",
        description2: data.description2 || "",
        image: data.image || "",
        public_id: data.public_id || "",
        features: data.features || [],
        button_primary_text: data.button_primary_text || "",
        button_primary_link: data.button_primary_link || "",
        button_secondary_text: data.button_secondary_text || "",
        button_secondary_link: data.button_secondary_link || "",
        stats_title: data.stats_title || "",
        stats_value: data.stats_value || "",
        stats_subtitle: data.stats_subtitle || "",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= IMAGE =================
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const requestDeleteImage = () => {
    if (!section?.public_id) {
      showModal("error", "No image found to delete.");
      return;
    }

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDeleteImage = async () => {
    if (!section?.public_id) {
      showModal("error", "No image found to delete.");
      setConfirmModal({ show: false, loading: false });
      return;
    }

    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: section.public_id }),
      });

      const { error } = await supabaseServer
        .from("about_section")
        .update({ image: null, public_id: null })
        .eq("id", section.id);

      if (error) throw error;

      setPreview("");
      setFile(null);

      setConfirmModal({
        show: false,
        loading: false,
      });

      showModal("success", "Image deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);

      setConfirmModal({
        show: false,
        loading: false,
      });

      showModal("error", "Image delete failed. Please try again.");
    }
  };

  // ================= FEATURES =================
  const addFeature = () => {
    if (!newFeature.text.trim()) {
      showModal("error", "Please write a feature text first.");
      return;
    }

    setForm({
      ...form,
      features: [
        ...(form.features || []),
        {
          icon: newFeature.icon,
          text: newFeature.text,
        },
      ],
    });

    setNewFeature({
      icon: "shield",
      text: "",
    });
  };

  const deleteFeature = (index) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updated });
  };

  const updateFeature = (index, field, value) => {
    const updated = [...form.features];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm({ ...form, features: updated });
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setSaving(true);

      let imageUrl = form.image;
      let publicId = form.public_id;

      if (file) {
        if (form.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_id: form.public_id }),
          });
        }

        const res = await uploadFile(file, "about");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      const payload = {
        badge: form.badge,
        title: form.title,
        highlighted_title: form.highlighted_title,
        description1: form.description1,
        description2: form.description2,
        image: imageUrl,
        public_id: publicId,
        features: form.features,
        button_primary_text: form.button_primary_text,
        button_primary_link: form.button_primary_link,
        button_secondary_text: form.button_secondary_text,
        button_secondary_link: form.button_secondary_link,
        stats_title: form.stats_title,
        stats_value: form.stats_value,
        stats_subtitle: form.stats_subtitle,
      };

      if (section) {
        const { error } = await supabaseServer
          .from("about_section")
          .update(payload)
          .eq("id", section.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("about_section")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setSection(data);
      }

      setFile(null);
      setPreview("");

      showModal("success", "About section saved successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Save failed. Please check your data and try again.");
    } finally {
      setSaving(false);
    }
  };

  // ================= UI =================
  return (
    <>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-[2rem] border border-border_color bg-gradient-to-br from-white via-background to-primary/10 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Sparkles size={14} />
                About Content
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-soft_black md:text-4xl">
                About Section Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-secondary_two/70">
                Manage about section content, image, feature points, action
                buttons and statistics from one premium dashboard.
              </p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/80 px-6 py-4 text-right shadow-[0_12px_35px_rgba(15,23,42,0.06)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Total Features
              </p>
              <p className="mt-1 text-3xl font-extrabold text-primary">
                {form.features?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-8">
            {/* CONTENT */}
            <div className={cardClass}>
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary_light to-secondary" />

              <div>
                <h2 className={sectionTitleClass}>
                  <span className={iconBoxClass}>
                    <Type size={18} />
                  </span>
                  Section Content
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update badge, title and description text.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  placeholder="Badge"
                  value={form.badge || ""}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className={inputClass}
                />

                <input
                  placeholder="Highlighted Title"
                  value={form.highlighted_title || ""}
                  onChange={(e) =>
                    setForm({ ...form, highlighted_title: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <input
                placeholder="Title"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />

              <textarea
                placeholder="Description 1"
                value={form.description1 || ""}
                onChange={(e) =>
                  setForm({ ...form, description1: e.target.value })
                }
                className={textareaClass}
              />

              <textarea
                placeholder="Description 2"
                value={form.description2 || ""}
                onChange={(e) =>
                  setForm({ ...form, description2: e.target.value })
                }
                className={textareaClass}
              />
            </div>

            {/* FEATURES */}
            <div className={cardClass}>
              <div>
                <h2 className={sectionTitleClass}>
                  <span className={iconBoxClass}>
                    <ListChecks size={18} />
                  </span>
                  Feature Points
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add icon and text for each about section feature point.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-[0.38fr_1fr_auto]">
                <select
                  value={newFeature.icon}
                  onChange={(e) =>
                    setNewFeature({
                      ...newFeature,
                      icon: e.target.value,
                    })
                  }
                  className={inputClass}
                >
                  {featureIconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <input
                  value={newFeature.text}
                  onChange={(e) =>
                    setNewFeature({
                      ...newFeature,
                      text: e.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Example: 100% Compliance"
                />

                <button
                  type="button"
                  onClick={addFeature}
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-primary px-5 text-white shadow-lg shadow-primary/20 transition-all duration-500 hover:-translate-y-0.5 hover:bg-primary_light"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {form.features?.length > 0 ? (
                  form.features.map((f, i) => (
                    <div
                      key={i}
                      className="group grid gap-3 rounded-2xl border border-border_color bg-background/70 p-3 transition-all duration-500 hover:border-primary/30 hover:bg-primary/5 md:grid-cols-[44px_0.38fr_1fr_44px]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                        {i + 1}
                      </div>

                      <select
                        value={f.icon || "shield"}
                        onChange={(e) =>
                          updateFeature(i, "icon", e.target.value)
                        }
                        className="w-full rounded-xl border border-border_color bg-white px-3 py-2 text-sm text-soft_black outline-none transition focus:border-primary"
                      >
                        {featureIconOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <input
                        value={f.text || ""}
                        onChange={(e) =>
                          updateFeature(i, "text", e.target.value)
                        }
                        className="w-full rounded-xl border border-border_color bg-white px-3 py-2 text-sm font-medium text-soft_black outline-none transition focus:border-primary"
                        placeholder="Feature text"
                      />

                      <button
                        type="button"
                        onClick={() => deleteFeature(i)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-border_color bg-background p-6 text-center">
                    <p className="text-sm font-medium text-gray-500">
                      No feature added yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div className={cardClass}>
              <div>
                <h2 className={sectionTitleClass}>
                  <span className={iconBoxClass}>
                    <MousePointerClick size={18} />
                  </span>
                  Action Buttons
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage primary and secondary button text and links.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  placeholder="Primary Button Text"
                  value={form.button_primary_text || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      button_primary_text: e.target.value,
                    })
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Primary Button Link"
                  value={form.button_primary_link || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      button_primary_link: e.target.value,
                    })
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Secondary Button Text"
                  value={form.button_secondary_text || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      button_secondary_text: e.target.value,
                    })
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Secondary Button Link"
                  value={form.button_secondary_link || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      button_secondary_link: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">
            {/* IMAGE */}
            <div className={cardClass}>
              <div>
                <h2 className={sectionTitleClass}>
                  <span className={iconBoxClass}>
                    <ImageIcon size={18} />
                  </span>
                  Section Image
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Upload or replace about section image.
                </p>
              </div>

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-primary/40 bg-primary/5 px-5 py-8 text-center transition-all duration-500 hover:bg-primary/10">
                <ImageIcon className="mb-3 text-primary" size={34} />
                <span className="text-sm font-bold text-soft_black">
                  Upload Image
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  PNG, JPG, WEBP supported
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {(preview || form.image) && (
                <div className="relative overflow-hidden rounded-[1.5rem] border border-border_color bg-background p-2">
                  <img
                    src={preview || form.image}
                    className="h-64 w-full rounded-2xl object-cover"
                    alt="About Preview"
                  />

                  {!preview && form.image && (
                    <button
                      type="button"
                      onClick={requestDeleteImage}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg shadow-red-200 transition hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* STATS */}
            <div className={cardClass}>
              <div>
                <h2 className={sectionTitleClass}>
                  <span className={iconBoxClass}>
                    <BarChart3 size={18} />
                  </span>
                  Statistics
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage highlighted statistic content.
                </p>
              </div>

              <input
                placeholder="Stats Title"
                value={form.stats_title || ""}
                onChange={(e) =>
                  setForm({ ...form, stats_title: e.target.value })
                }
                className={inputClass}
              />

              <input
                placeholder="Stats Value"
                value={form.stats_value || ""}
                onChange={(e) =>
                  setForm({ ...form, stats_value: e.target.value })
                }
                className={inputClass}
              />

              <input
                placeholder="Stats Subtitle"
                value={form.stats_subtitle || ""}
                onChange={(e) =>
                  setForm({ ...form, stats_subtitle: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(15,23,42,0.22)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary_two disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save About Section"}
        </button>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Image?"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete Image"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={() => setConfirmModal({ show: false, loading: false })}
        onConfirm={confirmDeleteImage}
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

AboutAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
