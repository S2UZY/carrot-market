"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      create_at: true,
      update_at: true,
      likes: true,
      user: true,
      tweet: true,
    },
    skip: page * 6,
    take: 6,
    orderBy: {
      create_at: "desc",
    },
  });

  return tweets;
}

const tweetSchema = z.object({
  tweet: z
    .string()
    .min(1, { message: "트윗 내용은 최소 1자 이상이어야 합니다." })
    .max(280, { message: "트윗은 최대 280자까지 작성할 수 있습니다." }),
});

export async function createTweet(prevState: unknown, formData: FormData) {
  const validatedFields = await tweetSchema.spa({
    tweet: formData.get("tweet"),
  });

  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors.tweet;
    return {
      errors: error ? [...error] : [],
      success: false,
    };
  }

  const session = await getSession();

  if (!session?.id) {
    return {
      errors: ["로그인이 필요합니다."],
      success: false,
    };
  }

  const tweet = await db.tweet.create({
    data: {
      tweet: validatedFields.data.tweet,
      userId: session.id,
    },
  });

  return {
    errors: [],
    success: true,
    tweetId: tweet.id,
  };
}
