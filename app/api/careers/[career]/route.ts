import { NextResponse } from "next/server";
import { getCareerBySlug } from "@/data/careers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ career: string }> }
) {
  const { career: slug } = await params;
  const career = getCareerBySlug(slug);

  if (!career) {
    return NextResponse.json({ error: "Career not found" }, { status: 404 });
  }

  return NextResponse.json(career);
}
