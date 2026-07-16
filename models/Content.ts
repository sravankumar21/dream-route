import mongoose, { Schema, Document } from "mongoose";

export interface IContent extends Document {
  title: string;
  slug: string;
  type: "blog" | "reel-script" | "short-script" | "long-form-script" | "instagram-caption";
  content: string;
  excerpt: string;
  category: "ai-tools" | "job-market" | "learn" | "industry" | "general";
  tags: string[];
  status: "draft" | "review" | "ready" | "published" | "archived";
  platform: "dreamroute" | "youtube" | "instagram" | "all";
  aiAssisted: boolean;
  publishDate?: Date;
  publishedUrl?: string;
  thumbnailUrl?: string;
  notes: string;
  wordCount: number;
  createdBy: string;
  updatedBy: string;
}

const ContentSchema = new Schema<IContent>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["blog", "reel-script", "short-script", "long-form-script", "instagram-caption"],
      default: "blog",
    },
    content: { type: String, default: "" },
    excerpt: { type: String, default: "" },
    category: {
      type: String,
      enum: ["ai-tools", "job-market", "learn", "industry", "general"],
      default: "general",
    },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "review", "ready", "published", "archived"],
      default: "draft",
    },
    platform: {
      type: String,
      enum: ["dreamroute", "youtube", "instagram", "all"],
      default: "dreamroute",
    },
    aiAssisted: { type: Boolean, default: false },
    publishDate: { type: Date },
    publishedUrl: { type: String },
    thumbnailUrl: { type: String },
    notes: { type: String, default: "" },
    wordCount: { type: Number, default: 0 },
    createdBy: { type: String, default: "admin" },
    updatedBy: { type: String, default: "admin" },
  },
  { timestamps: true }
);

ContentSchema.index({ status: 1 });
ContentSchema.index({ type: 1 });
ContentSchema.index({ category: 1 });
ContentSchema.index({ platform: 1 });
ContentSchema.index({ createdAt: -1 });

export default mongoose.models.Content ||
  mongoose.model<IContent>("Content", ContentSchema);
