import Image from "next/image";
import Link from "next/link";

type PostType = {
  title: string;
  coverImageUrl: string;
  slug: string;
};

const CoverImage = ({ title, coverImageUrl, slug }: PostType) => {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md">
      <Link href={`/blogs/${slug}`}>
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          className="object-cover object-center hover:scale-110 transition-all duration-300 ease-out"
          quality={80}
        />
      </Link>
    </div>
  );
};

export default CoverImage;
