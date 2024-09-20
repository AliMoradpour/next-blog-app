const BlogPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list`);
  const {
    data: { posts },
  } = await res.json();

  type PostType = {
    title: string;
  };

  return (
    <div>
      {posts.map((post: PostType) => (
        <div>{post.title}</div>
      ))}
    </div>
  );
};

export default BlogPage;
