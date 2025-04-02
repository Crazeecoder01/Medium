import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

interface PremiumContentProps {
  postId: string;
}

const PremiumContent: React.FC<PremiumContentProps> = ({ postId }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/blog/${postId}/access`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setHasAccess(data.hasAccess);
      } catch (error) {
        setMessage(error.response?.data?.message || "No access to this content.");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [postId]);

  if (loading) return <p>Loading...</p>; 

  return (
    <div>
      {hasAccess ? (
        <p>You have access to this premium content! 🎉</p>
      ) : (
        <p className="text-red-500">{message}</p>
      )}
    </div>
  );
};

export default PremiumContent;
