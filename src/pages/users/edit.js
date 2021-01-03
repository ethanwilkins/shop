import React, { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";

import UserForm from "../../components/Users/Form";

const Edit = ({ match }) => {
  const [user, setUser] = useState(null);
  const userName = match.params.name;

  useEffect(() => {
    axios
      .get(`/users/${userName}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {});
  }, [userName]);

  return (
    <>
      {user ? (
        <UserForm user={user} isEditing={true} />
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default Edit;
