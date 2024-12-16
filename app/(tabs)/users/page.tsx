import Header from "@/components/header";
import UserList from "@/components/user-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialUsers() {
  const users = await db.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
    take: 6,
    orderBy: {
      create_at: "desc",
    },
  });

  return users;
}

export type InitialUsers = Prisma.PromiseReturnType<typeof getInitialUsers>;

export default async function Tweets() {
  const initialUsers = await getInitialUsers();
  return (
    <div>
      <Header title={"유저"} />
      <UserList initialUsers={initialUsers} />
    </div>
  );
}
