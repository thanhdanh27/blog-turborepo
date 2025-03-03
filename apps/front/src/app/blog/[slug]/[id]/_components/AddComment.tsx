"use client";
import SubmitForm from "@/components/SubmitForm";
import { saveComment } from "@/lib/actions/commentAction";
import { SessionUser } from "@/lib/session";
import { CommentEntity } from "@/lib/types/modelTypes";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import React, { useActionState, useEffect } from "react";
type Props = {
  user: SessionUser;
  postId: number;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[];
        count: number;
      },
      Error
    >
  >;
};
export default function AddComment({ user, postId, refetch }: Props) {
  const [state, action] = useActionState(saveComment, undefined);
  useEffect(() => {
    if (state?.ok) refetch();
  }, [state]);
  return (
    <div>
      <p>
        Add Comments by <span className="font-bold">{user.name}</span>
      </p>
      <form action={action}>
        <div className="border-b-2 border-b-slate-300 mb-4 w-1/2">
          <input hidden name="postId" defaultValue={postId} />
          <input
            name="content"
            placeholder="Write comments"
            className="block w-full outline-none"
            type="text"
          />
        </div>
        <SubmitForm>Submit</SubmitForm>
      </form>
    </div>
  );
}
