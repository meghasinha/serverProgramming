import React from 'react';
import Card from 'react-bootstrap/Card';

//export components
export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {director} = this.props;

    if (!director) return null;

    return (
  <Card style={{ width: '18rem' }}>
      <Card.Body>
         <Card.Title>Director-Name</Card.Title>
         <Card.Text>{director.Name}</Card.Text>
         <Card.Title>Biography</Card.Title>
         <Card.Text>{director.Bio}</Card.Text>
         <Card.Title>Birthday</Card.Title>
         <Card.Text>{director.Birth}</Card.Text>
         <Card.Title>Death</Card.Title>
         <Card.Text>{director.Death}</Card.Text>
        </Card.Body>
        </Card>

     );
   }
 }
