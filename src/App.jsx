import { useState } from "react";
import axios from "axios";
import "./app.css";


function App() {
  const [movie, setMovie] = useState(null);
  const [search, setSearch] = useState("");

  const API_KEY = "227ed015"; 

  const fetchMovie = async () => {
    if (!search) return;
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&t=${search}`
      );
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  return (
    <div className="container">
      <h1>Movie Finder</h1>
     
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchMovie}> Search</button>
      </div>

      {movie && movie.Response !== "False" ? (
        <div className="movie-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <img src={movie.Poster} alt={movie.Title} />
          <p><strong>IMDB Rating:</strong>  {movie.imdbRating}</p>
          <p><strong></strong> {movie.Plot}</p>
        </div>
      ) : (
        movie && <p>Movie Not Found</p>
      )}
    </div>
  );
}

export default App;
