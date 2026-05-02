"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Users, Save } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";
import { useCrud } from "@/Hooks/useCrud";
import { supabaseServer } from "@/lib/supabaseServer";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

export default function ClientsAdmin() {
  const { data, loading, createItem, deleteItem } = useCrud("clients");
  const { uploadFile } = useUpload();

  const [sectionData, setSectionData] = useState({
    badge: "Our Clients",
    title: "Trusted by Leading Organizations",
    subtitle:
      "We collaborate with companies across the UAE and international markets, delivering reliable audit, compliance, and advisory services.",
  });

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [savingSection, setSavingSection] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);

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
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

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

    setSelectedClient(null);
  };

  // ================= LOAD SECTION DATA =================
  useEffect(() => {
    if (data?.length > 0) {
      setSectionData({
        badge: data[0]?.badge || "Our Clients",
        title: data[0]?.title || "Trusted by Leading Organizations",
        subtitle:
          data[0]?.subtitle ||
          "We collaborate with companies across the UAE and international markets, delivering reliable audit, compliance, and advisory services.",
      });
    }
  }, [data]);

  // ================= SECTION CHANGE =================
  const handleSectionChange = (e) => {
    const { name, value } = e.target;

    setSectionData({
      ...sectionData,
      [name]: value,
    });
  };

  // ================= SAVE SECTION DATA =================
  const saveSectionData = async () => {
    try {
      setSavingSection(true);

      if (data?.length > 0) {
        const { error } = await supabaseServer
          .from("clients")
          .update({
            badge: sectionData.badge,
            title: sectionData.title,
            subtitle: sectionData.subtitle,
          })
          .neq("id", "00000000-0000-0000-0000-000000000000");

        if (error) throw error;
      } else {
        const { error } = await supabaseServer.from("clients").insert([
          {
            badge: sectionData.badge,
            title: sectionData.title,
            subtitle: sectionData.subtitle,
          },
        ]);

        if (error) throw error;
      }

      showModal("success", "Client section content saved successfully.");
    } catch (err) {
      console.error(err);
      showModal("error", "Section save failed. Please try again.");
    } finally {
      setSavingSection(false);
    }
  };

  // ================= FILE CHANGE =================
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  // ================= ADD CLIENTS =================
  const handleAdd = async () => {
    if (!files.length) {
      showModal("error", "Please select at least one client logo.");
      return;
    }

    try {
      setUploading(true);

      const uploads = files.map(async (file) => {
        const { url, public_id } = await uploadFile(file, "clients");

        return createItem({
          logo_url: url,
          public_id,
          badge: sectionData.badge,
          title: sectionData.title,
          subtitle: sectionData.subtitle,
        });
      });

      await Promise.all(uploads);

      setFiles([]);
      setPreviews([]);

      showModal("success", "Client logo uploaded successfully.");
    } catch (err) {
      console.error(err);
      showModal("error", "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // ================= DELETE WITH MODAL =================
  const requestDeleteClient = (item) => {
    setSelectedClient(item);

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDeleteClient = async () => {
    if (!selectedClient) {
      showModal("error", "No client selected to delete.");
      closeConfirmModal();
      return;
    }

    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      if (selectedClient.public_id) {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_id: selectedClient.public_id,
          }),
        });
      }

      await deleteItem(selectedClient.id);

      closeConfirmModal();
      showModal("success", "Client logo deleted successfully.");
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Delete failed. Please try again.");
    }
  };

  return (
    <>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
            <Users className="w-7 h-7 text-primary" />
            Clients
          </h1>

          <p className="text-gray-500 mt-1">
            Manage client section content and client logo gallery.
          </p>
        </div>

        {/* ================= SECTION CONTENT ================= */}
        <div className={cardClass}>
          <h2 className="font-semibold text-xl text-gray-900">
            Client Section Content
          </h2>

          <input
            name="badge"
            value={sectionData.badge}
            onChange={handleSectionChange}
            placeholder="Badge Text"
            className={inputClass}
          />

          <input
            name="title"
            value={sectionData.title}
            onChange={handleSectionChange}
            placeholder="Section Title"
            className={inputClass}
          />

          <textarea
            name="subtitle"
            value={sectionData.subtitle}
            onChange={handleSectionChange}
            placeholder="Section Subtitle"
            rows={3}
            className={inputClass}
          />

          <button
            type="button"
            onClick={saveSectionData}
            disabled={savingSection}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
          >
            <Save size={18} />
            {savingSection ? "Saving..." : "Save Section Content"}
          </button>
        </div>

        {/* ================= UPLOAD CARD ================= */}
        <div className={cardClass}>
          <h2 className="font-semibold text-xl text-gray-900">
            Upload Client Logos
          </h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className={inputClass}
          />

          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {previews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Client Preview"
                  className="w-28 h-24 object-contain border rounded-2xl bg-gray-50 p-3"
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleAdd}
            disabled={!files.length || uploading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
          >
            <Plus size={18} />
            {uploading ? "Uploading..." : "Add Clients"}
          </button>
        </div>

        {/* ================= CLIENT GRID ================= */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Client Logo List
          </h2>

          {loading ? (
            <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
              Loading...
            </div>
          ) : data.filter((item) => item.logo_url).length === 0 ? (
            <div className="rounded-2xl border bg-white p-8 text-center text-gray-400">
              No clients found
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {data
                .filter((item) => item.logo_url)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex flex-col items-center rounded-[1.5rem] border border-gray-100 bg-white p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.1)]"
                  >
                    <img
                      src={item.logo_url}
                      alt="Client Logo"
                      className="mb-4 h-20 max-w-[150px] object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                    />

                    <button
                      type="button"
                      onClick={() => requestDeleteClient(item)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-all duration-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Client Logo?"
        message="Are you sure you want to delete this client logo? This action cannot be undone."
        confirmText="Delete Logo"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={closeConfirmModal}
        onConfirm={confirmDeleteClient}
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

ClientsAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
