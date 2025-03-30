import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState, ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks";
import { Avatar } from "./BlogCard";

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    user: {
        name: string;
    };
}

export const Comment = () => {
    const [description, setDescription] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const { user } = useUser();
    const { id: postId } = useParams<{ id: string }>(); 
    const name = user?.name || "Anonymous";

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/comments/${postId}`, {
                    params: { id: postId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        if (postId) {
            fetchComments();
        }
    }, [postId]);

    return (
        <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-2xl mx-auto flex flex-col rounded-lg p-6">
                {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Post a Comment</h2> */}
                <div className="flex items-center gap-3 mb-4">
                    <Avatar name={name} />
                    <span className="text-gray-700 font-medium">{user?.name}</span>
                </div>
                <TextEditor onChange={(e) => setDescription(e.target.value)} value={description} />
                
                <button
                    onClick={async () => {
                        try {
                            const response = await axios.post(
                                `${BACKEND_URL}/api/v1/blog/comments`,
                                { postId, content: description, userId: user?.id || "", createdAt: new Date().toISOString() },
                                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                            );
                            setComments([...comments, { id: response.data.id, content: description, createdAt: new Date().toISOString(), user: { name } }]);
                            setDescription("");
                        } catch (error) {
                            console.error("Publishing failed:", error);
                            alert("Failed to publish comment. Please check your authentication.");
                        }
                    }}
                    className="mt-4 flex-end cursor-pointer w-[20%] px-5 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                >
                    Post
                </button>
            </div>
            <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Comments</h2>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="p-6 border-b rounded-lg mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Avatar name={comment.user.name} />
                                <span className="text-gray-900 font-medium">{comment.user.name}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1"><span className="font-semibold text-gray-700">Posted on: </span>{new Date(comment.createdAt).toLocaleString().slice(0,9)}</p>
                            <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No comments yet.</p>
                )}
            </div>
        </div>
    );
};

function TextEditor({ onChange, value }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void; value: string }) {
    return (
        <div className="w-full mb-4 border rounded-lg bg-gray-50 shadow-sm">
            <textarea
                onChange={onChange}
                value={value}
                rows={5}
                className="w-full p-3 text-gray-800 bg-white focus:outline-none text-base resize-none rounded-md border border-gray-300 "
                placeholder="Write your comment..."
            />
        </div>
    );
}
