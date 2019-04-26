import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

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
      <div className="director-view">
       <div className="director-name">
         <div className="label">Name</div>
         <div className="value">{director.Name}</div>
       </div>
       <div className="director-Biography">
         <div className="label">Biography</div>
         <div className="value">{director.Bio}</div>
       </div>
       <div className="director-Birth">
         <div className="label">Birthday</div>
         <div className="value">{director.Birth}</div>
       </div>
       <div className="movie-director">
         <div className="label">Death</div>
         <div className="value">{director.Death}</div>
       </div>
       </div>
     );
   }
 }
