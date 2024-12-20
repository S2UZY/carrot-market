"use server";
import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const getUserId = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return user?.id;
};

const formSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(
        USERNAME_MIN_LENGTH,
        `Username should be at least ${USERNAME_MIN_LENGTH} characters long.`
      ),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Password should be at least ${PASSWORD_MIN_LENGTH} characters long.`
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .superRefine(async ({ email, username, password }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
      },
    });

    if (!user) {
      ctx.addIssue({
        code: "custom",
        message: "An account with this email does not exist.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }

    if (user.username !== username) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid username",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid password",
        path: ["password"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function logIn(prevState: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const id = await getUserId(data.email as string);
    session.id = id;
    await session.save();
    redirect("/");
  }
}
