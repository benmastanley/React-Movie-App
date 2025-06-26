import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css"; // Assuming you have a CSS file for styling
import { fetchMovies, fetchTrendingMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setError(null);
    try {
      const searchResults = await fetchMovies(searchQuery);
      setMovies(searchResults);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
        setError("Failed to fetch trending movies");
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Home;
