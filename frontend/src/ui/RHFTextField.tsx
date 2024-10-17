type RHFTextFieldProps = {
  type?: string; // Optional, defaults to "text"
  label: string; // Assuming label is required
  name: string; // Assuming name is required
  dir?: "rtl" | "ltr"; // Optional, defaults to "rtl"
  isRequired?: boolean;
  errors?: Record<string, any>; // Assuming errors is an object with key-value pairs for form errors
  validationSchema?: object; // Optional, defaults to an empty object
  [key: string]: any; // For any other props passed via `...rest`
};

export default function RHFTextField({
  type = "text",
  label,
  name,
  dir = "rtl",
  register,
  isRequired,
  errors,
  validationSchema = {},
  ...rest
}: RHFTextFieldProps) {
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);
  return (
    <div className={`textField relative ${hasError ? "textField--invalid" : ""}`}>
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>
      <input
        autoComplete="off"
        type={type}
        id={name}
        dir={dir}
        className={`textField__input  ${dir === "ltr" ? "text-left" : "text-right"}`}
        {...register(name, validationSchema)}
        {...rest}
      />
      {errors && errors[name] && <span className="text-red-600 block text-xs mt-2">{errors[name]?.message}</span>}
    </div>
  );
}
