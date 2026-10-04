import mongoose from "mongoose";

const personalitySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    relationship: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Not Trained", "Training", "Ready"],
      default: "Not Trained",
    },

    aiProfile: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Personality", personalitySchema);