import  { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export interface Blog{
    "content": string,
    "title": string,
    "publishedAt": string,
    "tags": string[],
    "author": {
        "name": string,
        "id": string
    },
    "id": string,
    "isPremium": boolean
}
export interface User{
    "id": string,
    "name": string,
    "email": string,
}
export interface Comment{
    "id": string,
    "content": string,
    "createdAt": string,
    "userId": string,
    "postId": string,
    "user": {
        "name": string
    }
}
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null); 
  useEffect(() => {
      const token = localStorage.getItem("token");
      
      axios
          .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
          .then((res) => {
              setBlog(res.data.blog); 
              setLoading(false);
          })
          .catch((error) => {
              console.error("Error fetching blog:", error);
              setLoading(false);
          });
  }, [id]);

  return { loading, blog };
};export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])
    // console.log(localStorage.getItem('token'))
    useEffect(()=>{
        const token = localStorage.getItem('token')
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            
            headers: { 
                Authorization: `Bearer ${token}`
            }
        })
            .then(res =>{
                setBlogs(res.data.blogs)
                setLoading(false)
            })
    }, [])
  return ({

      loading,
      blogs
    }
  )
}
export const useUser = () => {
    const [user, setUser] = useState<User | null>(null)
    // console.log(localStorage.getItem('token'))
    useEffect(()=>{
        const token = localStorage.getItem('token')
        axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: { 
                Authorization: `Bearer ${token}`
            }
        })
            .then(res =>{
                setUser(res.data.user)
            
            })
    }, [])
  return ({
        user
    }
  )
}

export const useComments = ({id}:{id: string}) => {
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState<Comment[]>([])
    // console.log(localStorage.getItem('token'))
    useEffect(()=>{
        const token = localStorage.getItem('token')
        axios.get(`${BACKEND_URL}/api/v1/blog/comments/${id}`, {
            
            headers: { 
                Authorization: `Bearer ${token}`
            }
        })
            .then(res =>{
                setComments(res.data.comments)
                setLoading(false)
            })
    }, [id])
  return ({
      loading,
      comments
    }
  )
}

type Plan = {
    id: string;
    name: string;
    price: number;
    details: string;
};
  
  export const usePlans = (token: string | null) => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPlans = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/plans`);
          setPlans(response.data);
        } catch (error) {
          console.error("Error fetching plans:", error);
        }
      };
  
      const fetchSubscriptionStatus = async () => {
        if (!token) return;
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/subscription-status`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.isSubscribed) {
            setCurrentPlan(response.data.plan);
          }
        } catch (error) {
          console.error("Error fetching subscription status:", error);
        }
      };
  
      Promise.all([fetchPlans(), fetchSubscriptionStatus()]).finally(() => setLoading(false));
    }, [token]);
  
    return { plans, currentPlan, setCurrentPlan, loading };
  };