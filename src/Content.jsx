import Categaory from './Categaory'

const Content = () => {
  const API_KEY = 'd16900d51292cb37d2a7f02963fa6ee1';
  const trendingURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
  const topRatedMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
  const topRatedShowsURL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
  const actionThrillerURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28,53`
  const comedyURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`
  const horrerURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`
  const sci_fi_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878`
  const animationURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`

  return (
    <>
      <Categaory
        title="Trending Now"
        apiUrl={trendingURL}
      />
      <Categaory
        title="Top Rated Movies"
        apiUrl={topRatedMoviesURL}
      />
      <Categaory
        title="Top Rated TV Shows"
        apiUrl={topRatedShowsURL}
      />
      <Categaory
        title="Action Thriller"
        apiUrl={actionThrillerURL}
      />
      <Categaory
        title="Comedy"
        apiUrl={comedyURL}
      />
      <Categaory
        title="Horrer"
        apiUrl={horrerURL}
      />
      <Categaory
        title="Sci-Fi"
        apiUrl={sci_fi_URL}
      />
      <Categaory
        title="Animation"
        apiUrl={animationURL}
      />
    </>
  );
};

export default Content;
