import mongoose, { Schema, Document } from "mongoose";

export interface IInstagramPost extends Document {
  type: "reel" | "carousel" | "story";
  caption: string;
  hook: string;
  hashtags: string[];
  audioNote: string;
  thumbnailUrl: string;
  status: "idea" | "creating" | "ready" | "published";
  scheduledDate?: Date;
  publishedUrl: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const InstagramPostSchema = new Schema<IInstagramPost>(
  {
    type: { type: String, enum: ["reel", "carousel", "story"], default: "reel" },
    caption: { type: String, default: "" },
    hook: { type: String, default: "" },
    hashtags: [{ type: String }],
    audioNote: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
    status: { type: String, enum: ["idea", "creating", "ready", "published"], default: "idea" },
    scheduledDate: { type: Date },
    publishedUrl: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

InstagramPostSchema.index({ status: 1 });
InstagramPostSchema.index({ type: 1 });
InstagramPostSchema.index({ createdAt: -1 });

export default mongoose.models.InstagramPost ||
  mongoose.model<IInstagramPost>("InstagramPost", InstagramPostSchema);
