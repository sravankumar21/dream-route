import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  title: string;
  source: "local" | "youtube" | "instagram";
  fileUrl: string;
  duration: string;
  thumbnailUrl: string;
  tags: string[];
  status: "raw" | "editing" | "review" | "final" | "published";
  publishedAt: Date | null;
  platformUrl: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    source: { type: String, enum: ["local", "youtube", "instagram"], default: "local" },
    fileUrl: { type: String, default: "" },
    duration: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
    tags: [{ type: String }],
    status: { type: String, enum: ["raw", "editing", "review", "final", "published"], default: "raw" },
    publishedAt: { type: Date, default: null },
    platformUrl: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

VideoSchema.index({ status: 1 });
VideoSchema.index({ source: 1 });
VideoSchema.index({ createdAt: -1 });

export default mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);
