"use client";
import SubmitForm from "@/components/SubmitForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostFormState } from "@/lib/types/formState";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
};

export default function PostForm({ state, formAction }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const isInvalidImage = (url?: string | null) =>
    !url || url === "" || url.includes("undefined");
  const imageSrc = !isInvalidImage(imageUrl)
    ? imageUrl
    : !isInvalidImage(state?.data?.previousThumbnail)
      ? state?.data?.previousThumbnail
      : "/no-image.png";
  useEffect(() => {
    if (state?.message)
      toast(`${state?.ok ? "Success!" : "Oops!"}`, {
        description: state?.message,
        action: {
          label: "x",
          onClick: () => console.log("Undo"),
        },
      });
    else if (state?.errors) {
      toast("Oops!", {
        description: "Oops, SomeThing Went Wrong",
        action: {
          label: "x",
          onClick: () => console.log("Undo"),
        },
      });
    }
  }, [state]);
  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.data?.postId !== undefined ? (
        <input hidden name="postId" defaultValue={state?.data?.postId} />
      ) : null}
      {/* <input name="postId" defaultValue={state?.data?.postId} /> */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          placeholder="Enter The Title of Your Post"
          defaultValue={state?.data?.title}
        />
        {!!state?.errors?.title && (
          <p className="text-red-500 animate-shake">{state.errors.title}</p>
        )}
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="Write Your Post Content Here"
          rows={6}
          defaultValue={state?.data?.content}
        />
        {!!state?.errors?.content && (
          <p className="text-red-500 animate-shake">{state.errors.content}</p>
        )}
      </div>

      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files)
              setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
        {!!state?.errors?.thumbnail && (
          <p className="text-red-500 animate-shake">{state.errors.thumbnail}</p>
        )}
        {(!!imageUrl || !!state?.data?.previousThumbnail) && (
          <Image
            src={imageSrc ?? ""}
            alt="post thumbnail"
            width={200}
            height={150}
          />
        )}
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          name="tags"
          placeholder="Enter tags"
          defaultValue={state?.data?.tags}
        />
        {!!state?.errors?.tags && (
          <div>
            <p className="text-red-500 animate-shake">{state.errors.tags[0]}</p>
            <p className="text-red-500 animate-shake">{state.errors.tags[1]}</p>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          className="w-4 h-4"
          type="checkbox"
          name="published"
          defaultChecked={state?.data?.published === "on" ? true : false}
        />
        <Label htmlFor="published" className="mx-1">
          Published Now
        </Label>
      </div>

      <SubmitForm>Save</SubmitForm>
    </form>
  );
}
