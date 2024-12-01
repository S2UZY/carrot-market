"use client";

import { useActionState } from "react";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";
import { createAccount } from "./actions";
import {
  EnvelopeIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, null);

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
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          errors={state?.fieldErrors.confirm_password}
          icon={KeyIcon}
        />
        <FormButton text="Create Account" />
      </form>
    </div>
  );
}
