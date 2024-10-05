import Image from "next/image";

type AvatarType = {
  src: string;
  width?: number;
  alt: string;
};

const Avatar = ({ src, width = 24, alt }: AvatarType) => {
  return (
    <Image
      src={src || "images/avatar.png"}
      width={width}
      height={width}
      className="rounded-full ring-1 ring-secondary-300 ml-2"
      alt={alt}
    />
  );
};

export default Avatar;
