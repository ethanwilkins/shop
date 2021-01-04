import React from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import baseUrl from "../../utils/baseUrl";
import UserCard from "../../components/Users/Card";

const List = ({ users }) => {
  return (
    <>
      {users && users.length ? (
        users.map((user) => {
          return <UserCard user={user} key={user._id} />;
        })
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

List.getInitialProps = async () => {
  const url = `${baseUrl}/api/users`;
  const response = await axios.get(url);
  return { users: response.data };
};

export default List;
