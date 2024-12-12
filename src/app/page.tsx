"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/button";
export default function HomePage() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center overflow-y-hidden bg-background text-foreground dark">
        <p>You are not signed in.</p>
        <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 overflow-y-hidden bg-background text-foreground dark">
      <Link href={"/chat"}>
        <Button className="text-xl">Go to the chat page!</Button>
      </Link>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </main>
  );
}
