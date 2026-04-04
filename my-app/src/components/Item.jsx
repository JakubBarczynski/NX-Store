import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Item({ item }) {
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

    return (
        <div className="flex items-center justify-between bg-[#1a1a1a] border border-gray-800 hover:border-[rgb(223,153,3)] transition-colors duration-300 p-6 rounded-2xl mb-4">

            {/* Image */}
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
            </div>

            {/* Info */}
            <div className="flex-1 ml-6">
                <h2 className="text-white font-semibold text-lg">{item.name}</h2>
                <p className="text-[rgb(223,153,3)] mt-1">£{item.price}</p>

                {/* Quantity control */}
                <div className="flex items-center gap-3 mt-3">
                    <button
                        onClick={() => decreaseQuantity(item.product_id)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-700 text-white rounded-full hover:border-[rgb(223,153,3)] hover:text-[rgb(223,153,3)] transition-colors"
                    >
                        -
                    </button>
                    <span className="text-white text-sm">{item.quantity}</span>
                    <button
                        onClick={() => increaseQuantity(item.product_id)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-700 text-white rounded-full hover:border-[rgb(223,153,3)] hover:text-[rgb(223,153,3)] transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Remove */}
            <button
                onClick={() => removeFromCart(item.product_id)}
                className="text-gray-600 text-sm hover:text-red-400 transition-colors"
            >
                Remove
            </button>

        </div>
    );
}

export default Item;