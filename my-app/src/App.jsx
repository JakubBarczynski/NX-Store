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
import ComingSoon from './pages/ComingSoon';
import AuthModal from './components/AuthModal';
import Success from './pages/Success';
import Privacy_policy from './pages/policies/Privacy_policy';
import Cookie_policy from './pages/policies/Cookie_policy';
import Terms_and_conditions from './pages/policies/Terms_and_conditions';
import Returns_policy from './pages/policies/Returns_policy';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <>
      <CartProvider>
        <Navbar isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                authOpen={authOpen}
                setAuthOpen={setAuthOpen}/>
        
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/success" element={<Success />} />
            <Route path="/privacy-policy" element={<Privacy_policy />} />
            <Route path="/terms-and-conditions" element={<Terms_and_conditions />} />
            <Route path="/returns-policy" element={<Returns_policy />} />
            <Route path="/cookie-policy" element={<Cookie_policy />} />
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



// import { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from "react-router-dom";
// import Products from './pages/Products';
// import Cart from './pages/Cart';
// import Home from './pages/Home';
// import About from './pages/About';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import { CartProvider } from "./context/CartContext";
// import ComingSoon from './pages/ComingSoon';

// const COMING_SOON = true; // flip to false when ready to launch

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authOpen, setAuthOpen] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   if (COMING_SOON) {
//     return <ComingSoon />;
//   }

//   return (
//     <CartProvider>
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} authOpen={authOpen} setAuthOpen={setAuthOpen} />
//       <Routes>
//         <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/products" element={<Products setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//       <Footer />
//     </CartProvider>
//   );
// }

// export default App;



// import ComingSoon from './pages/ComingSoon';

// function App() {
//   return <ComingSoon />;
// }

// export default App;