import { motion } from "framer-motion";

export const GlowingButton = ({ text = "Click Me" , icon}) => {
    return (
        <motion.button
            className="relative flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg shadow-lg overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            
                {text} {icon}
            
            <motion.div
                className="absolute inset-0 bg-white opacity-20"
                style={{
                    width: "150%",
                    height: "100%",
                    background: "linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 70%)",
                }}
                animate={{
                    x: ["-150%", "150%"],
                    transition: { duration: 2.5, repeat: Infinity, ease: "linear" },
                }}
            />

            <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                    boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.6)",
                }}
                animate={{
                    boxShadow: [
                        "0px 0px 10px rgba(255,255,255,0.5)",
                        "0px 0px 20px rgba(255,255,255,0.8)",
                        "0px 0px 10px rgba(255,255,255,0.5)",
                    ],
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
            />
        </motion.button>
    );
};
