function Success() {
    return (
        <div className="min-h-screen bg-[#222] flex items-center justify-center text-center">
            <div>
                <p className="text-[rgb(223,153,3)] text-xs uppercase tracking-[0.3em] mb-4">Thank You</p>
                <h1 className="text-white text-4xl font-bold mb-4">Order Confirmed!</h1>
                <div className="w-16 h-px bg-[rgb(223,153,3)] mx-auto mb-6"></div>
                <p className="text-gray-400">Your gift box is on its way. We'll be in touch shortly.</p>
            </div>
        </div>
    );
}

export default Success;