// import db from "@/lib/db";

import db from "@/lib/db";

export default async function handler(req, res) {
  const [rows] = await db.query("SELECT * FROM types ORDER BY name ASC");

  res.status(200).json(rows);
}
