import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Router from "next/router";

import { SIGN_IN } from "../../apollo/client/mutations";
import useUsersStore from "../../stores/users.store";
import { setAuthToken } from "../../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useUsersStore();
  const [signIn] = useMutation(SIGN_IN);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await signIn({
        variables: {
          email: email,
          password: password,
        },
      });

      setCurrentUser(data.signIn.user);
      localStorage.setItem("jwtToken", data.signIn.token);
      setAuthToken(data.signIn.token);
      Router.push("/");
    } catch (err) {
      alert("Sign in not successful...");
    }
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
