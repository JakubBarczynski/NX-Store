import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Tagline from '../components/Tagline';
import Hero from '../components/Hero';    

function Home() {
    return ( 
        <>
            <Navbar />
            <Tagline />
            <Hero />
            <section id='featured' className='py-1 w-full bottom-0 mb-16'>
                <div id='products' className='ml-16 mt-4'>
                    <Card />
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Home

