"use client";

import { useFormStatus } from "react-dom";
import { createTweet } from "./action";
import { useActionState } from "react";

const initialState = {
  errors: [],
  success: false,
};

export function AddTweet() {
  const [state, action] = useActionState(createTweet, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <form action={action} className="space-y-4">
        <div>
          <textarea
            name="tweet"
            placeholder="무슨 일이 있나요?"
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
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
          >
            {pending ? "게시 중..." : "트윗"}
          </button>

          {state.success && (
            <p
              className={`
              text-sm 
              ${state.success ? "text-green-500" : "text-red-500"}
            `}
            >
              {state.success ? "성공" : state.errors[0]}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
