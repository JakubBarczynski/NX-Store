import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-[#111111] text-white py-16 px-5 text-center bottom-0 left-0 w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-left">

                {/* Store Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">NX Perfect Gift Box</h2>
                    <p className="text-gray-400 text-sm leading-6">
                        Quality products at competitive prices. Secure shopping,
                        fast delivery, and customer satisfaction are our priorities.
                    </p>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                            <Link to="/privacy-policy" className="hover:text-white transition">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/terms-and-conditions" className="hover:text-white transition">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link to="/returns-policy" className="hover:text-white transition">
                                Returns & Refund Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/cookie-policy" className="hover:text-white transition">
                                Cookie Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <div className="space-y-2 text-gray-400">
                        {/* <p>📞 +44 1234 567890</p> */}
                        <p>✉️ support@NXPerfectGiftBox.com</p>
                    </div>
                </div>

                {/* Socials */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex gap-4 text-gray-400">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            Facebook
                        </a>

                        <a
                            href="https://www.instagram.com/nxperfectgiftbox/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            Instagram
                        </a>

                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            X
                        </a>
                    </div>
                </div>

            </div>

            <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-500">
                © {new Date().getFullYear()} NX Perfect Gift Box. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;