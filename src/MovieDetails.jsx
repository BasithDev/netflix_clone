import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import axios from 'axios';
import VideoPopUp from './VideoPopUp';
import { AnimatePresence } from "framer-motion";
import Loader from "react-js-loader";

const MovieDetails = () => {
  const { id , contype } = useParams();
  const [movie, setMovie] = useState(null);
  const [clip,setClip] = useState([])
  const [fadeIn, setFadeIn] = useState(false);
  const [popVideo , setPopVideo] = useState(false)
  const [cast,setCast] = useState([])
  const API_KEY = import.meta.env.VITE_TMDB_APIkEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${contype}/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
        setCast(data.credits.cast)
        setMovie(data);
        setClip(data.videos.results.find((item)=>item.type==='Teaser' || item.type==='Trailer'))
        setTimeout(() => {
          setFadeIn(true);
        }, 300);
      } catch (error) {
        console.log("Error fetching movie details:", error);
      }
    };
    console.log(cast)
    fetchMovieDetails();
  }, [id,API_KEY,contype,cast]);

  const getRuntime = ()=>{
    if (contype==='movie' && movie?.runtime) {
      const hours = Math.floor(movie.runtime / 60)
      const min = movie.runtime % 60
      return hours > 0 ? `${hours}h ${min}m` : `${min}m`
    }else if (contype === 'tv' && movie?.episode_run_time?.length > 0) {
      const avgRuntime = Math.round(movie.episode_run_time.reduce((a, b) => a + b, 0) / movie.episode_run_time.length);
      return avgRuntime > 60 ? `${Math.floor(avgRuntime / 60)}h ${avgRuntime % 60}m EP` : `${avgRuntime} M EP`;
    } else {
      return 'Runtime not available';
    }
  }

  const getVoteCount = ()=>{
    let count = movie?.vote_count
    return count>1000 ? `${(count/1000).toFixed(1)}K`:`${count}`
  }

  if (!movie) return (
    <div className='bg-black h-screen text-white flex justify-center items-center'>
      <div className={"item"}>
          <Loader type="bubble-scale" bgColor={'red'} color={'white'} title={"Loading..."} size={50} />
      </div>
    </div>
  );

  return (
    <>
    <div
  className={`relative bg-gradient-to-b from-gray-900 to-black h-fit md:pt-14 lg:pt-16 md:ps-3 lg:ps-14 lg:py-8 py-10 text-white`} // Background gradient
>
  <div className={`p-6 pt-6 movie_info font-sans transition-all duration-500 lg:flex gap-10 ${
    fadeIn ? 'opacity-100' : 'opacity-0'
  }`}>
    <img className='lg:w-60 md:w-56 w-full h-fit rounded-lg shadow-lg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
    <div className='md:ms-2 lg:ms-3 md:mt-5 lg:mt-0'>
      <h1 className='text-5xl font-bold mt-3 md:mt-0 mb-4'>{contype === 'tv' ? movie.name : movie.title}</h1>
      <p className='text-[16px] lg:w-[700px] my-4 text-gray-300'>{movie.overview}</p>
      <p className='text-xl font-semibold my-2 '>Release Date: <span className="font-normal">{movie.release_date}</span></p>
      <p className='text-xl font-semibold my-2 '>Runtime: <span className="font-normal">{getRuntime()}</span></p>
      <p className='font-semibold text-lg'>
        Rating:
        <span className={movie.vote_average < 4 ? 'text-red-600' : movie.vote_average >= 4 && movie.vote_average < 8 ? 'text-orange-500' : 'text-green-500'}>
          {movie.vote_average ? ` ${(movie.vote_average).toFixed(1)}` : ' No Rating Yet'}
        </span>
        {` - ${getVoteCount()} votes`}
      </p>
      <button
        onClick={() => setPopVideo(true)}
        className="mt-6 flex items-center bg-white text-black font-medium text-xl px-4 py-2 rounded-lg hover:bg-blue-950 hover:text-white transition duration-300 shadow-md"
      >
        <FaPlay className="mr-2" /> Play
      </button>
    </div>
  </div>
  <div className='md:ms-7 mt-12'>
  <p className='font-semibold text-2xl ms-3 mb-6'>Main Cast</p>
  <div className='flex gap-4 p-3 overflow-x-auto md:overflow-x-hidden lg:flex-wrap'> {/* Horizontal scroll on small, hidden on large */}
    {cast && cast
      .filter((val) => val.known_for_department === 'Acting')
      .sort((a, b) => a.order - b.order)
      .slice(0, 6)
      .map((val) => (
        <div key={val.id} className="min-w-[150px] cursor-pointer flex-shrink-0 bg-gray-800 rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg">
          <img
            className='w-full h-48 object-cover rounded-t-lg'
            src={val.profile_path ? `https://image.tmdb.org/t/p/w500/${val.profile_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz9tftw9qculFH1gxieWkxL6rbRk_hrXTSg&s'}
            alt={val.name}
          />
          <div className='p-3 text-center'>
            <p className='text-sm text-gray-400 italic'>{val.character}</p>
            <p className='text-lg font-semibold text-white'>{val.name}</p>
          </div>
        </div>
      ))}
    {
      cast.length===0 && (<div>
        <p className='text-2xl italic'>Cast Data Not Available</p>
      </div>)
    }
  </div>
</div>

</div>

<AnimatePresence>
  {popVideo && <VideoPopUp clip={clip} content={movie} contype={contype} closePopUp={() => setPopVideo(false)} />}
</AnimatePresence>

    </>
    
  );
};

export default MovieDetails;
