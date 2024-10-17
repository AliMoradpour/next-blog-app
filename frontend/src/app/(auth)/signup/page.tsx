"use client";

import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup
      .string()
      .min(4, "نباید کمتر 4 کاراکتر باشد")
      .max(30, "نباید بیشتر از 30 کاراکتر باشد")
      .required("نام و نام خانوادگی الزامی است."),
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("پسورد الزامی است"),
  })
  .required();

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-700 text-center mb-6">ثبت نام</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <RHFTextField label="نام و نام خانوادگی" name="name" register={register} isRequired errors={errors} />
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

        <Button type="submit" variant="primary" className="w-full">
          تایید
        </Button>
      </form>
    </div>
  );
};

export default Signup;
