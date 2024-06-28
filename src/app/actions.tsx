"use server";
import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: google("models/gemini-pro"),
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
