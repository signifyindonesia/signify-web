import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-200 shadow-md px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo/Brand */}
        <h1 className="text-xl md:text-2xl font-bold text-white"><Link to="/">Signify</Link></h1>

        {/* Hamburger Menu for Mobile */}
        <div className="block lg:hidden">
          <button 
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-x-6">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-white hover:text-blue-600 transition-colors">Beranda</Link></li>
            <li><Link to="/about" className="text-white hover:text-blue-600 transition-colors">Tentang</Link></li>
            <li><Link to="/academy" className="text-white hover:text-blue-600 transition-colors">Akademi</Link></li>
            <li><Link to="/translation" className="text-white hover:text-blue-600 transition-colors">Penerjemah</Link></li>
            <li><Link to="/docs" className="text-white hover:text-blue-600 transition-colors">Dokumentasi API</Link></li>
          </ul>

          <div className="flex space-x-3">
            <Link
              to="/login"
              style={{ backgroundColor: "var(--color-accent)", color: "white" }}
              className="px-3 py-1.5 rounded-md font-medium hover:opacity-90 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ backgroundColor: "var(--color-primary)", color: "white" }}
              className="px-3 py-1.5 rounded-md font-medium hover:opacity-90 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (Collapsible) */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
        <ul className="flex flex-col space-y-2">
          <li><Link to="/" className="block text-white hover:text-blue-600 transition-colors py-2" onClick={toggleMenu}>Beranda</Link></li>
          <li><Link to="/about" className="block text-white hover:text-blue-600 transition-colors py-2" onClick={toggleMenu}>Tentang</Link></li>
          <li><Link to="/academy" className="block text-white hover:text-blue-600 transition-colors py-2" onClick={toggleMenu}>Akademi</Link></li>
          <li><Link to="/translator" className="block text-white hover:text-blue-600 transition-colors py-2" onClick={toggleMenu}>Penerjemah</Link></li>
          <li><Link to="/docs" className="block text-white hover:text-blue-600 transition-colors py-2" onClick={toggleMenu}>Dokumentasi API</Link></li>
        </ul>
        <div className="flex space-x-3 mt-4">
          <Link
            to="/login"
            style={{ backgroundColor: "var(--color-accent)", color: "white" }}
            className="px-3 py-1.5 rounded-md font-medium hover:opacity-90 transition text-center w-full"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{ backgroundColor: "var(--color-primary)", color: "white" }}
            className="px-3 py-1.5 rounded-md font-medium hover:opacity-90 transition text-center w-full"
            onClick={toggleMenu}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}