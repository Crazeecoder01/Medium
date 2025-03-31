import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupInput, SigninInput } from "@himanshu01/blog-common";
import { BACKEND_URL } from "../config";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    type AuthInput<T extends "signup" | "signin"> = T extends "signup"
    ? SignupInput
    : SigninInput;
    const navigate = useNavigate();
    type AuthData = AuthInput<typeof type>
    const [postInputs, setPostInputs] = useState<AuthData>(
        type === "signup"
          ? { name: "", email: "", password: "" }
          : { email: "", password: "" }
    );
    
    async function sendRequest(){
        try{
           const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"?"signup":"signin"}`, {
                ...postInputs
           })
           

           if (response.data.message) {
            alert(response.data.message);  // Show alert with the message from backend
            return;
         }
            const jwt = response.data;
            
            localStorage.setItem("token", jwt.jwt);
            navigate("/blogs");
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message || "An error occurred. Please try again.");
            } else {
                alert("Network error. Please check your connection.");
            }
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        
        {/* {JSON.stringify(postInputs)} */}
        <div className="flex justify-center">
            <div>
                <div className="px-10 flex flex-col justify-center items-center gap-2">
                    <div className="text-4xl font-extrabold">
                        <h1>

                        {type === "signup" ? "Create an Account" : "Welcome Back!"}
                        </h1>
                        
                    </div>
                    <div className="text-slate-500">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-8">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Himanshu Gupta..." onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Email" placeholder="himanshu@gmail.com" onChange={(e) => {
                       setPostInputs({
                        ...postInputs, //give me existing values and then override with the new values
                        email: e.target.value
                       })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="df@erf&*89OJH" onChange={(e) => {
                       setPostInputs({
                        ...postInputs,
                        password: e.target.value
                       })
                    }} />
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        {type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}