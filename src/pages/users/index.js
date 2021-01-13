import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import baseUrl from "../../utils/baseUrl";
import UserCard from "../../components/Users/Card";

const Index = ({ usersAsProps }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    setUsers(usersAsProps);
  }, [usersAsProps]);

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

export const getStaticProps = async () => {
  const response = await axios.get(`${baseUrl}/api/users/list`);

  return {
    props: {
      usersAsProps: response.data.users,
    },
  };
};

export default Index;
