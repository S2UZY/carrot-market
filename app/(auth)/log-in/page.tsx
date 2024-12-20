"use client";

import { useActionState } from "react";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";
import { logIn } from "./actions";
import {
  EnvelopeIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

import { Line } from "@/components/line";
import { SocialLogin } from "@/components/social-login";

export default function LogIn() {
  const [state, action] = useActionState(logIn, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <FireIcon className="size-24 w-full text-red-400" />
      <form action={action} className="flex flex-col gap-6">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
          icon={EnvelopeIcon}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
          icon={UserIcon}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
          icon={KeyIcon}
        />
        <FormButton text="Log in" />
      </form>
      <Line />
      <SocialLogin provider="github" />
    </div>
  );
}
