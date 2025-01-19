import Author from "./Author";
import CoverImage from "./CoverImage";


interface RelatedPostProps {
  posts: {
    _id: string;
    title: string;
    author: { [key: string]: any };
    [key: string]: any;
  }[];
}

function RelatedPost({ posts = [] }: RelatedPostProps) {
  if (!posts || posts.length === 0) {
    return null; // Return nothing if there are no related posts
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl mb-4">پست‌های مرتبط</h2>
      <div className="grid gap-4 grid-cols-6">
        {posts.map((item) => (
          <article
            key={item._id}
            className="col-span-6 md:col-span-3 lg:col-span-2"
          >
            <CoverImage {...item} />
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm font-medium">{item.title}</p>
              <Author {...item.author} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RelatedPost;
