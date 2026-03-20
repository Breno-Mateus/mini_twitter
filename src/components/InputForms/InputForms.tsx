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
      <div className="flex flex-col gap-1 md:gap-2">
        <label htmlFor={id} className="text-sm md:text-base font-medium dark:text-white">
          {label}
        </label>
        
        <div className={`bg-white dark:bg-darkSecudary rounded-md border dark:border-darkBorder p-3 md:p-4 flex items-center justify-between gap-2
          ${error ? "border-red-500" : "border-borderPrimary"}`}
        >
          <input
            ref={ref}
            id={id}
            className="focus:outline-none focus:ring-0 placeholder:text-secundary w-full bg-transparent"
            {...rest}
          />
          {icon && <span className="text-secundary shrink-0">{icon}</span>}
        </div>
        
        {error && (
          <span className="text-red-500 text-xs md:text-sm">{error.message}</span>
        )}
      </div>
    );
  }
);

InputForms.displayName = "InputForms";

export default InputForms;