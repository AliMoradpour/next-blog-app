import Avatar from "@/ui/Avatar";

type AuthorType = {
  name: string;
  avatarUrl: string;
};

const Author = ({ name, avatarUrl }: AuthorType) => {
  return (
    <div className="flex items-center gap-x-1">
      <Avatar src={avatarUrl} alt={name} />
      <span className="text-sm text-secondary-500">{name}</span>
    </div>
  );
};

export default Author;
