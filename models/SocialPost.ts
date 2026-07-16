import mongoose, { Schema, Document } from "mongoose";

export interface ISocialPost extends Document {
  platform: "twitter" | "linkedin" | "facebook" | "youtube-community";
  content: string;
  scheduledDate: Date | null;
  status: "draft" | "scheduled" | "published" | "failed";
  mediaUrl: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const SocialPostSchema = new Schema<ISocialPost>(
  {
    platform: {
      type: String,
      enum: ["twitter", "linkedin", "facebook", "youtube-community"],
      default: "twitter",
    },
    content: { type: String, required: true },
    scheduledDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ["draft", "scheduled", "published", "failed"],
      default: "draft",
    },
    mediaUrl: { type: String, default: "" },
    engagement: {
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

SocialPostSchema.index({ platform: 1 });
SocialPostSchema.index({ status: 1 });
SocialPostSchema.index({ scheduledDate: 1 });
SocialPostSchema.index({ createdAt: -1 });

export default mongoose.models.SocialPost ||
  mongoose.model<ISocialPost>("SocialPost", SocialPostSchema);
