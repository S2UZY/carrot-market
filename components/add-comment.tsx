"use client";

import { ArrowUpCircleIcon } from "@heroicons/react/16/solid";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { commentSchema } from "@/utils/scehma";
import { createComment } from "@/app/(tabs)/tweets/[id]/action";

interface AddCommentProps {
  username: string;
  tweetId: number;
  addOptimisticComment: (newComment: string) => void;
}

export function AddComment({
  username,
  tweetId,
  addOptimisticComment,
}: AddCommentProps) {
  const handleSubmit = async (_: unknown, formData: FormData) => {
    const comment = String(formData.get("comment"));
    const result = await commentSchema.safeParseAsync({ comment });
    console.log(result.error?.message);

    if (result.success) {
      addOptimisticComment(comment);
      createComment(comment, tweetId);
    } else {
      const error = result.error.flatten().fieldErrors.comment;
      return {
        errors: error ? [...error] : [],
        success: false,
      };
    }
  };

  const [state, action] = useActionState(handleSubmit, null);
  const { pending } = useFormStatus();

  return (
    <div className=" w-full pt-4 bg-white border-t">
      <form action={action} className="space-y-4">
        <div className="flex w-full items-start gap-3">
          <div className="w-full">
            <input type="hidden" name="tweetId" value={tweetId} />
            <textarea
              name="comment"
              placeholder={`${username}님에게 댓글 남기기`}
              className="w-full p-2 h-10 border rounded-md focus:outline-blue-500"
              rows={3}
            />
            {state?.errors && (
              <p className={`text-red-500 text-xs leading-[0.5rem]`}>
                {state.errors[0]}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center mt-1">
            <button
              type="submit"
              disabled={pending}
              className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowUpCircleIcon className="size-8" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
