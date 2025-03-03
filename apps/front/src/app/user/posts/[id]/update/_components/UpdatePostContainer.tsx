"use client";

import PostForm from "@/app/user/create-post/_components/PostForm";
import { saveNewPost, updatePost } from "@/lib/actions/postAction";
import { Post } from "@/lib/types/modelTypes";
import { useActionState } from "react";

type Props = {
  post: Post;
};
export default function UpdatePostContainer({ post }: Props) {
  const [state, action] = useActionState(updatePost, {
    data: {
      postId: post.id,
      title: post.title,
      content: post.content,
      published: post.published ? "on" : undefined,
      tags: post.tags?.map((tag) => tag.name).join(","),
      previousThumbnail: post.thumbnail ?? undefined,
    },
  });

  return <PostForm state={state} formAction={action} />;
}
