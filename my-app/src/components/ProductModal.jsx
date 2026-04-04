import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductModal({ isOpen, onClose, id, name, price, description, image }) {
    if (!isOpen) return null;
    const { addToCart } = useContext(CartContext);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] border border-gray-800 text-white rounded-2xl p-6 w-[600px] text-left relative">

                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Gold label */}
                <p className="text-[rgb(223,153,3)] text-xs uppercase tracking-[0.3em] mb-4">Product Details</p>

                {/* Image and info side by side */}
                <div className="flex gap-6 mb-6">
                    <img src={image} className="w-52 h-52 object-cover rounded-xl flex-shrink-0 border border-gray-800" />

                    <div className="flex flex-col justify-start pt-1">
                        <h2 className="text-xl font-bold mb-2">{name}</h2>
                        <p className="text-[rgb(223,153,3)] text-lg mb-4">£{price}</p>
                        <div className="w-8 h-px bg-[rgb(223,153,3)] mb-4"></div>
                        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 border-t border-gray-800 pt-4">
                    <button
                        className="border border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors duration-300 px-6 py-2 rounded-full text-sm"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="border border-[rgb(223,153,3)] text-[rgb(223,153,3)] hover:bg-[rgb(223,153,3)] hover:text-black transition-colors duration-300 px-6 py-2 rounded-full text-sm font-semibold"
                        onClick={() => { addToCart({ id, name, price, image }); onClose(); }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;