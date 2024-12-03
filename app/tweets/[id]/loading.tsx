import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function TweetDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex items-center space-x-4">
        <Link
          href="/"
          className="hover:bg-gray-100 rounded-full p-2 transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-300" />
        </Link>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>

      <div className="p-4">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/6"></div>
            </div>

            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
          </div>
        </div>

        <div className="mb-4">
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>

        <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>

        <div className="border-t border-b border-gray-200 py-3 flex justify-around">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-6 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-6 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
