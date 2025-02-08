"use client";

import { useCategories } from "@/hooks/useCategories";
import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

// Define the schema for form validation
const schema = yup.object({
  title: yup.string().required("عنوان الزامی است"),
  briefText: yup.string().required("متن کوتاه الزامی است"),
  text: yup.string().required("متن الزامی است"),
  slug: yup.string().required("اسلاگ الزامی است"),
  readingTime: yup.string().required("زمان مطالعه الزامی است"),
  category: yup.string().required("دسته بندی الزامی است"),
  coverImage: yup.mixed().required("کاور پست الزامی است"),
});

type FormData = yup.InferType<typeof schema>;

const CreatePostForm = () => {
  const { categories } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

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
    console.log(data);
    reset();
    setCoverImageUrl(null); // Reset cover image URL on form submission
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePostForm;
