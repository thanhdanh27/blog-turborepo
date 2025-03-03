"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitForm({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? <span className="animate-pulse">Submitting</span> : children}
    </Button>
  );
}
