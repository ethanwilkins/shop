import React, { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Card, Spinner } from "react-bootstrap";

import useUsersStore from "../../stores/users.store";

const Show = ({ match }) => {
  const [user, setUser] = useState(null);
  const userName = match.params.name;

  const { deleteUser } = useUsersStore();

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
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faUser} /> {user.name}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Joined {user.createdAt}
            </Card.Subtitle>
            <Card.Link href={`/users_edit/${user.name}`}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Card.Link>
            <Card.Link href="" onClick={() => deleteUser(user._id)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Card.Link>
          </Card.Body>
        </Card>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default Show;
