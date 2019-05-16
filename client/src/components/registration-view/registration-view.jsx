import React, { useState } from 'react';
import styles from './registration-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export function RegistrationView(props) {

  const [email, setEmail] = useState('');
  const [username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = () => {
    console.log(email,username, password);
    
  };

  return (
  <div>
    <div className = "pull-right">Myflix</div>
    <Form>
      <h2 className="form-signin-heading"> Please Register Here </h2>
      <div className="form-group">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control  size="sm" type="email" placeholder="mail@example.com" />
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
          <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control  size="sm" type="password" placeholder=" Enter Password" />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
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
