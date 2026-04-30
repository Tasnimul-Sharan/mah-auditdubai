"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Save, Users, X, ImageIcon } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

const cardClass =
  "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

const primaryBtn =
  "flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60";

export default function TeamAdmin() {
  const { uploadFile } = useUpload();

  const [section, setSection] = useState(null);
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    badge: "",
    title: "",
    subtitle: "",
  });

  const [memberForm, setMemberForm] = useState({
    name: "",
    role: "",
    image: "",
    public_id: "",
    socials: [],
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savingSection, setSavingSection] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState({
    type: null,
    item: null,
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
      item: null,
      index: null,
    });
  };

  const fetchData = async () => {
    const { data: sec, error: secError } = await supabaseServer
      .from("team_section")
      .select("*")
      .single();

    if (secError && secError.code !== "PGRST116") {
      console.error(secError);
      showModal("error", "Team section fetch failed.");
    }

    const { data: mem, error: memError } = await supabaseServer
      .from("team_members")
      .select("*")
      .order("created_at", { ascending: true });

    if (memError) {
      console.error(memError);
      showModal("error", "Team members fetch failed.");
    }

    if (sec) {
      setSection(sec);
      setForm({
        badge: sec.badge || "",
        title: sec.title || "",
        subtitle: sec.subtitle || "",
      });
    }

    setMembers(mem || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const saveSection = async () => {
    try {
      setSavingSection(true);

      if (section) {
        const { error } = await supabaseServer
          .from("team_section")
          .update(form)
          .eq("id", section.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("team_section")
          .insert([form])
          .select()
          .single();

        if (error) throw error;
        setSection(data);
      }

      showModal("success", "Team section saved successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Section save failed. Please try again.");
    } finally {
      setSavingSection(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const requestDelete = (type, item = null, index = null) => {
    setDeleteTarget({
      type,
      item,
      index,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDelete = async () => {
    if (deleteTarget.type === "image") {
      await confirmRemovePreviewOrImage();
      return;
    }

    if (deleteTarget.type === "member") {
      await confirmDeleteMember();
      return;
    }

    if (deleteTarget.type === "social") {
      confirmDeleteSocial();
      return;
    }

    showModal("error", "No delete action selected.");
    closeConfirmModal();
  };

  const confirmRemovePreviewOrImage = async () => {
    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      if (preview && file) {
        setPreview("");
        setFile(null);

        closeConfirmModal();
        showModal("success", "Selected image removed.");
        return;
      }

      if (!memberForm.public_id && !memberForm.image) {
        showModal("error", "No image found to remove.");
        closeConfirmModal();
        return;
      }

      await deleteFromCloudinary(memberForm.public_id);

      if (editingId) {
        const { error } = await supabaseServer
          .from("team_members")
          .update({
            image: "",
            public_id: "",
          })
          .eq("id", editingId);

        if (error) throw error;
      }

      setMemberForm({
        ...memberForm,
        image: "",
        public_id: "",
      });

      setPreview("");
      setFile(null);

      closeConfirmModal();
      showModal("success", "Member image removed successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Image remove failed. Please try again.");
    }
  };

  const saveMember = async () => {
    if (!memberForm.name.trim()) {
      showModal("error", "Member name is required.");
      return;
    }

    if (!memberForm.role.trim()) {
      showModal("error", "Member role is required.");
      return;
    }

    try {
      setSaving(true);

      let imageUrl = memberForm.image;
      let publicId = memberForm.public_id;

      if (file) {
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }

        const res = await uploadFile(file, "team");

        imageUrl = res.url;
        publicId = res.public_id;
      }

      const payload = {
        ...memberForm,
        image: imageUrl,
        public_id: publicId,
        socials: memberForm.socials || [],
      };

      if (editingId) {
        const { error } = await supabaseServer
          .from("team_members")
          .update(payload)
          .eq("id", editingId);

        if (error) throw error;

        showModal("success", "Team member updated successfully.");
      } else {
        const { error } = await supabaseServer
          .from("team_members")
          .insert([payload]);

        if (error) throw error;

        showModal("success", "Team member added successfully.");
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      showModal("error", "Member save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setMemberForm({
      name: "",
      role: "",
      image: "",
      public_id: "",
      socials: [],
    });

    setEditingId(null);
    setFile(null);
    setPreview("");
  };

  const confirmDeleteMember = async () => {
    const item = deleteTarget.item;

    if (!item?.id) {
      showModal("error", "No member selected to delete.");
      closeConfirmModal();
      return;
    }

    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      if (item.public_id) {
        await deleteFromCloudinary(item.public_id);
      }

      const { error } = await supabaseServer
        .from("team_members")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      if (editingId === item.id) {
        resetForm();
      }

      closeConfirmModal();
      showModal("success", "Team member deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Member delete failed. Please try again.");
    }
  };

  const addSocial = () => {
    setMemberForm({
      ...memberForm,
      socials: [...(memberForm.socials || []), { type: "", url: "" }],
    });
  };

  const updateSocial = (index, field, value) => {
    const updated = [...(memberForm.socials || [])];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setMemberForm({
      ...memberForm,
      socials: updated,
    });
  };

  const confirmDeleteSocial = () => {
    if (deleteTarget.index === null) {
      showModal("error", "No social link selected.");
      closeConfirmModal();
      return;
    }

    setConfirmModal({
      show: true,
      loading: true,
    });

    const updated = (memberForm.socials || []).filter(
      (_, i) => i !== deleteTarget.index,
    );

    setMemberForm({
      ...memberForm,
      socials: updated,
    });

    closeConfirmModal();
    showModal("success", "Social link removed successfully.");
  };

  const startEdit = (item) => {
    setEditingId(item.id);

    setMemberForm({
      name: item.name || "",
      role: item.role || "",
      image: item.image || "",
      public_id: item.public_id || "",
      socials: item.socials || [],
    });

    setFile(null);
    setPreview("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getConfirmContent = () => {
    if (deleteTarget.type === "image") {
      return {
        title: "Remove Image?",
        message:
          "Are you sure you want to remove this member image? This action cannot be undone.",
        confirmText: "Remove Image",
      };
    }

    if (deleteTarget.type === "member") {
      return {
        title: "Delete Member?",
        message:
          "Are you sure you want to delete this team member? This action cannot be undone.",
        confirmText: "Delete Member",
      };
    }

    if (deleteTarget.type === "social") {
      return {
        title: "Delete Social Link?",
        message:
          "Are you sure you want to delete this social link? Please save member after changes.",
        confirmText: "Delete Link",
      };
    }

    return {
      title: "Are you sure?",
      message: "This action cannot be undone.",
      confirmText: "Confirm",
    };
  };

  const confirmContent = getConfirmContent();

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
          <Users className="text-primary" />
          Team Section
        </h1>

        <div className={cardClass}>
          <h2 className="text-xl font-bold">Section Content</h2>

          <input
            placeholder="Badge"
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            className={inputClass}
          />

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />

          <textarea
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            rows={3}
            className={inputClass}
          />

          <button
            type="button"
            onClick={saveSection}
            disabled={savingSection}
            className={primaryBtn}
          >
            <Save size={18} />
            {savingSection ? "Saving..." : "Save Section"}
          </button>
        </div>

        <div className={cardClass}>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <ImageIcon className="text-primary" size={20} />
            {editingId ? "Edit Member" : "Add Member"}
          </h2>

          <input
            placeholder="Name"
            value={memberForm.name}
            onChange={(e) =>
              setMemberForm({ ...memberForm, name: e.target.value })
            }
            className={inputClass}
          />

          <input
            placeholder="Role"
            value={memberForm.role}
            onChange={(e) =>
              setMemberForm({ ...memberForm, role: e.target.value })
            }
            className={inputClass}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={inputClass}
          />

          {(preview || memberForm.image) && (
            <div className="relative w-fit rounded-2xl border bg-gray-50 p-3">
              <img
                src={preview || memberForm.image}
                alt="Team Member"
                className="h-44 w-72 rounded-xl object-cover"
              />

              <button
                type="button"
                onClick={() => requestDelete("image")}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-white transition-all duration-500 hover:bg-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Social Links</h3>

              <button
                type="button"
                onClick={addSocial}
                className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-primary hover:bg-primary hover:text-white transition"
              >
                <Plus size={14} /> Add Social
              </button>
            </div>

            {(memberForm.socials || []).map((social, i) => (
              <div key={i} className="grid gap-2 md:grid-cols-[1fr_2fr_auto]">
                <input
                  placeholder="Type"
                  value={social.type}
                  onChange={(e) => updateSocial(i, "type", e.target.value)}
                  className={inputClass}
                />

                <input
                  placeholder="URL"
                  value={social.url}
                  onChange={(e) => updateSocial(i, "url", e.target.value)}
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => requestDelete("social", null, i)}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <button
              type="button"
              onClick={saveMember}
              disabled={saving}
              className={primaryBtn}
            >
              <Save size={18} />
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Member"
                  : "Add Member"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 font-semibold text-gray-700 transition-all duration-500 hover:bg-gray-50"
              >
                <X size={18} />
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {members.length === 0 ? (
            <div className="rounded-2xl border bg-white p-8 text-center text-gray-400 md:col-span-3">
              No team members found.
            </div>
          ) : (
            members.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(15,23,42,0.14)] transition"
              >
                <div className="relative h-44 overflow-hidden rounded-xl">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="Team Member"
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {item.role}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {item.socials?.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-primary/10 px-3 py-1 rounded-full text-primary font-medium"
                    >
                      {s.type}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white transition"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => requestDelete("member", item)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
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

TeamAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
