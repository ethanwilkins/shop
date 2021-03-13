import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

import UserForm from "../../../components/Users/Form";
import { USER } from "../../../apollo/client/queries";

const Edit = () => {
  const { query } = useRouter();
  const [user, setUser] = useState(null);

  const { data } = useQuery(USER, {
    variables: { name: query.name },
  });

  useEffect(() => {
    setUser(data ? data.user : data);
  }, [data]);

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
