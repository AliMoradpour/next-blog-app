import { cookies } from "next/headers";
import PostList from "../_components/PostList";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPosts } from "@/services/postServices";

const BlogPage = async (): Promise<JSX.Element> => {
  // Retrieve cookies from the request
  const cookieStore = cookies();

  // Prepare options for the API request
  const options = setCookieOnReq(cookieStore);

  // Fetch posts using the provided options
  const posts = await getPosts(options);

  // Render the PostList component with the fetched posts
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

export default BlogPage;
