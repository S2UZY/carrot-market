"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      (email) => email.includes("@zod.com"),
      "Only @zod.com emails are allowed."
    ),
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
});

export async function handleForm(prevState: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    };
  } else {
    return {
      success: true,
    };
  }
}
