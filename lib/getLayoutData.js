import { supabaseServer } from "@/lib/supabaseServer";

export async function getLayoutData() {
  const [{ data: navbarData }, { data: navLinks }, { data: footerData }] =
    await Promise.all([
      supabaseServer.from("navbar").select("*").single(),

      supabaseServer
        .from("nav_links")
        .select("*")
        .order("order_no", { ascending: true }),

      supabaseServer.from("footer").select("*").single(),
    ]);

  return {
    navbarData: navbarData || null,
    navLinks: navLinks || [],
    footerData: footerData || null,
  };
}
