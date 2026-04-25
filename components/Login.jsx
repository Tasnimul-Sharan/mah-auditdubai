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
              className="w-full rounded-lg bg-primary text-white py-3 text-sm font-semibold hover:bg-secondary_two transition shadow-sm shadow-secondary/20 disabled:opacity-60"
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
