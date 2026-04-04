import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Products from './pages/Products';
import Cart from './pages/Cart';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PopupCartSummary from "./components/PopupCartSummary";
import { CartProvider } from "./context/CartContext";
// import AuthModal from './components/AuthModal';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <>
      <CartProvider>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        
          
          <Routes>
            <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/products" element={<Products setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
          
        
        {/* <AuthModal 
          setIsLoggedIn={setIsLoggedIn} 
        /> */}
        <Footer />
      </CartProvider>
    </>
  )
}

export default App