import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">CodeVerse Home</h1>
      <SignInButton>
        <Button>Login</Button>
      </SignInButton>
    </div>
  );
}
