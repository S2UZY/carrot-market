"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { passwordChangeSchema, profileUpdateSchema } from "@/utils/scehma";
import { compare, hash } from "bcrypt";
import { redirect } from "next/navigation";

export async function updateUserProfile(
  prevState: unknown,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    bio: formData.get("bio"),
  };

  const validatedData = await profileUpdateSchema.spa(data);
  const session = await getSession();

  if (!validatedData.success) {
    return validatedData.error.flatten().fieldErrors;
  }

  const updatedUser = await db.user.update({
    where: { id: session.id },
    data: {
      username: validatedData.data.username,
      email: validatedData.data.email,
      bio: validatedData.data.bio,
    },
  });

  redirect(`/users/${updatedUser.username}`);
}

export async function changePassword(prevState: unknown, formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { confirm_password: ["Not authenticated"] };
  }

  const data = {
    current_password: formData.get("current_password"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await passwordChangeSchema.spa(data);

  if (!result.success) {
    return result.error.flatten().fieldErrors;
  }

  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user || !(await compare(result.data.current_password, user.password))) {
    return { current_password: ["Current password is incorrect"] };
  }

  const hashedPassword = await hash(result.data.password, 12);

  const updatedUser = await db.user.update({
    where: { id: session.id },
    data: { password: hashedPassword },
  });

  redirect(`/users/${updatedUser.username}`);
}
