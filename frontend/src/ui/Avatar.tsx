import Image from "next/image";

type AvatarProps = {
  src?: string; // Made `src` optional since a fallback is used
  width?: number; // Optional with a default value
  alt: string; // Required
};

const Avatar: React.FC<AvatarProps> = ({ src = "/images/avatar.png", width = 24, alt }) => {
  return (
    <Image
      src={src}
      width={width}
      height={width}
      className="rounded-full ring-1 ring-secondary-300 ml-2"
      alt={alt}
    />
  );
};

export default Avatar;
