import { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function AuthModal({ isOpen, onClose, setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { fetchCart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let endpoint;
      let data;

      if (isLogin) {
        endpoint = "http://localhost:5000/auth/login";
        data = { email, password };
      } else if (isForgotPassword && !codeSent) {
        endpoint = "http://localhost:5000/auth/send-reset-code";
        data = { email };
      } else if (isForgotPassword && codeSent) {
        endpoint = "http://localhost:5000/auth/reset-password";
        data = { email, password: newPassword, code_input: codeInput };
      } else if (!isLogin && !codeSent) {
        endpoint = "http://localhost:5000/auth/send-code";
        data = { email };
      } else {
        endpoint = "http://localhost:5000/auth/signup";
        data = { email, password, full_name: fullName, code_input: codeInput };
      }

      const res = await axios.post(endpoint, data);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
        fetchCart();
        onClose();
        setEmail(""); setPassword("");
      } else if (isForgotPassword && !codeSent) {
        setCodeSent(true);
      } else if (isForgotPassword && codeSent) {
        setIsForgotPassword(false);
        setCodeSent(false);
        setEmail(""); setNewPassword(""); setCodeInput("");
        onClose();
      } else if (!isLogin && !codeSent) {
        setCodeSent(true);
      } else {
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
        fetchCart();
        onClose();
        setEmail(""); setPassword(""); setFullName(""); setCodeSent(false); setCodeInput("");
      }

    } catch (err) {
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
                {isForgotPassword ? "Reset Password" : isLogin ? "Welcome Back" : "Get Started"}
            </p>
            <h2 className="text-white text-2xl font-bold mb-6">
                {isForgotPassword ? "Forgot Password" : isLogin ? "Login" : "Sign Up"}
            </h2>

            {/* Divider */}
            <div className="w-8 h-px bg-[rgb(223,153,3)] mb-6"></div>

            {/* Error */}
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            {/* Forgot Password Flow */}
            {isForgotPassword ? (
                <>
                    {!codeSent ? (
                        <>
                            <p className="text-gray-400 text-sm mb-4">Enter your email and we'll send you a reset code.</p>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#111] border border-gray-800 text-white placeholder-gray-600 px-4 py-3 rounded-xl mb-6 focus:outline-none focus:border-[#d4a96a] transition-colors"
                            />
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-[rgb(223,153,3)] text-black font-semibold py-3 rounded-xl mb-4 hover:bg-[#c49858] transition-colors"
                            >
                                Send Reset Code
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-400 text-sm mb-4">Enter the code sent to {email} and your new password.</p>
                            <input
                                type="text"
                                placeholder="6-digit code"
                                value={codeInput}
                                onChange={(e) => setCodeInput(e.target.value)}
                                className="w-full bg-[#111] border border-gray-800 text-white placeholder-gray-600 px-4 py-3 rounded-xl mb-3 focus:outline-none focus:border-[#d4a96a] transition-colors"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full bg-[#111] border border-gray-800 text-white placeholder-gray-600 px-4 py-3 rounded-xl mb-6 focus:outline-none focus:border-[#d4a96a] transition-colors"
                            />
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-[rgb(223,153,3)] text-black font-semibold py-3 rounded-xl mb-4 hover:bg-[#c49858] transition-colors"
                            >
                                Reset Password
                            </button>
                        </>
                    )}
                    <p
                        className="text-center text-xs text-[rgb(223,153,3)] cursor-pointer hover:text-[#c49858] transition-colors"
                        onClick={() => { setIsForgotPassword(false); setCodeSent(false); setEmail(""); }}
                    >
                        Back to Login
                    </p>
                </>

            ) : !codeSent ? (
                <>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-[#111] border border-gray-800 text-white placeholder-gray-600 px-4 py-3 rounded-xl mb-3 focus:outline-none focus:border-[#d4a96a] transition-colors"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 text-white placeholder-gray-600 px-4 py-3 rounded-xl mb-3 focus:outline-none focus:border-[#d4a96a] transition-colors"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 text-white placeholder-gray-600 px-4 py-3 rounded-xl mb-2 focus:outline-none focus:border-[#d4a96a] transition-colors"
                    />
                    {isLogin && (
                        <p
                            className="text-right text-xs text-[rgb(223,153,3)] cursor-pointer hover:text-[#c49858] transition-colors mb-6"
                            onClick={() => { setIsForgotPassword(true); setCodeSent(false); setEmail(""); }}
                        >
                            Forgot your password?
                        </p>
                    )}
                    {!isLogin && <div className="mb-6" />}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[rgb(223,153,3)] text-black font-semibold py-3 rounded-xl mb-4 hover:bg-[#c49858] transition-colors"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                    <p className="text-gray-500 text-sm text-center">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <span
                            className="text-[rgb(223,153,3)] cursor-pointer hover:text-[#c49858] transition-colors"
                            onClick={() => { setIsLogin(!isLogin); setEmail(""); setPassword(""); setFullName(""); }}
                        >
                            {isLogin ? "Sign Up" : "Login"}
                        </span>
                    </p>
                </>
            ) : (
                <>
                    <p className="text-gray-400 text-sm mb-4">Enter the verification code sent to {email}</p>
                    <input
                        type="text"
                        placeholder="6-digit code"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 text-white placeholder-gray-600 px-4 py-3 rounded-xl mb-6 focus:outline-none focus:border-[#d4a96a] transition-colors"
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[rgb(223,153,3)] text-black font-semibold py-3 rounded-xl mb-4 hover:bg-[#c49858] transition-colors"
                    >
                        Verify
                    </button>
                </>
            )}
        </div>
    </div>
  );
}