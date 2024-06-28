"use client";
import { type CoreMessage } from "ai";
import { useEffect, useState } from "react";
import { continueConversation, getMessages, createNewChat } from "../actions";
import { readStreamableValue } from "ai/rsc";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Bubble from "../components/Bubble";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      let id = chatId;
      if (!id) {
        id = await createNewChat();
        setChatId(id);
      }
      const previousMessages = await getMessages(id);
      setMessages(
        previousMessages.map((msg) => ({
          content: msg.content,
          role: msg.sentBy === "user" ? "user" : "assistant",
        })),
      );
    }
    fetchMessages();
  }, [chatId]);

  return (
    <div className="mx-auto flex w-full flex-col items-center gap-5 overflow-y-auto px-24 py-24">
      {messages.map((singleMessage: CoreMessage, index) => {
        return <Bubble message={singleMessage} key={index} />;
      })}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const newMessages: CoreMessage[] = [
            ...messages,
            { content: input, role: "user" },
          ];
          setMessages(newMessages);
          setInput("");
          const res = await continueConversation(newMessages, chatId);

          for await (const content of readStreamableValue(res)) {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                role: "assistant",
                content: content as string,
              },
            ]);
          }
        }}
        className="fixed bottom-0 mb-8 flex w-full max-w-2xl items-center gap-2 rounded"
      >
        <Input
          type="text"
          className=""
          value={input}
          placeholder="Ask anything..."
          variant="bordered"
          size="md"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" size="md" variant="ghost">
          Submit
        </Button>
      </form>
    </div>
  );
}
