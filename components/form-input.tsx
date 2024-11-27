import { ComponentType, SVGProps } from "react";

interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  name: string;
  errors?: string[];
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
  icon: Icon,
}: FormInputProps) {
  return (
    <>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          name={name}
          className="pl-14 bg-transparent rounded-3xl w-full h-12 focus:outline-neutral-300 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-300  placeholder:text-neutral-400"
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </div>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </>
  );
}
