
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


export function UpdateView(props) {

const [email, setEmail] = useState('');
const [username, setUsername ] = useState('');
const [ password, setPassword ] = useState('');
const [ birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let accessToken = localStorage.getItem('token');
    console.log(email,username, password, birthday,accessToken);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(user) */

    axios.put('https://mymovieflix.herokuapp.com/users/:Username', {
      headers: { Authorization: `Bearer ${accessToken}`} },
      {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/');
    })
    .catch(e => {
      console.log('error updating the user')
    });

  };

  return (
  <div>
    <Form>
      <h2 className="form-signin-heading"> profile update </h2>
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
        <Button className="button-super" type="submit" onClick={handleSubmit}>Update</Button>
      </div>
    </Form>
  </div>
  );
}
