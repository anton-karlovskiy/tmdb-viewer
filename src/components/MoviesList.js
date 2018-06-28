import React from 'react';
import {Link} from 'react-router-dom';
import {getMoviePosterImageUrl} from '../api';
import Genre from '../containers/Genre';
import FavoriteBadge from '../containers/FavoriteBadge';

const MESSAGE__LOADING = 'Loading...';
const MESSAGE__ERROR = 'Error';
const MESSAGE__NO_MOVIES_FOUND = 'No movies found';

class MoviesList extends React.Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    const {movies, isLoading, isError} = this.props;

    if (isLoading && !movies.length) {
      return MESSAGE__LOADING;
    }

    if (isError) {
      return MESSAGE__ERROR;
    }

    if (!movies.length) {
      return MESSAGE__NO_MOVIES_FOUND;
    }

    return (
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <p>
                {movie.title}
              </p>
              <img
                src={getMoviePosterImageUrl(movie.poster_path)}
                alt={movie.title}
              />
              <FavoriteBadge movie={movie} />
              <ul>
                {movie.genres.map(genreId => (
                  <li key={genreId}>
                    <Genre id={genreId} />
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

MoviesList.defaultProps = {
  movies: [],
  isLoading: false,
  isError: false,
};

export default MoviesList;