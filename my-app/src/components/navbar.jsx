import { Link } from "react-router-dom";
function Navbar() {
  

  return (
    <nav className="bg-[rgb(223,153,3)] p-2.5 h-16 z-[1000] shadow-[0px_20px_0px_#222] flex items-center justify-between">
      <div className="font-bold">Minimal</div>

    <div className="flex gap-4">
        <Link to="/" className="text-white mr-4 no-underline">Home</Link>
        <Link to="/products" className="text-white mr-4 no-underline">Products</Link>
        <Link to="/cart" className="text-white mr-4 no-underline">Cart</Link>
    </div>

      <button
        
        className="bg-black text-white px-3 py-1 rounded"
      >
        Log in
      </button>
    </nav>
  )
}

export default Navbar