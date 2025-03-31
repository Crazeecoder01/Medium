import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
    <div className="flex flex-col sm:flex-row items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl md:text-6xl flex items-center gap-2">
        Welcome to
      </h1>
      <span className="text-blue-600 ml-2"><Logo /></span>
    </div>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Your journey of writing and discovering new ideas begins here.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/publish")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105"
        >
          Start Writing
        </button>
        <button
          onClick={() => navigate("/blogs")}
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition transform hover:scale-105"
        >
          Explore Articles
        </button>
      </div>

      
    </div>
    </>
  );
}
