import React, { useState } from "react";
import axios from "axios";

import { Form, Button } from "react-bootstrap";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: name,
      password: password,
    };

    axios
      .post("/users/create", user)
      .then((res) => {
        alert("Success...");
      })
      .catch((err) => {
        alert("You have failed utterly...");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign up
      </Button>
    </Form>
  );
};

export default SignUp;
