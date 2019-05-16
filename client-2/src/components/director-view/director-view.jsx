import React from 'react';
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//export components
 function DirectorView(props)
 {
  const {  movies , directorName } = props;
  if (!movies || !movies.length) return null;
  const movie = movies.find(m => m.Director.Name === props.directorName);

  return (
      <div>
        <img src={require('../../movie_logo.svg')}  className= "logo" width="100" height="50"/>
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Director-Name</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>
          <Card.Title>Biography</Card.Title>
          <Card.Text>{movie.Director.Bio}</Card.Text>
          <Card.Title>Birthday</Card.Title>
          <Card.Text>{movie.Director.Birth}</Card.Text>
          <Card.Title>Death</Card.Title>
          <Card.Text>{movie.Director.Death}</Card.Text>
        </Card.Body>
        </Card>
      </div>
    );
  }

export default connect(({ movies }) => ({ movies }))(DirectorView);
