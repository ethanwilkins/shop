import React, { useState, useEffect } from "react";
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
              <p>
                <FontAwesomeIcon icon={faUser} />
                {user.name}
                {user.email}
                {user._id}
              </p>
            );
          })
        : "Loading..."}
    </>
  );
};

export default List;
