import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import styles from './profile-view.scss';
import Card from 'react-bootstrap/Card';

export class  ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {};
      }

  render() {
      const {userProfile} = this.props;

      return (
          <div>
            <p className="update"><Link to={`./update/${userProfile.Username}`}>Profile Update</Link></p>
            <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Username</Card.Title>
              <Card.Text>{userProfile.Username}</Card.Text>
              <Card.Title>Password</Card.Title>
              <Card.Text>{userProfile.Password}</Card.Text>
              <Card.Title>Email</Card.Title>
              <Card.Text>{userProfile.Email}</Card.Text>
              <Card.Title>Birthday</Card.Title>
              <Card.Text>{userProfile.Birthday}</Card.Text>
            </Card.Body>
            </Card>
          </div>
       );
     }
   }
