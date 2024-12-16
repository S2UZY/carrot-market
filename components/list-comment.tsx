import { formatToTimeAgo } from "@/lib/utils";

interface ListCommentProps {
  payload: string;
  username: string;
  create_at: Date;
}

export default function ListComment({
  payload,
  username,
  create_at,
}: ListCommentProps) {
  return (
    <div className="flex items-start space-x-3 p-4 border-b border-gray-200 transition-colors duration-200">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600 text-sm">
          {username[0].toUpperCase()}
        </span>
      </div>

      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold text-gray-900">{username}</span>
          <span className="text-gray-500 text-sm">
            {formatToTimeAgo(create_at.toString())}
          </span>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed">{payload}</p>
      </div>
    </div>
  );
}
