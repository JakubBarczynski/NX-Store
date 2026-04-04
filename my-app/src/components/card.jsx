import { useContext, useState } from "react";
import AuthModal from "./AuthModal";
import { CartContext } from "../context/CartContext";

function Card({ id, name, price, image, description, setIsLoggedIn, onViewProduct }) {
    const { addToCart } = useContext(CartContext);
    const [authOpen, setAuthOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem("token");

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            setAuthOpen(true);
        } else {
            addToCart({ id, name, price, image });
        }
    };

    return (
        <>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden flex flex-col hover:border-[rgb(223,153,3)] transition-colors duration-300">
                <img src={image} className="w-full h-56 object-cover" />
                
                <div className="p-4 flex flex-col flex-1">
                    <p className="text-white font-semibold mb-1">{name}</p>
                    <p className="text-[rgb(223,153,3)] mb-4">£{price}</p>

                    <div className="flex gap-3 mt-auto">
                        <button
                            className="flex-1 border border-[rgb(223,153,3)] text-[rgb(223,153,3)] hover:bg-[rgb(223,153,3)] hover:text-black transition-colors duration-300 py-1.5 rounded-full text-sm"
                            onClick={() => onViewProduct({ id, name, price, image, description })}
                        >
                            View Product
                        </button>
                        <button
                            className="flex-1 border border-gray-700 text-white hover:border-[rgb(223,153,3)] hover:text-[rgb(223,153,3)] transition-colors duration-300 py-1.5 rounded-full text-sm"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                <AuthModal
                    isOpen={authOpen}
                    onClose={() => setAuthOpen(false)}
                    setIsLoggedIn={setIsLoggedIn}
                />
            </div>
            <AuthModal
                isOpen={authOpen}
                onClose={() => setAuthOpen(false)}
                setIsLoggedIn={setIsLoggedIn}
            />
        </>
    );
}

export default Card;