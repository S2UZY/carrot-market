"use client";

import InfiniteScroll from "./infinite-scroll";
import { InitialUsers } from "@/app/(tabs)/users/page";
import { getMoreUsers } from "@/app/(tabs)/users/action";
import ListUser from "./list-user";

interface UserListProps {
  initialUsers: InitialUsers;
}

export default function UserList({ initialUsers }: UserListProps) {
  return (
    <InfiniteScroll
      initialData={initialUsers}
      fetchMoreFn={getMoreUsers}
      renderItem={(user) => <ListUser key={user.id} {...user} />}
    />
  );
}
