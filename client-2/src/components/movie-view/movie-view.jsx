//importing required modules
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import{ProfileView} from '../profile-view/profile-view';

//export components
export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie} = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <div className="movie-title">
           <div className="label">Title</div>
           <div className="value">{movie.Title}</div>
         </div>
         <div className="movie-description">
           <div className="label">Description</div>
           <div className="value">{movie.Description}</div>
         </div>
         <img className="movie-poster" src={movie.ImagePath}/>
         <div className="movie-genre">
           <div className="label">Genre</div>
           <div className="value">{movie.Genre.Name}</div>
         </div>
         <div className="movie-director">
           <div className="label">Director</div>
           <div className="value">{movie.Director.Name}</div>
         </div>
         <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
       <Link to={`/genres/${movie.Genre.Name}`}>
        <Button variant="link">Genre</Button>
      </Link>
     </div>
   );
 }
}
MovieView.propTypes = {
   movie: PropTypes.string.isRequired,

 };
