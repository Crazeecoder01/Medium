import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const TextEditor = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/user/subscription-status`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setIsPremium(res.data.isSubscribed);
            } catch (err) {
                console.error("Failed to fetch subscription status:", err);
                setIsPremium(false);
            } 
        };

        fetchSubscriptionStatus();
    }, []);

    const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTag.trim()) {
            e.preventDefault();
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    const handleAISuggest = async () => {
        if (!title || !description) {
            alert("Title and content are required for AI suggestions.");
            return;
        }

        setAiLoading(true);
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/ai/generate`, {
                title,
                content: description
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

            const aiText = res.data.suggestion;
            setDescription( aiText);
        } catch (err) {
            console.error("AI Suggestion failed:", err);
            alert("Failed to get AI suggestion.");
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full px-4">

                <input 
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="w-full p-4 text-2xl font-bold border rounded-lg focus:outline-none mb-6"
                    placeholder="Enter post title..."
                />

                <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tags (press Enter to add)"
                        className="w-full p-2 border rounded-lg focus:outline-none "
                    />
                </div>

                <TextEditorFunc
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleAISuggest}
                        className={aiLoading||!isPremium? "px-4 py-2 bg-purple-400 text-white rounded-lg opacity-80 cursor-not-allowed":"px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"}
                        disabled={aiLoading || !isPremium}
                        title={!isPremium ? "This feature is only available for premium users." : ""}
                    >   
                        {aiLoading ? "Generating..." : `${isPremium? "🪄" : ""}AI Suggest`}
                    </button>

                    <button
                        onClick={async () => {
                            try {
                                const response = await axios.post(
                                    `${BACKEND_URL}/api/v1/blog`,
                                    {
                                        title,
                                        content: description,
                                        authorId: "", // TODO: Replace or get from context
                                        tags
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem("token")}`
                                        }
                                    }
                                );
                                navigate(`/blog/${response.data.id}`);
                            } catch (error) {
                                console.error("Publishing failed:", error);
                                alert("Failed to publish post. Please check your authentication.");
                            }
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditorFunc({
    value,
    onChange,
}: {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
    return (
        <div className="w-full mb-6 border rounded-lg bg-white shadow-sm">
            <div className="p-4">
                <textarea
                    onChange={onChange}
                    value={value}
                    id="editor"
                    rows={12}
                    className="w-full text-gray-800 bg-white focus:outline-none text-lg resize-none"
                    placeholder="Start writing your story here..."
                    style={{ minHeight: "400px" }}
                />
            </div>
        </div>
    );
}
