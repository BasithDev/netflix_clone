import { useEffect, useState , useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]); // Stores the fetched movies
  const [page, setPage] = useState(1); // Page counter for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages from API
  const [loading, setLoading] = useState(false); // To track the loading state
  const [error, setError] = useState(null); // For error handling

  const API_KEY = import.meta.env.VITE_TMDB_APIkEY;

  // Function to fetch movies from TMDb API
  const fetchMovies = useCallback( async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      setMovies(response.data.results); // Set the movies for the current page
      setTotalPages(response.data.total_pages); // Set the total number of pages
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError('Failed to fetch movies.');
      setLoading(false);
    }
  },[page,API_KEY])

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {movies.map((movie) => (
          <div
            onClick={() => navigate(`/${'movie'}/${movie.id}`)} // Wrap in arrow function
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
        {loading && <p className="text-center mt-4">Loading...</p>}
        
        {!loading && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              Previous
            </button>

            <span className="text-white mt-2 font-bold">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
