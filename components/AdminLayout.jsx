import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabaseServer.auth.getSession().then(({ data }) => {
      if (!isMounted) return;

      if (!data.session) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 w-full">
          <div className="mx-auto w-full max-w-7xl px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}