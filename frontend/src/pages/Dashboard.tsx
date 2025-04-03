import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Loader, AlertTriangle, Users, DollarSign, CheckCircle, Gift, Crown } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
        if (!res.data.activePlan) {
            setShowPopup(true);
          }
      } catch (err) {
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-gray-700" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-5 flex items-center justify-center">
        <AlertTriangle className="mr-2" /> {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Dashboard Overview
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              Your account summary and statistics
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Subscribers",
                value: data.subscribersCount,
                color: "bg-blue-100 text-blue-800",
                icon: <Users className="w-8 h-8" />,
              },
              {
                label: "Writers Subscribed",
                value: data.subscriptionsCount,
                color: "bg-green-100 text-green-800",
                icon: <CheckCircle className="w-8 h-8" />,
              },
              {
                label: "Tips Received",
                value: `$${data.totalTipsReceived}`,
                color: "bg-yellow-100 text-yellow-800",
                icon: <DollarSign className="w-8 h-8" />,
              },
              {
                label: "Tips Given",
                value: `$${data.totalTipsGiven}`,
                color: "bg-red-100 text-red-800",
                icon: <Gift className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.color} p-6 rounded-xl shadow-sm transition-all hover:shadow-md`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-full bg-white bg-opacity-50">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-medium">{item.label}</h3>
                  <p className="text-3xl font-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          { (
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-2">Your Active Plan</h2>
                <p className="text-2xl uppercase font-semibold text-yellow-300">{data.activePlan?.name}</p>
                <p className="text-lg  mb-6">${data.activePlan?.price}/month</p>
                {data.activePlan?null: (<Link to={'/subscription'} className="px-6 py-3 bg-white text-purple-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors">
                  Manage Subscription
                </Link>)}
              </div>
            </div>
          )}

            {showPopup && (
            <div className="fixed inset-0.5 flex items-start justify-end p-4">
                <div className="bg-yellow-200 text-yellow-900 rounded-xl shadow-lg p-6 flex items-center space-x-4 relative animate-slide-in">
                <Crown className="w-10 h-10" />
                <div>
                    <h2 className="text-2xl font-bold">Premium Content Access</h2>
                    <p className="text-lg">Enjoy exclusive premium content with your subscription.</p>
                </div>
                <button 
                    className="absolute top-2 right-2 text-yellow-900 font-bold hover:text-yellow-700 transition-colors" 
                    onClick={() => setShowPopup(false)}
                >
                    ✕
                </button>
                </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
