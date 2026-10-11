import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) fetchCart();
    }, []);

    async function addToCart(product) {
        const token = localStorage.getItem("token");
        await fetch("https://nx-store.onrender.com/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            body: JSON.stringify({ productId: product.id, size: product.size })
        });

        fetchCart();
    }

    async function fetchCart() {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://nx-store.onrender.com/cart", {
                headers: {"Authorization": `Bearer ${token}`}
            });
            const data = await res.json();
            setCartItems(data);
            if (!res.ok) {
                setCartItems([]);
            } 
        } catch {
            setCartItems([]);
        }
    }

    async function removeFromCart(productId, size) {
        const token = localStorage.getItem("token");

        await fetch(`https://nx-store.onrender.com/cart/${productId}/${size}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        fetchCart();
    }

    // increase quantity (+)
    async function increaseQuantity(productId, size) {
        const token = localStorage.getItem("token");

        await fetch("https://nx-store.onrender.com/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ productId, size })
        });
        fetchCart();
    }

    // decrease quantity (-)
    async function decreaseQuantity(productId, size) {
        const token = localStorage.getItem("token");

        await fetch(`https://nx-store.onrender.com/cart/decrease/${productId}/${size}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        fetchCart();
    }

    function toggleCart() {
        setIsCartOpen(prev => !prev);
    }

    function clearCart() {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            fetchCart,
            isCartOpen,
            toggleCart
        }}>
            {children}
        </CartContext.Provider>
    );
}