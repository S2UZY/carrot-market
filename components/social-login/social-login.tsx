import Link from "next/link";
import { GitHubIcon } from "./github-icon";

interface SocialLoginProps {
  provider: "github";
  className?: string;
}

export function SocialLogin({ provider, className = "" }: SocialLoginProps) {
  const providerConfig = {
    github: {
      text: "Continue with GitHub",
      icon: GitHubIcon,
      href: "/github/start",
    },
  };

  const { text, icon: Icon, href } = providerConfig[provider];

  return (
    <Link
      href={href}
      className={`flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 transition-colors ${className}`}
    >
      <Icon className="size-5" />
      <span>{text}</span>
    </Link>
  );
}
