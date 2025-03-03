import SignInForm from "@/app/auth/signin/_components/signInForm";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/constants";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
  return (
    <div className="bg-white p-8 border rounded-md gap-3 w-96 flex flex-col justify-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
      <SignInForm />
      <Link className="text-center" href={"/auth/forgot"}>
        Forgot Your Password?
      </Link>
      <Button className="p-0">
        <a className="block w-full" href={`${BACKEND_URL}/auth/google/login`}>
          Sign In With Google
        </a>
      </Button>
    </div>
  );
}
