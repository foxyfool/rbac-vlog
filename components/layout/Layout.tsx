import Head from "next/head";
import Header from "./Header";
import { useAuth } from "@/contexts/AuthContext";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  requireAuth?: boolean;
  requireAdmin?: boolean;
};

export default function Layout({
  children,
  title = "Blog Platform",
  requireAuth = false,
  requireAdmin = false,
}: LayoutProps) {
  const { user, loading } = useAuth();

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p className="mb-4">Please log in to access this page.</p>
        <a href="/login" className="text-blue-600 hover:underline">
          Go to Login
        </a>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
        <p className="mb-4">You need to be an admin to access this page.</p>
        <a href="/posts" className="text-blue-600 hover:underline">
          Go to Posts
        </a>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Blog platform with authentication" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="py-4">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Blog Platform. All rights
            reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
