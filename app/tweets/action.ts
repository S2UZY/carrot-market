"use server";

import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      create_at: true,
      update_at: true,
      Like: true,
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
