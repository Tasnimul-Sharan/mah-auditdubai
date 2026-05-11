"use client";
import AdminLayout from "@/components/AdminLayout";
import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

function TypesPage() {
  const [name, setName] = useState("");
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    loading: false,
  });

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]";

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
    setDeleteId(null);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    setLoading(true);

    const { data, error } = await supabaseServer
      .from("types")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      showModal("error", "Types fetch failed. Please try again.");
      setLoading(false);
      return;
    }
    setTypes(data || []);
    setLoading(false);
  };

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const resetEdit = () => {
    setEditId(null);
    setEditName("");
  };

  const handleSave = async () => {
    const currentName = editId ? editName : name;

    if (!currentName.trim()) {
      showModal("error", "Type name is required.");
      return;
    }

    try {
      setSaving(true);

      if (editId) {
        const { error } = await supabaseServer
          .from("types")
          .update({
            name: editName,
            slug: generateSlug(editName),
          })
          .eq("id", editId);

        if (error) throw error;

        resetEdit();
        showModal("success", "Type updated successfully.");
        fetchTypes();
        return;
      }

      const { error } = await supabaseServer.from("types").insert([
        {
          name,
          slug: generateSlug(name),
        },
      ]);

      if (error) throw error;

      setName("");
      showModal("success", "Type added successfully.");
      fetchTypes();
    } catch (err) {
      console.error(err);
      showModal("error", err.message || "Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (type) => {
    setEditId(type.id);
    setEditName(type.name || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const requestDelete = (id) => {
    setDeleteId(id);

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDelete = async () => {
    if (!deleteId) {
      showModal("error", "No type selected to delete.");
      closeConfirmModal();
      return;
    }

    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      const { error } = await supabaseServer
        .from("types")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      if (editId === deleteId) {
        resetEdit();
      }

      closeConfirmModal();
      showModal("success", "Type deleted successfully.");
      fetchTypes();
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", err.message || "Delete failed. Please try again.");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Types</h1>
          <p className="mt-1 text-gray-500">
            Add, update and manage content type categories.
          </p>
        </div>

        <div className={`${cardClass} space-y-4`}>
          <h2 className="text-xl font-bold text-gray-900">
            {editId ? "Update Type" : "Add New Type"}
          </h2>

          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <input
              type="text"
              placeholder="Enter type name..."
              value={editId ? editName : name}
              onChange={(e) =>
                editId ? setEditName(e.target.value) : setName(e.target.value)
              }
              className={inputClass}
            />

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition-all duration-500 hover:bg-secondary disabled:opacity-60"
            >
              <Plus size={16} />
              {saving ? "Saving..." : editId ? "Update" : "Add"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetEdit}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gray-200 px-6 py-3 font-semibold text-gray-700 transition-all duration-500 hover:bg-gray-300"
              >
                <X size={16} />
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading types...
            </div>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="w-16 border border-primary/20 p-4 text-left">
                    S/L
                  </th>
                  <th className="border border-primary/20 p-4 text-left">
                    Name
                  </th>
                  <th className="border border-primary/20 p-4 text-left">
                    Slug
                  </th>
                  <th className="w-36 border border-primary/20 p-4 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {types.length > 0 ? (
                  types.map((type, i) => (
                    <tr
                      key={type.id}
                      className="transition even:bg-gray-50 hover:bg-primary/5"
                    >
                      <td className="border border-gray-100 p-4">{i + 1}</td>

                      <td className="border border-gray-100 p-4 font-semibold text-gray-900">
                        {type.name}
                      </td>

                      <td className="border border-gray-100 p-4 text-gray-500">
                        {type.slug}
                      </td>

                      <td className="border border-gray-100 p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(type)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-500 hover:bg-blue-500 hover:text-white"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => requestDelete(type.id)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-all duration-500 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-400">
                      No types found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Type?"
        message="Are you sure you want to delete this type? This action cannot be undone."
        confirmText="Delete Type"
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

TypesPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default TypesPage;
