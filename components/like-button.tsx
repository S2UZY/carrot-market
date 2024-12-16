"use client";

import { dislikeTweet, likeTweet } from "@/app/(tabs)/tweets/[id]/action";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );

  const onClick = async () => {
    reducerFn(undefined);

    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };

  return (
    <form action={onClick}>
      <button
        className={`flex items-center space-x-2 transition-colors ${
          state.isLiked ? "text-red-500" : "text-gray-500"
        }  hover:text-red-500 `}
      >
        {state.isLiked ? (
          <SolidHeartIcon className="size-5 text-red-500" />
        ) : (
          <OutlineHeartIcon className="size-5" />
        )}
        <span>{state.likeCount}</span>
      </button>
    </form>
  );
}
