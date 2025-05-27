import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const desktopDropdownRef = useRef();
  const mobileDropdownRef = useRef();

  const { user, logout } = useAuth();

  useEffect(() => {
    if (user && !hasWelcomed) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Selamat datang kembali, ${user.name || "User"}!`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      setHasWelcomed(true);
    }
  }, [user, hasWelcomed]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target)
      ) {
        setDesktopDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Berhasil logout",
      text: "Sampai jumpa lagi!",
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    }).then(() => {
      window.location.href = "/login";
    });
  };

  return (
    <nav className='bg-gradient-to-r from-blue-500 to-blue-300 shadow-md px-4 md:px-6 py-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-white'>
          <Link to='/'>Signify</Link>
        </h1>

        <div className='flex items-center gap-3 lg:hidden'>
          {user && (
            <div ref={mobileDropdownRef} className='relative'>
              <button
                onClick={() => setMobileDropdownOpen((prev) => !prev)}
                className='flex items-center gap-2 text-white focus:outline-none hover:opacity-90 transition'
              >
                <img
                  src={
                    user.photoUrl ||
                    "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Null"
                  }
                  alt='avatar'
                  className='w-8 h-8 rounded-full border-2 border-white'
                />
                <ChevronDown className='w-4 h-4 text-white' />
              </button>
              {mobileDropdownOpen && (
                <div className='absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50'>
                  <Link
                    to='/profile'
                    className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                  >
                    Lihat Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='text-white focus:outline-none'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>

        <div className='hidden lg:flex items-center gap-x-6'>
          <ul className='flex space-x-4'>
            {["/", "/about", "/academy", "/translation", "/docs"].map(
              (path, idx) => (
                <li key={idx}>
                  <Link
                    to={path}
                    className='text-white hover:text-blue-900 font-medium transition'
                  >
                    {
                      [
                        "Beranda",
                        "Tentang",
                        "Akademi",
                        "Penerjemah",
                        "Dokumentasi API",
                      ][idx]
                    }
                  </Link>
                </li>
              )
            )}
          </ul>

          {user ? (
            <div ref={desktopDropdownRef} className='relative'>
              <button
                onClick={() => setDesktopDropdownOpen((prev) => !prev)}
                className='flex items-center gap-2 text-white focus:outline-none hover:opacity-90 transition'
              >
                <img
                  src={
                    user.photoUrl ||
                    "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Null"
                  }
                  alt='avatar'
                  className='w-8 h-8 rounded-full border-2 border-white'
                />
                <ChevronDown className='w-4 h-4 text-white' />
              </button>
              {desktopDropdownOpen && (
                <div className='absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50'>
                  <Link
                    to='/profile'
                    className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                  >
                    Lihat Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='flex gap-3'>
              <Link
                to='/login'
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                }}
                className='px-3 py-1.5 rounded-md font-medium hover:opacity-90 transition'
              >
                Login
              </Link>
              <Link
                to='/register'
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
                className='px-3 py-1.5 rounded-md font-medium hover:opacity-90 transition'
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className='lg:hidden mt-4'>
          <ul className='flex flex-col space-y-2'>
            {["/", "/about", "/academy", "/translation", "/docs"].map(
              (path, idx) => (
                <li key={idx}>
                  <Link
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className='block text-white py-2 px-2 hover:underline'
                  >
                    {
                      [
                        "Beranda",
                        "Tentang",
                        "Akademi",
                        "Penerjemah",
                        "Dokumentasi API",
                      ][idx]
                    }
                  </Link>
                </li>
              )
            )}
          </ul>
          {!user && (
            <div className='flex flex-col gap-2 mt-4'>
              <Link
                to='/login'
                onClick={() => setIsMenuOpen(false)}
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                }}
                className='text-center py-1.5 rounded-md font-medium hover:opacity-90'
              >
                Login
              </Link>
              <Link
                to='/register'
                onClick={() => setIsMenuOpen(false)}
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
                className='text-center py-1.5 rounded-md font-medium hover:opacity-90'
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
