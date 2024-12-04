"use server";

import { z } from "zod";

import db from "@/lib/db";
import getSession from "@/lib/session";

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

  await db.tweet.create({
    data: {
      tweet: validatedFields.data.tweet,
      userId: session.id,
    },
  });

  return {
    errors: [],
    success: true,
  };
}
