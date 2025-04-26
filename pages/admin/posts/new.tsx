import Layout from "@/components/layout/Layout";
import PostForm from "@/components/blog/PostForm";

export default function NewPostPage() {
  return (
    <Layout title="Create New Post" requireAuth requireAdmin>
      <h1 className="text-3xl font-bold mb-8 text-center">
        Create New Blog Post
      </h1>
      <PostForm />
    </Layout>
  );
}
