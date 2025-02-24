"use server";

import { createCommentApi } from "@/services/commentService";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createComment(
  prevState: any,
  { formData, postId, parentId }: { formData: any; postId: string; parentId: string }
) {
  const cookiesStore = cookies();
  const options = setCookieOnReq(cookiesStore);

  const rawFormData = {
    postId,
    parentId,
    text: formData.get("text"),
  };
  try {
    const { message } = await createCommentApi(rawFormData, options);
    revalidatePath("/blogs/[slug]");
    return {
      message
    }
  } catch (err) {
    const error  = err?.response?.data?.message
    return {
      error
    }
  }

}
