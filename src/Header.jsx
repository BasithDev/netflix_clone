import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useUser } from './UserContext'; 
import Banner from './Banner';

// eslint-disable-next-line react/prop-types
const Header = ({ banner, activePage }) => {
  const [scrolled, setScrolled] = useState(false);
  const { user, handleSignIn, handleSignOut } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 640) { 
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className={`w-full fixed top-0 left-0 right-0 z-30 py-2 px-5 font-sans flex justify-between transition-all duration-300 ease-in-out ${scrolled ? "bg-black" : "bg-transparent"}`}>
        <div className="left flex items-center">
          <Link to={'/'}>
            <img className="w-28 ms-14 hidden sm:block" src="https://netflx-web.vercel.app/netflix-logo.svg" alt="Netflix Logo" />
            <img className='w-12 block sm:hidden' src="https://static.vecteezy.com/system/resources/previews/019/956/195/non_2x/netflix-transparent-netflix-free-free-png.png" alt="Netflix Logo" />
          </Link>
          <Link to="/" className={`hidden sm:block text-gray-300 hover:text-gray-400 text-sm ms-4 mx-2 font-bold ${activePage === 'home' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/tvshows" className="hidden sm:block text-gray-300 hover:text-gray-400 text-sm mx-2 font-bold">TV Shows</Link>
          <Link to="/movies" className="hidden sm:block text-gray-300 hover:text-gray-400 text-sm mx-2 font-bold">Movies</Link>
          <Link to="/new" className="hidden sm:block text-gray-300 hover:text-gray-400 text-sm mx-2 font-bold">New & Popular</Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="ms-4 block text-gray-100 hover:text-gray-400 text-lg mx-2 font-bold sm:hidden">Menu</button>
        </div>
        <div className="right flex items-center">
          <FaSearch className="text-white me-4 text-2xl transition-all duration-300 cursor-pointer" />
          {user ? (
            <img
              src={user.photoURL ? user.photoURL : ''}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={handleSignOut}
            />
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-red-600 text-white font-bold px-3 py-2 me-2 rounded hover:bg-red-700 transition-all duration-300"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {banner && <Banner />}
      {menuOpen && (
        <div ref={dropdownRef} className="absolute rounded-xl w-fit top-14 left-14 right-0 bg-gray-800 opacity-95 text-white shadow-lg z-40 px-3">
          <Link to="/" className={`block py-2 pt-3 ${activePage === 'home' ? 'active text-xl' : ''}`}>Home</Link>
          <Link to="/tvshows" className="block font-medium py-2">TV Shows</Link>
          <Link to="/movies" className="block font-medium py-2">Movies</Link>
          <Link to="/new" className="block font-medium py-2 pb-3">New & Popular</Link>
        </div>
      )}
    </>
  );
};

export default Header;
