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
    const messages = await prisma.message.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
      take: 100, // Load last 100 messages for context
    });

    // Format for AI SDK
    const formattedMessages = messages.map(msg => ({
      id: msg.id,
      role: msg.role === "USER" ? "user" : "assistant",
      content: msg.content,
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
