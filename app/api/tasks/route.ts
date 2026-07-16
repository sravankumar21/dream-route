import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const category = searchParams.get("category");
  const today = searchParams.get("today");
  const id = searchParams.get("id");

  if (id) {
    const item = await Task.findById(id).lean();
    return NextResponse.json(item);
  }

  const filter: Record<string, unknown> = {};
  if (status && status !== "all") filter.status = status;
  if (priority && priority !== "all") filter.priority = priority;
  if (category && category !== "all") filter.category = category;

  if (today) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    filter.dueDate = { $gte: start, $lte: end };
  }

  const items = await Task.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const item = await Task.create(body);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { id, ...update } = body;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  if (update.status === "done" && !update.completedAt) {
    update.completedAt = new Date();
  }
  if (update.status && update.status !== "done") {
    update.completedAt = null;
  }
  const item = await Task.findByIdAndUpdate(id, update, { new: true }).lean();
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
