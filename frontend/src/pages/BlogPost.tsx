import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Comment } from "../components/PostComment";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";

export const BlogPost = () => {
    const { id = "" } = useParams<{ id?: string }>(); // Ensure id is always a string
    console.log("Blog ID:", id);

    const { loading, blog } = useBlog({ id });

    if (loading) {
        return <FullBlogSkeleton />;
    }

    if (!blog) {
        return <p>Blog not found</p>;
    }

    console.log("Blog data:", blog);

    return (
        <>
            <FullBlog blog={blog} />
            <Comment />
        </>
    );
};
