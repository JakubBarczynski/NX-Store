import Navbar from "../components/Navbar"
import Card from "../components/Card"
import Footer from "../components/Footer"
import PopupcartSummary from "../components/PopupCartSummary"


function Products() {
    return (
        <>
            <Navbar />
            <section>
                <Card />
            </section>
            <Footer />
            <PopupcartSummary />
        </>
    )
}

export default Products