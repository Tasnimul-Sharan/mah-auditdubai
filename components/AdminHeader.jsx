// import { supabaseServer } from "@/lib/supabaseServer";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { LogOut } from "lucide-react";

// export default function AdminHeader() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data } = await supabaseServer.auth.getUser();
//       setUser(data.user);
//     };

//     getUser();
//   }, []);

//   const logout = async () => {
//     await supabaseServer.auth.signOut();
//     router.push("/login");
//   };

//   return (
//     <header className="h-24 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 flex items-center justify-between px-8">
//       {/* Left */}
//       <div>
//         <h1 className="text-xl font-semibold text-soft_black tracking-wide">
//           Admin Dashboard
//         </h1>
//         <p className="text-xs text-gray-400">Manage your system efficiently</p>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-4">
//         {/* User Info Card */}
//         <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full">
//           <FaUserCircle className="text-3xl text-primary" />
//           <div className="text-sm leading-tight">
//             <p className="font-medium text-gray-700">
//               {user?.email?.split("@")[0]}
//             </p>
//             <p className="text-xs text-gray-400">{user?.email}</p>
//           </div>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={logout}
//           className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition text-sm font-medium"
//         >
//           <LogOut size={16} />
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }

// "use client";

// import { supabaseServer } from "@/lib/supabaseServer";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { FaUserShield, FaBell } from "react-icons/fa";
// import { LogOut, Settings } from "lucide-react";

// export default function AdminHeader() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data } = await supabaseServer.auth.getUser();
//       setUser(data.user);
//     };

//     getUser();
//   }, []);

//   const logout = async () => {
//     await supabaseServer.auth.signOut();
//     router.push("/login");
//   };

//   return (
//     <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-50">
//       {/* Left Section: Context */}
//       <div className="flex items-center gap-4">
//         <div className="h-8 w-[2px] bg-primary/30 hidden md:block"></div>
//         <div>
//           <h1 className="text-sm font-bold text-soft_black uppercase tracking-[0.2em]">
//             Internal Portal
//           </h1>
//           <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
//             Authorized Access Only • Dubai Office
//           </p>
//         </div>
//       </div>

//       {/* Right Section: Actions & Profile */}
//       <div className="flex items-center gap-6">
//         {/* Quick Utility Icons */}
//         <div className="flex items-center gap-2 border-r border-gray-100 pr-6 mr-2">
//           <button className="p-2 text-gray-400 hover:text-primary transition-colors relative">
//             <FaBell size={18} />
//             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
//           </button>
//           <button className="p-2 text-gray-400 hover:text-primary transition-colors">
//             <Settings size={18} />
//           </button>
//         </div>

//         {/* Professional Profile Badge */}
//         <div className="flex items-center gap-4">
//           <div className="text-right hidden sm:block">
//             <p className="text-sm font-bold text-soft_black leading-none uppercase tracking-tight">
//               {user?.email?.split("@")[0] || "Auditor"}
//             </p>
//             <p className="text-[10px] text-primary font-bold uppercase mt-1 tracking-tighter">
//               Senior Associate
//             </p>
//           </div>

//           <div className="h-10 w-10 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center text-slate-600 shadow-sm overflow-hidden group hover:border-primary transition-all">
//             <FaUserShield size={20} />
//           </div>
//         </div>

//         {/* Refined Logout */}
//         <button
//           onClick={logout}
//           className="group flex items-center gap-2 bg-[#0F172A] text-white px-5 py-2.5 rounded-lg hover:bg-soft_black transition-all text-[11px] font-bold uppercase tracking-widest shadow-md shadow-slate-200"
//         >
//           <LogOut
//             size={14}
//             className="group-hover:translate-x-1 transition-transform"
//           />
//           Exit
//         </button>
//       </div>
//     </header>
//   );
// }

"use client";

import { supabaseServer } from "@/lib/supabaseServer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUserShield, FaBell } from "react-icons/fa";
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
    <header className="h-24 bg-primary border-b border-white/10 flex items-center justify-between px-10 sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-[2px] bg-secondary/60 hidden md:block"></div>

        <div>
          <h1 className="text-sm font-bold text-white uppercase tracking-[0.2em]">
            Audit Management Portal
          </h1>

          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mt-1">
            Confidential • Dubai, UAE
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Utility Icons */}
        <div className="flex items-center gap-2 border-r border-white/10 pr-6 mr-2">
          {/* Notification */}
          <button className="relative p-2 text-gray-400 hover:text-secondary transition-colors">
            <FaBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-primary"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-secondary transition-colors">
            <Settings size={18} />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          {/* Text */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white leading-none capitalize">
              {username}
            </p>
            <p className="text-[10px] text-secondary font-semibold uppercase mt-1 tracking-wider">
              MAH Admin
            </p>
          </div>

          {/* Avatar */}
          <div className="h-10 w-10 rounded-lg bg-primary_light/40 border border-white/10 flex items-center justify-center text-secondary shadow-sm backdrop-blur-sm hover:border-secondary transition-all">
            <FaUserShield size={18} />
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="group flex items-center gap-2 bg-secondary text-soft_black px-5 py-2.5 rounded-lg hover:bg-secondary_two transition-all text-[11px] font-bold uppercase tracking-widest shadow-md"
        >
          <LogOut
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
          Log Out
        </button>
      </div>
    </header>
  );
}
