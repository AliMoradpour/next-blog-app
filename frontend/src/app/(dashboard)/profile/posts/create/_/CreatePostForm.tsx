"use client";

import { useCategories } from "@/hooks/useCategories";
import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { error } from "console";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useCreatePost from "./useCreatePost";
import SpinnerMini from "@/ui/SpinnerMini";
import { useRouter } from "next/navigation";

const schema = yup.object({
  title: yup.string().min(5, "حداقل 5 کاراکتر را وارد کنید").required("عنوان الزامی است"),
  briefText: yup.string().min(5, "حداقل 5 کاراکتر را وارد کنید").required("متن کوتاه الزامی است"),
  text: yup.string().min(10, "حداقل 10 کاراکتر را وارد کنید").required("متن الزامی است"),
  slug: yup.string().required("اسلاگ الزامی است"),
  readingTime: yup.number().positive().integer().required("زمان مطالعه الزامی است").typeError("یک عدد را وارد کنید"),
  category: yup.string().required("دسته بندی الزامی است"),
});

type FormData = yup.InferType<typeof schema>;

const CreatePostForm = () => {
  const router = useRouter();

  const { categories } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  const { createPost, isCreating } = useCreatePost();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    createPost(formData, {
      onSuccess: () => {
import Spinner from "@/ui/Spinner";
        router.push("/profile/posts");
      },
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="title" label="عنوان" errors={errors} register={register} isRequired />
      <RHFTextField name="briefText" label="متن کوتاه" errors={errors} register={register} isRequired />
      <RHFTextField name="text" label="متن" errors={errors} register={register} isRequired />
      <RHFTextField name="slug" label="اسلاگ" errors={errors} register={register} isRequired />
      <RHFTextField name="readingTime" label="زمان مطالعه" errors={errors} register={register} isRequired />
      <RHFSelect name="category" label="دسته بندی" isRequired options={categories} register={register} />
      <Controller
        name="coverImage"
        control={control}
        rules={{ required: "کاور پست الزامی است!" }}
        render={({ field: { onChange, ...rest } }) => (
          <FileInput
            label="انتخاب کاور پست"
            name="coverImage"
            errors={error}
            isRequired
            {...rest}
            onChange={(event) => {
              const file = event.target.files?.[0];
              onChange(file);
              setCoverImageUrl(file ? URL.createObjectURL(file) : null);
              event.target.value = null;
            }}
          />
        )}
      />
      {coverImageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image fill alt="cover Image" src={coverImageUrl} className="object-cover object-center" />
          <ButtonIcon
            variant="red"
            className="w-6 h-6 absolute left-4 top-4"
            onClick={() => {
              setCoverImageUrl(null);
              setValue("coverImage", null);
            }}>
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}

      <div>
        {isCreating ? (
          <SpinnerMini />
        ) : (
          <Button variant="primary" type="submit">
            تایید
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreatePostForm;
