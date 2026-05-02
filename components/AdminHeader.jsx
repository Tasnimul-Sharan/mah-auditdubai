"use client";

import { supabaseServer } from "@/lib/supabaseServer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { LogOut, Settings } from "lucide-react";

export default function AdminHeader() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseServer.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const logout = async () => {
    await supabaseServer.auth.signOut();
    router.push("/login");
  };

  const username = user?.email?.split("@")[0] || "Auditor";

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-8">
        <div>
          <h1 className="text-sm font-bold uppercase tracking-[0.22em] text-gray-900">
            Audit Management Portal
          </h1>

          <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Confidential • Dubai, UAE
          </p>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => router.push("/dashboard/settings")}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-all duration-500 hover:bg-primary hover:text-white"
          >
            <Settings size={18} />
          </button>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="text-sm font-semibold capitalize leading-none text-gray-900">
                {username}
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                MAH Admin
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-100 bg-primary/10 text-primary">
              <FaUserShield size={18} />
            </div>
          </div>

          <button
            onClick={logout}
            className="group flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-md transition-all duration-500 hover:bg-red-600"
          >
            <LogOut
              size={14}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}