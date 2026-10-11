import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal"; 
import { CartContext } from "../context/CartContext";

function Navbar({ isLoggedIn, setIsLoggedIn, authOpen, setAuthOpen }) {
  const { clearCart } = useContext(CartContext);

  const navigate = useNavigate();
  



  const handleLogout = () => {
    clearCart();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <>
      <nav className="bg-[rgb(223,153,3)] p-2.5 h-16 z-[1000] shadow-[0px_20px_0px_#222] flex items-center justify-between">
        <div className="font-bold text-white text-lg"><img src="./images/logo.png" className="w-16 h-16"></img></div>

        <div className="flex gap-4">
          <Link to="/" className="text-white mr-4 no-underline">Home</Link>
          <Link to="/about" className="text-white mr-4 no-underline">About</Link>
          <Link to="/products" className="text-white mr-4 no-underline">Products</Link>
          <Link to="/cart" className="text-white mr-4 no-underline">Cart</Link>
        </div>
        {isLoggedIn ? (        
          <button
            onClick={handleLogout}
            className="bg-[#222] hover:bg-[#ffc971] text-white font-semibold px-4 py-2 rounded-full transition-colors duration-200 shadow-sm"
          >
            Log out
          </button>
        ) : (
          <button
            onClick={() => setAuthOpen(true)}
            className="bg-[#222] hover:bg-[#444] text-white font-semibold px-4 py-2 rounded-full transition-colors duration-200 shadow-sm"
          >
            Log in / Sign up
          </button>
        )}

      </nav>

      {/* Auth modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}

export default Navbar;