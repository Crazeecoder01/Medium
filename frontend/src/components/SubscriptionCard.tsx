import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Plan Type
interface Plan {
  id: string;
  name: string;
  price: number;
  details: string;
}

interface SubscriptionCardProps {
  plan: Plan;
  setCurrentPlan: (plan: Plan | null) => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ plan, setCurrentPlan }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
    const navigate = useNavigate()
  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/subscribe`,
        { planId: plan.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentPlan(response.data);
      navigate("/dashboard")
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 p-6 rounded-xl shadow-lg bg-white text-center w-full max-w-sm transition-transform transform hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>
      <ul className="text-gray-600 text-justify p-2  text-sm mt-2 list-disc pl-5">
        {plan.details.split('. ').map((point, index) => (
            <li className="m-2" key={index}>{point}</li>
        ))}
        </ul>
      <div className="mt-4">
        <span className="text-4xl font-semibold text-blue-600">
          {plan.price === 0 ? "Free" : `$${(plan.price / 100).toFixed(2)}`}
        </span>
        {plan.price > 0 && <span className="text-gray-500 text-sm"> / month</span>}
      </div>
      
      <button
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 flex justify-center items-center gap-2"
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin w-5 h-5" /> : "Subscribe Now"}
      </button>
    </div>
  );
};

export default SubscriptionCard;
