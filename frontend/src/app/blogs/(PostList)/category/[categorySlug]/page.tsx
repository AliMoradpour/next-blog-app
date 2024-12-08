import PostList from "app/blogs/_components/PostList";

interface CategoryProps {
  params: {
    categorySlug: string;
  };
}

const Category = async ({ params }: CategoryProps): Promise<JSX.Element> => {
  const { categorySlug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list?categorySlug=${categorySlug}`);
  
  if (!res.ok) {
    console.error("Failed to fetch posts for category:", categorySlug);
    return <p className="text-lg text-secondary-600">مشکلی در بارگذاری پست‌ها پیش آمد!</p>;
  }

  const { data } = await res.json();
  const { posts }: { posts: Array<any> } = data || {};

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
