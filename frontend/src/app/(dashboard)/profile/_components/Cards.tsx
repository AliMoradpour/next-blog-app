import {
    UserGroupIcon,
    ChatBubbleBottomCenterTextIcon,
    DocumentIcon,
  } from "@heroicons/react/24/outline";
  import { FC } from "react";
  
  // Define the valid keys for the iconMap
  type IconType = "comments" | "users" | "posts";
  
  // Map the keys to their corresponding icons
  const iconMap: Record<IconType, React.ComponentType<{ className?: string }>> = {
    comments: ChatBubbleBottomCenterTextIcon,
    users: UserGroupIcon,
    posts: DocumentIcon,
  };
  
  // Define the props for the Card component
  interface CardProps {
    title: string;
    value: string | number;
    type: IconType;
  }
  
  export const Card: FC<CardProps> = ({ title, value, type }) => {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-secondary-50 p-2 shadow-sm">
        <div className="flex p-4 text-secondary-600">
          {Icon && <Icon className="h-5 w-5" />}
          <h3 className="mr-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`truncate rounded-xl bg-secondary-0 px-4 py-8 text-center text-2xl text-secondary-500`}
        >
          {value}
        </p>
      </div>
    );
  };
  