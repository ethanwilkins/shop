import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import baseUrl from "../../utils/baseUrl";
import UserCard from "../../components/Users/Card";

const Index = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/users/list`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {});
  }, []);

  const deleteUser = (userId) => {
    axios
      .delete(`${baseUrl}/api/users/${userId}`)
      .then((res) => {
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((err) => {});
  };

  return (
    <>
      {users ? (
        users.map((user) => {
          return (
            <UserCard user={user} deleteUser={deleteUser} key={user._id} />
          );
        })
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default Index;
