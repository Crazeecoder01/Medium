import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { Comment } from "../components/PostComment";


export const BlogPost = () => {
    const { id } = useParams<{ id: string }>(); //Dynamic route params
    console.log(id)
    const { loading, blog } = useBlog({id:id || ''});

   

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-gray-500 text-lg font-semibold">
                    <Spinner/>
                </div>
            </div>
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


