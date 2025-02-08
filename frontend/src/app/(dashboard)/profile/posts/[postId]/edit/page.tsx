import Breadcrumbs from "@/ui/Breadcrumbs";
import CreatePostForm from "../../create/_/CreatePostForm";
import { getPostById } from "@/services/postServices";
import NotFound from "./not-found";

const EditPage = async ({ params: { postId } }) => {
  const { post } = await getPostById(postId);

  if (!post) return NotFound();

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پتس ها", href: "/profile/posts", active: false },
          { label: "ویرایش پست", href: `/profile/posts/${postId}/edit`, active: true },
        ]}
      />
      <CreatePostForm />
    </div>
  );
};

export default EditPage;
