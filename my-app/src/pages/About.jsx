import { useEffect, useRef } from "react";

function About() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = sectionRef.current?.querySelectorAll(".fade-in");
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
                .fade-in {
                    opacity: 0;
                    transform: translateY(24px);
                    transition: opacity 0.7s ease, transform 0.7s ease;
                }
                .fade-in.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .fade-in:nth-child(2) { transition-delay: 0.1s; }
                .fade-in:nth-child(3) { transition-delay: 0.2s; }
                .fade-in:nth-child(4) { transition-delay: 0.3s; }
                .fade-in:nth-child(5) { transition-delay: 0.4s; }
                .fade-in:nth-child(6) { transition-delay: 0.5s; }
            `}</style>

            <div ref={sectionRef} className="min-h-screen bg-[#222] px-6 py-24 flex flex-col items-center">

                {/* Header */}
                <div className="fade-in text-center mb-16">
                    <p className="text-[rgb(223,153,3)] text-sm uppercase tracking-[0.3em] mb-4">Our Story</p>
                    <h1 className="text-white text-5xl font-bold mb-6">NX Perfect Gift Box</h1>
                    <p className="text-gray-400 text-lg italic">Where Passion Begins</p>
                </div>

                {/* Divider */}
                <div className="fade-in w-16 h-px bg-[rgb(223,153,3)] mb-16"></div>

                {/* Intro block */}
                <div className="fade-in max-w-2xl text-center mb-20">
                    <p className="text-gray-300 text-lg leading-relaxed">
                        NX Perfect Gift Box was created with young athletes, children's dreams, and their big ambitions in mind. 
                        Our company was born from a simple idea: every child deserves a gift that inspires, motivates, and helps spark a lifelong passion.
                    </p>
                </div>

                {/* Two column section */}
                <div className="fade-in grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl w-full mb-20">
                    <div className="border border-gray-800 rounded-2xl p-8">
                        <p className="text-[rgb(223,153,3)] text-sm uppercase tracking-widest mb-4">Who We Are</p>
                        <p className="text-gray-300 leading-relaxed">
                            As parents of two young athletes ourselves, we truly understand the dedication, effort, and dreams that come with raising sporty children. 
                            We also know how busy life can be — many hardworking parents simply don't have the time to search for the perfect, meaningful present.
                        </p>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8">
                        <p className="text-[rgb(223,153,3)] text-sm uppercase tracking-widest mb-4">Our Mission</p>
                        <p className="text-gray-300 leading-relaxed">
                            To awaken passion in every child through a carefully curated gift. Each box is prepared with heart, care, and purpose — from parents, for parents. 
                            Because we don't just sell gift boxes. We deliver inspiration, motivation, and joy.
                        </p>
                    </div>
                </div>

                {/* What we offer */}
                <div className="fade-in max-w-4xl w-full mb-20">
                    <p className="text-[rgb(223,153,3)] text-sm uppercase tracking-widest mb-8 text-center">What We Offer</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            "Sports boxes for boys & girls",
                            "Ballet gift boxes",
                            "Special occasion boxes",
                            "Elegant boxes for adults"
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
                                <p className="text-white text-sm leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sign off */}
                <div className="fade-in text-center">
                    <div className="w-16 h-px bg-[rgb(223,153,3)] mx-auto mb-8"></div>
                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">With passion</p>
                    <p className="text-white text-2xl font-semibold">Nicole & Xavier</p>
                </div>

            </div>
        </>
    );
}

export default About;