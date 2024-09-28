import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import VideoPopUp from './VideoPopUp';

const Banner = () => {
  const [banner, setBanner] = useState('');
  const [randomMovie, setRandomMovie] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [clip, setClip] = useState([]);
  const [popVideo, setPopVideo] = useState(false);
  const API_KEY = import.meta.env.VITE_TMDB_APIkEY;

  const getBanner = async () => {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&append_to_response=videos`);
      const random_movie = data.results[Math.floor(Math.random() * data.results.length)];
      const clipData = await axios.get(`https://api.themoviedb.org/3/movie/${random_movie.id}/videos?api_key=${API_KEY}`);
      setClip(clipData.data.results.find((item) => item.type === 'Teaser' || item.type === 'Trailer'));
      setBanner(`https://image.tmdb.org/t/p/original${random_movie.backdrop_path}`);
      setRandomMovie(random_movie);
    } catch (error) {
      console.log("Error on getting banner: ", error);
    }
  };

  useEffect(() => {
    getBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      {randomMovie && (
        <div className="relative w-full bg-black aspect-video">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>

          <div className="leading-6 absolute z-20 top-[15%] left-[7%] w-100 md:top-[15%] md:left-[5%] sm:w-1/3 text-white">
            <h1 className="text-4xl font-bold">{randomMovie.title}</h1>
            <p className="my-2">
              <span
                className="font-bold"
                style={
                  randomMovie.vote_average < 4
                    ? { color: 'red' }
                    : randomMovie.vote_average < 8
                    ? { color: 'orange' }
                    : { color: '#33ed26' }
                }
              >
                {randomMovie.vote_average !== 0
                  ? randomMovie.vote_average.toFixed(1) * 10 + '%'
                  : 'No Rating Yet'}
              </span>{' '}
              {randomMovie.release_date}
            </p>
            <p className="me-5">{randomMovie.overview}</p>
            <div className="flex">
              <button
                onClick={() => setPopVideo(true)}
                className="hover:bg-blue-950 hover:text-white flex rounded items-center px-3 py-1 my-3 me-2 bg-white text-black text-xl font-medium transition-all duration-300">
                <FaPlay className="me-1" /> Play
              </button>
              <button className="hover:bg-blue-950 hover:bg-opacity-60 bg-transparent border-2 border-gray-600 px-3 py-1 my-3 me-2 text-xl font-medium transition-all duration-300">
                <Link className="flex items-center" to={`/movie/${randomMovie.id}`}>
                  <IoIosInformationCircleOutline className="me-1" /> More Info
                </Link>
              </button>
            </div>
          </div>

          {/* Placeholder background while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-black filter object-cover h-[600px] lg:h-auto" />
          )}

          <img
            className={`w-full transition-all duration-500 ease-in bg-black filter object-cover h-[600px] lg:h-auto ${imageLoaded ? 'brightness-50' : 'brightness-0'}`}
            loading="lazy"
            src={banner ? banner : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg'}
            alt="movie-banner"
            onLoad={handleImageLoad}
          />
        </div>
      )}
      <AnimatePresence>
        {popVideo && <VideoPopUp clip={clip} content={randomMovie} contype={'movie'} closePopUp={() => setPopVideo(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Banner;
