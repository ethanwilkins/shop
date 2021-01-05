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

export async function getStaticProps() {
  const url = `${baseUrl}/api/users`;
  const response = await axios.get(url);
  console.log(JSON.stringify(response.data));
  return {
    props: { users: response.data.users },
  };
}

export default List;
