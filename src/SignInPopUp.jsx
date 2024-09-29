import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useUser } from './UserContext';
const SignInPopUp = ({ closePopUp }) => {
  const popRef = useRef(null);
  const { handleSignIn } = useUser();

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

  const handleGoogleSignin = async ()=>{
    await handleSignIn()
    closePopUp()
  }

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
            <h2 className="text-2xl font-semibold mb-2">Sign in to Your Account</h2>
            <p className="text-center text-gray-600 mb-4">
              Sign in with your Google account to continue.
            </p>
            <button
            onClick={handleGoogleSignin}
              className="flex items-center justify-center w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
            >
              <FaGoogle className="me-3"/>
              Sign in with Google
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

SignInPopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
};

export default SignInPopUp;
