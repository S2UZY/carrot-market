import { useFormStatus } from "react-dom";

interface ButtonProps {
  label: string;
}

export function Button({ label }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="w-full py-2 rounded-md primary-btn">
      {label}
    </button>
  );
}
