import axios from "axios";
import SubscriptionCard from "../components/SubscriptionCard";
import SubscriptionSkeleton from "../components/SubscriptionSkeleton";
import { usePlans } from "../hooks";
import { BACKEND_URL } from "../config";
interface Plan {
    id: string;
    name: string;
    price: number;
    details: string;
  }
const Subscription = () => {
  const token = localStorage.getItem("token");
  const { plans, currentPlan, setCurrentPlan, loading } = usePlans(token);

  return (
    <div className="flex flex-col h-screen items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Choose Your Subscription</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full p-4">
          {[...Array(3)].map((_, index) => (
            <SubscriptionSkeleton key={index} />
          ))}
        </div>
      ) : currentPlan ? (
        <div className="text-center mb-6">
          <p className="text-lg">
            You are subscribed to <strong>{currentPlan.name}</strong>
          </p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={async () => {
              await axios.post(`${BACKEND_URL}/api/v1/user/cancel-subscription`, {}, {
                headers: { Authorization: `Bearer ${token}` }
              });
              setCurrentPlan(null);
            }}
          >
            Cancel Subscription
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full p-4">
          {plans.map((plan) => (
            <SubscriptionCard key={plan.id} plan={plan} setCurrentPlan={setCurrentPlan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscription;
