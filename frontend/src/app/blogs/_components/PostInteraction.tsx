"use client";

import { bookmarkPostApi, likePostApi } from "@/services/postServices";
import ButtonIcon from "@/ui/ButtonIcon";
import { toPersianDigits } from "@/utils/numberFormatter";
import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon, BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface PostType {
  post: {
    _id: string;
    isLiked: boolean;
    isBookmarked: boolean;
    commentsCount: number;
  };
}

const PostInteraction = ({ post }: PostType) => {
  const router = useRouter();

  const likeHandler = async (postId: string) => {
    try {
      const { message } = await likePostApi(postId);
      toast.success(message);
      router.refresh(); // Refresh the page to reflect changes
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const bookmarkHandler = async (postId: string) => {
    try {
      const { message } = await bookmarkPostApi(postId);
      toast.success(message);
      router.refresh(); // Refresh the page to reflect changes
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <ButtonIcon variant="secondary">
        <ChatBubbleOvalLeftEllipsisIcon />
        <span>{toPersianDigits(post.commentsCount)}</span>
      </ButtonIcon>
      <ButtonIcon variant="red" onClick={() => likeHandler(post._id)}>
        {post.isLiked ? <SolidHeartIcon /> : <HeartIcon />}
      </ButtonIcon>
      <ButtonIcon variant="primary" onClick={() => bookmarkHandler(post._id)}>
        {post.isBookmarked ? <SolidBookmarkIcon /> : <BookmarkIcon />}
      </ButtonIcon>
    </div>
  );
};

export default PostInteraction;
