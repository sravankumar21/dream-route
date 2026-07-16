import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import CalendarEvent from "@/models/CalendarEvent";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const id = searchParams.get("id");

  if (id) {
    const item = await CalendarEvent.findById(id).lean();
    return NextResponse.json(item);
  }

  const filter: Record<string, unknown> = {};
  if (type && type !== "all") filter.type = type;
  if (status && status !== "all") filter.status = status;

  if (month && year) {
    const start = new Date(parseInt(year), parseInt(month) - 1, 1);
    const end = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59, 999);
    filter.date = { $gte: start, $lte: end };
  }

  const items = await CalendarEvent.find(filter).sort({ date: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const item = await CalendarEvent.create(body);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { id, ...update } = body;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const item = await CalendarEvent.findByIdAndUpdate(id, update, { new: true }).lean();
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await CalendarEvent.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
