import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";

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
          return (
            <Link
              to={`users/${user.name}`}
              style={{
                display: "block",
                marginBottom: "10px",
              }}
              key={user._id}
            >
              <FontAwesomeIcon icon={faUser} /> {user.name}
            </Link>
          );
        })
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default List;
