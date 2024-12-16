import Link from "next/link";

interface ListUserProps {
  username: string;
  email: string;
}

export default function ListUser({ username, email }: ListUserProps) {
  return (
    <Link
      href={`/users/${username}`}
      className="flex items-start space-x-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600 text-sm">
          {username[0].toUpperCase()}
        </span>
      </div>
      <div className="flex-1">
        <span className="font-semibold text-gray-900">{username}</span>
        <p className="text-gray-800 text-sm leading-relaxed">{email}</p>
      </div>
    </Link>
  );
}
