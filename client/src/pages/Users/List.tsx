import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface IUser {
  name: string;
  email: string;
  _id: number;
}

const List = () => {
  const [users, setUsers] = useState<IUser[]>([]);

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
      {users
        ? users.map((user) => {
            return (
              <Link
                to={`users/${user._id}`}
                style={{
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                <FontAwesomeIcon icon={faUser} /> {user.name}
              </Link>
            );
          })
        : "Loading..."}
    </>
  );
};

export default List;
