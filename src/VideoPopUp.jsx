import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";
import PropTypes from 'prop-types'

const VideoPopUp = ({ clip,content,contype,closePopUp }) => {
  const popRef = useRef(null);
  console.log(clip)

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

  return (
    <>
      <motion.div
        className="box pt-2 px-2 fixed inset-0 z-30 flex items-center justify-center backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <div
          ref={popRef}
          className="relative bg-black text-white md:pt-0 pb-2 sm:py-8 rounded-xl w-full sm:w-[500px] md:w-[700px] lg:w-[770px] h-auto"
        >
          {
            clip ?
            <iframe
            height="200"
            className="w-full sm:h-[250px] md:h-[315px]"
            src={`https://www.youtube.com/embed/${clip.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          /> : 
          <>
            <img 
          className="w-full sm:h-[250px] md:h-[315px] object-cover"
          src={`https://image.tmdb.org/t/p/original/${content.backdrop_path || content.poster_path}`} alt="" />
          <p className="ms-5 mt-1 text-xl font-thin">Note : Trailer is Not Available</p>
          </>
          }
          <IoCloseCircle
          className="hidden cursor-pointer hover:text-red-500 transition-all duration-200 md:block font-bold absolute right-0 top-0 text-3xl"
          onClick={closePopUp}
          />
          <button className="hover:bg-blue-950 hover:text-white flex rounded-md items-center px-3 py-1 my-1 mt-3 bg-white text-black text-xl font-bold transition-all duration-300 ms-auto md:hidden" onClick={closePopUp}>
            Close
          </button>
          <div className="px-4">
            <p className="font-bold text-3xl my-2">{contype === 'tv' ? content.name : content.title}</p>
            <p className='font-medium text-md'>Rating: <span className={content.vote_average < 4 ? 'text-red-600' : content.vote_average >= 4 && content.vote_average < 8 ? 'text-orange-500' : 'text-green-500'}>{content.vote_average ? content.vote_average : 'No Rating Yet'}</span></p>
            <p className='text-lg font-medium my-2 '>Release Date: {content.release_date}</p>
            <p className="text-sm">{content.overview}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};
VideoPopUp.propTypes = {
  clip: PropTypes.object.isRequired,
  closePopUp: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  contype: PropTypes.string.isRequired
};
export default VideoPopUp;
