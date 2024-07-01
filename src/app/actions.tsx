"use server";
import { createStreamableValue } from "ai/rsc";
import { type CoreMessage, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/server/db";

export async function continueConversation(messages: CoreMessage[]) {
  // console.log(messages);

  // await db.chat.create({
  //   data: {
  //     messages: messages,
  //   },
  // });

  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1];
    // Saving user message
    await db.singleMessage.create({
      data: {
        sentBy: lastMessage!.role === "user" ? "user" : "assistant",
        content: lastMessage!.content as string,
      },
    });
  }

  const result = await streamText({
    model: google("models/gemini-pro"),
    messages,
    async onFinish({ text }) {
      await storeAIMessage(text);
    },
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

export async function storeAIMessage(content: string) {
  await db.singleMessage.create({
    data: {
      sentBy: "assistant",
      content: content,
    },
  });
  return;
}

export async function getMessages() {
  const messages = await db.singleMessage.findMany({
    where: {},
    orderBy: { createdAt: "asc" },
  });
  console.log("messages are here: ", messages);
  return messages;
}

export async function handleFeedback(feedback: boolean, id: number) {
  // if it is a like
  console.log(feedback, id);
  if (feedback) {
    await db.singleMessage.update({
      where: {
        id: id,
      },
      data: {
        feedback: true,
      },
    });
  } else
    await db.singleMessage.update({
      where: {
        id: id,
      },
      data: {
        feedback: false,
      },
    });
}
