import { getPosts } from "@/services/postServices";
import setCookieOnReq from "@/utils/setCookieOnReq";
import PostList from "app/blogs/_components/PostList";
import { cookies } from "next/headers";
import queryString from "query-string";

interface CategoryProps {
  params: {
    categorySlug: string;
  };
  searchParams?: { [key: string]: string };
}

const Category = async ({ params, searchParams }: CategoryProps): Promise<JSX.Element> => {
  const { categorySlug } = params;

  // Build query string
  const queries = queryString.stringify({
    ...searchParams,
    categorySlug,
  });

  try {
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
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <p className="text-lg text-red-600">
        مشکلی در بارگذاری پست‌ها به وجود آمده است. لطفاً دوباره تلاش کنید.
      </p>
    );
  }
};

export default Category;
