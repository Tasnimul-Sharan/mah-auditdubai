"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Save } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";

export default function VisionMissionAdmin() {
  const [sections, setSections] = useState([]);
  const [editingPoint, setEditingPoint] = useState(null);
  const [pointText, setPointText] = useState("");

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

  // UPDATE TITLE/DESC
  const updateSection = async (id, field, value) => {
    await supabaseServer
      .from("vision_mission")
      .update({ [field]: value })
      .eq("id", id);

    fetchData();
  };

  // ADD POINT
  const addPoint = async (vm_id) => {
    if (!pointText) return;

    await supabaseServer.from("vision_mission_points").insert([
      {
        vm_id,
        point: pointText,
      },
    ]);

    setPointText("");
    fetchData();
  };

  // DELETE POINT
  const deletePoint = async (id) => {
    await supabaseServer.from("vision_mission_points").delete().eq("id", id);

    fetchData();
  };

  // UPDATE POINT
  const updatePoint = async (id) => {
    await supabaseServer
      .from("vision_mission_points")
      .update({ point: pointText })
      .eq("id", id);

    setEditingPoint(null);
    setPointText("");
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Vision & Mission</h1>

      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-white border rounded-xl p-6 space-y-4"
        >
          <input
            value={section.title}
            onChange={(e) => updateSection(section.id, "title", e.target.value)}
            className="border p-2 w-full"
          />

          <textarea
            value={section.description}
            onChange={(e) =>
              updateSection(section.id, "description", e.target.value)
            }
            className="border p-2 w-full"
          />

          {/* ADD POINT */}
          <div className="flex gap-3">
            <input
              value={pointText}
              onChange={(e) => setPointText(e.target.value)}
              placeholder={`Add ${section.type} point`}
              className="border p-2 flex-1"
            />

            <button
              onClick={() => addPoint(section.id)}
              className="bg-primary text-white px-4"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* POINT LIST */}
          {section.vision_mission_points.map((item) => (
            <div
              key={item.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              {editingPoint === item.id ? (
                <>
                  <input
                    value={pointText}
                    onChange={(e) => setPointText(e.target.value)}
                    className="border p-2 flex-1"
                  />
                  <button onClick={() => updatePoint(item.id)}>
                    <Save size={16} />
                  </button>
                </>
              ) : (
                <>
                  <p>{item.point}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingPoint(item.id);
                        setPointText(item.point);
                      }}
                    >
                      <Pencil size={16} />
                    </button>

                    <button onClick={() => deletePoint(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

VisionMissionAdmin.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
