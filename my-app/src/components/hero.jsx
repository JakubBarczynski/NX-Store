import { useNavigate } from "react-router-dom"
function Hero() {
    const navigate = useNavigate();
    return (
        <section id="hero-section" className="bg-[linear-gradient(135deg,#111,#333)] text-white px-20 py-5 text-center">
            <h1 className="text-[42px] mb-2.5 mt-10">Simple. Modern. Affordable.</h1>
            <p className="text-lg opacity-[0.9] mt-8">Everyday essentials designed for comfort and style.</p>
            <button className="text-black bg-white text-lg px-4 py-2 mt-12 mb-4" onClick={() => navigate("/products")}>Shop Now</button>
        </section>
    )
}

export default Hero