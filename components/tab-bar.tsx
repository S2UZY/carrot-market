"use client";

import {
  ChatBubbleLeftRightIcon as SolidTweetsIcon,
  MagnifyingGlassIcon as SolidSearchIcon,
  UserGroupIcon as SolidUserGroupIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  ChatBubbleLeftRightIcon as OutlineTweetsIcon,
  MagnifyingGlassIcon as OutlineSearchIcon,
  UserGroupIcon as OutlineUserGroupIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-sm grid grid-cols-4 border-gray-200 border-t px-5 py-3 *:text-neutral-800 bg-white">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === "/" ? (
          <SolidTweetsIcon className="w-7 h-7" />
        ) : (
          <OutlineTweetsIcon className="w-7 h-7" />
        )}
        <span>Tweets</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-px">
        {pathname === "/search" ? (
          <SolidSearchIcon className="w-7 h-7" />
        ) : (
          <OutlineSearchIcon className="w-7 h-7" />
        )}
        <span>Search</span>
      </Link>
      <Link href="/users" className="flex flex-col items-center gap-px">
        {pathname === "/users" ? (
          <SolidUserGroupIcon className="w-7 h-7" />
        ) : (
          <OutlineUserGroupIcon className="w-7 h-7" />
        )}
        <span>Users</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>you</span>
      </Link>
    </div>
  );
}
