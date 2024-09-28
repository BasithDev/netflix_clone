import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Category = ({ title, apiUrl }) => {
  const navigate = useNavigate()
  const postersRef = useRef(null);
  const [contents, setContents] = useState([]);

  const scrollLeft = () => {
    if (postersRef.current) {
      postersRef.current.scrollBy({ left: -postersRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (postersRef.current) {
      postersRef.current.scrollBy({ left: postersRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      setContents(data.results);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="content p-3 px-10 bg-black text-white">
      <div className="cato relative group">
        <p className="text-2xl sm:ms-9 font-medium">{title}</p>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="lg:block hidden absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900 hover:bg-gray-700 text-white p-2 rounded-full z-10"
          >
            &#8592;
          </button>
          <div
            ref={postersRef}
            className="hide-scrollbar sm:ms-7 mt-2 posters flex overflow-x-scroll scroll-smooth relative"
          >
            {contents.length > 0 ? (
              contents.map((item, index) => (
                <img
                  className="relative w-44 m-2 cursor-pointer hover:scale-105 transition-all duration-300"
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt="posters"
                  onClick={()=>navigate(`/${title==='Top Rated TV Shows'?'tv':'movie'}/${item.id}`)}
                />
              ))
            ) : (
              <p>Loading..</p>
            )}
          </div>
          <button
            onClick={scrollRight}
            className="lg:block hidden absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 hover:bg-gray-700 text-white p-2 rounded-full z-10"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

Category.propTypes = {
  title: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
};

export default Category;
