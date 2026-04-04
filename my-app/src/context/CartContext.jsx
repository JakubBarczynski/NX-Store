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
        await fetch("http://localhost:5000/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: product.id
            })
        });

        fetchCart();
    }

    async function fetchCart() {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/cart", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        setCartItems(data);
    }

    async function removeFromCart(productId) {
        const token = localStorage.getItem("token");

        await fetch(`http://localhost:5000/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        fetchCart();
    }

    // increase quantity (+)
    async function increaseQuantity(productId) {
        const token = localStorage.getItem("token");

        await fetch("http://localhost:5000/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                productId
            })
        });

        fetchCart();
    }

    // decrease quantity (-)
    async function decreaseQuantity(productId) {
        const token = localStorage.getItem("token");

        await fetch(`http://localhost:5000/cart/decrease/${productId}`, {
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