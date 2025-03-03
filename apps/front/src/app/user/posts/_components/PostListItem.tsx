import PostAction from "@/app/user/posts/_components/PostAction";

import { Post } from "@/lib/types/modelTypes";
import { CheckIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

type Props = {
  posts: Post;
};

export default function PostListItem({ posts }: Props) {
  const thumbnail = posts.thumbnail;
  const isInvalidImage = !thumbnail || thumbnail.includes("undefined");
  return (
    <div className="grid grid-cols-8 m-2 rounded-md overflow-hidden shadow border hover:scale-[101%] transition text-center bg-white">
      <div className="relative w-40 h-32">
        <Image
          src={isInvalidImage ? "/no-image.png" : thumbnail}
          alt={posts.title}
          fill
        />
      </div>
      <div className="flex flex-col gap-2 col-span-2">
        <p className="text-lg line-clamp-1 px-2 text-slate-700">
          {posts.title}
        </p>
        <p className="text-sm line-clamp-3 px-1 text-slate-500">
          {posts.content}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <p>{new Date(posts.createdAt).toLocaleDateString("en-GB")}</p>
      </div>

      <div className="flex justify-center items-center">
        {posts.published && <CheckIcon className="w-5" />}
      </div>

      <div className="flex justify-center items-center">
        {posts._count.likes}
      </div>
      <div className="flex justify-center items-center">
        {posts._count.comments}
      </div>
      <PostAction postId={posts.id} />
    </div>
  );
}
