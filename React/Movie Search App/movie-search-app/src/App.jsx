import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";

function App() {
  const API_KEY = import.meta.env.VITE_OMDB_KEY;
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce ref — prevents API call on every keystroke
  const debounceRef = useRef(null);

  // If query is empty, clear results and stop.
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setLoading(false);
      setError("");
      clearTimeout(debounceRef.current);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchMovies(query);
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  async function fetchMovies(searchTerm) {
    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const url = `${import.meta.env.VITE_OMDB_URL}?s=${searchTerm}&apikey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "Movie search failed");
      }

      setMovies(data.Search || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 1rem" }}>
      <h2>Movie Search</h2>
      <SearchBar query={query} onChange={setQuery} />

      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
