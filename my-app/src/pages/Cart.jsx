import Navbar from "../components/Navbar";
import Item from "../components/Item";
import Footer from "../components/Footer";
import Summary from "../components/Summary";

function Cart() {
    return (
        <>
            <Navbar />
            <section>
                <Item />
            </section>
            <Summary />
            <Footer />
        </>
    )
}

export default Cart