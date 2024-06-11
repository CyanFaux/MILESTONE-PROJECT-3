import React, { useState, useEffect } from 'react';
import { getPopularMovies } from './api'; //Need api- see Josh for api//

// Functional component for Home
function Home() {
  // State variables
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve movies
  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const popularMovies = await getPopularMovies(); // Fetching popular movies from API
        setMovies(popularMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    }

    fetchPopularMovies();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  // JSX for rendering the component
  return (
    <div>
      <h1>Popular Movies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;