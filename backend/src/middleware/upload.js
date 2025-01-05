import multer from "multer";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const maxFileSize = 5 * 1024 * 1024; // 5MB

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxFileSize },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only JPEG, PNG and GIF allowed.")
      );
    }
    cb(null, true);
  },
});
