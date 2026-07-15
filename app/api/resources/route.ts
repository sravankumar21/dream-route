import { NextResponse } from "next/server";
import { resources, getResourcesForSkill } from "@/data/resources";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const skillId = searchParams.get("skill");
  const type = searchParams.get("type");

  let filtered = resources;

  if (skillId) {
    filtered = getResourcesForSkill(skillId);
  }

  if (type) {
    filtered = filtered.filter((r) => r.type === type);
  }

  return NextResponse.json({
    resources: filtered,
    total: filtered.length,
  });
}
