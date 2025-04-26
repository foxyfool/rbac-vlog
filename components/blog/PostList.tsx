import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getPosts } from "@/lib/api";
import PostCard from "./PostCard";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Post = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  async function fetchPosts() {
    if (!user?.token) return;

    try {
      setLoading(true);
      const data = await getPosts(user.token);
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [user]);

  if (loading) {
    return <div className="text-center py-10">Loading posts...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (posts.length === 0) {
    return <div className="text-center py-10">No posts available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onDelete={fetchPosts} />
      ))}
    </div>
  );
}
