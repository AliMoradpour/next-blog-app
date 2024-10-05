import { Suspense } from "react";
import PostList from "../_components/PostList";
import Spinner from "@/ui/Spinner";

const BlogPage = () => {

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, corrupti rem libero ipsam iure nulla
        possimus commodi inventore in est nemo debitis neque eaque necessitatibus dolor dolores aut pariatur et.
      </p>
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  );
};

export default BlogPage;
