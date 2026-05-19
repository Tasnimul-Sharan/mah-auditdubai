import { getLayoutData } from "@/lib/getLayoutData";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const layoutData = await getLayoutData();

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=3600",
    );

    return res.status(200).json(layoutData);
  } catch (error) {
    console.error("Layout data API failed:", error);

    return res.status(500).json({
      footerData: null,
      navbarData: null,
      navLinks: [],
    });
  }
}
