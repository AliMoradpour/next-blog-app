"use client";

import { useCategories } from "@/hooks/useCategories";
import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useCreatePost from "./useCreatePost";
import SpinnerMini from "@/ui/SpinnerMini";
import { useRouter } from "next/navigation";
import useEditPost from "./useEditPost";
import { imageUrlToFile } from "@/utils/fileFormatter";

const schema = yup.object({
  title: yup.string().min(5, "حداقل 5 کاراکتر را وارد کنید").required("عنوان الزامی است"),
  briefText: yup.string().min(5, "حداقل 5 کاراکتر را وارد کنید").required("متن کوتاه الزامی است"),
  text: yup.string().min(10, "حداقل 10 کاراکتر را وارد کنید").required("متن الزامی است"),
  slug: yup.string().required("اسلاگ الزامی است"),
  readingTime: yup
    .number()
    .positive()
    .integer()
    .required("زمان مطالعه الزامی است")
    .typeError("یک عدد را وارد کنید"),
  category: yup.string().required("دسته بندی الزامی است"),
  coverImage: yup.mixed().nullable(),
});

type FormData = yup.InferType<typeof schema>;

interface PostToEdit {
  _id?: string;
  title?: string;
  text?: string;
  slug?: string;
  briefText?: string;
  readingTime?: number;
  category?: { _id: string };
  coverImage?: File;
  coverImageUrl?: string;
}

interface CreatePostFormProps {
  postToEdit?: PostToEdit;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ postToEdit = {} }) => {
  const { _id: editId } = postToEdit;
  const isEditSession = Boolean(editId);

  const {
    title = "",
    text = "",
    slug = "",
    briefText = "",
    readingTime = 0,
    category,
    coverImage,
    coverImageUrl: prevCoverImageUrl = null,
  } = postToEdit;

  const router = useRouter();
  const { categories } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(prevCoverImageUrl);

  const { editPost, isEditing } = useEditPost();
  const { createPost, isCreating } = useCreatePost();

  const defaultValues: Partial<FormData> = isEditSession
    ? {
        title,
        text,
        slug,
        briefText,
        readingTime,
        category: category?._id || "",
        coverImage,
      }
    : {};

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
    defaultValues,
  });

  useEffect(() => {
    if (prevCoverImageUrl) {
      async function fetchMyApi() {
        const file = await imageUrlToFile(prevCoverImageUrl);
        setValue("coverImage", file as any);
      }
      fetchMyApi();
    }
  }, [prevCoverImageUrl, setValue]);

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    if (isEditSession) {
      editPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/posts");
          },
        }
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          router.push("/profile/posts");
        },
      });
    }
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
        render={({ field: { onChange, value, ...rest } }) => (
          <FileInput
            label="انتخاب کاور پست"
            name="coverImage"
            errors={errors}
            isRequired
            {...rest}
            onChange={(event) => {
              const file = event.target.files?.[0] || null;
              onChange(file);
              setCoverImageUrl(file ? URL.createObjectURL(file) : null);
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
        {isCreating ? <SpinnerMini /> : <Button variant="primary" type="submit">تایید</Button>}
      </div>
    </form>
  );
};

export default CreatePostForm;
