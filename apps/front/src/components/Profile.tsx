import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SessionUser } from "@/lib/session";
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";

import Link from "next/link";

type Props = {
  user: SessionUser;
};

export default function Profile({ user }: Props) {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          {user.avatar && (
            <Image
              className="rounded-full w-12 border-2 border-white"
              src={user.avatar}
              width={100}
              height={10}
              alt="ok"
            />
          )}

          {!user.avatar && (
            <AvatarFallback>
              <UserIcon className="w-8 text-slate-500" />
            </AvatarFallback>
          )}
          {/* <Image
            className="rounded-full w-12 border-2 border-white"
            src={user.avatar ?? "/user.png"}
            width={100}
            height={10}
            alt="ok"
          /> */}
          {/* <AvatarFallback>
            <UserIcon className="w-8 text-slate-500" />
          </AvatarFallback> */}
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 [&>*>span]:col-span-4 [&>*:hover]:bg-sky-500 [&>*:hover]:text-white *:transition *:rounded-md [&>*>*:nth-child(1)]:justify-self-end">
          <div className="cursor-default">
            <UserIcon className="w-4" />
            <span>{user.name}</span>
          </div>
          <Link href={"/user/create-post"}>
            <PencilSquareIcon className="w-4" />
            <span>Create New Post</span>
          </Link>
          <Link href={"/user/posts"}>
            <ListBulletIcon className="w-4" />
            <span>Posts</span>
          </Link>
          <a href="/api/auth/signout">
            <ArrowRightStartOnRectangleIcon className="w-4" />
            <span>Sign Out</span>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
