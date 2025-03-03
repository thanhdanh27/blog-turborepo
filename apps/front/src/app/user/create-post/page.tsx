import CreatePostContainer from "@/app/user/create-post/_components/CreatePostContainer";
import PostForm from "@/app/user/create-post/_components/PostForm";
import React from "react";

export default function CreatePostpage() {
  return (
    <div className="bg-white shadow-md p-6 max-w-2xl w-full">
      <h2 className="text-lg text-center font-bold text-slate-700">
        Create New Post
      </h2>
      <CreatePostContainer />
    </div>
  );
}
