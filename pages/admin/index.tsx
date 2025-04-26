import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/posts");
  }, [router]);

  return (
    <Layout title="Admin Dashboard" requireAuth requireAdmin>
      <div className="text-center py-12">Redirecting to admin posts...</div>
    </Layout>
  );
}
