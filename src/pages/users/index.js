import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Spinner } from "react-bootstrap";

import UserCard from "../../components/Users/Card";
import { USERS } from "../../apollo/client/queries";
import { DELETE_USER } from "../../apollo/client/mutations";

const Index = () => {
  const [users, setUsers] = useState(null);
  const [deleteUser] = useMutation(DELETE_USER);
  const { data } = useQuery(USERS);

  useEffect(() => {
    setUsers(data ? data.allUsers : data);
  }, [data]);

  const deleteUserHandler = async (userId) => {
    try {
      await deleteUser({
        variables: {
          id: userId,
        },
      });
      // Removes deleted user from state
      setUsers(users.filter((user) => user._id !== userId));
    } catch {}
  };

  return (
    <>
      {users ? (
        users.map((user) => {
          return (
            <UserCard
              user={user}
              deleteUser={deleteUserHandler}
              key={user._id}
            />
          );
        })
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default Index;
