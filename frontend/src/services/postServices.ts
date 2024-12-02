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
export async function getPosts(options?: RequestInit) {
  try {
    const res = await fetch(`${BASE_URL}/post/list`, options);
    if (!res.ok) throw new Error("Failed to fetch posts list");
    const { data } = await res.json();
    return data?.posts || []; // Safely return posts array or an empty array
  } catch (error) {
    console.error("Error in getPosts:", error);
    throw error; // Optionally propagate the error
  }
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
