import { formatToTimeAgo } from "@/lib/utils";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import getSession from "@/lib/session";
import LikeButton from "@/components/like-button";
import { CommentList } from "@/components/comment-list";
import { Prisma } from "@prisma/client";
import Header from "@/components/header";

interface TweetDetailProps {
  params: Promise<{ id: string }>;
}

async function getTweet(id: number) {
  const tweet = await db.tweet.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  return tweet;
}

async function getComments(tweetId: number) {
  try {
    const comments = await db.comment.findMany({
      where: { tweetId },
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });

    return comments;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const getCachedTweet = nextCache(getTweet, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getUsername() {
  const session = await getSession();

  const user = await db.user.findUnique({
    where: {
      id: session.id!,
    },
  });

  return user?.username;
}

export type InitalComments = Prisma.PromiseReturnType<typeof getComments>;

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });

  return cachedOperation(tweetId, session.id!);
}

async function getCachedComment(tweetId: number) {
  const cachedOperation = nextCache(getComments, ["tweet-comment-status"], {
    tags: [`comment-status-${tweetId}`],
  });

  return cachedOperation(tweetId);
}

export default async function TweetDetailPage({ params }: TweetDetailProps) {
  const { id } = await params;
  const tweetId = Number(id);
  const tweet = await getCachedTweet(tweetId);
  const username = await getUsername();

  if (!tweet || !username) return notFound();

  const { likeCount, isLiked } = await getCachedLikeStatus(tweetId);
  const comments = await getCachedComment(tweetId);

  return (
    <div className="min-h-screen bg-white">
      <Header title={"트윗"} returnPath="/" />
      <div className="p-4">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-lg font-semibold">
              {tweet.user.username[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-bold text-gray-900">
                {tweet.user.username}
              </span>
              <span className="text-gray-500 text-sm">
                · {formatToTimeAgo(tweet.create_at.toString())}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-900 text-base leading-relaxed">
            {tweet.tweet}
          </p>
        </div>
        <div className="text-gray-500 text-sm mb-4">
          {formatToTimeAgo(tweet.create_at.toString())}
        </div>
        <div className="border-t border-b border-gray-200 py-3 flex justify-around">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span>{comments.length}</span>
          </button>
          <LikeButton
            isLiked={isLiked}
            likeCount={likeCount}
            tweetId={tweetId}
          />
        </div>
        <CommentList
          initialComments={comments}
          tweetId={tweet.id}
          username={username}
          tweetUsername={tweet.user.username}
        />
      </div>
    </div>
  );
}
