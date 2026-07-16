import mongoose, { Schema, Document } from "mongoose";

export interface IPrompt extends Document {
  title: string;
  content: string;
  category: "writing" | "summarize" | "brainstorm" | "social" | "seo" | "other";
  tags: string[];
  useCount: number;
  favorite: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const PromptSchema = new Schema<IPrompt>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["writing", "summarize", "brainstorm", "social", "seo", "other"],
      default: "other",
    },
    tags: [{ type: String }],
    useCount: { type: Number, default: 0 },
    favorite: { type: Boolean, default: false },
    lastUsedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

PromptSchema.index({ category: 1 });
PromptSchema.index({ favorite: 1 });
PromptSchema.index({ createdAt: -1 });

export default mongoose.models.Prompt || mongoose.model<IPrompt>("Prompt", PromptSchema);
