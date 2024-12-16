import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";

export const commentSchema = z.object({
  comment: z
    .string()
    .min(1, { message: "댓글 내용은 최소 1자 이상이어야 합니다." })
    .max(180, { message: "댓글은 최대 180자까지 작성할 수 있습니다." }),
});

export const profileUpdateSchema = z
  .object({
    email: z
      .string()
      .email()
      .toLowerCase()
      .trim()
      .refine(
        (email) => email.includes("@zod.com"),
        "Only @zod.com emails are allowed."
      ),
    username: z
      .string()
      .toLowerCase()
      .trim()
      .min(
        USERNAME_MIN_LENGTH,
        `Username should be at least ${USERNAME_MIN_LENGTH} characters long.`
      ),
    bio: z.string().max(160, "Bio must be 160 characters or less").optional(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });

    if (user && user.username !== username) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    if (user && user.email !== email) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

export const passwordChangeSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Password should be at least ${PASSWORD_MIN_LENGTH} characters long.`
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });
