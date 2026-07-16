import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import VideoProject from "@/models/VideoProject";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const filter: Record<string, unknown> = {};
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { script: { $regex: search, $options: "i" } },
      { seoTitle: { $regex: search, $options: "i" } },
      { seoTags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  const items = await VideoProject.find(filter).sort({ updatedAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const project = await VideoProject.create(body);
  return NextResponse.json(project, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { id, ...update } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const item = await VideoProject.findByIdAndUpdate(id, update, { new: true }).lean();
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await VideoProject.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
