import Breadcrumbs from "@/ui/Breadcrumbs";

const page = () => {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پتس ها", href: "/profile/posts", active: false },
          { label: "ایجاد پست", href: "/profile/posts/create", active: true },
        ]}
      />
      Create post Form
    </div>
  );
};

export default page;
