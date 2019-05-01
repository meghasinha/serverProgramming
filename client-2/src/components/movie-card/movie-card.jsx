import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  onClick(movie_id)
  {
    let accessToken = localStorage.getItem('token');
    let userName = localStorage.getItem('user');
    console.log(movie_id,accessToken);
    axios.put(`https://mymovieflix.herokuapp.com/users/`+ userName +`/movies/`+movie_id,
      {params: {Name: userName, MovieID:movie_id }},
      { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(response => {
      const data = response.data;
      console.log(data);
    })
    .catch(e => {
      console.log('error updating the user')
    });
  }

  render() {
    const { movie} = this.props;
    return (
        <Card style={{width:'16rem'}}>
        <Card.Img variant="top" src={movie.ImagePath}/>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button  variant="link">Open</Button>
          </Link>
          <Button variant="link"  onClick={() => this.onClick(movie._id)}>Add to favourite</Button>
        </Card.Body>
        </Card>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
};
