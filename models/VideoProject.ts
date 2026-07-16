import mongoose, { Schema, Document } from "mongoose";

export interface IVideoProject extends Document {
  title: string;
  platform: "youtube" | "instagram";
  type: "short" | "reel" | "long-form";
  script: string;
  thumbnailUrl: string;
  thumbnailNotes: string;
  seoTitle: string;
  seoDescription: string;
  seoTags: string[];
  status: "idea" | "scripting" | "editing" | "ready" | "published";
  publishDate?: Date;
  publishedUrl: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const VideoProjectSchema = new Schema<IVideoProject>(
  {
    title: { type: String, required: true },
    platform: { type: String, enum: ["youtube", "instagram"], default: "youtube" },
    type: { type: String, enum: ["short", "reel", "long-form"], default: "short" },
    script: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
    thumbnailNotes: { type: String, default: "" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoTags: [{ type: String }],
    status: { type: String, enum: ["idea", "scripting", "editing", "ready", "published"], default: "idea" },
    publishDate: { type: Date },
    publishedUrl: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

VideoProjectSchema.index({ status: 1 });
VideoProjectSchema.index({ type: 1 });
VideoProjectSchema.index({ platform: 1 });
VideoProjectSchema.index({ createdAt: -1 });

export default mongoose.models.VideoProject ||
  mongoose.model<IVideoProject>("VideoProject", VideoProjectSchema);
