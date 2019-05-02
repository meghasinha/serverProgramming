import React from 'react';
import Card from 'react-bootstrap/Card';

//export components
export class GenreView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {genre} = this.props;
    if (!genre) return null;
    return (
          <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Genre</Card.Title>
            <Card.Text>{genre.Name}</Card.Text>
            <Card.Title>Description</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
          </Card.Body>
          </Card>

     );
   }
 }
