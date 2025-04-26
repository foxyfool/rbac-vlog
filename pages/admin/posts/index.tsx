import Link from "next/link";
import Layout from "@/components/layout/Layout";
import PostList from "@/components/blog/PostList";
import { Button } from "@/components/ui/button";

export default function AdminPostsPage() {
  return (
    <Layout title="Manage Posts" requireAuth requireAdmin>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Link href="/admin/posts/new" passHref>
          <Button>Create New Post</Button>
        </Link>
      </div>
      <PostList />
    </Layout>
  );
}
