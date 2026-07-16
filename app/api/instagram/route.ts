import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import InstagramPost from "@/models/InstagramPost";

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
      { caption: { $regex: search, $options: "i" } },
      { hook: { $regex: search, $options: "i" } },
      { hashtags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  const items = await InstagramPost.find(filter).sort({ updatedAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const post = await InstagramPost.create(body);
  return NextResponse.json(post, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { id, ...update } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const item = await InstagramPost.findByIdAndUpdate(id, update, { new: true }).lean();
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await InstagramPost.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
