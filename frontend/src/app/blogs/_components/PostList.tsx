import Link from "next/link";
import CoverImage from "./CoverImage";
import { ClockIcon } from "@heroicons/react/24/outline";
import Author from "./Author";
import PostInteraction from "./PostInteraction";
import { toPersianDigits } from "@/utils/numberFormatter";
import { getPosts } from "@/services/postServices";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";

type PostType = {
  title: string;
  coverImageUrl: string;
  slug: string;
  readingTime: number;
  commentsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  _id: string; // Ensure this exists if needed for PostInteraction
  author: {
    avatarUrl: string;
    name: string;
  };
};

const PostList = async () => {
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);

  let posts: PostType[] = [];
  try {
    posts = await getPosts(options);
  } catch (error: any) {
    console.error("Error fetching posts:", error.message);
    return null; // Handle errors gracefully by rendering nothing or an error message
  }

  return posts.length > 0 ? (
    <div className="grid grid-cols-12 gap-8">
      {posts.map((post: PostType) => (
        <div
          key={post._id} // Ensure every mapped element has a unique key
          className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-100 p-2 rounded-lg"
        >
          {/* Cover Image */}
          <CoverImage coverImageUrl={post.coverImageUrl} alt={post.title} />

          {/* Post Content */}
          <div>
            <Link href={`/blogs/${post.slug}`}>
              <h2 className="my-4 font-bold text-secondary-700">{post.title}</h2>
            </Link>

            {/* Post Author & Reading Time */}
            <div className="flex items-center justify-between mb-4">
              <Author {...post.author} />
              <div className="flex items-center text-[10px] text-secondary-500">
                <ClockIcon className="w-4 h-4 stroke-secondary-500 ml-1" />
                <span className="ml-1">خواندن:</span>
                <span className="ml-1 leading-3">{toPersianDigits(post.readingTime)}</span>
                <span>دقیقه</span>
              </div>
            </div>

            {/* Post Interaction */}
            <PostInteraction post={post} />
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default PostList;
