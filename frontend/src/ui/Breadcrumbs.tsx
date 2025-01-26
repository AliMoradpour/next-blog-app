import Link from "next/link";

type Breadcrumb = {
  href: string;
  label: string;
  active: boolean;
};

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 block">
      <ol className="flex text-lg gap-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active ? "page" : undefined}
            className={`${
              breadcrumb.active ? "text-secondary-700 font-semibold" : "text-secondary-500"
            } flex gap-x-2`}
          >
            {breadcrumb.active ? (
              <span>{breadcrumb.label}</span>
            ) : (
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="inline-block text-secondary-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
