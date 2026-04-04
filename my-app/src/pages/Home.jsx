import { useEffect, useState } from "react";

import Card from '../components/Card';
import useFadeIn from "../hooks/useFadeIn";
import Hero from '../components/Hero';    
import ProductModal from "../components/ProductModal";

function Home({ setIsLoggedIn }) {
    const sectionRef = useFadeIn();
    const[products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/products/featured")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err))
    }, []);
    return ( 
        <>
  
            <div ref={sectionRef}>
                <Hero className="fade-in" />
                <section id='featured' className='py-1 w-full bottom-0 mb-16 fade-in'>
                    <div id='products' className=' mt-4 flex gap-6 justify-center fade-in'>
                        {products.map(product => (
                            <Card className="fade-in"
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                description={product.description}
                                setIsLoggedIn={setIsLoggedIn}
                                onViewProduct={setSelectedProduct}
                            />
                            
                        ))}
                    </div>
                </section>
                <ProductModal
                    isOpen={selectedProduct !== null}
                    id={selectedProduct?.id}
                    name={selectedProduct?.name}
                    price={selectedProduct?.price}
                    description={selectedProduct?.description}
                    image={selectedProduct?.image}
                    onClose={() => setSelectedProduct(null)}
                />  
            </div>
        </>
    )
}

export default Home

