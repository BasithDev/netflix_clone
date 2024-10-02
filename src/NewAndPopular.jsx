import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewAndPopular = () => {
  const navigate = useNavigate();
  
  // State for popular movies
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularPage, setPopularPage] = useState(1);
  const [popularTotalPages, setPopularTotalPages] = useState(1);
  const [popularLoading, setPopularLoading] = useState(false);
  const [popularError, setPopularError] = useState(null);

  // State for new movies
  const [newMovies, setNewMovies] = useState([]);
  const [newPage, setNewPage] = useState(1);
  const [newTotalPages, setNewTotalPages] = useState(1);
  const [newLoading, setNewLoading] = useState(false);
  const [newError, setNewError] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_APIkEY;

  // Fetch popular movies
  const fetchPopularMovies = useCallback(async () => {
    try {
      setPopularLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${popularPage}`
      );

      setPopularMovies(response.data.results);
      setPopularTotalPages(response.data.total_pages);
      setPopularLoading(false);
    } catch (err) {
      console.log(err);
      setPopularError('Failed to fetch popular movies.');
      setPopularLoading(false);
    }
  }, [popularPage, API_KEY]);

  // Fetch new movies
  const fetchNewMovies = useCallback(async () => {
    try {
      setNewLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${newPage}`
      );

      setNewMovies(response.data.results);
      setNewTotalPages(response.data.total_pages);
      setNewLoading(false);
    } catch (err) {
      console.log(err);
      setNewError('Failed to fetch new movies.');
      setNewLoading(false);
    }
  }, [newPage, API_KEY]);

  // useEffect to fetch data on component mount and page change
  useEffect(() => {
    fetchPopularMovies();
    fetchNewMovies();
  }, [fetchPopularMovies, fetchNewMovies]);

  // Function to handle page change for popular movies
  const handlePopularPageChange = (newPage) => {
    setPopularPage(newPage);
  };

  // Function to handle page change for new movies
  const handleNewPageChange = (newPage) => {
    setNewPage(newPage);
  };

  return (
    <div className="px-4 text-white mt-8 py-8">
      <h1 className="text-3xl ms-2 font-bold mb-4">Popular Movies</h1>
      {popularError && <p className="text-red-500">{popularError}</p>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {popularMovies.map((movie) => (
          <div
            onClick={() => navigate(`/${'movies'}/${movie.id}`)} 
            key={movie.id}
            className="bg-gray-800 p-2 cursor-pointer hover:bg-gray-700 transition-all duration-200 rounded-lg text-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-2 rounded-lg"
            />
            <p className="text-white font-bold">{movie.title}</p>
          </div>
        ))}
      </div>

      <div className='w-full text-center mt-6'>
        {popularLoading && <p className="text-center mt-4">Loading...</p>}
        
        {!popularLoading && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handlePopularPageChange(popularPage - 1)}
              disabled={popularPage === 1}
              className={`px-4 py-2 rounded ${popularPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              Previous
            </button>

            <span className="text-white mt-2 font-bold">
              Page {popularPage} of {popularTotalPages}
            </span>

            <button
              onClick={() => handlePopularPageChange(popularPage + 1)}
              disabled={popularPage === popularTotalPages}
              className={`px-4 py-2 rounded ${popularPage === popularTotalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <h1 className="text-3xl ms-2 font-bold mb-4 mt-8">New Movies</h1>
      {newError && <p className="text-red-500">{newError}</p>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {newMovies.map((movie) => (
          <div
            onClick={() => navigate(`/${'movies'}/${movie.id}`)} 
            key={movie.id}
            className="bg-gray-800 p-2 cursor-pointer hover:bg-gray-700 transition-all duration-200 rounded-lg text-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-2 rounded-lg"
            />
            <p className="text-white font-bold">{movie.title}</p>
          </div>
        ))}
      </div>

      <div className='w-full text-center mt-6'>
        {newLoading && <p className="text-center mt-4">Loading...</p>}
        
        {!newLoading && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleNewPageChange(newPage - 1)}
              disabled={newPage === 1}
              className={`px-4 py-2 rounded ${newPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              Previous
            </button>

            <span className="text-white mt-2 font-bold">
              Page {newPage} of {newTotalPages}
            </span>

            <button
              onClick={() => handleNewPageChange(newPage + 1)}
              disabled={newPage === newTotalPages}
              className={`px-4 py-2 rounded ${newPage === newTotalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAndPopular;
