import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { verifyEmail } from "@/lib/api";
import Layout from "@/components/layout/Layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function VerifyPage() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!router.isReady || typeof token !== "string") return;

    (async () => {
      try {
        const data = await verifyEmail(token);
        setStatus("success");
        setMessage(data.message ?? "Email verified successfully!");
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Verification failed");
      }
    })();
  }, [router.isReady, token]);

  return (
    <Layout title="Verify Email">
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-2xl font-bold text-center mb-6">
          Email Verification
        </h1>

        {status === "loading" && (
          <div className="text-center">Verifying your email…</div>
        )}

        {status === "success" && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="text-center mt-6">
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </div>
    </Layout>
  );
}
