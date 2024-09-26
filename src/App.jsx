import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import MovieDetails from './MovieDetails';
import { UserProvider } from './UserContext';

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
                <Header banner={true} activePage={'home'} />
                <Content />
                <Footer />
              </>
            } />
            <Route path="/movie/:id" element={
              <>
                <Header banner={false} />
                <MovieDetails />
              </>
            } />
          </Routes>
        </Router>
      )}
    </UserProvider>
  );
}

export default App;
