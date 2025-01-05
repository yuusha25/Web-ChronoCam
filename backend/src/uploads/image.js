// import express from "express";
// import { uploadMedia } from "./imagekit.controler.js";
// import { authMiddleware } from "../middleware/auth.js";
// import { uploadMiddleware } from "../middleware/upload.js";
// import rateLimit from "express-rate-limit";

// const router = express.Router();

// const uploadLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10, // Limit each IP to 10 uploads per windowMs
//   message: "Too many uploads from this IP, please try again later",
// });

// router.post(
//   "/",
//   // authMiddleware,
//   uploadLimiter,
//   uploadMiddleware.array("foto", 5), // Limit to 5 files max
//   uploadMedia
// );

import express from "express";
import { uploadMedia } from "./imagekit.controler.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 * 1024 },
});

router.post("/", upload.array("foto"), uploadMedia);

export default router;

