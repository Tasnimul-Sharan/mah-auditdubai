"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Save, Target, Eye, X } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";

export default function VisionMissionAdmin() {
  const [sections, setSections] = useState([]);
  const [editingPoint, setEditingPoint] = useState(null);
  const [pointText, setPointText] = useState("");
  const [savingPoint, setSavingPoint] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("vision_mission")
      .select(
        `
        *,
        vision_mission_points(*)
      `,
      )
      .order("id");

    setSections(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateSection = async (id, field, value) => {
    await supabaseServer
      .from("vision_mission")
      .update({ [field]: value })
      .eq("id", id);

    fetchData();
  };

  const addPoint = async (vm_id) => {
    if (!pointText.trim()) return alert("Point is required");

    try {
      setSavingPoint(true);

      await supabaseServer.from("vision_mission_points").insert([
        {
          vm_id,
          point: pointText,
        },
      ]);

      setPointText("");
      fetchData();
    } finally {
      setSavingPoint(false);
    }
  };

  const deletePoint = async (id) => {
    if (!confirm("Delete this point?")) return;

    await supabaseServer.from("vision_mission_points").delete().eq("id", id);
    fetchData();
  };

  const updatePoint = async (id) => {
    if (!pointText.trim()) return alert("Point is required");

    await supabaseServer
      .from("vision_mission_points")
      .update({ point: pointText })
      .eq("id", id);

    setEditingPoint(null);
    setPointText("");
    fetchData();
  };

  const cancelEdit = () => {
    setEditingPoint(null);
    setPointText("");
  };

  const getIcon = (type) => {
    const normalized = String(type || "").toLowerCase();

    if (normalized.includes("vision")) return <Eye size={22} />;
    if (normalized.includes("mission")) return <Target size={22} />;

    return <Target size={22} />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Target className="text-primary" size={30} />
          Vision & Mission
        </h1>

        <p className="mt-1 text-gray-500">
          Manage vision, mission content and their key points.
        </p>
      </div>

      {sections.length === 0 ? (
        <div className="rounded-[1.5rem] border border-gray-100 bg-white p-10 text-center text-gray-400 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          No vision or mission data found.
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className={cardClass}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {getIcon(section.type)}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 capitalize">
                    {section.type || "Section"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Update title, description and points.
                  </p>
                </div>
              </div>

              <input
                value={section.title || ""}
                onChange={(e) =>
                  updateSection(section.id, "title", e.target.value)
                }
                placeholder="Section Title"
                className={inputClass}
              />

              <textarea
                value={section.description || ""}
                onChange={(e) =>
                  updateSection(section.id, "description", e.target.value)
                }
                placeholder="Section Description"
                rows={4}
                className={inputClass}
              />

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {section.type || "Section"} Points
                </h3>

                <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input
                    value={pointText}
                    onChange={(e) => setPointText(e.target.value)}
                    placeholder={
                      editingPoint
                        ? "Update point"
                        : `Add ${section.type || "section"} point`
                    }
                    className={inputClass}
                  />

                  {editingPoint ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updatePoint(editingPoint)}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-white transition-all duration-500 hover:bg-blue-600"
                      >
                        <Save size={16} />
                        Update
                      </button>

                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-200 text-gray-700 transition-all duration-500 hover:bg-gray-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addPoint(section.id)}
                      disabled={savingPoint}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white transition-all duration-500 hover:bg-secondary disabled:opacity-60"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {section.vision_mission_points?.length === 0 ? (
                    <p className="rounded-2xl bg-white p-6 text-center text-gray-400">
                      No points added yet.
                    </p>
                  ) : (
                    section.vision_mission_points?.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-500 hover:shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {index + 1}
                          </span>

                          <p className="text-sm leading-6 text-gray-700">
                            {item.point}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPoint(item.id);
                              setPointText(item.point);
                            }}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-500 hover:bg-blue-500 hover:text-white"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deletePoint(item.id)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-all duration-500 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

VisionMissionAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
