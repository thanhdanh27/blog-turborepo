"use client";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { deletePost, fetchPostById } from "@/lib/actions/postAction";
import { redirect } from "next/navigation";
import SubmitForm from "@/components/SubmitForm";
import { useState } from "react";
import { useRouter } from "next/router";

type Props = {
  postId: number;
};

export default function PostAction({ postId }: Props) {
  console.log(postId);
  // const formAction = async (formData: FormData) => {
  //   "use server";
  //   await deletePost(+postId);
  //   redirect("/user/posts");
  // };
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const deleted = await deletePost(postId);
    if (deleted) {
      // Reload web
      window.location.reload();

      // Hoặc chuyển trang
      // navigate("/your-target-url");
    } else {
      console.error("Failed to delete post");
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <Link
        href={`/user/posts/${postId}/update`}
        className="border p-2 border-yellow-500 rounded-md text-yellow-500 hover:border-yellow-700 hover:text-yellow-700 transition-colors"
      >
        <PencilIcon className="w-4" />
      </Link>

      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="border cursor-pointer p-2 border-yellow-500 rounded-md text-yellow-500 hover:border-yellow-700 hover:text-yellow-700 transition-colors"
      >
        <TrashIcon className="w-4" />
      </div>

      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete This Post!</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <SubmitForm onClick={handleDelete}>Delete</SubmitForm>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
