import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Item from "../components/Item";
import Summary from "../components/Summary";
import useFadeIn from "../hooks/useFadeIn";

function Cart() {
    const { cartItems } = useContext(CartContext);
    const sectionRef = useFadeIn();

    return (
        <div ref={sectionRef} className="min-h-screen bg-[#222] px-10 py-24">

            {/* Page header */}
            <div className="fade-in text-center mb-16">
                <p className="text-[rgb(223,153,3)] text-xs uppercase tracking-[0.3em] mb-3">Your Selection</p>
                <h1 className="text-white text-4xl font-bold mb-4">Your Cart</h1>
                <div className="w-16 h-px bg-[rgb(223,153,3)] mx-auto"></div>
            </div>

            <main className="fade-in flex min-h-[calc(100vh-160px)] gap-10 max-w-6xl mx-auto">

                {/* Left side - items */}
                <section className="flex-1">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">Your cart is empty</p>
                            <p className="text-gray-600 text-sm mt-2">Add some gift boxes to get started</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <Item key={item.product_id} item={item} />
                        ))
                    )}
                </section>

                {/* Right side - summary */}
                <aside className="w-[280px]">
                    <Summary />
                </aside>

            </main>
        </div>
    );
}

export default Cart;