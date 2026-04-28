// "use client";

// import AdminLayout from "@/components/AdminLayout";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { useState, useEffect } from "react";
// import {
//   FaFileInvoiceDollar,
//   FaBuilding,
//   FaLayerGroup,
//   FaUserShield,
// } from "react-icons/fa";

// function Dashboard() {
// const [stats, setStats] = useState({
//   totalServices: 0,
//   totalBlogs: 0,
//   totalClients: 0,
//   totalPages: 0,
// });

//   useEffect(() => {
//     fetchStats();
//   }, []);

// const fetchStats = async () => {
//   try {
//     const { count: servicesCount } = await supabaseServer
//       .from("services")
//       .select("*", { count: "exact", head: true });

//     const { count: blogsCount } = await supabaseServer
//       .from("blogs")
//       .select("*", { count: "exact", head: true });

//     const { count: clientsCount } = await supabaseServer
//       .from("clients")
//       .select("*", { count: "exact", head: true });

//     const { count: pagesCount } = await supabaseServer
//       .from("pages") // or blog_page + others combined later
//       .select("*", { count: "exact", head: true });

//     setStats({
//       totalServices: servicesCount || 0,
//       totalBlogs: blogsCount || 0,
//       totalClients: clientsCount || 0,
//       totalPages: pagesCount || 0,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

//   return (
//     <div className="space-y-10">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-wide text-secondary">
//             MAH <span className="text-primary">AUDIT DUBAI</span>
//           </h1>

//           <p className="text-sm text-gray-500 mt-1">
//             Audit & Advisory Admin Dashboard
//           </p>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="text-right">
//             <p className="text-xs text-gray-400">System Status</p>
//             <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
//               <span className="h-2 w-2 rounded-full bg-green-500"></span>
//               Operational
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="h-px bg-border_color" />

//       {/* Stats Cards */}
//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//         <div className="group bg-white rounded-2xl border border-border_color p-6 shadow-sm hover:shadow-xl transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Audit Reports</p>
//               <h3 className="text-3xl font-bold mt-2 text-soft_black">
//                 {stats.totalReports}
//               </h3>
//             </div>

//             <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl group-hover:scale-110 transition">
//               <FaFileInvoiceDollar />
//             </div>
//           </div>
//         </div>

//         <div className="group bg-white rounded-2xl border border-border_color p-6 shadow-sm hover:shadow-xl transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Clients</p>
//               <h3 className="text-3xl font-bold mt-2 text-soft_black">
//                 {stats.totalClients}
//               </h3>
//             </div>

//             <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-xl group-hover:scale-110 transition">
//               <FaBuilding />
//             </div>
//           </div>
//         </div>

//         <div className="group bg-white rounded-2xl border border-border_color p-6 shadow-sm hover:shadow-xl transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Audit Services</p>
//               <h3 className="text-3xl font-bold mt-2 text-soft_black">
//                 {stats.totalServices}
//               </h3>
//             </div>

//             <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
//               <FaLayerGroup />
//             </div>
//           </div>
//         </div>

//         <div className="group bg-white rounded-2xl border border-border_color p-6 shadow-sm hover:shadow-xl transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Administrator</p>
//               <h3 className="text-lg font-semibold mt-2 text-soft_black">
//                 Logged In
//               </h3>
//             </div>

//             <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
//               <FaUserShield />
//             </div>
//           </div>
//         </div>
//       </div> */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//         {/* SERVICES */}
//         <div className="group relative bg-white rounded-2xl p-6 border border-border_color shadow-sm hover:shadow-2xl transition-all duration-500">
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition" />

//           <div className="flex items-center justify-between relative z-10">
//             <div>
//               <p className="text-sm text-gray-500">Services</p>
//               <h3 className="text-3xl font-bold mt-2 text-soft_black">
//                 {stats.totalServices}
//               </h3>
//             </div>

//             <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl group-hover:scale-110 transition">
//               <FaLayerGroup />
//             </div>
//           </div>
//         </div>

//         {/* BLOGS */}
//         <div className="group relative bg-white rounded-2xl p-6 border border-border_color shadow-sm hover:shadow-2xl transition-all duration-500">
//           <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition" />

//           <div className="flex items-center justify-between relative z-10">
//             <div>
//               <p className="text-sm text-gray-500">Blogs</p>
//               <h3 className="text-3xl font-bold mt-2 text-soft_black">
//                 {stats.totalBlogs}
//               </h3>
//             </div>

//             <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-xl group-hover:scale-110 transition">
//               <FaFileInvoiceDollar />
//             </div>
//           </div>
//         </div>

//         {/* CLIENTS */}
//         <div className="group relative bg-white rounded-2xl p-6 border border-border_color shadow-sm hover:shadow-2xl transition-all duration-500">
//           <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition" />

//           <div className="flex items-center justify-between relative z-10">
//             <div>
//               <p className="text-sm text-gray-500">Clients</p>
//               <h3 className="text-3xl font-bold mt-2 text-soft_black">
//                 {stats.totalClients}
//               </h3>
//             </div>

//             <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
//               <FaBuilding />
//             </div>
//           </div>
//         </div>

//         {/* PAGES */}
//         <div className="group relative bg-white rounded-2xl p-6 border border-border_color shadow-sm hover:shadow-2xl transition-all duration-500">
//           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition" />

//           <div className="flex items-center justify-between relative z-10">
//             <div>
//               <p className="text-sm text-gray-500">Pages</p>
//               <h3 className="text-3xl font-bold mt-2 text-soft_black">
//                 {stats.totalPages}
//               </h3>
//             </div>

//             <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
//               <FaUserShield />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Extra Professional Panel */}
//       <div className="bg-white border border-border_color rounded-2xl p-8 shadow-sm">
//         <h3 className="text-xl font-semibold mb-3">
//           Welcome to MAH Audit Dubai Admin Panel
//         </h3>

//         <p className="text-gray-600 leading-relaxed">
//           This dashboard allows administrators to manage audit services, client
//           records, reports, and system data efficiently. Use the sidebar to
//           navigate through different management sections.
//         </p>
//       </div>
//     </div>
//   );
// }

// Dashboard.getLayout = function getLayout(page) {
//   return <AdminLayout>{page}</AdminLayout>;
// };

// export default Dashboard;

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
        .from("pages")
        .select("*", { count: "exact", head: true });

      setStats({
        totalServices: servicesCount || 0,
        totalBlogs: blogsCount || 0,
        totalClients: clientsCount || 0,
        totalPages: pagesCount || 0,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
    }
  };

  const cards = [
    {
      label: "Services",
      value: stats.totalServices,
      icon: <FaLayerGroup />,
      gradient: "from-primary/10 via-white to-primary/5",
    },
    {
      label: "Blogs",
      value: stats.totalBlogs,
      icon: <FaFileInvoiceDollar />,
      gradient: "from-secondary/10 via-white to-secondary/5",
    },
    {
      label: "Clients",
      value: stats.totalClients,
      icon: <FaBuilding />,
      gradient: "from-green-500/10 via-white to-green-500/5",
    },
    {
      label: "Pages",
      value: stats.totalPages,
      icon: <FaUserShield />,
      gradient: "from-indigo-500/10 via-white to-indigo-500/5",
    },
  ];

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-gradient-to-br from-white via-white to-primary/5 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.06)]">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Admin Dashboard
            </p>

            <h1 className="text-3xl font-bold tracking-wide text-secondary md:text-4xl">
              MAH <span className="text-primary">AUDIT DUBAI</span>
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Audit & Advisory Admin Dashboard
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-green-50 px-5 py-4 text-right">
            <p className="text-xs font-medium text-gray-400">System Status</p>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-green-600">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
              Operational
            </span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
            />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total {card.label}
                </p>

                <h3 className="mt-3 text-4xl font-bold text-gray-900">
                  {card.value}
                </h3>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-xl text-primary transition-all duration-700 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WELCOME PANEL */}
      <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            Welcome to MAH Audit Dubai Admin Panel
          </h3>

          <p className="max-w-3xl leading-relaxed text-gray-600">
            Manage audit services, blogs, client logos, pages, SEO metadata and
            website content from one centralized dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;