"use client";

import TextArea from "@/ui/TextArea";
import { useActionState, useEffect, useState } from "react";
import { createComment } from "../../../../lib/actions";
import SubmitButton from "@/ui/SubmitButton";
import toast from "react-hot-toast";

// Initial state for the form
const initialState = {
  error: "",
  message: "",
};

// Props for the component
interface CommentFormProps {
  postId: string;
  parentId?: string | null;
  onClose: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, parentId, onClose }) => {
  const [text, setText] = useState<string>("");

  // Using `useActionState` for form handling
  const [state, formAction] = useActionState(createComment, initialState);

  // Effect to handle success or error states
  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, onClose]);

  // Form submission handler
  const handleSubmit = async (formData: FormData) => {
    try {
      // Invoke formAction with the correct structure
      await formAction({
        formData,
        postId,
        parentId,
      });
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md w-full">
          <form
            action={handleSubmit}
            className="space-y-7"
          >
            <TextArea
              name="text"
              label="متن نظر"
              value={text}
              isRequired
              onChange={(e) => setText(e.target.value)}
            />
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
