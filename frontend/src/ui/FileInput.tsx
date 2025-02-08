import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React from "react";

interface FileInputProps {
  label: string;
  name: string;
  dir?: "rtl" | "ltr";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  className?: string;
}

const FileInput = ({ label, name, dir = "rtl", onChange, isRequired, className }: FileInputProps) => {
  return (
    <label
      htmlFor="file-upload"
      className={`cursor-pointer border-2 border-primary-900 rounded-lg px-3 py-2 text-primary-900 flex items-center justify-center gap-x-2 ${className}`}
    >
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
      />
    </label>
  );
};

export default FileInput;