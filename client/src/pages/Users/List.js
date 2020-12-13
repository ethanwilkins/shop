import React, { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";

import UserCard from "../../components/Users/Card";

const List = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users/")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Users weren't able to load...");
      });
  }, []);

  return (
    <>
      {users ? (
        users.map((user) => {
          return <UserCard user={user} />;
        })
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default List;
