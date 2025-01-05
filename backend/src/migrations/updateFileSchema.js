// migrations/updateFileSchema.js
import mongoose from "mongoose";
import File from "../models/upload.js";
import fs from "fs";
import path from "path";

// Configuration
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://nabiljulian04:rZbI9udVjEuh6sdN@cluster0.ipxh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const BATCH_SIZE = 100;
const LOG_FILE = path.join(process.cwd(), "migration-logs.txt");

// Helper function to write logs
const writeLog = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message}\n`;
  console.log(logMessage.trim());
  fs.appendFileSync(LOG_FILE, logMessage);
};

// Fixed helper function to generate secure values
const generateSecureValues = () => ({
  fileId: new mongoose.Types.ObjectId().toString(), // Fixed: proper ObjectId generation
  fileName: `migrated_file_${Date.now()}.jpg`,
  mimeType: "image/jpeg",
  size: 1024 * 1024,
  uploadIp: "0.0.0.0",
});

async function migrateDocs() {
  try {
    await mongoose.connect(MONGODB_URI);
    writeLog("Connected to MongoDB");

    const totalDocs = await File.countDocuments({
      $or: [
        { fileId: { $exists: false } },
        { fileName: { $exists: false } },
        { mimeType: { $exists: false } },
        { size: { $exists: false } },
        { uploadIp: { $exists: false } },
      ],
    });

    writeLog(`Found ${totalDocs} documents to migrate`);

    let processedDocs = 0;
    let skip = 0;

    while (processedDocs < totalDocs) {
      const docs = await File.find({
        $or: [
          { fileId: { $exists: false } },
          { fileName: { $exists: false } },
          { mimeType: { $exists: false } },
          { size: { $exists: false } },
          { uploadIp: { $exists: false } },
        ],
      })
        .limit(BATCH_SIZE)
        .skip(skip);

      if (docs.length === 0) break;

      // Process each document in the batch
      const updates = docs.map(async (doc) => {
        try {
          const secureValues = generateSecureValues();

          const updateResult = await File.updateOne(
            { _id: doc._id },
            {
              $set: {
                fileId: doc.fileId || secureValues.fileId,
                fileName: doc.fileName || secureValues.fileName,
                mimeType: doc.mimeType || secureValues.mimeType,
                size: doc.size || secureValues.size,
                uploadIp: doc.uploadIp || secureValues.uploadIp,
              },
            }
          );

          return updateResult.modifiedCount;
        } catch (error) {
          writeLog(`Error updating document ${doc._id}: ${error.message}`);
          return 0;
        }
      });

      const results = await Promise.all(updates);
      const updatedInBatch = results.reduce((a, b) => a + b, 0);

      processedDocs += docs.length;
      skip += BATCH_SIZE;

      writeLog(
        `Processed ${processedDocs}/${totalDocs} documents. Updated ${updatedInBatch} in this batch.`
      );
    }

    writeLog("Migration completed successfully");

    // Verification
    const remainingDocs = await File.countDocuments({
      $or: [
        { fileId: { $exists: false } },
        { fileName: { $exists: false } },
        { mimeType: { $exists: false } },
        { size: { $exists: false } },
        { uploadIp: { $exists: false } },
      ],
    });

    writeLog(`Verification: ${remainingDocs} documents still need migration`);
  } catch (error) {
    writeLog(`Migration failed: ${error.message}`);
    throw error;
  } finally {
    await mongoose.connection.close();
    writeLog("Database connection closed");
  }
}

// Run the migration
console.log("Starting migration...");
migrateDocs()
  .then(() => {
    console.log("Migration script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration script failed:", error);
    process.exit(1);
  });
