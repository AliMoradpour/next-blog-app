import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import SpinnerMini from "@/ui/SpinnerMini";

const schema = yup
  .object({
    email: yup.string().email().required("ایمیل الزامی است"),
    password: yup.string().min(8).required("پسسورد الزامی است"),
  })
  .required();

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { signin } = useAuth();
  const onSubmit = async (values: any) => {
    await signin();
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-700 text-center mb-6">ورود</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <RHFTextField label="ایمیل" name="email" register={register} dir="ltr" isRequired errors={errors} />
        <RHFTextField
          label="رمز عبور"
          name="password"
          register={register}
          type="password"
          dir="ltr"
          isRequired
          errors={errors}
        />

        <div>
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <Button type="submit" variant="primary" className="w-full">
              ورود
            </Button>
          )}
        </div>

        <Link href="/signup" className="w-full text-center text-secondary-400">
          ثبت نام
        </Link>
      </form>
    </div>
  );
};

export default Signin;
