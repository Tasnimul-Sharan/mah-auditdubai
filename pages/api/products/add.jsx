// import db from "@/lib/db";

import db from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const product = req.body;

    const [existing] = await db.query(
      "SELECT id FROM products WHERE name = ? AND category = ? LIMIT 1",
      [product.name, product.category],
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }

    const query = `
      INSERT INTO products
      (
        slug, category, type, name, generic,
        composition, description, indication,
        contraindication, dosage, interaction,
        sideeffect, precaution, withdrawal,
        storage, packing, images
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    await db.query(query, [
      product.slug,
      product.category,
      product.type,
      product.name,
      product.generic,
      product.composition,
      product.description,
      product.indication,
      product.contraindication,
      product.dosage,
      product.interaction,
      product.sideeffect,
      product.precaution,
      product.withdrawal,
      product.storage,
      product.packing,
      JSON.stringify(product.images),
    ]);

    res.status(200).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
}
