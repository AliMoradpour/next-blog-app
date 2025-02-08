import Breadcrumbs from "@/ui/Breadcrumbs";
import CreatePostForm from "../../create/_/CreatePostForm";
import { getPostById } from "@/services/postServices";
import NotFound from "./not-found";

interface EditPageProps {
  params: { postId: string };
}

const EditPage = async ({ params: { postId } }: EditPageProps) => {
  const { post } = await getPostById(postId);

  if (!post) return <NotFound />; // ✅ اصلاح شد: کامپوننت باید به‌عنوان JSX بازگردانی شود.

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پست ها", href: "/profile/posts", active: false },
          { label: "ویرایش پست", href: `/profile/posts/${postId}/edit`, active: true },
        ]}
      />
      <CreatePostForm postToEdit={post} />
    </div>
  );
};

export default EditPage;
