import { EditProfileForm } from "@/components/edit-profile-form";
import Header from "@/components/header";
import db from "@/lib/db";
import { notFound } from "next/navigation";

async function getUser(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getUser(username);

  if (!user) {
    return notFound();
  }

  return (
    <div className="container mx-auto">
      <Header title={"프로필 수정"} returnPath={`/users/${username}`} />
      <EditProfileForm user={user} />
    </div>
  );
}
