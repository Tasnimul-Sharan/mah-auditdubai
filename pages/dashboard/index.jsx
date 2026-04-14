"use client";

import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";
import { useState, useEffect } from "react";
import {
  FaFileInvoiceDollar,
  FaBuilding,
  FaLayerGroup,
  FaUserShield,
} from "react-icons/fa";

function Dashboard() {
const [stats, setStats] = useState({
  totalServices: 0,
  totalBlogs: 0,
  totalClients: 0,
  totalPages: 0,
});

  useEffect(() => {
    fetchStats();
  }, []);

const fetchStats = async () => {
  try {
    const { count: servicesCount } = await supabaseServer
      .from("services")
      .select("*", { count: "exact", head: true });

    const { count: blogsCount } = await supabaseServer
      .from("blogs")
      .select("*", { count: "exact", head: true });

    const { count: clientsCount } = await supabaseServer
      .from("clients")
      .select("*", { count: "exact", head: true });

    const { count: pagesCount } = await supabaseServer
      .from("pages") // or blog_page + others combined later
      .select("*", { count: "exact", head: true });

    setStats({
      totalServices: servicesCount || 0,
      totalBlogs: blogsCount || 0,
      totalClients: clientsCount || 0,
      totalPages: pagesCount || 0,
    });
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-secondary">
            MAH <span className="text-primary">AUDIT DUBAI</span>
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Audit & Advisory Admin Dashboard
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-400">System Status</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Operational
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border_color" />

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="group bg-white rounded-2xl border border-border_color p-6 shadow-sm hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Audit Reports</p>
              <h3 className="text-3xl font-bold mt-2 text-soft_black">
                {stats.totalReports}
              </h3>
            </div>

            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl group-hover:scale-110 transition">
              <FaFileInvoiceDollar />
            </div>
          </div>
        </div>

        <div className="group bg-white rounded-2xl border border-border_color p-6 shadow-sm hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Clients</p>
              <h3 className="text-3xl font-bold mt-2 text-soft_black">
                {stats.totalClients}
              </h3>
            </div>

            <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-xl group-hover:scale-110 transition">
              <FaBuilding />
            </div>
          </div>
        </div>


        <div className="group bg-white rounded-2xl border border-border_color p-6 shadow-sm hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Audit Services</p>
              <h3 className="text-3xl font-bold mt-2 text-soft_black">
                {stats.totalServices}
              </h3>
            </div>

            <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
              <FaLayerGroup />
            </div>
          </div>
        </div>


        <div className="group bg-white rounded-2xl border border-border_color p-6 shadow-sm hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Administrator</p>
              <h3 className="text-lg font-semibold mt-2 text-soft_black">
                Logged In
              </h3>
            </div>

            <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
              <FaUserShield />
            </div>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* SERVICES */}
        <div className="group relative bg-white rounded-2xl p-6 border border-border_color shadow-sm hover:shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition" />

          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500">Services</p>
              <h3 className="text-3xl font-bold mt-2 text-soft_black">
                {stats.totalServices}
              </h3>
            </div>

            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl group-hover:scale-110 transition">
              <FaLayerGroup />
            </div>
          </div>
        </div>

        {/* BLOGS */}
        <div className="group relative bg-white rounded-2xl p-6 border border-border_color shadow-sm hover:shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition" />

          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500">Blogs</p>
              <h3 className="text-3xl font-bold mt-2 text-soft_black">
                {stats.totalBlogs}
              </h3>
            </div>

            <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-xl group-hover:scale-110 transition">
              <FaFileInvoiceDollar />
            </div>
          </div>
        </div>

        {/* CLIENTS */}
        <div className="group relative bg-white rounded-2xl p-6 border border-border_color shadow-sm hover:shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition" />

          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500">Clients</p>
              <h3 className="text-3xl font-bold mt-2 text-soft_black">
                {stats.totalClients}
              </h3>
            </div>

            <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
              <FaBuilding />
            </div>
          </div>
        </div>

        {/* PAGES */}
        <div className="group relative bg-white rounded-2xl p-6 border border-border_color shadow-sm hover:shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition" />

          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500">Pages</p>
              <h3 className="text-3xl font-bold mt-2 text-soft_black">
                {stats.totalPages}
              </h3>
            </div>

            <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
              <FaUserShield />
            </div>
          </div>
        </div>
      </div>

      {/* Extra Professional Panel */}
      <div className="bg-white border border-border_color rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-3">
          Welcome to MAH Audit Dubai Admin Panel
        </h3>

        <p className="text-gray-600 leading-relaxed">
          This dashboard allows administrators to manage audit services, client
          records, reports, and system data efficiently. Use the sidebar to
          navigate through different management sections.
        </p>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;