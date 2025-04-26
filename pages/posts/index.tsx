import Layout from "@/components/layout/Layout";
import PostList from "@/components/blog/PostList";

export default function PostsPage() {
  return (
    <Layout title="Blog Posts" requireAuth>
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <PostList />
    </Layout>
  );
}
