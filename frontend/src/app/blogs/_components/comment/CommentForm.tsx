"use client";

import TextArea from "@/ui/TextArea";
import { useState } from "react";
import { createComment } from "../../../../../lib/actions";
import SpinnerMini from "@/ui/SpinnerMini";
import Button from "@/ui/Button";
import SubmitButton from "@/ui/SubmitButton";

const CommentForm = ({ postId, parentId }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md  w-full">
          <form ref={ref} action={createComment.bind(null, postId, parentId)} className="space-y-7">
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
