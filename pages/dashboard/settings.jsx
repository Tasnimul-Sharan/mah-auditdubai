"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import { Save, ImageIcon, User, Lock, Mail, EyeOff, Eye } from "lucide-react";

export default function AdminSettings() {
  const { uploadFile } = useUpload();

  const [user, setUser] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data } = await supabaseServer.auth.getUser();

    if (data?.user) {
      setUser(data.user);
      setNewEmail(data.user.email || "");
      setProfileName(data.user.user_metadata?.profile_name || "");
      setProfileImage(data.user.user_metadata?.profile_image || "");
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const saveSettings = async () => {
    try {
      setSaving(true);

      let uploadedImage = profileImage;

      if (file) {
        const res = await uploadFile(file, "admin-profile");
        uploadedImage = res.url;
      }

      const updatePayload = {
        email: newEmail,
        data: {
          profile_name: profileName,
          profile_image: uploadedImage,
        },
      };

      if (newPassword) {
        updatePayload.password = newPassword;
      }

      const { error } = await supabaseServer.auth.updateUser(updatePayload);

      if (error) throw error;

      setProfileImage(uploadedImage);
      setFile(null);
      setPreview("");
      setNewPassword("");

      alert("Settings updated successfully");
      fetchUser();
    } catch (err) {
      console.error(err);
      alert(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-500 mt-1">
          Update profile name, profile image, email and password.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-5">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <User size={20} className="text-primary" />
          Profile Information
        </h2>

        <input
          placeholder="Profile Name"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          className={inputClass}
        />

        <div>
          <label className="text-sm font-semibold text-gray-700">
            Profile Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={`${inputClass} mt-2`}
          />

          {(preview || profileImage) && (
            <div className="mt-4 w-fit rounded-2xl border bg-gray-50 p-3">
              <img
                src={preview || profileImage}
                alt="Profile"
                className="h-28 w-28 rounded-2xl object-cover"
              />
            </div>
          )}

          {!preview && !profileImage && (
            <div className="mt-4 flex h-28 w-28 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ImageIcon size={28} />
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-5">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Mail size={20} className="text-primary" />
          Email
        </h2>

        <input
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className={inputClass}
        />

        <p className="text-xs text-gray-500">
          Email change may require confirmation depending on your Supabase Auth
          settings.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-5">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Lock size={20} className="text-primary" />
          Password
        </h2>

        {/* <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={inputClass}
        /> */}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`${inputClass} pr-12`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm font-semibold text-primary hover:text-secondary"
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div> */}

        <p className="text-xs text-gray-500">
          Keep password empty if you do not want to change it.
        </p>
      </div>

      <button
        onClick={saveSettings}
        disabled={saving}
        className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
      >
        <Save size={18} />
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}

AdminSettings.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
