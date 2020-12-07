import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SignUp = () => {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Username" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign up
      </Button>
    </Form>
  );
}

export default SignUp;