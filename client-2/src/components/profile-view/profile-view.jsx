import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import{UpdateView} from './update-view';

export class  ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {};
      }

  render() {
      const {userProfile} = this.props;

      return (
        <div className="profile-view">
         <div className="username">
           <div className="label">Username</div>
           <div className="value">{userProfile.Username}</div>
         </div>
         <div className="user-password">
           <div className="label">Password</div>
           <div className="value">{userProfile.Password}</div>
         </div>
         <div className="user-email">
           <div className="label">Email</div>
           <div className="value">{userProfile.Email}</div>
         </div>
         <div className="user-birthday">
           <div className="label">Birthday</div>
           <div className="value">{userProfile.Birthday}</div>
         </div>
         <li><Link to="./update">profile update</Link></li>
        </div>
       );
     }
   }
