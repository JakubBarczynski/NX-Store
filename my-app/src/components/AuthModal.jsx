import { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function AuthModal({ isOpen, onClose, setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const { fetchCart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin
        ? "http://localhost:5000/auth/login"
        : "http://localhost:5000/auth/signup";

      const data = isLogin
        ? { email, password }
        : { email, password, full_name: fullName };

      const res = await axios.post(endpoint, data);

      // Save token
      localStorage.setItem("token", res.data.token);

      // 🔥 IMPORTANT: Update global login state
      if (isLogin) {
        setIsLoggedIn(true);
        fetchCart();
      }

      // Reset form
      setEmail("");
      setPassword("");
      setFullName("");

      onClose();

    } catch (err) {
      console.log("ERROR OBJECT:", err);

      if (err.response) {
        console.log("STATUS:", err.response.status);
        console.log("DATA:", err.response.data);
      } else {
        console.log("NO RESPONSE RECEIVED");
        console.log("REQUEST:", err.request);
        console.log("MESSAGE:", err.message);
      }

      setError(err.response?.data?.error || err.message || "Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] border border-gray-800 p-8 rounded-2xl w-96 relative">
            
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
                ✕
            </button>

            {/* Header */}
            <p className="text-[rgb(223,153,3)] text-xs uppercase tracking-[0.3em] mb-2">
                {isLogin ? "Welcome Back" : "Get Started"}
            </p>
            <h2 className="text-white text-2xl font-bold mb-6">
                {isLogin ? "Login" : "Sign Up"}
            </h2>

            {/* Divider */}
            <div className="w-8 h-px bg-[rgb(223,153,3)] mb-6"></div>

            {/* Error */}
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            {/* Full name field */}
            {!isLogin && (
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#111] border border-gray-800 text-white placeholder-gray-600 px-4 py-3 rounded-xl mb-3 focus:outline-none focus:border-[#d4a96a] transition-colors"
                />
            )}

            {/* Email field */}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111] border border-gray-800 text-white placeholder-gray-600 px-4 py-3 rounded-xl mb-3 focus:outline-none focus:border-[#d4a96a] transition-colors"
            />

            {/* Password field */}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111] border border-gray-800 text-white placeholder-gray-600 px-4 py-3 rounded-xl mb-6 focus:outline-none focus:border-[#d4a96a] transition-colors"
            />

            {/* Submit button */}
            <button
                onClick={handleSubmit}
                className="w-full bg-[rgb(223,153,3)] text-black font-semibold py-3 rounded-xl mb-4 hover:bg-[#c49858] transition-colors"
            >
                {isLogin ? "Login" : "Sign Up"}
            </button>

            {/* Switch form */}
            <p className="text-gray-500 text-sm text-center">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span
                    className="text-[rgb(223,153,3)] cursor-pointer hover:text-[#c49858] transition-colors"
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setEmail("");
                        setPassword("");
                        setFullName("");
                    }}
                >
                    {isLogin ? "Sign Up" : "Login"}
                </span>
            </p>

        </div>
    </div>
  );
}