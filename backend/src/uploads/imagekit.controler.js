import imagekit from "./imagekit.conf.js";
import File from "../models/upload.js";
import crypto from "crypto";
import path from "path";

const sanitizeFileName = (fileName) => {
  return crypto.randomBytes(16).toString("hex") + path.extname(fileName);
};

const validateFileType = (buffer) => {
  const fileSignature = buffer.toString("hex", 0, 4);
  const validSignatures = {
    ffd8ffe1: "image/jpeg", // JPG variant
    ffd8ffe2: "image/jpeg", // JPG variant
    ffd8ffe0: "image/jpeg",
    "89504e47": "image/png",
    47494638: "image/gif",
  };
  return Object.values(validSignatures).includes(fileSignature);
};

export const uploadMedia = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No files uploaded.",
      });
    }

    const uploadResults = [];

    for (const file of req.files) {
      if (!validateFileType(file.buffer)) {
        return res.status(400).json({
          status: false,
          message: "Invalid file type detected",
        });
      }

      const strfile = file.buffer.toString("base64");
      const safeFileName = sanitizeFileName(file.originalname);
      const safeFileName = "hehe";

      const datafile = await imagekit.upload({
        file: strfile,
        fileName: safeFileName,
        useUniqueFileName: true,
        tags: [`user-${req.user.id}`], // Add user ID as tag for tracking
        folder: `/uploads/${req.user.id}`, // Organize files by user
      });

      // Save file with additional security metadata
      const newFile = new File({
        url: datafile.url,
        userId: req.user.id, // Use ID from authenticated user
        fileId: datafile.fileId,
        fileName: safeFileName,
        mimeType: file.mimetype,
        size: file.size,
        uploadIp: req.ip,
        date: new Date()
          .toLocaleString("en-GB", { timeZone: "Asia/Jakarta" })
          .split(",")[0],
        time: new Date()
          .toLocaleString("en-GB", { timeZone: "Asia/Jakarta" })
          .split(",")[1]
          .trim(),
      });

      await newFile.save();
      uploadResults.push(datafile);
      
    // console.error("Error bang during file upload:", error);
    }

    res.status(201).json({
      status: true,
      message: "Upload success",
      data: uploadResults,
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({
      status: false,
      message: "Failed to upload files",
      error: "An error occurred during upload", // Don't expose internal error details
    });
  }
};






// import imagekit from "./imagekit.conf.js";
// import File from "../models/upload.js"; // Model untuk menyimpan informasi file ke database

// export const uploadMedia = async (req, res) => {
//   try {
//     // Pastikan ada file yang diupload
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         status: false,
//         message: "No files uploaded.",
//       });
//     }

//     const uploadResults = [];

//     // Loop melalui file yang diupload dan simpan ke ImageKit
//     for (const file of req.files) {
//       const strfile = file.buffer.toString("base64");
//       const datafile = await imagekit.upload({
//         file: strfile,
//         fileName: Date.now().toString(),
//       });

//       // Simpan informasi file ke database
//       const newFile = new File({
//         url: datafile.url,
//         userId: req.body.userId,
//         // Menggunakan waktu lokal Surabaya (Asia/Jakarta)
//         date: new Date().toLocaleString("en-GB", { timeZone: "Asia/Jakarta" }).split(',')[0],  // Format DD/MM/YYYY
//         time: new Date().toLocaleString("en-GB", { timeZone: "Asia/Jakarta" }).split(',')[1].trim(),  // Format HH:MM:SS
//       });
      
      
//       await newFile.save();

//       uploadResults.push(datafile);
//     }

//     res.status(201).json({
//       status: true,
//       message: "Upload success",
//       data: uploadResults, // Kembalikan data semua file
//     });
//   } catch (error) {
//     console.error("Error during file upload:", error);
//     res.status(500).json({
//       status: false,
//       message: "Failed to upload files",
//       error: error.message,
//     });
//   }
// };

