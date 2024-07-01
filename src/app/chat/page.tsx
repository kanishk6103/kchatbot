"use client";
import { type CoreMessage } from "ai";
import { useEffect, useState } from "react";
import { continueConversation, getMessages, handleFeedback } from "../actions";
import { readStreamableValue } from "ai/rsc";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Bubble, {
  type CoreMessageWithIDandFeedback,
} from "../components/Bubble";
import { useRef } from "react";
// import { Textarea } from "@nextui-org/react";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Chat() {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [messages, setMessages] = useState<CoreMessageWithIDandFeedback[]>([]);
  const [input, setInput] = useState<string>("");
  // const { messages, input, handleInputChange, handleSubmit } = useChat();
  useEffect(() => {
    async function fetchMessages() {
      const previousMessages = await getMessages();
      setMessages(
        previousMessages.map((msg) => ({
          id: msg.id,
          content: msg.content,
          role: msg.sentBy === "user" ? "user" : "assistant",
          feedback: msg.feedback,
        })),
      );
    }
    fetchMessages()
      .then(() => {
        console.log("fetched");
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFeedbackChange = async (id: number, feedback: boolean) => {
    await handleFeedback(feedback, id);
    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === id ? { ...msg, feedback } : msg)),
    );
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center gap-5 overflow-y-auto px-24 py-24">
      {messages.map((singleMessage: CoreMessage, index) => {
        return (
          <Bubble
            message={singleMessage as CoreMessageWithIDandFeedback}
            onFeedbackChange={handleFeedbackChange}
            key={index}
          />
        );
      })}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (input.trim() === "") return;
          // append a new message with the role of user with the content from user
          let lastMessage = null;
          if (messages.length > 0) {
            lastMessage = messages[messages.length - 1];
          }
          let msg_id = 1;
          if (lastMessage) {
            msg_id = lastMessage.id;
          }
          const newMessages: CoreMessageWithIDandFeedback[] = [
            ...messages,
            {
              id: msg_id,
              content: input.trim(),
              role: "user",
              feedback: null,
            },
          ];
          setMessages(newMessages);
          setInput("");
          const res = await continueConversation(newMessages);
          for await (const content of readStreamableValue(res)) {
            setMessages([
              ...newMessages,
              {
                id: msg_id + 2 ?? 2,
                role: "assistant",
                content: content!,
                feedback: null,
              },
            ]);
          }
          console.log("messages here: ", messages);
        }}
        className="fixed bottom-0 mb-8 flex w-full max-w-2xl items-center gap-2 rounded-xl bg-white"
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
      <div ref={messagesEndRef} />
    </div>
  );
}
