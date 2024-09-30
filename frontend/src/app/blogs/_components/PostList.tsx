import Image from "next/image";

const PostList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list`);
  const {
    data: { posts },
  } = await res.json();

  type PostType = {
    title: string;
    coverImage: string;
  };
  return posts.length > 0 ? (
    <div className="grid grid-cols-12 gap-8">
      {posts.map((post: PostType) => (
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-100 p-2 rounded-lg">
          <Image src={post.coverImage} alt="cover image" width={400} height={400}/>
        </div>
      ))}
    </div>
  ) : null;
};

export default PostList;
