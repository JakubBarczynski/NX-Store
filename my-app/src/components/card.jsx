import { useNavigate } from "react-router-dom";
function Card() {
    const navigate = useNavigate();
    return (
        <div className="bg-black p-2.5 text-white rounded-2xl inline-block text-right box-border relative top-4">
            <img src="/images/gift_box.jpg" className="h-52 w-72"/>
            <p id="description" className="text-white relative text-left top-3 mt-2">Product 1</p>
            <p id="price" className="relative right-2.5 mb-4">$12</p>
            <button className="bg-white text-black px-2.5 py-1.5 rounded-full text-sm font-small hover:bg-[rgb(190,186,186)]" onClick={() => navigate("/products")}>View Product</button>
            <button className="bg-white text-black px-3 py-1.5 rounded-full text-sm font-small ml-4 hover:bg-[rgb(190,186,186)]" onClick={() => navigate("/cart")}>Add to Cart</button>
        </div>
    )
}

export default Card
