import React, { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Show = ({ match }) => {
  const [user, setUser] = useState(null);

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
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Show;
