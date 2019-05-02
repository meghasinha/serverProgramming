//importing required modules
import React from 'react';
import Card from 'react-bootstrap/Card';

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
   );
 }
}
