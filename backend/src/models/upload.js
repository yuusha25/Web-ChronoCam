import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  // Existing fields
  url: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },

  // New security-related fields
  fileId: {
    type: String,
    required: true,
    description: "ImageKit's unique file identifier",
  },
  fileName: {
    type: String,
    required: true,
    description: "Sanitized file name",
  },
  mimeType: {
    type: String,
    required: true,
    enum: ["image/jpeg", "image/png", "image/gif"],
    description: "File type validation",
  },
  size: {
    type: Number,
    required: true,
    max: 5 * 1024 * 1024, // 5MB size limit
    description: "File size in bytes",
  },
  uploadIp: {
    type: String,
    required: true,
    description: "IP address of uploader",
  },
});

// Add indexes for better query performance
fileSchema.index({ userId: 1, uploadedAt: -1 });
fileSchema.index({ fileId: 1 }, { unique: true });

// Add a compound index for date-time queries
fileSchema.index({ userId: 1, date: 1, time: 1 });

export default mongoose.model("File", fileSchema);
