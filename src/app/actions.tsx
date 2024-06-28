"use server";
import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/server/db";

export async function continueConversation(
  messages: CoreMessage[],
  chatId: number | null,
) {
  console.log(messages);
  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1];
    // Saving user message
    await db.singleMessage.create({
      data: {
        sentBy: lastMessage!.role === "user" ? "user" : "assistant",
        content: lastMessage!.content,
        chatId,
      },
    });
  }
  const result = await streamText({
    model: google("models/gemini-pro"),
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

export async function getMessages(chatId: number) {
  const messages = await db.singleMessage.findMany({
    where: { chatId },
    orderBy: { createdAt: "asc" },
  });
  return messages;
}

export async function createNewChat() {
  const chat = await db.chat.create({ data: {} });
  return chat.id;
}
