import Image from "next/image";

const PostList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list`);
  const {
    data: { posts },
  } = await res.json();

  type PostType = {
    title: string;
    coverImageUrl: string;
  };
  return posts.length > 0 ? (
    <div className="grid grid-cols-12 gap-8">
      {posts.map((post: PostType) => (
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-100 p-2 rounded-lg">
          <div className="relative aspect-video overflow-hidden rounded-md">
            <Image
              src={post.coverImageUrl}
              alt="cover image"
              fill
              className="object-cover object-center hover:scale-110 transition-all duration-300 ease-out"
              quality={80}
            />
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default PostList;
