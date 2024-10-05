import Link from "next/link";
import CoverImage from "./CoverImage";
import { ClockIcon } from "@heroicons/react/24/outline";
import Author from "./Author";
import PostInteraction from "./PostInteraction";
import { toPersianDigits } from "@/utils/numberFormatter";

const PostList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list`);
  const {
    data: { posts },
  } = await res.json();

  type PostType = {
    title: string;
    coverImageUrl: string;
    slug: string;
    readingTime: number;
    commentsCount: number;
    author: {
      avatarUrl: string;
      name: string;
    };
  };

  return posts.length > 0 ? (
    <div className="grid grid-cols-12 gap-8">
      {posts.map((post: PostType) => (
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-100 p-2 rounded-lg">
          <CoverImage {...post} />
          {/* post content */}
          <div>
            <Link href={`/blogs/${post.slug}`}>
              <h2 className="my-4 font-bold text-secondary-700">{post.title}</h2>
            </Link>

            {/* post author - reading time */}
            <div className="flex items-center justify-between mb-4">
              <Author {...post.author} />
              <div className="flex items-center text-[10px] text-secondary-500">
                <ClockIcon className="w-4 h-4 stroke-secondary-500 ml-1" />
                <span className="ml-1"> خواندن:</span>
                <span className="ml-1 leading-3">{toPersianDigits(post.readingTime)}</span>
                <span>دقیقه</span>
              </div>
            </div>
            <PostInteraction {...post}/>
            
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default PostList;
