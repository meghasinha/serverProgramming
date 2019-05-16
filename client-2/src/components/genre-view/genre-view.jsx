import React from 'react';
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';

//export components
 function GenreView(props)
 {
  const {  movies , genreName } = props;
  if (!movies || !movies.length) return null;
  const movie = movies.find(m => m.Genre.Name === props.genreName);

  return (
    <div>
      <img src={require('../../movie_logo.svg')}  className= "logo" width="100" height="50"/>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Genre</Card.Title>
          <Card.Text>{movie.Genre.Name}</Card.Text>
          <Card.Title>Description</Card.Title>
          <Card.Text>{movie.Genre.Description}</Card.Text>
        </Card.Body>
        </Card>
      </div>
     );
   }

 export default connect(({ movies }) => ({ movies }))(GenreView);
