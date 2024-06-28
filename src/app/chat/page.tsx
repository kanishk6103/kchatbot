"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useChat } from "ai/react";
import Bubble from "../components/Bubble";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="mx-auto flex w-full flex-col items-center gap-5 overflow-y-auto px-24 py-24">
      {messages.map((singleMessage) => {
        return <Bubble message={singleMessage} key={singleMessage.id} />;
      })}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 mb-8 flex w-full max-w-2xl items-center gap-2 rounded"
      >
        <Input
          type="text"
          className=""
          value={input}
          placeholder="Ask anything..."
          variant="bordered"
          size="md"
          onChange={handleInputChange}
        />
        <Button type="submit" size="md">
          Submit
        </Button>
      </form>
    </div>
  );
}
