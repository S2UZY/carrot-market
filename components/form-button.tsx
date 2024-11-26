"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="h-14 w-full bg-neutral-200  font-medium  rounded-3xl text-center hover:bg-neutral-300 transition-colors disabled:bg-neutral-300  disabled:text-neutral-400 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
