import { CheckBadgeIcon } from "@heroicons/react/24/outline";

interface ToastProps {
  text: string;
}

export default function Toast({ text }: ToastProps) {
  return (
    <div className="flex items-center justify-start bg-emerald-500 rounded-2xl py-5 pl-5 gap-4">
      <CheckBadgeIcon className="size-7" />
      <p>{text}</p>
    </div>
  );
}
