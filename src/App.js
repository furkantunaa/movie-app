import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";

function App() {
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=2d606943dab9bbc6d18a13d1d54fe507&language=en-US&page=1";

  const API_SEARCH =
    "https://api.themoviedb.org/3/search/movie?api_key=2d606943dab9bbc6d18a13d1d54fe507&language=en-US&query=";

  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState("");
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("favs")) {
      setFavMovies(JSON.parse(localStorage.getItem("favs")));
    }
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(API_SEARCH + term)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  };

  return (
    <div className="app">
      <div className="search_nav">
        <div className="title">
          <h1>Movies</h1>
        </div>
        <div className="search_box">
          <form onSubmit={handleSearch}>
            <input onChange={(e) => setTerm(e.target.value)} />
            <button>Search</button>
          </form>
        </div>
      </div>
      <div className="movies">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            {...movie}
            favMovies={favMovies}
            setFavMovies={setFavMovies}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
