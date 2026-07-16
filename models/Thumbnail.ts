import mongoose, { Schema, Document } from "mongoose";

export interface IThumbnail extends Document {
  title: string;
  projectId: string;
  imageUrl: string;
  altText: string;
  style: "bold-text" | "photo-heavy" | "minimal" | "mixed";
  colors: string[];
  notes: string;
  status: "concept" | "designed" | "approved" | "used";
  createdAt: Date;
  updatedAt: Date;
}

const ThumbnailSchema = new Schema<IThumbnail>(
  {
    title: { type: String, required: true },
    projectId: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    altText: { type: String, default: "" },
    style: { type: String, enum: ["bold-text", "photo-heavy", "minimal", "mixed"], default: "bold-text" },
    colors: [{ type: String }],
    notes: { type: String, default: "" },
    status: { type: String, enum: ["concept", "designed", "approved", "used"], default: "concept" },
  },
  { timestamps: true }
);

ThumbnailSchema.index({ status: 1 });
ThumbnailSchema.index({ style: 1 });
ThumbnailSchema.index({ createdAt: -1 });

export default mongoose.models.Thumbnail ||
  mongoose.model<IThumbnail>("Thumbnail", ThumbnailSchema);
