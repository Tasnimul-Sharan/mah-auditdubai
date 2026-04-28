import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";

export default function PageEditor({ slug }) {
  const { uploadFile } = useUpload();

  const [sections, setSections] = useState([]);
  const [types, setTypes] = useState([]);

  const [typeId, setTypeId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [singleImage, setSingleImage] = useState(null);
  const [multiImages, setMultiImages] = useState([]);

  const [status, setStatus] = useState("active");
  const [isVisible, setIsVisible] = useState(true);
  const [bg, setBg] = useState("white");
  const [align, setAlign] = useState("left");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const [loading, setLoading] = useState(false);

  // ================= CLOUDINARY DELETE HELPERS =================
  const getCloudinaryPublicId = (url) => {
    if (!url) return null;

    return url
      .split("/upload/")[1]
      ?.split(".")[0]
      ?.replace(/^v\d+\//, "");
  };

  const deleteCloudinaryImage = async (url) => {
    const public_id = getCloudinaryPublicId(url);
    if (!public_id) return;

    await fetch("/api/delete-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id }),
    });
  };

  // ================= FETCH =================
  const fetchTypes = async () => {
    const { data } = await supabaseServer.from("types").select("*");
    setTypes(data || []);
  };

  const fetchSections = async () => {
    const { data } = await supabaseServer
      .from("sections")
      .select("*, types(name, slug)")
      .eq("page_slug", slug)
      .order("position");

    setSections(data || []);
  };

  useEffect(() => {
    if (slug) {
      fetchTypes();
      fetchSections();
    }
  }, [slug]);

  // ================= ADD SECTION =================
  const addSection = async () => {
    if (!typeId) return alert("Select type");

    setLoading(true);

    try {
      let singleImageUrl = null;

      if (singleImage) {
        const res = await uploadFile(singleImage, "sections");
        singleImageUrl = res.url;
      }

      let multiImageUrls = [];

      for (const file of multiImages) {
        const res = await uploadFile(file, "sections");
        multiImageUrls.push(res.url);
      }

      const content = {
        title,
        text,
        image: singleImageUrl,
        images: multiImageUrls.length ? multiImageUrls : [],
      };

      const settings = {
        bg,
        align,
      };

      const { error } = await supabaseServer.from("sections").insert([
        {
          page_slug: slug,
          type_id: typeId,
          content,
          settings,
          status,
          is_visible: isVisible,
          position: sections.length + 1,
        },
      ]);

      if (error) throw error;

      setTypeId("");
      setTitle("");
      setText("");
      setSingleImage(null);
      setMultiImages([]);
      setStatus("active");
      setIsVisible(true);
      setBg("white");
      setAlign("left");

      fetchSections();
    } catch (err) {
      console.error(err);
      alert("Failed to add section");
    }

    setLoading(false);
  };

  // ================= EDIT MODE =================
  const startEdit = (sec) => {
    setEditingId(sec.id);
    setEditForm({
      type_id: sec.type_id,
      title: sec.content?.title || "",
      text: sec.content?.text || "",
      image: sec.content?.image || null,
      images: sec.content?.images || [],
      status: sec.status || "active",
      is_visible: sec.is_visible,
      bg: sec.settings?.bg || "white",
      align: sec.settings?.align || "left",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  // ================= UPDATE SECTION =================
  const updateSection = async (sec) => {
    try {
      const updatedContent = {
        title: editForm.title,
        text: editForm.text,
        image: editForm.image,
        images: editForm.images || [],
      };

      const updatedSettings = {
        bg: editForm.bg,
        align: editForm.align,
      };

      const { error } = await supabaseServer
        .from("sections")
        .update({
          type_id: editForm.type_id,
          content: updatedContent,
          settings: updatedSettings,
          status: editForm.status,
          is_visible: editForm.is_visible,
        })
        .eq("id", sec.id);

      if (error) throw error;

      setEditingId(null);
      setEditForm(null);
      fetchSections();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ================= REPLACE SINGLE IMAGE =================
  const replaceSingleImage = async (sec, file) => {
    if (!file) return;

    try {
      const oldImage = editForm?.image || sec.content?.image;

      if (oldImage) {
        await deleteCloudinaryImage(oldImage);
      }

      const res = await uploadFile(file, "sections");

      setEditForm((prev) => ({
        ...prev,
        image: res.url,
      }));
    } catch (err) {
      console.error(err);
      alert("Image replace failed");
    }
  };

  // ================= REMOVE SINGLE IMAGE =================
  const removeSingleImage = async () => {
    try {
      if (editForm?.image) {
        await deleteCloudinaryImage(editForm.image);
      }

      setEditForm((prev) => ({
        ...prev,
        image: null,
      }));
    } catch (err) {
      console.error(err);
      alert("Image remove failed");
    }
  };

  // ================= ADD MULTIPLE IMAGES IN EDIT =================
  const addMoreImages = async (files) => {
    if (!files?.length) return;

    try {
      let uploadedImages = [];

      for (const file of files) {
        const res = await uploadFile(file, "sections");
        uploadedImages.push(res.url);
      }

      setEditForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedImages],
      }));
    } catch (err) {
      console.error(err);
      alert("Multiple image upload failed");
    }
  };

  // ================= REMOVE ONE MULTI IMAGE =================
  const removeMultiImage = async (imgUrl) => {
    try {
      await deleteCloudinaryImage(imgUrl);

      setEditForm((prev) => ({
        ...prev,
        images: (prev.images || []).filter((img) => img !== imgUrl),
      }));
    } catch (err) {
      console.error(err);
      alert("Image delete failed");
    }
  };

  // ================= DELETE SECTION =================
  const deleteSection = async (sec) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    try {
      const content = sec.content || {};

      if (content.image) {
        await deleteCloudinaryImage(content.image);
      }

      if (content.images?.length > 0) {
        for (const img of content.images) {
          await deleteCloudinaryImage(img);
        }
      }

      const { error } = await supabaseServer
        .from("sections")
        .delete()
        .eq("id", sec.id);

      if (error) throw error;

      fetchSections();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ================= TOGGLE VISIBILITY =================
  const toggleVisibility = async (sec) => {
    await supabaseServer
      .from("sections")
      .update({ is_visible: !sec.is_visible })
      .eq("id", sec.id);

    fetchSections();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage Sections: {slug}</h1>

      {/* ================= ADD SECTION ================= */}
      <div className="bg-white p-6 rounded-xl border space-y-4">
        <h2 className="font-semibold text-lg">Add Section</h2>

        <select
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Type</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <textarea
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <div>
          <p className="text-sm mb-1">Single Image</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSingleImage(e.target.files[0])}
          />
        </div>

        <div>
          <p className="text-sm mb-1">Multiple Images</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setMultiImages([...e.target.files])}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="white">White</option>
            <option value="gray">Gray</option>
            <option value="dark">Dark</option>
          </select>

          <select
            value={align}
            onChange={(e) => setAlign(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
          </select>
        </div>

        <div className="flex gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => setIsVisible(!isVisible)}
            />
            Visible
          </label>
        </div>

        <button
          onClick={addSection}
          disabled={loading}
          className="bg-primary text-white px-5 py-2 rounded"
        >
          {loading ? "Uploading..." : "Add Section"}
        </button>
      </div>

      {/* ================= SECTION LIST ================= */}
      <div className="space-y-4">
        {sections.map((sec) => {
          const content = sec.content || {};
          const settings = sec.settings || {};
          const isEditing = editingId === sec.id;

          return (
            <div
              key={sec.id}
              className={`border p-4 rounded-xl ${
                !sec.is_visible ? "opacity-50" : ""
              }`}
            >
              {!isEditing ? (
                <div className="flex justify-between gap-4">
                  <div className="space-y-2">
                    <p className="font-bold">{sec.types?.name}</p>

                    <p>{content.title}</p>
                    <p className="text-sm text-gray-500">{content.text}</p>

                    <p className="text-xs text-gray-400">
                      BG: {settings.bg} | Align: {settings.align} | Status:{" "}
                      {sec.status}
                    </p>

                    {content.image && (
                      <img
                        src={content.image}
                        className="w-32 h-20 object-cover rounded border"
                        alt=""
                      />
                    )}

                    {content.images?.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {content.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            className="w-16 h-12 object-cover rounded border"
                            alt=""
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => startEdit(sec)}
                      className="text-green-600 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleVisibility(sec)}
                      className="text-blue-500 text-sm"
                    >
                      {sec.is_visible ? "Hide" : "Show"}
                    </button>

                    <button
                      onClick={() => deleteSection(sec)}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-semibold">Edit Section</h3>

                  <select
                    value={editForm.type_id}
                    onChange={(e) =>
                      setEditForm({ ...editForm, type_id: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  >
                    {types.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>

                  <input
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                    placeholder="Title"
                  />

                  <textarea
                    value={editForm.text}
                    onChange={(e) =>
                      setEditForm({ ...editForm, text: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                    placeholder="Text"
                  />

                  {/* Single Image Edit */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Single Image</p>

                    {editForm.image && (
                      <div className="flex items-center gap-3">
                        <img
                          src={editForm.image}
                          className="w-32 h-20 object-cover rounded border"
                          alt=""
                        />

                        <button
                          type="button"
                          onClick={removeSingleImage}
                          className="text-red-500 text-sm"
                        >
                          Remove Image
                        </button>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        replaceSingleImage(sec, e.target.files[0])
                      }
                    />
                  </div>

                  {/* Multiple Images Edit */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Multiple Images</p>

                    {editForm.images?.length > 0 && (
                      <div className="flex gap-3 flex-wrap">
                        {editForm.images.map((img, i) => (
                          <div key={i} className="relative">
                            <img
                              src={img}
                              className="w-20 h-16 object-cover rounded border"
                              alt=""
                            />

                            <button
                              type="button"
                              onClick={() => removeMultiImage(img)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => addMoreImages([...e.target.files])}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={editForm.bg}
                      onChange={(e) =>
                        setEditForm({ ...editForm, bg: e.target.value })
                      }
                      className="border p-2 rounded"
                    >
                      <option value="white">White</option>
                      <option value="gray">Gray</option>
                      <option value="dark">Dark</option>
                    </select>

                    <select
                      value={editForm.align}
                      onChange={(e) =>
                        setEditForm({ ...editForm, align: e.target.value })
                      }
                      className="border p-2 rounded"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <select
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                      className="border p-2 rounded"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editForm.is_visible}
                        onChange={() =>
                          setEditForm({
                            ...editForm,
                            is_visible: !editForm.is_visible,
                          })
                        }
                      />
                      Visible
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => updateSection(sec)}
                      className="bg-primary text-white px-5 py-2 rounded"
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-gray-200 px-5 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// SSR
export async function getServerSideProps({ params }) {
  return {
    props: {
      slug: params.slug,
    },
  };
}

PageEditor.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
