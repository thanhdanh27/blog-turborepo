import Profile from "@/components/Profile";
import SignInPanel from "@/components/signInPanel";
import { getSession } from "@/lib/session";
import Link from "next/link";
import React from "react";

type Props = {};
export default async function Navbar(props: Props) {
  const session = await getSession();
  return (
    <>
      <a href="/" className="text-2xl font-bold p-2 block">
        Modern Blog
      </a>
      <div className="flex flex-col md:flex-row gap-2 ml-auto [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500">
        <Link href="/">Blog</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
        {session && session.user ? (
          <Profile user={session.user} />
        ) : (
          <SignInPanel />
        )}
      </div>
    </>
  );
}
