import { useState } from "react";
import { Avatar } from "./BlogCard";

interface ProfileIconProps {
  name: string;
  email: string;
  avatarSrc: string;
}

export const ProfileIcon = ({ name, email, avatarSrc }: ProfileIconProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
 
      {/* <img
        id="avatarButton"
        className="w-10 h-10 rounded-full cursor-pointer"
        src={avatarSrc}
        alt="User dropdown"
        onClick={() => setIsOpen((prev) => !prev)}
      /> */}
      <div  onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer rounded-full flex items-center justify-center">
      <Avatar name={name} />
      </div>
        
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{name}</div>
            <div className="font-medium truncate">{email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
