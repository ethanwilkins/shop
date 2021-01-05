import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormGroup, TextField, Button } from "@material-ui/core";
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
      </FormGroup>

      <FormGroup>
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
          </FormGroup>

          <FormGroup>
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
