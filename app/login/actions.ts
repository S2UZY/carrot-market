"use server";
import { z } from "zod";

const hasNumberRegex = new RegExp(/\d+/);

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      (email) => email.includes("@zod.com"),
      "Only @zod.com emails are allowed."
    ),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z
    .string()
    .min(10, "Password should be at least 5 characters long.")
    .regex(
      hasNumberRegex,
      "Password should contain at least one number (123456789)"
    ),
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
