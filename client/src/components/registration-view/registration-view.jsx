import React, { useState } from 'react';
import styles from './registration-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export function RegistrationView(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  const handleSubmit = () => {
    console.log(email,username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(user) */
  };

  return (
    <div>
      <div className = "pull-right">Myflix</div>
    <form>
    <h2 className="form-signin-heading"> Please register here </h2>

    <div className="form-group">
      <label>
        Username:
        <input type="text" placeholder = "Enter your username"value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      </div>
      <div className="form-group">
      <label>
        Email address:
        <input type="email"  placeholder = "Enter your Email"value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      </div>
      <div className="form-group">
      <label>
        Password:
        <input type="password" placeholder = "Enter your password"value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <div className="form-group">
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </form>
    </div>
  );
}
RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
