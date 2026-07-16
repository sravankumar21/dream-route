import mongoose, { Schema, Document } from "mongoose";

export interface IAsset extends Document {
  name: string;
  type: "logo" | "font" | "color" | "template" | "icon" | "image";
  fileUrl: string;
  tags: string[];
  category: "brand" | "social" | "youtube" | "instagram" | "blog";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema = new Schema<IAsset>(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["logo", "font", "color", "template", "icon", "image"], default: "image" },
    fileUrl: { type: String, default: "" },
    tags: [{ type: String }],
    category: { type: String, enum: ["brand", "social", "youtube", "instagram", "blog"], default: "brand" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

AssetSchema.index({ type: 1 });
AssetSchema.index({ category: 1 });
AssetSchema.index({ createdAt: -1 });

export default mongoose.models.Asset || mongoose.model<IAsset>("Asset", AssetSchema);
