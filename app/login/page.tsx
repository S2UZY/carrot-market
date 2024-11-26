"use client";

import { useActionState } from "react";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";
import { handleForm } from "./actions";
import {
  EnvelopeIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

export default function LogIn() {
  const [state, action] = useActionState(handleForm, {
    data: null,
    errors: [],
  });

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <FireIcon className="size-24 w-full text-red-400" />
      <form action={action} className="flex flex-col gap-6">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
          icon={EnvelopeIcon}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={[]}
          icon={UserIcon}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
          icon={KeyIcon}
        />
        <FormButton text="Log in" />
      </form>
      {state?.data && <div>로그인 성공 !</div>}
    </div>
  );
}
