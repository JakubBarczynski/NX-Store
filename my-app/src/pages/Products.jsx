import { useEffect, useState } from "react"
import Card from "../components/Card";
import PopupCartSummary from "../components/PopupCartSummary";
import ProductModal from "../components/ProductModal";
import useFadeIn from "../hooks/useFadeIn";

function Products({ setIsLoggedIn }) {
    const sectionRef = useFadeIn();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <div ref={sectionRef} className="min-h-screen bg-[#222] px-10 py-24">

                {/* Page header */}
                <div className="fade-in text-center mb-16">
                    <p className="text-[rgb(223,153,3)] text-xs uppercase tracking-[0.3em] mb-3">Browse</p>
                    <h1 className="text-white text-4xl font-bold mb-4">Our Gift Boxes</h1>
                    <div className="w-16 h-px bg-[rgb(223,153,3)] mx-auto"></div>
                </div>

                {/* Product grid */}
                <div className="fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {products.map(product => (
                        <Card
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            description={product.description}
                            images={product.images}
                            sizes={product.sizes}
                            onViewProduct={setSelectedProduct}
                            setIsLoggedIn={setIsLoggedIn}
                        />
                    ))}
                </div>
            </div>

            <PopupCartSummary />
            <ProductModal
                isOpen={selectedProduct !== null}
                id={selectedProduct?.id}
                name={selectedProduct?.name}
                price={selectedProduct?.price}
                description={selectedProduct?.description}
                image={selectedProduct?.image}
                images={selectedProduct?.images ?? []}
                sizes={selectedProduct?.sizes ?? []}
                onClose={() => setSelectedProduct(null)}
            />
        </>
    );
}

export default Products;