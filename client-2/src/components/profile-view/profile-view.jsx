import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { connect } from "react-redux";
import styles from './profile-view.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

 function  ProfileView (props)
 {
    const {  userProfile, userData } = props;
    if (!userData || !userData.length) return null;
    const user = userData.find(m => m.Username === props.userProfile);

    return (
          <div>
            <img src={require('../../movie_logo.svg')}  className= "logo" width="100" height="50"/>
            <p className="update"><Link to={`./update/${props.userProfile}`}>Profile Update</Link></p>
            <Button className="logOut"onClick={() => this.logOut()} variant="link">Logout</Button>
            <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Username</Card.Title>
              <Card.Text>{user.Username}</Card.Text>
              <Card.Title>Password</Card.Title>
              <Card.Text>*****</Card.Text>
              <Card.Title>Birthday</Card.Title>
              <Card.Text>{user.Birthday}</Card.Text>
              <Card.Title>Email</Card.Title>
              <Card.Text>{user.Email}</Card.Text>
            </Card.Body>
            </Card>
          </div>
       );
     }

export default connect(({ userData }) => ({ userData }))(ProfileView);
