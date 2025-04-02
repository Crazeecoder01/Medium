import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { Loader2, Send } from "lucide-react";

interface TipButtonProps {
  writerId: string;
}

const TipButton = ({ writerId }: TipButtonProps) => {
  const [amount, setAmount] = useState(5); // Default tip amount
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendTip = async () => {
    setLoading(true);
    setMessage("");

    try {
        await axios.post(
          `${BACKEND_URL}/api/v1/user/tips`,
          { writerId, amount },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setMessage("Tip sent successfully! 🎉");
        setTimeout(() => {
          setMessage  ("");
        }
        , 3000);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to send tip.");
      } finally {
        setLoading(false);
      }
    };
    return (
      <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-md">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="1"
          className="border border-gray-300 p-2 w-20 text-center rounded-lg outline-none focus:border-blue-500 transition"
          placeholder="💰 Amount"
        />
    
        <button
          onClick={sendTip}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" /> Send Tip
            </>
          )}
        </button>
    
        {message && <p className="text-sm text-green-600 font-medium">{message}</p>}
      </div>
    );
};

export default TipButton;
