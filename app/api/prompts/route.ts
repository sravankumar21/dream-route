import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Prompt from "@/models/Prompt";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const favorite = searchParams.get("favorite");
  const search = searchParams.get("search");
  const use = searchParams.get("use");
  const id = searchParams.get("id");

  if (id) {
    const item = await Prompt.findById(id).lean();
    return NextResponse.json(item);
  }

  if (use) {
    const item = await Prompt.findByIdAndUpdate(
      use,
      { $inc: { useCount: 1 }, lastUsedAt: new Date() },
      { new: true }
    ).lean();
    return NextResponse.json(item);
  }

  const filter: Record<string, unknown> = {};
  if (category && category !== "all") filter.category = category;
  if (favorite === "true") filter.favorite = true;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const items = await Prompt.find(filter).sort({ updatedAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const item = await Prompt.create(body);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { id, ...update } = body;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const item = await Prompt.findByIdAndUpdate(id, update, { new: true }).lean();
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await Prompt.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
