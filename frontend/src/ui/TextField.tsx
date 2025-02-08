type TextFieldProps = {
  type?: string;
  label: string;
  name: string;
  value: string;
  dir?: "rtl" | "ltr";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  className?: string;
};

const TextField: React.FC<TextFieldProps> = ({
  type = "text",
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  isRequired,
  className,
}) => {
  return (
    <div className="textField">
      <label htmlFor={name} className="text-secondary-600 text-sm mb-2 block">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        dir={dir}
        className={`textField__input ${dir === "ltr" ? "text-left" : "text-right"} ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default TextField;
