import Table from "@/ui/Table";

const PostRow = ({ index, post }) => {
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
