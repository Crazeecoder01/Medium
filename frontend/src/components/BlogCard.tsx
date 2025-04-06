import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscribeButton from "./SubscribeButton";
import TipButton from "./TipButton";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { AccessModal } from "./AccessModal";
import { Gem } from "lucide-react"; // Lucide Premium Icon

interface BlogCardProps {
  id: string;
  authorName: string;
  authorId: string;
  title: string;
  content: string;
  publishedAt: string;
  tags?: string[];
  isPremium?: boolean;
}

export const BlogCard = ({
  id,
  authorName,
  authorId,
  title,
  content,
  publishedAt,
  tags,
  isPremium,
}: BlogCardProps) => {
  const publishedDate = publishedAt.substring(0, 10);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBlogAccess = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (res.status === 200 && res.data.blog) {
        navigate(`/blog/${id}`);
      } else if (res.data.status === 403) {
        setShowModal(true);
      } else {
        console.log("Blog not found or other issue.");
      }
    } catch (error) {
      console.error("Error checking blog access", error);
    }
  };

  return (
    <div
      className={`relative border-b p-4 w-full max-w-4xl mx-auto rounded-2xl backdrop-blur-md transition-all duration-300 ${
        isPremium
          ? "border-transparent shadow-lg bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
          : "border-gray-200 bg-white"
      } hover:shadow-xl group`}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-2 right-2 bg-yellow-400/90 text-white text-xs px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
          <Gem className="w-4 h-4" />
          Premium
        </div>
      )}

      {/* Author Section */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Avatar name={authorName} />
        <div className="text-sm text-gray-700 flex items-center gap-2">
          <span className="font-semibold">{authorName}</span>
          <span className="text-gray-500 hidden sm:inline">•</span>
          <span className="text-gray-500">{publishedDate}</span>
        </div>
        <div className="ml-auto sm:ml-0">
          <SubscribeButton writerId={authorId} />
        </div>
      </div>

      {/* Content Section */}
      <div onClick={handleBlogAccess} className="cursor-pointer">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Text Content */}
          <div className="flex flex-col w-full md:w-[65%] space-y-2">
            <h2 className="text-lg md:text-xl font-bold leading-tight line-clamp-2 flex items-center gap-2 text-gray-900 group-hover:underline">
              {title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
              {content.slice(0, 100)}
              {content.length > 100 ? "..." : ""}
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="w-full md:w-[30%] h-[120px] md:h-[140px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-gray-500 text-sm font-medium shadow-inner">
            Image
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          {tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs px-3 py-1 rounded-full capitalize font-medium shadow-sm"
            >
              #{tag}
            </span>
          ))}
          <span className="text-gray-500 text-xs sm:text-sm">{`${Math.ceil(
            content.length / 100
          )} min read`}</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
          <TipButton writerId={authorId} />
          <button
            onClick={() => setSaved(!saved)}
            className="text-blue-600 text-xs sm:text-sm font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors border border-blue-100"
          >
            {saved ? "Unsave" : "Save"}
          </button>
        </div>
      </div>

      {showModal && <AccessModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export function Avatar({ name }: { name: string }) {
  const initial = name?.charAt(0)?.toUpperCase() || "";
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 shadow-md">
      <span className="text-white text-sm font-semibold">{initial}</span>
    </div>
  );
}
