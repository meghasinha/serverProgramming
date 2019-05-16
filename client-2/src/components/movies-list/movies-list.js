import React from 'react';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
const { movies, visibilityFilter, sortColumn, userData } = state;

  let moviesToShow = movies.concat().sort((a, b) =>
  {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  if (visibilityFilter !== '')
  {
    moviesToShow = moviesToShow.filter(m => m.Title.toLowerCase().includes(visibilityFilter));
  }

  return { movies: moviesToShow, userData:userData};
};

function MoviesList(props)
 {
  const { movies, userData } = props,
   user = userData.Username;
  if (!movies) return <div className="main-view"/>;

  return (
  <div className="movies-list">
    <VisibilityFilterInput/>
     {movies.map(m => <MovieCard key={m._id} movie={m} user={user}/>)}
   </div>
 );
}

export default connect(mapStateToProps)(MoviesList);
