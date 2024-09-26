import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [fadeIn, setFadeIn] = useState(false); // For handling fade-in effect
  const API_KEY = 'd16900d51292cb37d2a7f02963fa6ee1';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        setMovie(data);
        setTimeout(() => {
          setFadeIn(true);
        }, 300);
      } catch (error) {
        console.log("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return (
    <div className='bg-black h-screen text-white flex justify-center items-center'>
      <p>Loading...</p>
    </div>
  );

  return (
    <div
      className={`bg-black h-fit lg:pt-14 lg:ps-14 lg:py-2 py-10 md:h-screen `} // Smooth fade-in effect
    >
      <div className={`p-5 pt-8 movie_info font-sans transition-all duration-500 lg:flex text-white ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}>
        <img className='lg:w-52 md:w-56 w-full h-fit rounded-lg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
        <div className='mx-3'>
          <h1 className='text-4xl mt-3 font-medium'>{movie.title}</h1>
          <p className='text-xl lg:w-1/2 my-2'>{movie.overview}</p>
          <p className='text-xl font-medium my-2 '>Release Date: {movie.release_date}</p>
          <p className='font-medium text-lg'>Rating: <span className={movie.vote_average < 4 ? 'text-red-600' : movie.vote_average >= 4 && movie.vote_average < 8 ? 'text-orange-500' : 'text-green-500'}>{movie.vote_average ? movie.vote_average : 'No Rating Yet'}</span></p>
          <button className="hover:bg-blue-950 hover:text-white flex rounded items-center px-3 py-1 my-3 me-2 bg-white text-black text-xl font-medium transition-all duration-300">
            <FaPlay className="me-1" /> Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
