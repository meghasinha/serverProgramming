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
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="label">Name</div>
            <div className="value">{genre.Name}</div>
          </div>
          <div className="col">
            <div className="label">Description</div>
            <div className="value">{genre.Description}</div>
          </div>
        </div>
      </div>
     );
   }
 }
