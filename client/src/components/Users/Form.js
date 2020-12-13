import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import useUsersStore from "../../stores/users.store";

const UserForm = ({ user, isEditing }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");

  const { updateUser, signUpUser } = useUsersStore();

  useEffect(() => {
    if (isEditing) {
      setUserName(user.name);
      setUserEmail(user.email);
    }
  }, [user, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      name: userName,
      email: userEmail,
      password: userPassword,
      passwordConfirm: userPasswordConfirm,
    };

    if (isEditing) {
      userObj._id = user._id;
      updateUser(userObj);
    } else {
      signUpUser(userObj);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
        />
      </Form.Group>

      {!isEditing && (
        <>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setUserPasswordConfirm(e.target.value)}
              value={userPasswordConfirm}
            />
          </Form.Group>
        </>
      )}

      <Button variant="primary" type="submit">
        {isEditing ? "Save" : "Sign up"}
      </Button>
    </Form>
  );
};

export default UserForm;
