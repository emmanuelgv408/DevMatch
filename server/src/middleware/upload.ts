import multer from "multer";
import { v2 as cloudinary } from "cloudinary";


import CloudinaryStorage from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new (CloudinaryStorage as any)({
  cloudinary: cloudinary,
  params: {
    folder: "profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
}) as any;

const parser = multer({ storage });

export default parser;
