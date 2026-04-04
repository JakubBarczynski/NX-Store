import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Summary() {
    const { cartItems } = useContext(CartContext);

    const total = cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    return (
        <div className="sticky top-10 bg-[#1a1a1a] border border-gray-800 p-6 rounded-2xl">

            <p className="text-[rgb(223,153,3)] text-xs uppercase tracking-[0.3em] mb-6">Order Summary</p>

            <div className="flex justify-between items-center border-t border-gray-800 pt-4 mb-6">
                <span className="text-gray-400 text-sm">Total</span>
                <span className="text-white font-semibold text-lg">£{total.toFixed(2)}</span>
            </div>

            <button className="w-full border border-[rgb(223,153,3)] text-[rgb(223,153,3)] hover:bg-[rgb(223,153,3)] hover:text-black transition-colors duration-300 py-3 rounded-full font-semibold">
                Checkout
            </button>

        </div>
    );
}

export default Summary;