import db from "@/lib/db";

export async function searchTweets(query: string) {
  try {
    const tweets = await db.tweet.findMany({
      where: {
        OR: [
          { tweet: { contains: query } },
          { user: { username: { contains: query } } },
        ],
      },
      include: {
        user: true,
      },
      orderBy: { create_at: "desc" },
    });

    return tweets;
  } catch (error) {
    console.error("Error searching tweets:", error);
    return [];
  }
}
