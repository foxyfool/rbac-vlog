import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { fetcher } from "@/lib/api";
import Layout from "@/components/layout/Layout";
import PostForm from "@/components/blog/PostForm";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id || !user?.token) return;

      try {
        setLoading(true);
        const data = await fetcher(`/api/posts/${id}`, { token: user.token });
        setPost(data);
      } catch (err) {
        //@ts-ignore
        setError(err instanceof Error ? err.message : "Failed to load post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id && user) {
      fetchPost();
    }
  }, [id, user]);

  if (loading) {
    return (
      <Layout title="Edit Post" requireAuth requireAdmin>
        <div className="text-center py-12">Loading post...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Edit Post" requireAuth requireAdmin>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => router.push("/admin/posts")}
          >
            Back to Posts
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Post" requireAuth requireAdmin>
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Blog Post</h1>
      {post && (
        <PostForm
          postId={id as string}
          initialData={{
            //@ts-ignore
            title: post.title,content: post.content,
          }}
        />
      )}
    </Layout>
  );
}
