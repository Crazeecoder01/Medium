export const AccessModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 backdrop-brightness-50 backdrop-blur-xl bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-2xl w-80 border border-white/20 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300 opacity-30 blur-2xl z-[-1]"></div>

            <h2 className="text-xl font-bold mb-2 text-gray-800">🚫 Access Denied</h2>
            <p className="text-sm text-gray-700 mb-6">
                This is a <span className="font-medium text-purple-700">premium blog</span>. Please subscribe to unlock it.
            </p>

            <button
                onClick={onClose}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md font-medium hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
                Close
            </button>
        </div>
    </div>
);
