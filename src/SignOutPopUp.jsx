import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";
import PropTypes from 'prop-types';

const SignOutPopUp = ({ closePopUp, handleSignOut }) => {
  const popRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popRef.current && !popRef.current.contains(event.target)) {
        closePopUp();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopUp]);

  const handleSignOutClick = () => {
    handleSignOut(); // Call the sign-out function
    closePopUp();    // Close the popup after signing out
  };

  return (
    <>
      <motion.div
        className="box fixed inset-0 z-30 flex items-center justify-center backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        onClick={() => closePopUp()} 
      >
        <div
          ref={popRef}
          className="relative bg-gray-800 text-white mx-8 p-8 rounded-xl sm:w-[250px] md:w-[300px] lg:w-[400px] h-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
            <IoCloseCircle 
            className="absolute top-3 right-3 cursor-pointer transition-all duration-200 text-gray-600 hover:text-red-500 text-3xl"
            onClick={() => closePopUp()}
            />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-2">Sign Out</h2>
            <p className="text-center text-gray-600 mb-4">
              Are you sure you want to sign out?
            </p>
            <button
            onClick={handleSignOutClick}
              className="flex items-center justify-center w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
            >
              Sign Out from Google Account
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

SignOutPopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

export default SignOutPopUp;
