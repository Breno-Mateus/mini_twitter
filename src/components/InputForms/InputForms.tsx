import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface InputFormsProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: FieldError;
}

const InputForms = forwardRef<HTMLInputElement, InputFormsProps>(
  ({ label, icon, error, id, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id}>{label}</label>
        <div className={`bg-white rounded-md border p-4 flex items-center justify-between
          ${error ? "border-red-500" : "border-borderPrimary"}`}
        >
          <input
            ref={ref}
            id={id}
            className="focus:outline-none focus:ring-0 placeholder:text-secundary w-9/12"
            {...rest}
          />
          {icon}
        </div>
        {error && (
          <span className="text-red-500 text-sm">{error.message}</span>
        )}
      </div>
    );
  }
);

InputForms.displayName = "InputForms";

export default InputForms;