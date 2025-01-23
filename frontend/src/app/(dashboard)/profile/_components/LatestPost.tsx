import PostsTable from "../posts/_/components/PostsTable";

const LatestPost = () => {
  const query = "sort=latest&limit=5";
  return (
    <>
      <PostsTable query={query} />
    </>
  );
};

export default LatestPost;
