import getSession from "@/lib/session";
import { getUserByUsername } from "./action";
import Link from "next/link";
import ListTweet from "@/components/list-tweet";
import Header from "@/components/header";

interface UserProfileProps {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: UserProfileProps) {
  const { username } = await params;
  const user = await getUserByUsername(decodeURIComponent(username));
  const session = await getSession();

  if (!user) {
    return <div className="container mx-auto px-4 py-8">User not found</div>;
  }

  return (
    <>
      <Header title={"유저"} returnPath="/users" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold">{user.email}</h1>
          <p className="text-gray-600">@{user.username}</p>
          <p className="mt-2">{user.bio}</p>

          {session?.id === user.id && (
            <Link
              href={`/users/${user.username}/edit`}
              className="mt-4 inline-block px-4 py-2 primary-btn w-36 rounded-md"
            >
              프로필 수정
            </Link>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Tweets</h2>
          {user.tweets.length === 0 ? (
            <p className="text-gray-500">No tweets yet.</p>
          ) : (
            user.tweets.map((tweet) => (
              <ListTweet user={user} key={tweet.id} {...tweet} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
