import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useEffect } from "react";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
        }
      }, [navigate]);
    if (loading || !blogs) {
        return (
            <>
            <AppBar/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            </>
        );
    }

    return (
        <>
            <AppBar />
            <main className="flex flex-col items-center px-4">
        
            
                <div className="w-full max-w-4xl">
                   
                    {blogs.length === 0 ? (
                        <p className="text-gray-500 text-center py-10">No blogs available</p>
                    ) : (
                        blogs.map((blog) => (
                            <article key={blog.id} className="w-full">
                               
                                <BlogCard
                                    id= {blog.id}
                                    authorName={blog.author.name}
                                    authorId={blog.author.id}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedAt={blog.publishedAt}
                                    tags={blog.tags}
                                />
                            </article>
                            
                        ))
                    )}
                </div>
            </main>
        </>
    );
};
