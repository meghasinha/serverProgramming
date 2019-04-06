import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world,
    // whatever it is :-)
    const { movie, onClick} = this.props;

    return (
       <div className="movie-card" onClick={() => onClick(movie)}>{movie.Title}</div>
    );
  }
}
