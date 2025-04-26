import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { deletePost } from "@/lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Post = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

type PostCardProps = {
  post: Post;
  onDelete?: () => void;
};

export default function PostCard({ post, onDelete }: PostCardProps) {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    if (!user?.token) return;

    try {
      setIsDeleting(true);
      await deletePost(post._id, user.token);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <Card className="h-full flex flex-col bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold leading-tight">
          {post.title}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formattedDate}
        </p>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <p
          className={
            expanded
              ? "whitespace-pre-wrap"
              : "whitespace-pre-wrap line-clamp-4"
          }
        >
          {post.content}
        </p>

        {/* Toggle button only if the content is long enough; quick heuristic */}
        {post.content.length > 200 && (
          <Button
            size="sm"
            variant="link"
            className="px-0"
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Show less" : "Read more"}
          </Button>
        )}
      </CardContent>

      {user?.role === "admin" && (
        <CardFooter className="flex justify-between pt-4 border-t border-gray-200 dark:border-zinc-700">
          <div className="space-x-2">
            <Link href={`/admin/posts/${post._id}/edit`} passHref>
              <Button>Edit</Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                  {isDeleting ? "Deleting…" : "Delete"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
