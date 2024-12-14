import { getPosts } from "@/services/postServices";
import setCookieOnReq from "@/utils/setCookieOnReq";
import PostList from "app/blogs/_components/PostList";
import { cookies } from "next/headers";
import queryString from "query-string";

interface CategoryProps {
  params: {
    categorySlug: string;
  };
}

const Category = async ({ params, searchParams }: CategoryProps): Promise<JSX.Element> => {
  const { categorySlug } = params;

  const queries = queryString.stringify(searchParams) + "&" + `categorySlug=${categorySlug}`;

  // Retrieve cookies from the request
  const cookieStore = cookies();

  // Prepare options for the API request
  const options = setCookieOnReq(cookieStore);

  // Fetch posts using the provided options
  const posts = await getPosts(queries, options);

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-lg text-secondary-600">پستی در این دسته بندی پیدا نشد!</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
};

export default Category;
