import { formatToTimeAgo } from "@/lib/utils";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface ListTweetProps {
  tweet: string;
  id: number;
  create_at: Date;
  update_at: Date;
  user: {
    id: number;
    create_at: Date;
    update_at: Date;
    username: string;
    password: string;
    email: string;
    bio: string | null;
  };
}

export default function ListTweet({
  tweet,
  id,
  create_at,
  user,
}: ListTweetProps) {
  return (
    <Link
      href={`/tweets/${id}`}
      className="flex items-start space-x-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600 text-sm">
          {user.username[0].toUpperCase()}
        </span>
      </div>

      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold text-gray-900">{user.username}</span>
          <span className="text-gray-500 text-sm">
            {formatToTimeAgo(create_at.toString())}
          </span>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed">{tweet}</p>
        <div className="flex items-center space-x-4 mt-2 text-gray-500">
          <button className="hover:text-blue-500 transition-colors">
            <ChatBubbleOvalLeftEllipsisIcon className="size-5" />
          </button>
          <button className="hover:text-red-500 transition-colors">
            <HeartIcon className="size-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
