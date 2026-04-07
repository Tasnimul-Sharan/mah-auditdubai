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

// import cloudinary from "cloudinary";
import { v2 as cloudinary } from "cloudinary";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

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

    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const result = await cloudinary.v2.uploader.upload(file, { folder });

    return res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ message: "Upload failed" });
  }
}
