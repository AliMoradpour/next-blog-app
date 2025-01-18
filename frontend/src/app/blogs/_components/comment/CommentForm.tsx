"use client";

import TextArea from "@/ui/TextArea";
import { useActionState, useEffect, useState } from "react";
import { createComment } from "../../../../lib/actions";
import SubmitButton from "@/ui/SubmitButton";
import toast from "react-hot-toast";

const initialState = {
  error: "",
  message: "",
};
interface CommentFormProps {
  postId: string;
  parentId?: string | null;
  onClose: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, parentId, onClose }) => {
  const [text, setText] = useState("");
  const [state, formAction] = useActionState(createComment, initialState);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md  w-full">
          <form
            ref={ref}
            action={async (formData) => {
              await formAction({ formData, postId, parentId });
            }}
            className="space-y-7">
            <TextArea name="text" label="متن نظر" value={text} isRequired onChange={(e) => setText(e.target.value)} />
            <div className="mt-8">
              <SubmitButton>تایید</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
