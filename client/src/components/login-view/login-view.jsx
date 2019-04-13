
import React, { useState } from 'react';
import {Link, Route, Router} from 'react-router';
import {MainView} from '../main-view/main-view';
import  {RegistrationView} from '../registration-view/registration-view';
import styles from './login-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
      <label>
        Username:
        <input type="text" placeholder = "Enter your Username" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      </div>
    <div className="form-group">
      <label>
        Password:
        <input type="password" placeholder = "Enter your Password" text="we will never share your Password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      </div>
      <div className="form-group">
      <button className="btn btn-primary" type="button" onClick={handleSubmit}>SignIn</button>
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
