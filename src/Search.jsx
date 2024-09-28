import axios from 'axios';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { motion } from "framer-motion";
import { BsEmojiNeutral } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-js-loader';
const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()

  let quePar = new URLSearchParams(location.search)
  let initailQuery = quePar.get('query') || ''

  const [searchQuery,setSearchQuery] = useState('')
  const [searchResult,setSearchResult] = useState([])
  const [gotRes,setGotRes] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const API_KEY = import.meta.env.VITE_TMDB_APIkEY

  const fetchSearch = async (query)=>{
    if (query.trim() === '') return;
    try {
      const data = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`)
      setSearchResult(data.data.results.filter((item)=> item.poster_path))
      setGotRes(true)
      setImagesLoaded(0)
    } catch (error) {
      console.log(error)
    }
  }
    const breakpointColumnsObj = {
        default: 6,
        1100: 5,
        700: 3,
        500: 2,
      };

  useEffect(()=>{
    if (initailQuery) {
      fetchSearch(initailQuery)
    }
  },[initailQuery])

  const handleSearch = ()=>{
    if (searchQuery.trim()) {
      navigate(`?query=${searchQuery}`)
      fetchSearch(searchQuery)
    }
  }
  const handleImageLoad = (id) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  useEffect(() => {
    if (imagesLoaded === searchResult.length && searchResult.length > 0) {
      setIsLoading(false);
    }
  }, [imagesLoaded, searchResult.length]);

  const clearSearchResults = () => {
    setSearchResult([]);
    setGotRes(false);
    setImagesLoaded(0);
    setSearchQuery('');
    navigate('/search'); // Clear the query from the URL
  };

  const searchResultVariant = {
    hidden: { opacity: 0},
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between showing each result
      },
    },
  };
  return (
    <>
    <div className="search relative text-white">
      
        <div className="searcharea mt-16 border-[1px] border-white border-x-0 border-b-0 border-opacity-40 p-3 pt-6 flex">
            <input
            value={searchQuery}
            onKeyDown={(e)=>{
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearch()
              }
            }}
            onChange={(e)=>setSearchQuery(e.target.value)} 
            placeholder="Search Here..."
            className="w-full text-xl transition-all duration-300 rounded bg-transparent border-[1px] m-1 px-3  py-2 focus:outline-0 focus:border-red-600 "
            type="text" />
            <button onClick={handleSearch} className="bg-red-600 font-semibold text-xl py-1.5 px-3 rounded m-1 hover:bg-red-800 transition-all duration-300">Search</button>
            <button onClick={clearSearchResults} className="bg-red-600 font-semibold text-xl py-1.5 px-3 rounded m-1 hover:bg-red-800 transition-all duration-300">Clear</button>
        </div>
        {isLoading && (
          <div className="flex justify-center items-center mt-10">
            <Spinner size={60} color="#FF0000" />
          </div>
        )}
        {
        !isLoading && searchResult.length > 0 ? (
          <motion.div
            className="px-1"
            variants={containerVariant} // Animate container
            initial="hidden"
            animate="visible"
          >
          <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-4 px-6"
          columnClassName="masonry-column"
        >
          {
            searchResult.map((val)=>(
              
                <motion.div key={val.id}
                variants={searchResultVariant}
                whileHover={{ boxShadow: "0px 0px 32px rgba(255, 0, 0, 255)" }}
                onClick={()=>navigate(`/${val.media_type}/${val.id}`)}
                className="mb-4 border-[1px] p-2 border-gray-400 border-opacity-40 rounded-xl hover:shadow-custom cursor-pointer hover:shadow-red-600 transition-all duration-300">
                  <img
                  onLoad={()=>handleImageLoad(val.id)}
                    src={`https://image.tmdb.org/t/p/w500${val.poster_path}`}
                    className="w-full h-auto rounded-lg"
                    alt="Movie Poster"
                  />
                  <p className="font-bold text-lg mt-2">{val.title || val.name}</p>
                  <p className="text-md">{`Released On : ${val.release_date ? val.release_date : val.first_air_date ? val.first_air_date : 'Not Found'}`}</p>
                </motion.div>
            ))
          }
          
        </Masonry>
        </motion.div>
        ) : (
          <div className="text-center mt-10">
          {searchQuery.trim() === '' ? (
            <p className="text-gray-400">Start searching for a movie or TV show...</p>
          ) : gotRes && (
            <div className="flex flex-col items-center text-gray-400">
              <BsEmojiNeutral className="text-6xl" />
              <p>No results found</p>
            </div>
          )}
        </div>
        )
      }
        
    </div>
    </>
  )
}

export default Search