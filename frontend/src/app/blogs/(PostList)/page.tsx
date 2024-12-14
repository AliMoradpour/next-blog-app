import { cookies } from "next/headers";
import PostList from "../_components/PostList";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPosts } from "@/services/postServices";
import queryString from "query-string";

const BlogPage = async ({ searchParams }): Promise<JSX.Element> => {
  const queries = queryString.stringify(searchParams);

  // Retrieve cookies from the request
  const cookieStore = cookies();

  // Prepare options for the API request
  const options = setCookieOnReq(cookieStore);

  // Fetch posts using the provided options
  const posts = await getPosts(queries, options);

  const { search } = searchParams;

  return (
    <>
      {search ? (
        <p className="mb-4 text-secondary-700">
          {posts.length === 0 ? "هیچ پستی با این مشخصات پیدا نشد" : `نشان دادن ${posts.length} نتیجه برای`}
          <span className="font-bold">&quot;{search}&quot;</span>
        </p>
      ) : null}
      <PostList posts={posts} />
    </>
  );
};

export default BlogPage;
