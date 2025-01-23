import { Suspense } from "react";
import PostsTable from "./_/components/PostsTable";
import SpinnerMini from "@/ui/SpinnerMini";

const page = () => {
  return (
    <div>
      <Suspense fallback={<SpinnerMini />}>
        <PostsTable query="" />
      </Suspense>
    </div>
  );
};

export default page;
