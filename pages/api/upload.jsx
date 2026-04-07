// import { v2 as cloudinary } from "cloudinary";

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "1mb",
//     },
//   },
// };

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     const file = req.body.file;

//     const upload = await cloudinary.uploader.upload(file, {
//       folder: "Other",
//     });

//     res.status(200).json({ url: upload.secure_url });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { file, folder = "uploads" } = req.body;

    const result = await cloudinary.uploader.upload(file, {
      folder,
    });

    return res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id, // ✅ VERY IMPORTANT
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
}
