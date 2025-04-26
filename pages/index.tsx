import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/posts");
    }
  }, [user, router]);

  return (
    <Layout title="Blog Platform - Home">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Our Blog Platform
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Share your thoughts and read interesting articles from other users.
        </p>

        <div className="flex gap-4">
          <Button size="lg" onClick={() => router.push("/signup")}>
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </Layout>
  );
}
