import { useEffect, useRef } from "react";

function useFadeIn() {
    const ref = useRef(null);

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

        const elements = ref.current?.querySelectorAll(".fade-in");
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return ref;
}

export default useFadeIn;