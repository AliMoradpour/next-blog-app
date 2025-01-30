import React from "react";
import { FieldErrors } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  register: (name: string, options?: { required?: boolean }) => {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur: () => void;
    ref: React.Ref<HTMLSelectElement>;
  };
  options: Option[];
  isRequired?: boolean;
  errors?: FieldErrors;
}

function RHFSelect({ label, name, register, options, isRequired }: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label} {isRequired && <span className="text-error">*</span>}
      </label>
      <select
        {...register(name, { required: isRequired })}
        id={name}
        className="textField__input"
      >
        {options.map((option) => (
          <option className="bg-red-300" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RHFSelect;
