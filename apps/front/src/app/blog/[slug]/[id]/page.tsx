import Comments from "@/app/blog/[slug]/[id]/_components/Comments";
import LikePost from "@/app/blog/[slug]/[id]/_components/LikePost";
import SanitizedContent from "@/app/blog/[slug]/[id]/_components/SanitizedContent";
import { fetchPostById } from "@/lib/actions/postAction";
import { getSession } from "@/lib/session";
import Image from "next/image";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await fetchPostById(+id);
  const session = await getSession();
  const thumbnail = post.thumbnail;

  const isInvalidImage = !thumbnail || thumbnail.includes("undefined");

  return (
    <main className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-4 text-slate-700">{post.title}</h1>
      <p className="text-slate-500 text-sm mb-4">
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="relative w-80 h-60">
        <Image
          src={isInvalidImage ? "/no-image.png" : thumbnail}
          alt={post.title}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <SanitizedContent content={post.content} />
      <LikePost postId={post.id} user={session?.user} />
      <Comments user={session?.user} postId={post.id} />
    </main>
  );
}
