import { InputHTMLAttributes } from "react";

interface EditInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string[] | string;
}

export function EditInput({
  label,
  id,
  error,
  className,
  ...props
}: EditInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      <input
        id={id}
        className={`w-full hover:border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 px-3 py-2 border rounded-md ${
          className || ""
        } ${error ? "border-red-500" : ""}`}
        {...props}
      />
      {error && error.length > 0 && (
        <p className="text-red-500 text-sm mt-1">{error[0]}</p>
      )}
    </div>
  );
}
