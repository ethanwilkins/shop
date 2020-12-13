import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { IUserResult } from "../../types/User";

const Show = ({ match }) => {
  const [user, setUser] = useState<IUserResult>({
    name: "",
    email: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  const userId = match.params.id;

  useEffect(() => {
    axios
      .get(`/users/${userId}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {});
  }, [userId]);

  return (
    <>
      {user ? (
        <>
          <FontAwesomeIcon icon={faUser} /> {user.name}
          <Link>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <Link>
            <FontAwesomeIcon icon={faTrash} />
          </Link>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Show;
