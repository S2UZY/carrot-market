"use client";

import { InitialTweets } from "@/app/(tabs)/page";
import { getMoreTweets } from "@/app/(tabs)/tweets/action";
import ListTweet from "./list-tweet";
import InfiniteScroll from "./infinite-scroll";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  return (
    <InfiniteScroll
      initialData={initialTweets}
      fetchMoreFn={getMoreTweets}
      renderItem={(tweet) => <ListTweet key={tweet.id} {...tweet} />}
    />
  );
}
