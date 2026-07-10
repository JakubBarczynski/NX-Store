function ComingSoon() {
    return (
        <section className="bg-[linear-gradient(135deg,#111,#333)] text-white min-h-screen flex flex-col items-center justify-center px-20 py-32 text-center">
            <p className="text-[rgb(223,153,3)] text-xs uppercase tracking-[0.3em] mb-6">NX Perfect Gift Box</p>
            <h1 className="text-5xl font-bold mb-6 leading-tight">Something special<br/>is on its way.</h1>
            <div className="w-16 h-px bg-[rgb(223,153,3)] mx-auto mb-8"></div>
            <p className="text-lg text-gray-400 mb-12">We're putting the finishing touches on something exciting.<br/>Check back soon.</p>
            <div className="border border-[rgb(223,153,3)] text-[rgb(223,153,3)] text-lg px-8 py-3 rounded-full">
                Coming Soon
            </div>
        </section>
    )
}

export default ComingSoon;