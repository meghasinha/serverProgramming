import React from 'react';
import styles from './genre-view.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

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
