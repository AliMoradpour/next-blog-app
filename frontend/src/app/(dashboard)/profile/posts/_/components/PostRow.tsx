import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dataFormater";
import { toPersianDigits } from "@/utils/numberFormatter";
import truncateText from "@/utils/truncateText";
import { DeletePost, UpdatePost } from "./Buttons";

interface Category {
  title: string;
}

interface Author {
  name: string;
}

interface Post {
  title: string;
  category: Category;
  author: Author;
  createdAt: string;
  type: "free" | "premium";
}

interface PostRowProps {
  index: number;
  post: Post;
}

const typeStyle: Record<Post["type"], { label: string; className: string }> = {
  free: {
    label: "رایگان",
    className: "badge--success",
  },
  premium: {
    label: "پولی",
    className: "badge--secondary",
  },
};

const PostRow: React.FC<PostRowProps> = ({ index, post }) => {
  const { title, category, author, createdAt, type } = post;

  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{truncateText(title, 30)}</td>
      <td>{category.title}</td>
      <td>{author.name}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <span className={`badge ${typeStyle[type].className}`}>{typeStyle[type].label}</span>
      </td>
      <td>
        <div className="flex items-center gap-x-3">
          <UpdatePost id={post._id} />
          <DeletePost post={post} />
        </div>
      </td>
    </Table.Row>
  );
};

export default PostRow;
