import { useState } from "react";
import { Avatar } from "./BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";

interface ProfileIconProps {
  name: string;
  email: string;
  avatarSrc: string;
}

export const ProfileIcon = ({ name, email, avatarSrc }: ProfileIconProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
    const handleSignout = async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signout`, 
          {},  // Empty body for signout request
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
              }
          }
        )
        if (response.status === 200) {
          localStorage.removeItem("token"); 
          navigate("/signin", { replace: true });
        } else {
            console.error("Sign out failed");
        }
    }
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
        <div className="absolute right-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 ">
          <div className="px-4 py-3 text-sm text-gray-900 ">
            <div>{name}</div>
            <div className="font-medium truncate">{email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 ">
            <li>
              <Link to={'/dashboard'}
                
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 "
              >
                Dashboard
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Settings
              </a>
            </li>
            
          </ul>
          <div className="py-1 flex justify-center">
            <button
              onClick={handleSignout}
              className="block w-full py-2 text-sm text-gray-700 hover:bg-gray-100 "
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
