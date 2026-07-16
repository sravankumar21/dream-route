import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  summary: string;
  aiSummary?: string;
  aiAnalysis?: {
    hook: string;
    whatHappened: string;
    whyItMatters: string;
    whatsNext: string;
  };
  content: string;
  source: "reddit" | "rss" | "hn";
  sourceUrl: string;
  sourceName: string;
  author: string;
  category: "ai-tools" | "job-market" | "learn" | "industry";
  tags: string[];
  score: number;
  comments: number;
  publishedAt: Date;
  fetchedAt: Date;
  imageUrl?: string;
  status: "new" | "reviewed" | "published" | "archived";
  adminNotes?: string;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    aiSummary: { type: String },
    aiAnalysis: {
      hook: { type: String },
      whatHappened: { type: String },
      whyItMatters: { type: String },
      whatsNext: { type: String },
    },
    content: { type: String, default: "" },
    source: { type: String, enum: ["reddit", "rss", "hn"], required: true },
    sourceUrl: { type: String, required: true },
    sourceName: { type: String, required: true },
    author: { type: String, default: "unknown" },
    category: {
      type: String,
      enum: ["ai-tools", "job-market", "learn", "industry"],
      default: "industry",
    },
    tags: [{ type: String }],
    score: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    publishedAt: { type: Date, required: true },
    fetchedAt: { type: Date, default: Date.now },
    imageUrl: { type: String },
    status: {
      type: String,
      enum: ["new", "reviewed", "published", "archived"],
      default: "new",
    },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

BlogPostSchema.index({ publishedAt: -1 });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ source: 1 });
BlogPostSchema.index({ status: 1 });

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
