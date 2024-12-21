import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  dir?: "rtl" | "ltr"; // Optional, defaults to "rtl"
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isRequired?: boolean; // Optional, defaults to false
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  isRequired = false,
}) => {
  return (
    <div className="textField">
      <label htmlFor={name} className="text-secondary-600 text-sm">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>
      <textarea
        name={name}
        id={name}
        dir={dir}
        className={`textField__input mt-2 min-h-[150px] leading-8 ${
          dir === "ltr" ? "text-left" : "text-right"
        }`}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;