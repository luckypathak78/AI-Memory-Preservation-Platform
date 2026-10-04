import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    personality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personality",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Uploaded", "Training", "Processed"],
      default: "Uploaded",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Memory", memorySchema);