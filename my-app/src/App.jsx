import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Products from './pages/Products';
import Settings from './pages/Settings';
import Cart from './pages/Cart';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  )
}

export default App