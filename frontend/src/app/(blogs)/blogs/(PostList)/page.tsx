import { cookies } from "next/headers";
import PostList from "../_components/PostList";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPosts } from "@/services/postServices";
import queryString from "query-string";

const BlogPage = async ({ searchParams }: { searchParams: { [key: string]: string } }): Promise<JSX.Element> => {
  // Convert searchParams to query string
  const queries = queryString.stringify(searchParams || {});

  // Retrieve cookies from the request
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);

  try {
    // Fetch posts using the provided options
    const posts = await getPosts(queries, options);

    const searchQuery = searchParams?.search || "";

    return (
      <>
        {searchQuery && (
          <p className="mb-4 text-secondary-700">
            {posts.length === 0
              ? "هیچ پستی با این مشخصات پیدا نشد"
              : `نشان دادن ${posts.length} نتیجه برای `}
            <span className="font-bold">&quot;{searchQuery}&quot;</span>
          </p>
        )}
        <PostList posts={posts} />
      </>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <p className="text-red-500">
        مشکلی در بارگذاری پست‌ها به وجود آمده است. لطفاً دوباره تلاش کنید.
      </p>
    );
  }
};

export default BlogPage;
