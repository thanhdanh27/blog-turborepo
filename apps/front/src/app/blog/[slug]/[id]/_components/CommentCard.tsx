import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CommentEntity } from "@/lib/types/modelTypes";
import { UserIcon } from "@heroicons/react/16/solid";
import { AvatarFallback } from "@radix-ui/react-avatar";

type Props = {
  comment: CommentEntity;
};
export default function CommentCard({ comment }: Props) {
  return (
    <div className="p-2 shadow rounded">
      <div className="flex gap-2 text-slate-500 items-center">
        <Avatar className="border-2">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>
            <UserIcon className="w-8" />
          </AvatarFallback>
        </Avatar>
        <div className="flex justify-center items-center">
          <p>{comment.author.name} |</p>
          <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <p className="mt-4">{comment.content}</p>
    </div>
  );
}
