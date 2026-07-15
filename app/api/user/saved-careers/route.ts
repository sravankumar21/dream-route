import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { careerId } = await req.json();
  if (!careerId) {
    return NextResponse.json({ error: "careerId required" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const index = user.savedCareers.indexOf(careerId);
  if (index > -1) {
    user.savedCareers.splice(index, 1);
  } else {
    user.savedCareers.push(careerId);
  }
  await user.save();

  return NextResponse.json({ savedCareers: user.savedCareers });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ savedCareers: [] });
  }

  const userId = (session.user as any).id;
  if (!userId) {
    return NextResponse.json({ savedCareers: [] });
  }

  await connectDB();
  const user = await User.findById(userId).select("savedCareers");
  return NextResponse.json({ savedCareers: user?.savedCareers || [] });
}
