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
    totalReports: 0,
    totalClients: 0,
    totalServices: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: reportsCount } = await supabaseServer
        .from("products")
        .select("*", { count: "exact", head: true });

      const { count: clientsCount } = await supabaseServer
        .from("categories")
        .select("*", { count: "exact", head: true });

      const { count: servicesCount } = await supabaseServer
        .from("types")
        .select("*", { count: "exact", head: true });

      setStats({
        totalReports: reportsCount || 0,
        totalClients: clientsCount || 0,
        totalServices: servicesCount || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Reports */}
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

        {/* Clients */}
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

        {/* Services */}
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

        {/* Admin */}
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