
import React, { useState } from 'react';
//import  {RegistrationView} from '../registration-view/registration-view';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import styles from './login-view.scss';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export function LoginView(props) {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      /* Send a request to the server for authentication */
      axios.post('https://mymovieflix.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    };

  return (
    <div>
      <div className = "pull-right">MovieFlix</div>
      <form>
        <h2 className="form-signin-heading"> Please sign in </h2>
        <div className="form-group">
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)}  />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control  size="sm" type="password" placeholder=" Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button className="button-super" type="submit" onClick={handleSubmit}>SignIn </Button>
        </div>
      </form>
      <div>
        <p> Not Registered Yet, Please Signup </p>
        <p><Link to="/register">SignUp</Link></p>
      </div>
    </div>
  );
}

LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};