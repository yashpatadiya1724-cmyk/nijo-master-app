import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const moods = await prisma.mood.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(moods);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch moods" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { score, tags, note } = await req.json();
    if (!score) {
      return NextResponse.json({ error: "Score is required" }, { status: 400 });
    }

    const mood = await prisma.mood.create({
      data: {
        userId: session.user.id,
        score,
        tags: JSON.stringify(tags || []),
        note,
      },
    });

    return NextResponse.json(mood);
  } catch (error) {
    return NextResponse.json({ error: "Failed to log mood" }, { status: 500 });
  }
}
