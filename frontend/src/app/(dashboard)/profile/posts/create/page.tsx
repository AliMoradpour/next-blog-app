import Breadcrumbs from "@/ui/Breadcrumbs";
import CreatePostForm from "./_/CreatePostForm";

const page = () => {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پتس ها", href: "/profile/posts", active: false },
          { label: "ایجاد پست", href: "/profile/posts/create", active: true },
        ]}
      />
      <CreatePostForm />
    </div>
  );
};

export default page;
