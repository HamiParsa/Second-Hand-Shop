import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-md shadow-inner  p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-blue-600">DastoDo</h2>
          <p className="text-gray-600">
            Buy & Sell Second-hand items easily. Explore, post, and find treasures!
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
            >
              <FaTwitter />
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-300"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Links</h3>
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/add"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            Add Listing
          </Link>
          <Link
            href="/categories"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            About Us
          </Link>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Subscribe</h3>
          <p className="text-gray-600">Get latest listings and updates right in your inbox.</p>
          <div className="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border text-black border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <p className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} DastoDo — Buy & Sell Smart
      </p>
    </footer>
  );
}
