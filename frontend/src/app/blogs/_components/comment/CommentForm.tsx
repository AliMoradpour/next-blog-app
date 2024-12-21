"use client"

import TextArea from "@/ui/TextArea";
import { useState } from "react";

const CommentForm = () => {
const [text, setText] = useState("")
    
  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md  w-full">
          <form ref={ref} className="space-y-7">
            <TextArea name="text" label="متن نظر" value={text} isRequired onChange={(e) => setText(e.target.value)} />
            <div className="mt-8">
              <button>تایید</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
