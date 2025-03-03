import Link from "next/link";
import React from "react";

export default function SignInPanel() {
  return (
    <>
      <Link href={"/auth/signin"}>Sign In</Link>
      <Link href={"/auth/signup"}>Sign Up</Link>
    </>
  );
}
