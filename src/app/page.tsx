import Link from "next/link";
import { Button } from "@nextui-org/button";
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-y-hidden bg-background text-foreground dark">
      <Button>Hi this is a button</Button>
    </main>
  );
}
