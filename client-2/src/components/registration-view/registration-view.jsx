import React, { useState } from 'react';
import axios from 'axios';
import styles from './registration-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export function RegistrationView(props)
{
  const [email, setEmail] = useState('');
  const [username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ birthday, setBirthday] = useState('');

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    console.log(email,username, password, birthday);
    axios.post('https://mymovieflix.herokuapp.com/users',
     {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response =>
    {
      const data = response.data;
      console.log(data);
      window.open('/');
    })
    .catch(e => {
    console.log('error registering the user')
    });
  };

    return (
    <div>
      <div className = "pull-right">
        <p>
          <span class="blue">M</span>
          <span class="purple">y</span>
          <span class="blue">F</span>
          <span class="purple">l</span>
          <span class="blue">i</span>
          <span class="purple">X</span>
          <img src={require('../../movie_logo.svg')} width="100" height="50"/>
        </p>
      </div>
      <Form>
        <h2 className="form-signin-heading"> Please Register Here </h2>
        <div className="form-group">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control  size="sm" type="email" placeholder="mail@example.com"  value={email} onChange={e => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control  size="sm" type="password" placeholder=" Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control  size="sm" type="date" placeholder=" Enter birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
        <Button variant="link" onClick={handleSubmit}>Register</Button>
        </div>
      </Form>
    </div>
    );
  }

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
