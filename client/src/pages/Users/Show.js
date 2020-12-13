import React, { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";
import UserCard from "../../components/Users/Card";

const Show = ({ match }) => {
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
    <>{user ? <UserCard user={user} /> : <Spinner animation="border" />}</>
  );
};

export default Show;
