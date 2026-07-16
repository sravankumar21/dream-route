import mongoose, { Schema, Document } from "mongoose";

export interface ICalendarEvent extends Document {
  title: string;
  description: string;
  date: Date;
  endDate: Date | null;
  type: "blog" | "youtube" | "instagram" | "other";
  status: "planned" | "in-progress" | "done" | "cancelled";
  relatedContentId: string;
  color: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const CalendarEventSchema = new Schema<ICalendarEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true },
    endDate: { type: Date, default: null },
    type: {
      type: String,
      enum: ["blog", "youtube", "instagram", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: ["planned", "in-progress", "done", "cancelled"],
      default: "planned",
    },
    relatedContentId: { type: String, default: "" },
    color: { type: String, default: "#7c3aed" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

CalendarEventSchema.index({ date: 1 });
CalendarEventSchema.index({ type: 1 });
CalendarEventSchema.index({ status: 1 });

export default mongoose.models.CalendarEvent ||
  mongoose.model<ICalendarEvent>("CalendarEvent", CalendarEventSchema);
