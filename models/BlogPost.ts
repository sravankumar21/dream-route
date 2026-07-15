import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  summary: string;
  aiSummary?: string;
  content: string;
  source: "reddit" | "rss" | "hn";
  sourceUrl: string;
  sourceName: string;
  author: string;
  category: "ai-tools" | "job-market" | "learn" | "industry";
  score: number;
  comments: number;
  publishedAt: Date;
  fetchedAt: Date;
  imageUrl?: string;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    aiSummary: { type: String },
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
    score: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    publishedAt: { type: Date, required: true },
    fetchedAt: { type: Date, default: Date.now },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

BlogPostSchema.index({ publishedAt: -1 });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ source: 1 });

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
