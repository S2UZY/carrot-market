import db from "@/lib/db";

export async function getUserByUsername(username: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        tweets: {
          orderBy: { create_at: "desc" },
        },
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
