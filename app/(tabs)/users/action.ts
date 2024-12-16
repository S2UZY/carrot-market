"use server";

import db from "@/lib/db";

export async function getMoreUsers(page: number) {
  const users = await db.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
    skip: page * 6,
    take: 6,
    orderBy: {
      create_at: "desc",
    },
  });
  return users;
}
