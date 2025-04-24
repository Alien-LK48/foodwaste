
import multer from "multer";
import path from "path";

/* ---------- food pics ---------- */
const foodStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/img/sell_food"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "")}`)
});
export const uploadFood = multer({ storage: foodStorage });

/* ---------- profile pics ---------- */
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/img/profile_img"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "")}`)
});
export const uploadProfile = multer({ storage: profileStorage });
