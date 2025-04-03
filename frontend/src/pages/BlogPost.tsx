import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { Comment } from "../components/PostComment";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";


export const BlogPost = () => {
    const { id } = useParams<{ id: string }>(); //Dynamic route params
    console.log(id)
    const { loading, blog } = useBlog({id:id || ''});

   

    if (loading) {
        return (
           
            <FullBlogSkeleton/>
        );
    }
    console.log(blog)
    

    return (
        <>
        <FullBlog blog={blog} />
        <Comment />
        </>
    );
};


