import http from "./httpService";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Fetch a single post by its slug
export const getPostBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${BASE_URL}/post/slug/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch post by slug");
    const { data } = await res.json();
    return data?.post || null; // Safely return the post or null if not found
  } catch (error) {
    console.error("Error in getPostBySlug:", error);
    throw error; // Optionally propagate the error
  }
};

// Fetch a list of posts
export async function getPosts(queries?: string, options?: RequestInit) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list?${queries}`, options);
  const { data } = await res.json();
  const { posts, totalPages } = data || {};
  return { posts, totalPages };
}

// Like a post by its ID
export async function likePostApi(postId: string) {
  try {
    const { data } = await http.post(`/post/like/${postId}`);
    return data?.data || null; // Return the response or null if no data
  } catch (error) {
    console.error("Error in likePostApi:", error);
    throw error; // Optionally propagate the error
  }
}

// Bookmark a post by its ID
export async function bookmarkPostApi(postId: string) {
  try {
    const { data } = await http.post(`/post/bookmark/${postId}`);
    return data?.data || null; // Return the response or null if no data
  } catch (error) {
    console.error("Error in bookmarkPostApi:", error);
    throw error; // Optionally propagate the error
  }
}

export async function createPostApi(data: any) {
  return http.post("/post/create", data).then(({ data }) => data.data);
}

export async function editPostApi({ id, data }: { id: any; data: any }) {
  return http.patch(`/post/update/${id}`, data).then(({ data }) => data.data);
}

export async function getPostById(id: string) {
  return http.patch(`/post/${id}`).then(({ data }) => data.data);
}

export async function deletePostApi({ id, options }) {
  return http.delete(`/post/remove/${id}`, options).then(({ data }) => data.data);
}
