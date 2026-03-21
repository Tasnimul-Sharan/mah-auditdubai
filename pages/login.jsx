import { useState } from "react";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabaseServer } from "@/lib/supabaseServer";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-36 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-border_color">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center border-b border-white/10">
          <h1 className="text-2xl font-semibold text-primary tracking-wide">
            MAH Audit Dubai
          </h1>
          <p className="text-sm text-gray-400 mt-1">Secure admin login</p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@mah-auditdubai.com"
                className="w-full rounded-lg bg-gray-50 border border-border_color px-4 py-3 text-sm placeholder-gray-500 focus:bg-gray-100 outline-none transition"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-gray-50 border border-border_color px-4 py-3 pr-11 text-sm placeholder-gray-500 focus:bg-gray-100 outline-none transition"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary text-white py-3 text-sm font-semibold hover:bg-secondary_two transition shadow-lg shadow-secondary/20 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} mah-auditdubai
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { useRouter } from "next/router";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const { error } = await supabaseServer.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setError(error.message);
//       setLoading(false);
//     } else {
//       router.push("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 pt-44 font-sans">
//       <div className="flex w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
//         {/* Left Panel - Branding/Visual (Hidden on mobile) */}
//         <div className="hidden md:flex md:w-1/2 bg-primary p-12 flex-col justify-between relative overflow-hidden">
//           {/* Subtle Decorative Background Elements */}
//           <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
//             <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
//             <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
//           </div>

//           <div className="relative z-10 mt-8">
//             <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
//               Admin
//               <br />
//               Workspace.
//             </h2>
//             <p className="mt-4 text-white/80 text-lg max-w-sm">
//               Manage your application efficiently and securely from one central
//               dashboard.
//             </p>
//           </div>

//           <div className="relative z-10 text-white/60 text-sm">
//             © {new Date().getFullYear()} Admin System. All rights reserved.
//           </div>
//         </div>

//         {/* Right Panel - Form */}
//         <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-soft_black mb-2">
//               Welcome back
//             </h1>
//             <p className="text-gray-500 text-sm">
//               Please enter your admin credentials to continue.
//             </p>
//           </div>

//           {/* Error Message with Icon */}
//           {error && (
//             <div className="mb-6 rounded-xl bg-red-50/80 border border-red-200 text-red-600 px-4 py-3 text-sm flex items-center">
//               <svg
//                 className="w-5 h-5 mr-2 flex-shrink-0"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label className="block text-sm font-semibold text-soft_black mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="admin@company.com"
//                 className="w-full rounded-xl bg-gray-50 border border-border_color px-4 py-3.5 text-sm focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200"
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-semibold text-soft_black mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className="w-full rounded-xl bg-gray-50 border border-border_color px-4 py-3.5 pr-11 text-sm focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200"
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash size={18} />
//                   ) : (
//                     <FaEye size={18} />
//                   )}
//                 </button>
//               </div>
//               <div className="flex justify-end mt-2">
//                 <a
//                   href="#"
//                   className="text-xs font-medium text-primary hover:text-Secound_primary transition-colors"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-4 rounded-xl bg-primary text-white py-3.5 text-sm font-bold shadow-lg shadow-primary/30 hover:bg-Secound_primary hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-primary/30"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg
//                     className="animate-spin h-4 w-4 text-white"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Signing in...
//                 </span>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
