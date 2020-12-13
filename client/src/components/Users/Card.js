import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";

import useUsersStore from "../../stores/users.store";

const Show = ({ user }) => {
  const { name, _id, createdAt } = user;
  const { deleteUser } = useUsersStore();

  return (
    <Card style={{ width: "18rem", marginBottom: "10px" }}>
      <Card.Body>
        <Card.Title>
          <Link to={`/users/${name}`}>
            <FontAwesomeIcon icon={faUser} /> {name}
          </Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Joined {createdAt}
        </Card.Subtitle>
        <Card.Link href={`/users_edit/${name}`}>
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Card.Link>
        <Card.Link
          href=""
          onClick={() =>
            window.confirm("Are you sure you want to delete this user?") &&
            deleteUser(_id)
          }
        >
          <FontAwesomeIcon icon={faTrash} /> Delete
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Show;
