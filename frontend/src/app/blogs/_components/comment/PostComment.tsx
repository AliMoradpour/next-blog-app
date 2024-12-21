"use client";

import Button from "@/ui/Button";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Comment from "./Comment";
import { useState } from "react";
import Modal from "@/ui/Modal";

// Define types for props
interface CommentType {
  _id: string;
  text: string; // Adjust based on your actual data
  answers?: CommentType[]; // Recursive type for nested answers
}

interface PostType {
  _id: string;
  comments: CommentType[];
}

interface PostCommentProps {
  post: PostType;
}

const PostComment: React.FC<PostCommentProps> = ({ post: { comments, _id: postId } }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-10">
      <Modal open={open} onClose={() => setOpen(false)} title="ss" description="ddd">
        test content ...
      </Modal>
      <div className="flex flex-col items-center lg:flex-row justify-between gap-y-3 mb-8">
        <h2 className="text-2xl font-bold text-secondary-800">نظرات</h2>
        <Button variant="outline" className="flex items-center py-2">
          <QuestionMarkCircleIcon className="w-4 ml-2" />
          <span>ثبت نظر جدید</span>
        </Button>
      </div>
      <div className="space-y-8 post-comments bg-secondary-0 rounded-xl py-6 px-3 lg:px-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id}>
              <div className="border border-secondary-200 rounded-xl p-2 sm:p-4 mb-3">
                <Comment comment={comment} />
              </div>
              <div className="post-comments__answer mr-2 sm:mr-8 space-y-3">
                {comment.answers?.map((item, index) => (
                  <div key={item._id} className="relative">
                    <div
                      className={classNames(
                        "answer-item border border-secondary-100 bg-secondary-50/80 rounded-xl p-2 sm:p-4",
                        {
                          "last-item": index + 1 === comment.answers.length,
                        }
                      )}
                    >
                      <Comment comment={item} key={item._id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-secondary-500">برای این پست نظری ثبت نشده است</p>
        )}
      </div>
    </div>
  );
};

export default PostComment;
