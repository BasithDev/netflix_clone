import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; 
import Banner from './Banner';
import SignInPopUp from "./SignInPopUp";
import SignOutPopUp from "./SignOutPopUp";
import { AnimatePresence } from "framer-motion";

// eslint-disable-next-line react/prop-types
const Header = ({ banner, activePage , SearchIcon }) => {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false);
  const { user, handleSignOut } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isSignOutPopUpOpen, setIsSignOutPopUpOpen] = useState(false);
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

  const handleSignInClick = ()=>{
    if (user) {
      handleSignOut()
    }else{
      setIsPopUpOpen(true)
    }
  }

  const handleSignOutClick = () => {
    setIsSignOutPopUpOpen(true); // Open the sign-out popup
  };
  
  const closePopUp = ()=>{
    setIsPopUpOpen(false)
  }

  return (
    <>
      <nav className={`w-full fixed top-0 left-0 right-0 z-30 pt-4 pb-3 px-3 font-sans flex justify-between transition-all duration-300 ease-in-out ${scrolled ? "bg-black" : "bg-transparent"}`}>
        <div className="left flex items-center">
          <Link to={'/'}>
            <img loading="lazy" className="w-28 ms-14 hidden sm:block" src="https://netflx-web.vercel.app/netflix-logo.svg" alt="Netflix Logo" />
            <img loading="lazy" className='w-12 block sm:hidden' src="https://static.vecteezy.com/system/resources/previews/019/956/195/non_2x/netflix-transparent-netflix-free-free-png.png" alt="Netflix Logo" />
          </Link>
          <Link to="/" className={`hidden sm:block text-gray-300 hover:text-gray-400 text-sm ms-4 mx-2 font-bold ${activePage === 'home' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/tvshows" className={`hidden sm:block text-gray-300 hover:text-gray-400 text-sm mx-2 font-bold ${activePage === 'tv' ? 'active' : ''}`}>TV Shows</Link>
          <Link to="/movies" className={`hidden sm:block text-gray-300 hover:text-gray-400 text-sm mx-2 font-bold ${activePage === 'movie' ? 'active' : ''}`}>Movies</Link>
          <Link to="/new" className={`hidden sm:block text-gray-300 hover:text-gray-400 text-sm mx-2 font-bold ${activePage === 'new' ? 'active' : ''}`}>New & Popular</Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="ms-4 block text-gray-100 hover:text-gray-400 text-lg mx-2 font-bold sm:hidden">Menu</button>
        </div>
        <div className="right flex items-center">
          {SearchIcon && <FaSearch onClick={()=>navigate('/search')} className="text-white me-4 text-2xl transition-all duration-300 cursor-pointer" />}
          {user ? (
            <img
            loading="lazy"
              src={user.photoURL ? user.photoURL : 'https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307-user-account-image-log-user.png'}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={handleSignOutClick}
              onError={(e) => {
                e.target.src = 'https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307-user-account-image-log-user.png'; // Fallback image
              }}
            />
          ) : (
            <button
              onClick={handleSignInClick}
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

      <AnimatePresence>
        {isPopUpOpen && (
          <SignInPopUp closePopUp={closePopUp}/>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSignOutPopUpOpen && (
          <SignOutPopUp 
            closePopUp={() => setIsSignOutPopUpOpen(false)} 
            handleSignOut={handleSignOut}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
