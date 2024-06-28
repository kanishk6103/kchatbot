import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: google("models/gemini-pro"),
    messages,
  });

  return result.toAIStreamResponse();
}
