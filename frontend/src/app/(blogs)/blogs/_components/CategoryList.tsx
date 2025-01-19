import Link from "next/link";

const CategoryList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/list`);
  const {
    data: { categories },
  } = await res.json();

  type CategoryType = {
    _id: number;
    slug: string;
    title: string;
  };

  return (
    <ul className="space-y-4">
      <Link href="/blogs">همه</Link>
      {categories.map((category: CategoryType) => (
        <li key={category._id}>
          <Link href={`/blogs/category/${category.slug}`}>{category.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
