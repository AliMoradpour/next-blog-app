import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React from "react";
import * as Yup from "yup";

interface FileInputProps {
  label: string;
  name: string;
  dir?: "rtl" | "ltr";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  className?: string;
  errors?: Record<string, { message: string }>;
  validationSchema?: Yup.ObjectSchema<any>;
}

const FileInput = ({
  label,
  name,
  dir = "rtl",
  onChange,
  isRequired,
  className,
  validationSchema = {},
  errors,
  ...rest
}: FileInputProps) => {
  const errorMessage = errors?.[name];
  const hasError = !!(errors && errorMessage);

  return (
    <>
      <label
        htmlFor="file-upload"
        className={`cursor-pointer border-2 border-primary-900 rounded-lg px-3 py-2 text-primary-900 flex items-center justify-center gap-x-2 ${className}`}>
        {label}
        <ArrowUpTrayIcon className="w-5 h-5" />
        <input
          type="file"
          id="file-upload"
          className="sr-only"
          name={name}
          dir={dir}
          onChange={onChange}
          required={isRequired}
          {...rest}
        />
      </label>

      {errors && errors[name] && <span className="text-red-600 block text-xs mt-2">{errors[name]?.message}</span>}
    </>
  );
};

export default FileInput;
