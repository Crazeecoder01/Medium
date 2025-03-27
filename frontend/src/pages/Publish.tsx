import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { AppBar } from "../components/AppBar";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const navigate = useNavigate();

    // Handle tag input
    const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTag.trim()) {
            e.preventDefault();
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AppBar />
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

                    <TextEditor onChange={(e) => setDescription(e.target.value)} />
                   
                    <button 
                        onClick={async () => {
                            try {
                                const response = await axios.post(
                                    `${BACKEND_URL}/api/v1/blog`,
                                    { 
                                        title, 
                                        content: description,
                                        authorId:"", 
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
                        className="mt-6 w-full px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    )
}

// TextEditor component remains the same
function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="w-full mb-6 border rounded-lg bg-white shadow-sm">
            <div className="p-4">
                <textarea 
                    onChange={onChange}
                    id="editor"
                    rows={12}
                    className="w-full text-gray-800 bg-white focus:outline-none text-lg resize-none"
                    placeholder="Start writing your story here..."
                    style={{ minHeight: '400px' }}
                />
            </div>
        </div>
    )
}