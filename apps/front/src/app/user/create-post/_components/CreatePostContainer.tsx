"use client";

import PostForm from "@/app/user/create-post/_components/PostForm";
import { saveNewPost } from "@/lib/actions/postAction";
import { useActionState } from "react";

export default function CreatePostContainer() {
  const [state, action] = useActionState(saveNewPost, undefined);
  return <PostForm state={state} formAction={action} />;
}
