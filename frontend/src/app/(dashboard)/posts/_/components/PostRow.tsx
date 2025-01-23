import Table from "@/ui/Table";

interface Post {
  title: string;
  category: string;
  author: string;
  createdAt: string;
  type: string;
}

interface PostRowProps {
  index: number;
  post: Post;
}

const PostRow: React.FC<PostRowProps> = ({ index, post }) => {
  const { title, category, author, createdAt, type } = post;

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{category}</td>
      <td>{author}</td>
      <td>{createdAt}</td>
      <td>{type}</td>
    </Table.Row>
  );
};

export default PostRow;
