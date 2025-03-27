import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Welcome to MediumX</h1>
      <p className="mt-4 text-lg text-gray-600">
        Your journey of writing and discovering new ideas begins here.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/write")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Start Writing
        </button>
        <button
          onClick={() => navigate("/explore")}
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition"
        >
          Explore Articles
        </button>
      </div>

      <img
        src="https://source.unsplash.com/800x400/?writing,blog"
        alt="Writing"
        className="mt-10 w-full max-w-3xl rounded-lg shadow-lg"
      />
    </div>
  );
}
