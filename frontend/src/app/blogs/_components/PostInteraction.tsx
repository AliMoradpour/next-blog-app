"use client";

import { likePostApi } from "@/services/postServices";
import ButtonIcon from "@/ui/ButtonIcon";
import { toPersianDigits } from "@/utils/numberFormatter";
import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface PostType {
  commentsCount: number;
  postId: string; // Add postId as part of the props
}

const PostInteraction = ({ commentsCount, postId }: PostType) => {
  const likeHandler = async (postId: string) => {
    try {
      const { message } = await likePostApi(postId);
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <ButtonIcon variant="secondary">
        <ChatBubbleOvalLeftEllipsisIcon />
        <span>{toPersianDigits(commentsCount)}</span>
      </ButtonIcon>
      <ButtonIcon variant="red" onClick={() => likeHandler(postId)}>
        <HeartIcon />
      </ButtonIcon>
      <ButtonIcon variant="primary">
        <BookmarkIcon />
      </ButtonIcon>
    </div>
  );
};

export default PostInteraction;
