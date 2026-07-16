import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/models/Content";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const filter: any = {};
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  const items = await Content.find(filter).sort({ updatedAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const slug =
    body.slug ||
    body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
      "-" +
      Date.now().toString(36);

  const content = await Content.create({
    ...body,
    slug,
    wordCount: body.content ? body.content.split(/\s+/).filter(Boolean).length : 0,
  });

  return NextResponse.json(content, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { id, ...update } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  if (update.content) {
    update.wordCount = update.content.split(/\s+/).filter(Boolean).length;
  }

  const item = await Content.findByIdAndUpdate(id, update, { new: true }).lean();
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await Content.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
