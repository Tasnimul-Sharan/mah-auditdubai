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

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const { error } = await supabaseServer.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
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
              className="group relative w-full overflow-hidden rounded-md bg-primary py-3 text-xs font-semibold text-white shadow-lg shadow-primary/25 transition duration-300 hover:scale-[1.01] hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              <span className="relative z-10">
                {loading ? "Signing in..." : "Sign In"}
              </span>

              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
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
// import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
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

//     if (loading) return;

//     setLoading(true);
//     setError("");

//     try {
//       const { error } = await supabaseServer.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) {
//         setError(error.message);
//         return;
//       }

//       router.push("/dashboard");
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-secondary px-6 py-10 pt-32">
//       {/* Background Glow */}
//       <div className="absolute inset-0">
//         <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" />
//         <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />
//         <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-secondary_two/20 blur-[110px]" />
//       </div>

//       {/* Grid Overlay */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />

//       {/* Dark Overlay */}
//       {/* <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/80 to-secondary" /> */}

//       {/* Login Card */}
//       <div className="relative z-10 w-full max-w-md">
//         <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.075] shadow-2xl shadow-black/40 backdrop-blur-2xl">
//           {/* Top Accent */}
//           <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary_two to-primary" />

//           {/* Header */}
//           <div className="border-b border-white/10 px-8 pb-7 pt-8 text-center">
//             <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-lg shadow-black/20">
//               <FaLock className="text-xl text-primary" />
//             </div>

//             <h1 className="text-3xl font-bold tracking-wide text-white">
//               MAH Audit Dubai
//             </h1>

//             <p className="mt-2 text-sm text-gray-400">Secure admin login</p>
//           </div>

//           {/* Body */}
//           <div className="px-8 py-7">
//             {error && (
//               <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleLogin} className="space-y-5">
//               {/* Email */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Email Address
//                 </label>

//                 <div className="relative">
//                   <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

//                   <input
//                     type="email"
//                     value={email}
//                     placeholder="admin@mah-auditdubai.com"
//                     className="w-full rounded-xl border border-white/10 bg-white/[0.08] px-4 py-3.5 pl-11 text-sm text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-primary/70 focus:bg-white/[0.12] focus:ring-4 focus:ring-primary/10"
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-300">
//                   Password
//                 </label>

//                 <div className="relative">
//                   <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     placeholder="••••••••"
//                     className="w-full rounded-xl border border-white/10 bg-white/[0.08] px-4 py-3.5 pl-11 pr-12 text-sm text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-primary/70 focus:bg-white/[0.12] focus:ring-4 focus:ring-primary/10"
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </div>

//               {/* Forgot Password */}
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="text-xs font-medium text-gray-400 transition hover:text-primary"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary via-[#35aeea] to-secondary_two py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition duration-300 hover:scale-[1.01] hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
//               >
//                 <span className="relative z-10">
//                   {loading ? "Signing in..." : "Sign In"}
//                 </span>

//                 {/* Shine Effect */}
//                 <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
//               </button>
//             </form>
//           </div>

//           {/* Footer */}
//           <div className="border-t border-white/10 px-8 py-5 text-center">
//             <p className="text-xs text-gray-500">
//               © {new Date().getFullYear()} mah-auditdubai. All rights reserved.
//             </p>
//           </div>
//         </div>

//         <p className="mt-6 text-center text-xs text-gray-500">
//           Protected administrative portal
//         </p>
//       </div>
//     </section>
//   );
// }

// /*
//   This removes default Layout from login page.
//   Navbar, Footer, ScrollToTopButton will not appear here.
// */
// Login.getLayout = function getLayout(page) {
//   return page;
// };

// import { useState } from "react";
// import { useRouter } from "next/router";
// import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
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

//     if (loading) return;

//     setLoading(true);
//     setError("");

//     try {
//       const { error } = await supabaseServer.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) {
//         setError(error.message);
//         return;
//       }

//       router.push("/dashboard");
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-secondary px-4 py-8 pt-36">
//       {/* Background Glow */}
//       <div className="absolute inset-0">
//         <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" />
//         <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />
//         <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-secondary_two/20 blur-[110px]" />
//       </div>

//       {/* Grid Overlay */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />

//       {/* Login Card */}
//       <div className="relative z-10 w-full max-w-[390px]">
//         <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.075] shadow-2xl shadow-black/40 backdrop-blur-2xl">
//           {/* Top Accent */}
//           <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary_two to-primary" />

//           {/* Header */}
//           <div className="border-b border-white/10 px-7 pb-6 pt-7 text-center">
//             <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-lg shadow-black/20">
//               <FaLock className="text-lg text-primary" />
//             </div>

//             <h1 className="text-2xl font-bold tracking-wide text-white">
//               MAH Audit Dubai
//             </h1>

//             <p className="mt-2 text-xs text-gray-400">
//               Secure access to your admin dashboard
//             </p>
//           </div>

//           {/* Body */}
//           <div className="px-7 py-6">
//             {error && (
//               <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleLogin} className="space-y-4">
//               {/* Email */}
//               <div>
//                 <label className="mb-2 block text-xs font-medium text-gray-300">
//                   Email Address
//                 </label>

//                 <div className="relative">
//                   <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500" />

//                   <input
//                     type="email"
//                     value={email}
//                     placeholder="admin@mah-auditdubai.com"
//                     className="w-full rounded-xl border border-white/10 bg-white/[0.08] px-4 py-3 pl-10 text-xs text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-primary/70 focus:bg-white/[0.12] focus:ring-4 focus:ring-primary/10"
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="mb-2 block text-xs font-medium text-gray-300">
//                   Password
//                 </label>

//                 <div className="relative">
//                   <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500" />

//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     placeholder="••••••••"
//                     className="w-full rounded-xl border border-white/10 bg-white/[0.08] px-4 py-3 pl-10 pr-12 text-xs text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-primary/70 focus:bg-white/[0.12] focus:ring-4 focus:ring-primary/10"
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </div>

//               {/* Forgot Password */}
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="text-[11px] font-medium text-gray-400 transition hover:text-primary"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary via-[#35aeea] to-secondary_two py-3 text-xs font-semibold text-white shadow-lg shadow-primary/25 transition duration-300 hover:scale-[1.01] hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
//               >
//                 <span className="relative z-10">
//                   {loading ? "Signing in..." : "Sign In"}
//                 </span>

//                 <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
//               </button>
//             </form>
//           </div>

//           {/* Footer */}
//           <div className="border-t border-white/10 px-7 py-4 text-center">
//             <p className="text-[11px] text-gray-500">
//               © {new Date().getFullYear()} mah-auditdubai. All rights reserved.
//             </p>
//           </div>
//         </div>

//         <p className="mt-4 text-center text-[11px] text-gray-500">
//           Protected administrative portal
//         </p>
//       </div>
//     </section>
//   );
// }

// /*
//   This removes default Layout from login page.
//   Navbar, Footer, ScrollToTopButton will not appear here.
// */
// Login.getLayout = function getLayout(page) {
//   return page;
// };
