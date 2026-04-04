import { useNavigate } from "react-router-dom"
import useFadeIn from "../hooks/useFadeIn"

function Hero() {
    const navigate = useNavigate();
    const sectionRef = useFadeIn();

    return (
        <section ref={sectionRef} id="hero-section" className="bg-[linear-gradient(135deg,#111,#333)] text-white px-20 py-32 text-center">
            <p className="fade-in text-[rgb(223,153,3)] text-xs uppercase tracking-[0.3em] mb-6">NX Perfect Gift Box</p>
            <h1 className="fade-in text-5xl font-bold mb-6 leading-tight">Every box tells a story.<br/>Every gift sparks a dream.</h1>
            <div className="fade-in w-16 h-px bg-[rgb(223,153,3)] mx-auto mb-8"></div>
            <p className="fade-in text-lg text-gray-400 mb-12">Curated gift boxes for the young athletes in your life.</p>
            <button
                className="fade-in border border-[rgb(223,153,3)] text-[rgb(223,153,3)] hover:bg-[rgb(223,153,3)] hover:text-black transition-colors duration-300 text-lg px-8 py-3 rounded-full"
                onClick={() => navigate("/products")}
            >
                Shop Now
            </button>
        </section>
    )
}

export default Hero