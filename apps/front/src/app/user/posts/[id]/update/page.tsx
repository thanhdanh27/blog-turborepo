import UpdatePostContainer from "@/app/user/posts/[id]/update/_components/UpdatePostContainer";
import { fetchPostById } from "@/lib/actions/postAction";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UpdatePostPage(props: Props) {
  const { id } = await props.params;
  const post = await fetchPostById(parseInt(id));
  return (
    <div className="bg-white shadow-md p-6 max-w-2xl w-full">
      <h2 className="text-lg text-center font-bold text-slate-700">
        Update Your Post
      </h2>
      <UpdatePostContainer post={post} />
    </div>
  );
}
