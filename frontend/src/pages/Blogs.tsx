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
                <AppBar />
                <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
                    <div className="w-full max-w-4xl">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <AppBar />
            <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
                <div className="w-full max-w-4xl">
                    {blogs.length === 0 ? (
                        <p className="text-gray-500 text-center py-10 text-lg">
                            No blogs available
                        </p>
                    ) : (
                        blogs.map((blog) => (
                            <article
                                key={blog.id}
                                className="w-full p-4 sm:p-6 md:p-8 rounded-lg bg-white shadow-lg transition-transform hover:scale-[1.02]">
                                <BlogCard
                                    id={blog.id}
                                    authorName={blog.author.name}
                                    authorId={blog.author.id}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedAt={blog.publishedAt}
                                    tags={blog.tags}
                                    isPremium={blog.isPremium}
                                />
                            </article>
                        ))
                    )}
                </div>
            </main>
        </>
    );
};
