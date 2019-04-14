
import React, { useState } from 'react';
import {Link, Route, Router} from 'react-router';
import {MainView} from '../main-view/main-view';
import  {RegistrationView} from '../registration-view/registration-view';
import styles from './login-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export function LoginView(props) {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = () => {
    console.log(login, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(user) */
  };

  return (
  <div>
    <div className = "pull-right">Myflix</div>
    <form>
      <h2 className="form-signin-heading"> Please sign in </h2>
      <div className="form-group">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control  size="sm" type="password" placeholder=" Enter Password" />
        </Form.Group>
        <Button className="button-super" type="submit">SignIn</Button>
      </div>
    </form>
  </div>
  );
}

LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
