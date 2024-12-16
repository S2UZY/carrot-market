"use client";

import { useActionState, useState } from "react";
import { User } from "@prisma/client";
import { EditInput } from "./edit-input";
import {
  changePassword,
  updateUserProfile,
} from "@/app/(tabs)/users/[username]/edit/action";
import { Button } from "./button";

export function EditProfileForm({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  const [profileState, profileFormAction] = useActionState(
    updateUserProfile,
    null
  );

  const [passwordState, passwordFormAction] = useActionState(
    changePassword,
    null
  );

  console.log(profileState);

  return (
    <div className="max-w-md mx-auto space-y-6 mt-10">
      <div className="flex border-b mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-2 ${
            activeTab === "profile"
              ? "border-b-2 border-rose-400 text-rose-400"
              : "text-gray-500"
          }`}
        >
          프로필 수정하기
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("password")}
          className={`flex-1 py-2 ${
            activeTab === "password"
              ? "border-b-2 border-rose-400 text-rose-400"
              : "text-gray-500"
          }`}
        >
          비밀번호 변경
        </button>
      </div>

      {activeTab === "profile" && (
        <form className="space-y-4" action={profileFormAction}>
          <EditInput
            label="Username"
            type="text"
            id="username"
            name="username"
            defaultValue={user.username || ""}
            error={profileState?.username}
            required
          />
          <EditInput
            label="Email"
            type="email"
            id="email"
            name="email"
            defaultValue={user.email || ""}
            error={profileState?.email}
            required
          />
          <div>
            <label htmlFor="bio" className="block mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={user.bio || ""}
              className={`w-full hover:border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 px-3 py-2 border rounded-md`}
              maxLength={160}
            />
          </div>
          <Button label="프로필 수정" />
        </form>
      )}
      {activeTab === "password" && (
        <form className="space-y-4" action={passwordFormAction}>
          <EditInput
            label="Current Password"
            type="password"
            id="current_password"
            name="current_password"
            error={passwordState?.current_password}
            required
          />
          <EditInput
            label="New Password"
            type="password"
            id="password"
            name="password"
            error={passwordState?.password}
            required
          />
          <EditInput
            label="Confirm New Password"
            type="password"
            id="confirm_password"
            name="confirm_password"
            error={passwordState?.confirm_password}
            required
          />
          <Button label="비밀번호 변경" />
        </form>
      )}
    </div>
  );
}
