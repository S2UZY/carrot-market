import { AddTweet } from "@/components/add-tweet";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Header from "@/components/header";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      create_at: true,
      update_at: true,
      likes: true,
      user: true,
      tweet: true,
    },
    take: 6,
    orderBy: {
      create_at: "desc",
    },
  });

  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Tweets() {
  const initialTweets = await getInitialTweets();

  return (
    <div>
      <Header title={"트윗"} />
      <AddTweet />
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
