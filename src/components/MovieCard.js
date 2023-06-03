import "./MovieCard.css";
import EmptyHeart from "../assets/empty-heart.svg";
import FillHeart from "../assets/fill-heart.png";

const MovieCard = (props) => {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

  const addMovieToFav = () => {
    const newFavMovies = [...props.favMovies, props.id];
    localStorage.setItem("favs", JSON.stringify(newFavMovies));
    props.setFavMovies(newFavMovies);
  };
  const removeMovieFromFav = () => {
    const newFavMovies = props.favMovies.filter((item) => item !== props.id);
    localStorage.setItem("favs", JSON.stringify(newFavMovies));
    props.setFavMovies(newFavMovies);
  };

  return (
    <div className="card">
      <div className="poster">
        <img src={IMAGE_URL + props.poster_path} />
      </div>
      <div className="info">
        <p className="title">{props.title}</p>
        <p className="vote">{props.vote_average}</p>
      </div>
      <div className="fav-btns">
        {!props.favMovies.includes(props.id) ? (
          <button onClick={addMovieToFav} className="fav-btn">
            <img width={40} height={40} src={EmptyHeart} />
          </button>
        ) : (
          <button onClick={removeMovieFromFav}>
            <img width={40} height={40} src={FillHeart} />
          </button>
        )}
      </div>
      <div className="overview">
        <h1 className="title_overview">Overview:</h1>
        <h2 className="overivew_info">{props.overview}</h2>
      </div>
    </div>
  );
};

export default MovieCard;
