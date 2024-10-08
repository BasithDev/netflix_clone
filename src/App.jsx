import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import TvShows from './TvShows'
import Movies from './Movies'
import NewAndPopular from './NewAndPopular'
import MovieDetails from './MovieDetails';
import { UserProvider } from './UserContext';
import Search from "./Search";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <UserProvider>
      {isLoading ? (
        <Loading fadeOut={fadeOut} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={
              <>
                <Header banner={true} activePage={'home'} SearchIcon={true} />
                <Content />
                <Footer />
              </>
            } />
            <Route path="/search" element={
             <ProtectedRoute>
               <>
                <Header banner={false} SearchIcon={false} />
                <Search/>
              </>
             </ProtectedRoute>
            } />
            <Route path="/:contype/:id" element={
              <ProtectedRoute>
                <>
                <Header banner={false} SearchIcon={true}/>
                <MovieDetails />
              </>
              </ProtectedRoute>
            } />
            <Route path="/tvshows" element={
              <ProtectedRoute>
                <>
                <Header banner={false} activePage={'tv'} SearchIcon={true}/>
                <TvShows/>
              </>
              </ProtectedRoute>
            } />
            <Route path="/movies" element={
              <ProtectedRoute>
                <>
                <Header banner={false} activePage={'movie'} SearchIcon={true}/>
                <Movies />
              </>
              </ProtectedRoute>
            } />
            <Route path="/new" element={
              <ProtectedRoute>
                <>
                <Header banner={false} activePage={'new'} SearchIcon={true}/>
                <NewAndPopular/>
              </>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      )}
    </UserProvider>
  );
}

export default App;
