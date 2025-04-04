import axios from "axios";
import {  useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { Check, Loader2 } from "lucide-react";

interface SubscribeButtonProps {
  writerId: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ writerId }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(()=>{
    const checkSubscription = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/user/writer-subscriptions/${writerId}`,
       
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setSubscribed(res.data.subscribed);
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };
    checkSubscription();
  },[writerId])
 
  const subscribeToWriter = async () => {
    setLoading(true);
    setMessage("");

    try {
        await axios.post(
          `${BACKEND_URL}/api/v1/user/writer-subscriptions`,
          { writerId },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
       
        setSubscribed(true);
        setMessage("Subscribed successfully! 🎉");
        setTimeout(() => {
          setMessage("");
        }
        , 3000);
      } catch (error) {
        console.error("Error subscribing to writer:", error);
        setMessage( "Failed to subscribe.");
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
    <button
      onClick={subscribeToWriter}
      disabled={loading || subscribed}
      className={`flex items-center gap-2 px-4 py-2 rounded font-semibold shadow-md transition-all duration-300
        ${subscribed ? " text-gray-500 shadow-none cursor-not-allowed" : " bg-gradient-to-r to-red-500 from-orange-500 rounded-full text-white hover:bg-green-600 hover:shadow-lg"}
      `}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" /> Subscribing...
        </>
      ) : subscribed ? (
        <>
          Subscribed <Check size={16}/>
        </>
      ) : (
        "Subscribe"
      )}
    </button>

    {message && <p className="text-sm text-green-500 font-medium">{message}</p>}
  </div>
  );
};

export default SubscribeButton;
