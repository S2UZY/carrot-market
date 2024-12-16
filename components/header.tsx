import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

interface HeaderProps {
  title: string;
  returnPath?: string;
}

export default function Header({ title, returnPath }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex items-center space-x-4">
      {returnPath && (
        <Link
          href={returnPath}
          className="hover:bg-gray-100 rounded-full p-2 transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
        </Link>
      )}
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}
