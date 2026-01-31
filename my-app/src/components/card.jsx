function Card() {
    return (
        <div className="bg-black p-[10px] text-white rounded-[17px] inline-block text-right box-border">
            <img src="/images/gift_box.jpg" className="h-[230px] w-[300px]"/>
            <p></p>
            <p></p>
            <button className="bg-white rounded-xl text-black">View Product</button>
            <button className="bg-white rounded-xl text-black">Add to Cart</button>
        </div>
    )
}

export default Card
