import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import Router from "next/router";
import { FormGroup, TextField, Button } from "@material-ui/core";

import useUsersStore from "../../stores/users.store";
import { SIGN_UP, UPDATE_USER } from "../../apollo/client/mutations";
import { setAuthToken } from "../../utils/auth";

const UserForm = ({ user, isEditing }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");

  const currentUser = useUsersStore((state) => state.user);
  const { setCurrentUser } = useUsersStore();
  const [signUp] = useMutation(SIGN_UP);
  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (isEditing) {
      setUserName(user.name);
      setUserEmail(user.email);
    }
  }, [user, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update a user
      try {
        const { data } = await updateUser({
          variables: {
            id: user._id,
            name: userName,
            email: userEmail,
          },
        });

        if (currentUser._id === user._id) {
          localStorage.setItem("jwtToken", data.updateUser.token);
          setAuthToken(data.updateUser.token);
          setCurrentUser(data.updateUser.user);
        }

        Router.push(`/users/${data.updateUser.user.name}`);
      } catch {
        alert("Failed to update user...");
      }
    } else {
      // Sign up new user
      try {
        const { data } = await signUp({
          variables: {
            name: userName,
            email: userEmail,
            password: userPassword,
            passwordConfirm: userPasswordConfirm,
          },
        });

        setCurrentUser(data.signUp.user);
        localStorage.setItem("jwtToken", data.signUp.token);
        setAuthToken(data.signUp.token);
        Router.push("/");
      } catch {}
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          type="text"
          placeholder="Name"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          variant="outlined"
          margin="normal"
          label="Name"
        />
        <TextField
          type="text"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          variant="outlined"
          margin="normal"
          label="Email"
        />
      </FormGroup>

      {!isEditing && (
        <>
          <FormGroup>
            <TextField
              type="password"
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
              variant="outlined"
              margin="normal"
              label="Password"
            />
            <TextField
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setUserPasswordConfirm(e.target.value)}
              value={userPasswordConfirm}
              variant="outlined"
              margin="normal"
              label="Confirm Password"
            />
          </FormGroup>
        </>
      )}

      <Button variant="outlined" color="default" size="large" type="submit">
        {isEditing ? "Save" : "Sign up"}
      </Button>
    </form>
  );
};

UserForm.propTypes = {
  user: PropTypes.object,
  isEditing: PropTypes.bool,
};

export default UserForm;
