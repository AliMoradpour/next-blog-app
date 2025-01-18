"use client";

import Button from "@/ui/Button";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Comment from "./Comment";
import { useState } from "react";
import Modal from "@/ui/Modal";
import CommentForm from "./CommentForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Define types for comments
interface CommentType {
  _id: string;
  text: string;
  user: { name: string }; // Adjust based on actual user structure
  answers?: CommentType[]; // Nested comments (replies)
}

interface PostType {
  _id: string;
  comments: CommentType[];
}

interface PostCommentProps {
  post: PostType;
}

const PostComment: React.FC<PostCommentProps> = ({ post: { comments, _id: postId } }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [parent, setParent] = useState<CommentType | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const addNewCommentHandler = (parent: CommentType | null) => {
    if (!user) {
      router.push("/signin");
      return;
    }
    setParent(parent);
    setOpen(true);
  };

  return (
    <div className="mb-10">
      {/* Modal for adding or replying to comments */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={parent ? "پاسخ به نظر" : "نظر جدید"}
        description={parent?.user.name || "نظر خود را وارد کنید"}
      >
        <CommentForm onClose={() => setOpen(false)} parentId={parent ? parent._id : null} postId={postId} />
      </Modal>

      {/* Header Section */}
      <div className="flex flex-col items-center lg:flex-row justify-between gap-y-3 mb-8">
        <h2 className="text-2xl font-bold text-secondary-800">نظرات</h2>
        <Button variant="outline" className="flex items-center py-2" onClick={() => addNewCommentHandler(null)}>
          <QuestionMarkCircleIcon className="w-4 ml-2" />
          <span>ثبت نظر جدید</span>
        </Button>
      </div>

      {/* Comments Section */}
      <div className="space-y-8 post-comments bg-secondary-0 rounded-xl py-6 px-3 lg:px-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id}>
              {/* Main Comment */}
              <div className="border border-secondary-200 rounded-xl p-2 sm:p-4 mb-3">
                <Comment comment={comment} onAddComment={() => addNewCommentHandler(comment)} />
              </div>

              {/* Replies */}
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
                      <Comment comment={item} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-secondary-500">برای این پست نظری ثبت نشده است.</p>
        )}
      </div>
    </div>
  );
};

export default PostComment;
