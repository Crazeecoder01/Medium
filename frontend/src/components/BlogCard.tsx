import { useState } from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedAt: string;
    tags?: string[];
}

export const BlogCard = ({id, authorName, title, content, publishedAt, tags }: BlogCardProps) => {
    const publishedDate = publishedAt.substring(0, 10);
    const [saved, setSaved] = useState(false);

    return (
        <div className="border-b border-gray-200 p-4 w-full max-w-4xl mx-auto ">
        
            <div className="flex items-center gap-3 mb-3">
                <Avatar name={authorName} />
                <div className="text-sm text-gray-700">
                    <span className="font-semibold">{authorName}</span> • <span className="text-gray-500">{publishedDate}</span>
                </div>
            </div>
            <Link to={`/blog/${id}`}>
            <div className="flex flex-col md:flex-row justify-between gap-4">

                <div className="flex flex-col w-full md:w-[65%] space-y-2">
                    <h2 className="text-lg md:text-xl font-bold leading-tight">{title}</h2>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {content.slice(0, 100)}{content.length>100? "...." : ""}
                    </p>
                </div>

                <div className="w-full md:w-[30%] h-[120px] md:h-[140px] bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Image</span>
                </div>
            </div>
            </Link>

   
            <div className="flex justify-between items-center mt-3">
                <div className="flex flex-wrap gap-2">
                    {tags?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md capitalize">
                            {tag}
                        </span>
                    ))}
                    <span className="text-gray-500 text-sm">{`${Math.ceil(content.length / 100)} min read`}</span>
                </div>
                <button onClick={() => setSaved(!saved)} className="text-blue-500 text-sm">
                    {saved ? "Unsave" : "Save"}
                </button>
            </div>
        </div>
    );
};

export function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-600">
            <span className="text-gray-300 text-sm md:text-base font-medium capitalize">{name[0]}</span>
        </div>
    );
}
