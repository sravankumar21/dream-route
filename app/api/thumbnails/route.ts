import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Thumbnail from "@/models/Thumbnail";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const style = searchParams.get("style");
  const search = searchParams.get("search");

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (style) filter.style = style;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { altText: { $regex: search, $options: "i" } },
      { notes: { $regex: search, $options: "i" } },
    ];
  }

  const items = await Thumbnail.find(filter).sort({ updatedAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const thumb = await Thumbnail.create(body);
  return NextResponse.json(thumb, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { id, ...update } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const item = await Thumbnail.findByIdAndUpdate(id, update, { new: true }).lean();
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await Thumbnail.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
