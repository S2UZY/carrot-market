"use client";

import { useOptimistic } from "react";
import { AddComment } from "./add-comment";
import { InitalComments } from "@/app/(tabs)/tweets/[id]/page";
import ListComment from "./list-comment";

interface CommentListProps {
  initialComments: InitalComments;
  tweetId: number;
  tweetUsername: string;
  username: string;
}

export function CommentList({
  initialComments,
  tweetId,
  tweetUsername,
  username,
}: CommentListProps) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments,
    (state, newCommentPayload: string) => [
      ...state,
      {
        id: Date.now(),
        payload: newCommentPayload,
        create_at: new Date(),
        update_at: new Date(),
        user: {
          username,
          id: Infinity,
        },
        tweetId,
        userId: Infinity,
      },
    ]
  );

  return (
    <>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">댓글</h2>
        <div className="max-h-[30rem] overflow-y-auto space-y-4">
          {initialComments.length ? (
            optimisticComments.map((comment) => (
              <ListComment
                key={comment.id}
                payload={comment.payload}
                username={comment.user.username}
                create_at={comment.create_at}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">아직 댓글이 없습니다.</p>
          )}
        </div>
      </div>
      <div className="fixed max-w-screen-sm w-full bottom-20 h-20 mx-auto bg-white">
        <AddComment
          tweetId={tweetId}
          username={tweetUsername}
          addOptimisticComment={addOptimisticComment}
        />
      </div>
    </>
  );
}
