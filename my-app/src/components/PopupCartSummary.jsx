import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function PopupCartSummary() {

    const { cartItems, isCartOpen, toggleCart } = useContext(CartContext);

    if (!isCartOpen) return null;

    return (
        <div className="fixed right-4 top-4 bg-white text-black p-4 rounded-lg shadow-lg w-80">

            <h2 className="text-xl font-bold mb-2">Cart</h2>

            {cartItems.length === 0 && <p>Cart is empty</p>}

            {cartItems.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                </div>
            ))}

            <button
                onClick={toggleCart}
                className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
                Close
            </button>

        </div>
    );
}

export default PopupCartSummary;