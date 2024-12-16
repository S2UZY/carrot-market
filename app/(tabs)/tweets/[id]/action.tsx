"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function likeTweet(tweetId: number) {
  const session = await getSession();

  await db.like.create({
    data: {
      tweetId,
      userId: session.id!,
    },
  });
  revalidateTag(`like-status-${tweetId}`);
}

export async function dislikeTweet(tweetId: number) {
  const session = await getSession();

  await db.like.delete({
    where: {
      id: {
        tweetId,
        userId: session.id!,
      },
    },
  });
  revalidateTag(`like-status-${tweetId}`);
}

export async function createComment(payload: string, tweetId: number) {
  const session = await getSession();

  try {
    const comment = await db.comment.create({
      data: {
        payload,
        userId: session.id!,
        tweetId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    revalidateTag(`like-status-${tweetId}`);

    return {
      errors: [],
      success: true,
      comment,
    };
  } catch (error) {
    console.log(error);
    return {
      errors: ["댓글 작성 중 오류가 발생했습니다."],
      success: false,
    };
  }
}
