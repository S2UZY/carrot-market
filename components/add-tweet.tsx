"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTweet } from "@/app/(tabs)/tweets/action";

const initialState = {
  errors: [],
  success: false,
};

export function AddTweet() {
  const [state, action] = useActionState(createTweet, initialState);
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push(`/tweets/${state.tweetId}`);
    }
  }, [state]);

  return (
    <div className="bg-white p-4 rounded-lg border-b-2 mb-4">
      <form action={action} className="space-y-4">
        <div>
          <textarea
            name="tweet"
            placeholder="새로운 소식이 있나요?"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            rows={3}
          />
          {state.errors && (
            <p className="text-red-500 text-sm mt-1">{state.errors}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={pending}
            className="primary-btn px-4 py-2 rounded-full disabled:opacity-50"
          >
            {pending ? "게시 중..." : " 🔥 소식 남기기"}
          </button>

          {state.success && (
            <div
              className={`
              text-sm 
              ${state.success ? "text-green-500" : "text-red-500"}
            `}
            >
              {state.success ? "트윗을 남겼습니다." : state.errors[0]}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
