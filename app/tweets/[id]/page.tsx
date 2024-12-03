import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import db from "@/lib/db";
import { notFound } from "next/navigation";

interface TweetDetailProps {
  params: { id: string };
}

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      user: true,
      tweet: true,
      create_at: true,
    },
  });

  if (!tweet) notFound();

  return tweet;
}

export default async function TweetDetailPage({ params }: TweetDetailProps) {
  const tweet = await getTweet(Number(params.id));

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex items-center space-x-4">
        <Link
          href="/"
          className="hover:bg-gray-100 rounded-full p-2 transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">트윗</h1>
      </div>
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
                · {formatToTimeAgo(tweet.create_at.toISOString())}
              </span>
            </div>
            {tweet.user.bio && (
              <p className="text-gray-600 text-sm mb-2">{tweet.user.bio}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-900 text-base leading-relaxed">
            {tweet.tweet}
          </p>
        </div>
        <div className="text-gray-500 text-sm mb-4">
          {formatToTimeAgo(tweet.create_at.toISOString())}
        </div>
        <div className="border-t border-b border-gray-200 py-3 flex justify-around">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span>0</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
            <HeartIcon className="h-5 w-5" />
            <span>0</span>
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">댓글</h2>
          <p className="text-gray-500 text-center">아직 댓글이 없습니다.</p>
        </div>
      </div>
    </div>
  );
}
