
//importing required modules
import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './movie-view.scss';

//export components
export function MovieView(props)
{
  const { movies, movieId, userData } = props;
  if (!movies || !movies.length) return null;
  const movie = movies.find(m => m._id == movieId);

  const handleMainView= (e) =>
    {
      window.open('/');
    };

  return (
    <div>
      <img src={require('../../movie_logo.svg')}  className= "logo" width="100" height="50"/>
      <Button className="button-super" variant="link" onClick={handleMainView}>Back </Button>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Title</Card.Title>
            <Card.Text>{movie.Title}</Card.Text>
            <Card.Title>Description</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Card.Title>Genre</Card.Title>
            <Card.Text>{movie.Genre.Name}</Card.Text>
            <Card.Title>Director</Card.Title>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Card.Link href={`/directors/${movie.Director.Name}`}>Director</Card.Link>
            <Card.Link href={`/genres/${movie.Genre.Name}`}>Genre</Card.Link>
          </Card.Body>
      </Card>
    </div>
    )
 }

export default connect(({movies, userData}) => ({movies, userData}))(MovieView);
