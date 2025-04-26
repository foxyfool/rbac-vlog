import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              Blog Platform
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/posts"
                  className={`${
                    router.pathname === "/posts" ? "text-blue-600" : ""
                  }`}
                >
                  Posts
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/admin/posts"
                    className={`${
                      router.pathname.startsWith("/admin")
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    Admin Dashboard
                  </Link>
                )}

                <div className="ml-4 flex items-center space-x-2">
                  <span className="text-sm">
                    {user.name} ({user.role})
                  </span>
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`${
                    router.pathname === "/login" ? "text-blue-600" : ""
                  }`}
                >
                  Login
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
