import http from "./httpService";

export const getPostBySlug = async (slug: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/slug/${slug}`);
  const { data } = await res.json();
  const { post } = data || {};
  return post;
};

export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list`);
  const { data } = await res.json();
  const { posts } = data || {};
  return posts;
}

export async function likePostApi(postId: string) {
  http.post(`/post/like/${postId}`).then(({ data }) => data.data);
}
