"use client";
import AddComment from "@/app/blog/[slug]/[id]/_components/AddComment";
import CommentCard from "@/app/blog/[slug]/[id]/_components/CommentCard";
import CommentPagination from "@/app/blog/[slug]/[id]/_components/CommentPagination";
import CommentSkeleton from "@/app/blog/[slug]/[id]/_components/CommentSkeleton";
import { getPostComments } from "@/lib/actions/commentAction";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { SessionUser } from "@/lib/session";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  postId: number;
  user?: SessionUser;
};
export default function Comments({ postId, user }: Props) {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async () =>
      await getPostComments({
        postId,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      }),
  });

  const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE);
  console.log(totalPages);

  return (
    <div className="p-2 rounded-md shadow-md">
      <h6 className="text-lg text-slate-700">Comments</h6>
      {!!user && <AddComment user={user} postId={postId} refetch={refetch} />}
      {!!user == false && <p className="font-bold">Please Login To Comment</p>}
      <div className="flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <CommentSkeleton key={index} />
            ))
          : data?.comments.map((cmt) => (
              <CommentCard key={cmt.id} comment={cmt} />
            ))}
      </div>
      {totalPages !== 0 ? (
        <CommentPagination
          className="p-2"
          currentPage={page}
          setCurrentPage={(p) => setPage(p)}
          totalPages={totalPages}
        />
      ) : null}
    </div>
  );
}
