import db from "@/lib/db";
import getSession from "@/lib/session";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/welcome");
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Profile</h1>
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome, {user?.username}!
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600 flex items-center gap-2">
                <EnvelopeIcon className="size-5" />
                {user?.email}
              </p>
              {user?.bio && <p className="text-gray-600 italic">{user.bio}</p>}
              <p className="text-gray-500 text-sm">
                Joined on {user?.create_at.toDateString()}
              </p>
            </div>
          </div>
          <form action={logOut}>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
            >
              <span>Log out</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
