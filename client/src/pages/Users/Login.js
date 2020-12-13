import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import useUsersStore from "../../stores/users.store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useUsersStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    loginUser(user);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Log in
      </Button>
    </Form>
  );
};

export default Login;
