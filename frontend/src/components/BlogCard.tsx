import { useState } from "react";
import { Link } from "react-router-dom";
import SubscribeButton from "./SubscribeButton";
import TipButton from "./TipButton";

interface BlogCardProps {
    id: string;
    authorName: string;
    authorId: string,
    title: string;
    content: string;
    publishedAt: string;
    tags?: string[];
}

export const BlogCard = ({id, authorName, authorId, title, content, publishedAt, tags }: BlogCardProps) => {
    const publishedDate = publishedAt.substring(0, 10);
    const [saved, setSaved] = useState(false);

    return (
        <div className="border-b border-gray-200 p-4 w-full max-w-4xl mx-auto">
            {/* Author Section */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Avatar name={authorName} />
                <div className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="font-semibold">{authorName}</span>
                    <span className="text-gray-500 hidden sm:inline">•</span>
                    <span className="text-gray-500">{publishedDate}</span>
                </div>
                <div className="ml-auto sm:ml-0">
                    <SubscribeButton writerId={authorId}  />
                </div>
            </div>

            {/* Content Section */}
            <Link to={`/blog/${id}`} className="block">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    {/* Text Content */}
                    <div className="flex flex-col w-full md:w-[65%] space-y-2">
                        <h2 className="text-lg md:text-xl font-bold leading-tight line-clamp-2">
                            {title}
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                            {content.slice(0, 100)}{content.length > 100 ? "..." : ""}
                        </p>
                    </div>

                    {/* Image Placeholder */}
                    <div className="w-full md:w-[30%] h-[120px] md:h-[140px] bg-gray-300 rounded-lg flex items-center justify-center aspect-video md:aspect-auto">
                        <span className="text-gray-500 text-xs">Image</span>
                    </div>
                </div>
            </Link>

            {/* Footer Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                <div className="flex flex-wrap gap-2 items-center">
                    {tags?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md capitalize">
                            {tag}
                        </span>
                    ))}
                    <span className="text-gray-500 text-xs sm:text-sm">
                        {`${Math.ceil(content.length / 100)} min read`}
                    </span>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
                    <div className="flex gap-2">
                        <TipButton writerId={authorId} />
                        <button 
                            onClick={() => setSaved(!saved)} 
                            className="text-blue-500 text-xs sm:text-sm hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
                        >
                            {saved ? "Unsave" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function Avatar({ name }: { name: string }) {
    const initial = name?.charAt(0)?.toUpperCase() || "";
    return (
        <div className="relative inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-600 flex-shrink-0">
            <span className="text-gray-300 text-xs sm:text-sm md:text-base font-medium">
                {initial}
            </span>
        </div>
    );
}