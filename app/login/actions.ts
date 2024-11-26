"use server";

interface FormState {
  data: {
    message: string;
  } | null;
  errors: string[] | null;
}

export async function handleForm(prevState: FormState, formData: FormData) {
  const password = formData.get("password");

  if (password === "1234")
    return {
      data: {
        message: "성공",
      },
      errors: null,
    };

  return {
    data: null,
    errors: ["wrong password"],
  };
}
