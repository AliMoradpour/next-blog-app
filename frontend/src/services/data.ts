import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import { getAllUsersApi } from "./authService";
import { getAllCommentsApi } from "./commentService";
import { getPosts } from "./postServices";

export async function fetchCardData() {
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);

  try {
    const data = await Promise.all([getAllUsersApi(options), getAllCommentsApi(options), getPosts()]);
    const numberOfUsers = Number(data[0].users.length ?? "0");
    const numberOfComments = Number(data[1].commentsCount ?? "0");
    const numberOfPosts = Number(data[2].posts.length ?? "0");

    return {
      numberOfComments,
      numberOfPosts,
      numberOfUsers,
    };
  } catch (error) {
    throw new Error("خطا در بارگزاری اطلاعات")
  }
}
