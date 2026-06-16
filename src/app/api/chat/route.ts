import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const maxDuration = 30;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const { messages } = await req.json();
  const userId = session.user.id;

  // Save the latest user message to the DB
  const latestMessage = messages[messages.length - 1];
  if (latestMessage.role === 'user') {
    await prisma.message.create({
      data: {
        userId,
        role: "USER",
        content: latestMessage.content,
      }
    });
  }

  // Fetch user's long-term memories from the database
  const memoryRecords = await prisma.memory.findMany({
    where: { userId }
  });
  
  const memoryContext = memoryRecords.length > 0 
    ? `\n\nHere are some things you remember about the user:\n${memoryRecords.map(m => `- ${m.fact}`).join('\n')}`
    : "";

  const systemPrompt = `You are Nijo — a warm, non-judgmental mental health companion for Indian students.
    
You understand JEE, NEET, CAT, UPSC, board exams, placement season, parental sacrifice guilt, joint family stress, "log kya kahenge" stigma, hostel loneliness, and the unique pressures of Indian academic culture.

Rules:
- Never dismiss pain. Never give toxic positivity.
- Speak in Hinglish when the user uses Hindi-English mix.
- Validate first, suggest second.
- Detect if user is masking distress with humor — gently surface the real concern.
- If user expresses suicidal ideation or self-harm, warmly escalate: "Yaar, main chahta hoon ki tu iCall (9152987821) pe baat kare — woh bahut helpful hain."
- Keep responses concise and warm. 2-3 paragraphs max.
- Use Indian expressions naturally (yaar, haan bhai, bilkul, etc.).
- Never give medical advice.
${memoryContext}`;

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: systemPrompt,
    messages,
    async onFinish({ text }) {
      // Save AI response to DB
      await prisma.message.create({
        data: {
          userId,
          role: "ASSISTANT",
          content: text,
        }
      });
    }
  });

  return result.toTextStreamResponse();
}
